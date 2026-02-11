import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * Campay Webhook Handler
 * Receives payment status updates from Campay
 * Documentation: https://documenter.getpostman.com/view/2391374/T1LV8PVA
 */

interface CampayWebhookPayload {
    reference: string;
    external_reference: string;
    status: 'SUCCESSFUL' | 'FAILED' | 'PENDING';
    amount: string;
    currency: string;
    operator: string;
    code: string;
    operator_reference: string;
    reason?: string;
}

export async function POST(request: NextRequest) {
    try {
        const payload: CampayWebhookPayload = await request.json();

        console.log('[Campay Webhook] Received:', {
            reference: payload.reference,
            external_reference: payload.external_reference,
            status: payload.status,
            amount: payload.amount,
        });

        // Update order status in database
        const { error } = await supabase
            .from('orders')
            .update({
                status: payload.status.toLowerCase(), // 'successful' -> 'successful' (or map to schema enum if different)
                updated_at: new Date().toISOString()
            })
            .eq('order_reference', payload.external_reference);

        if (error) {
            console.error('[Campay Webhook] Failed to update order:', error);
            // We still return 200 to Campay so they don't retry indefinitely, but log the error
        } else {
            console.log(`[Campay Webhook] Order ${payload.external_reference} updated to ${payload.status}`);
        }

        return NextResponse.json({ received: true });

    } catch (error) {
        console.error('[Campay Webhook] Error:', error);
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 500 }
        );
    }
}
