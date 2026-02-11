'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { removeFromCart, clearCart } from '@/lib/features/cart/cartSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function CartPage() {
    const { items, totalAmount } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-24 text-center">
                <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
                <p className="mt-2 text-secondary">Looking for fertilizer? Check our catalog!</p>
                <Link href="/products" className="mt-8 inline-block">
                    <Button>Browse Products</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-primary mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <Card key={`${item.id}-${item.size}`} className="flex items-center p-4">
                            <div className="w-20 h-20 bg-slate-100 rounded-md flex-shrink-0 flex items-center justify-center text-[10px] text-slate-400">
                                Img
                            </div>
                            <div className="ml-4 flex-grow">
                                <h3 className="font-bold">{item.name}</h3>
                                <p className="text-sm text-secondary">Size: {item.size}</p>
                                <p className="text-primary font-bold">{item.price.toLocaleString()} XAF</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="font-medium">Qty: {item.quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size }))}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </Button>
                            </div>
                        </Card>
                    ))}

                    <div className="pt-4 flex justify-between">
                        <Button variant="outline" onClick={() => dispatch(clearCart())}>
                            Clear Cart
                        </Button>
                        <Link href="/products">
                            <Button variant="ghost">Continue Shopping</Button>
                        </Link>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{totalAmount.toLocaleString()} XAF</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-green-600 font-medium">Calculated at checkout</span>
                            </div>
                            <div className="border-t pt-4 flex justify-between font-bold text-xl">
                                <span>Total</span>
                                <span className="text-primary">{totalAmount.toLocaleString()} XAF</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Link href="/checkout" className="w-full">
                                <Button className="w-full bg-primary hover:bg-primary/90 text-lg py-6">
                                    Checkout <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
