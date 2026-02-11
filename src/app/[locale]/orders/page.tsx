'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Link } from '@/i18n/routing';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Package, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Order {
    id: string;
    created_at: string;
    total_amount: number;
    status: string;
    order_reference: string;
    payment_method: string;
    shipping_address: any;
    items?: OrderItem[];
}

interface OrderItem {
    id: string;
    product_name: string;
    quantity: number;
    price: number;
    image_url: string;
}

export default function OrdersPage() {
    const { user, isAuthenticated, isLoading: authLoading } = useSelector((state: RootState) => state.auth);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
            return;
        }

        if (user) {
            fetchOrders();
        }
    }, [user, isAuthenticated, authLoading]);

    const fetchOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select(`
                    *,
                    items:order_items(*)
                `)
                .eq('user_id', user!.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (err) {
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'successful':
            case 'completed':
            case 'paid':
                return 'bg-green-500 hover:bg-green-600';
            case 'pending':
                return 'bg-yellow-500 hover:bg-yellow-600';
            case 'failed':
            case 'cancelled':
                return 'bg-red-500 hover:bg-red-600';
            default:
                return 'bg-slate-500 hover:bg-slate-600';
        }
    };

    if (authLoading || (loading && isAuthenticated)) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container py-10 max-w-4xl">
            <h1 className="text-3xl font-bold mb-2">Order History</h1>
            <p className="text-muted-foreground mb-8">View and track your past purchases.</p>

            {orders.length === 0 ? (
                <Card className="text-center py-12">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="bg-primary/10 p-4 rounded-full">
                            <ShoppingBag className="h-10 w-10 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold">No orders yet</h2>
                        <p className="text-muted-foreground max-w-sm ml-auto mr-auto">
                            You haven't made any purchases yet. Browse our products to get started using Agrodyke.
                        </p>
                        <Link href="/products">
                            <Button>Browse Products</Button>
                        </Link>
                    </div>
                </Card>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <Card key={order.id} className="overflow-hidden">
                            <CardHeader className="bg-slate-50 border-b flex flex-row items-center justify-between pb-4">
                                <div>
                                    <CardTitle className="text-lg">Order #{order.order_reference.split('-')[2] || order.order_reference}</CardTitle>
                                    <CardDescription>
                                        Placed on {new Date(order.created_at).toLocaleDateString()}
                                    </CardDescription>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <Badge className={getStatusColor(order.status)}>
                                        {order.status.toUpperCase()}
                                    </Badge>
                                    <span className="font-bold">{order.total_amount.toLocaleString()} XAF</span>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    {order.items?.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-4">
                                            {item.image_url ? (
                                                <div className="h-16 w-16 relative rounded-md overflow-hidden bg-slate-100">
                                                    <img src={item.image_url} alt={item.product_name} className="object-cover h-full w-full" />
                                                </div>
                                            ) : (
                                                <div className="h-16 w-16 bg-slate-100 rounded-md flex items-center justify-center">
                                                    <Package className="h-8 w-8 text-slate-400" />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <p className="font-medium">{item.product_name}</p>
                                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-medium">{(item.price * item.quantity).toLocaleString()} XAF</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
