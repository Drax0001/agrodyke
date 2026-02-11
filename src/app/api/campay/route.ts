import { NextRequest, NextResponse } from 'next/server';
import { collectPayment, getCampayErrorMessage } from '@/lib/services/campay';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { phone, amount, description, external_reference, userId, items, shippingAddress } = body;

        // Validate required fields
        if (!phone || !amount || !external_reference) {
            return NextResponse.json(
                { error: 'Missing required fields: phone, amount, external_reference' },
                { status: 400 }
            );
        }

        // Validate amount is a number
        const numAmount = parseInt(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            return NextResponse.json(
                { error: 'Amount must be a positive integer' },
                { status: 400 }
            );
        }

        // 1. Create Order in Supabase (Pending)
        if (userId) {
            const { error: orderError } = await supabase
                .from('orders')
                .insert({
                    user_id: userId,
                    order_reference: external_reference,
                    total_amount: numAmount,
                    status: 'pending',
                    payment_method: 'MOMO',
                    shipping_address: shippingAddress,
                });

            if (orderError) {
                console.error('Failed to create order in Supabase:', orderError);
                return NextResponse.json(
                    { error: 'Failed to initialize order. Please try again.' },
                    { status: 500 }
                );
            }

            // 2. Create Order Items
            if (items && items.length > 0) {
                const { data: orderData } = await supabase
                    .from('orders')
                    .select('id')
                    .eq('order_reference', external_reference)
                    .single();

                if (orderData) {
                    const orderItems = items.map((item: any) => ({
                        order_id: orderData.id,
                        product_id: item.id,
                        product_name: item.name,
                        quantity: item.quantity,
                        price: item.price,
                        size: item.size || null,
                        image_url: item.image || null
                    }));

                    const { error: itemsError } = await supabase
                        .from('order_items')
                        .insert(orderItems);

                    if (itemsError) console.error('Failed to save order items:', itemsError);
                }
            }
        }

        // Call Campay API
        const result = await collectPayment(
            phone,
            numAmount,
            description || 'Agrodyke Product Purchase',
            external_reference
        );

        // Log the transaction
        console.log('[Campay] Payment initiated:', {
            reference: result.reference,
            external_reference,
            amount: numAmount,
            phone: phone.replace(/(\d{3})\d{5}(\d{3})/, '$1*****$2'), // Mask phone number in logs
            operator: result.operator,
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json({
            success: true,
            reference: result.reference,
            operator: result.operator,
            operator_reference: result.operator_reference,
            ussd_code: result.ussd_code,
            message: 'Payment initiated. Please check your phone to approve the transaction.',
        });

    } catch (error: any) {
        console.error('[Campay] Payment error:', error);

        // Extract error code if available
        const errorCode = error.message?.match(/ER\d{3}/)?.[0];
        const userMessage = errorCode
            ? getCampayErrorMessage(errorCode)
            : 'Payment processing failed. Please try again or contact support.';

        return NextResponse.json(
            {
                error: userMessage,
                code: errorCode,
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            },
            { status: 400 }
        );
    }
}
