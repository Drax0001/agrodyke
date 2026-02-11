'use client';

import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from '@/i18n/routing';
import { RootState } from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
    const { totalAmount, items } = useSelector((state: RootState) => state.cart);
    const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login?redirect=/checkout');
        }
    }, [isAuthenticated, isLoading, router]);

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [paymentReference, setPaymentReference] = useState('');

    const phoneRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('processing');
        setErrorMessage('');

        const phone = phoneRef.current?.value || '';
        const firstName = firstNameRef.current?.value || '';
        const lastName = lastNameRef.current?.value || '';
        const address = addressRef.current?.value || '';

        // Format phone number to include country code
        const formattedPhone = phone.startsWith('237') ? phone : `237${phone.replace(/^0/, '')}`;

        const { user } = useSelector((state: RootState) => state.auth);

        // ... inside handlePayment
        try {
            const response = await fetch('/api/campay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: formattedPhone,
                    amount: totalAmount, // Use real amount
                    // amount: 25, // Debug amount
                    description: `Agrodyke Order - ${firstName} ${lastName}`,
                    external_reference: `AGR-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
                    userId: user?.id,
                    items: items, // Send items to save in DB
                    shippingAddress: {
                        firstName,
                        lastName,
                        phone: formattedPhone,
                        address
                    }
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Payment failed');
            }

            setPaymentReference(data.reference);
            setStatus('success');
        } catch (error: any) {
            console.error('Payment error:', error);
            setErrorMessage(error.message || 'Payment failed. Please try again.');
            setStatus('failed');
        } finally {
            setLoading(false);
        }
    };

    if (status === 'success') {
        return (
            <div className="max-w-2xl mx-auto px-4 py-24 text-center">
                <CheckCircle2 className="w-20 h-20 mx-auto mb-6 text-green-500" />
                <h1 className="text-3xl font-bold text-slate-900">Payment Initiated!</h1>
                <p className="mt-4 text-secondary text-lg">
                    Please check your phone to approve the Mobile Money transaction.
                </p>
                <div className="mt-6 p-4 bg-slate-100 rounded-lg">
                    <p className="text-sm text-secondary">Payment Reference</p>
                    <p className="text-lg font-mono font-bold">{paymentReference}</p>
                </div>
                <p className="mt-4 text-sm text-secondary">
                    You will receive a confirmation once the payment is completed. Keep this reference for your records.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button className="bg-primary">View My Orders</Button>
                    <Button variant="outline">Back to Home</Button>
                </div>
            </div>
        );
    }

    if (status === 'failed') {
        return (
            <div className="max-w-2xl mx-auto px-4 py-24 text-center">
                <AlertCircle className="w-20 h-20 mx-auto mb-6 text-red-500" />
                <h1 className="text-3xl font-bold text-slate-900">Payment Failed</h1>
                <p className="mt-4 text-secondary text-lg">
                    {errorMessage}
                </p>
                <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button onClick={() => setStatus('idle')} className="bg-primary">Try Again</Button>
                    <Button variant="outline">Contact Support</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-primary mb-8">Checkout</h1>

            <form onSubmit={handlePayment} className="grid md:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Delivery Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" ref={firstNameRef} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" ref={lastNameRef} required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number (MTN/Orange)</Label>
                                <Input
                                    id="phone"
                                    ref={phoneRef}
                                    placeholder="6XX XXX XXX"
                                    pattern="[0-9]{9}"
                                    required
                                />
                                <p className="text-xs text-secondary">Enter your 9-digit mobile number (e.g., 673046720)</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Delivery Address</Label>
                                <Input id="address" ref={addressRef} placeholder="Neighborhood, City" required />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                            <CardDescription>Powered by Campay</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup defaultValue="momo">
                                <div className="flex items-center space-x-2 border p-4 rounded-lg cursor-pointer hover:bg-slate-50">
                                    <RadioGroupItem value="momo" id="momo" />
                                    <Label htmlFor="momo" className="flex-grow flex justify-between items-center cursor-pointer">
                                        <span>Mobile Money (MTN / Orange)</span>
                                        <div className="flex space-x-2">
                                            <div className="w-8 h-5 bg-yellow-400 rounded text-[8px] flex items-center justify-center font-bold">MTN</div>
                                            <div className="w-8 h-5 bg-orange-500 rounded text-[8px] flex items-center justify-center font-bold text-white">ORANGE</div>
                                        </div>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="sticky top-24 border-primary">
                        <CardHeader>
                            <CardTitle>Total to Pay</CardTitle>
                            <div className="text-3xl font-bold text-primary text-center py-4">
                                {totalAmount.toLocaleString()} XAF
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm">
                                {items.map((item: { id: string; name: string; quantity: number; price: number }) => (
                                    <div key={item.id} className="flex justify-between">
                                        <span>{item.name} x{item.quantity}</span>
                                        <span>{(item.price * item.quantity).toLocaleString()} XAF</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                className="w-full text-lg py-6"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    `Pay ${totalAmount.toLocaleString()} XAF`
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </div>
    );
}
