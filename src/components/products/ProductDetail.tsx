'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/features/cart/cartSlice';
import { urlFor } from '@/sanity/lib/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ShoppingCart, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function ProductDetail({ product }: { product: any }) {
    const t = useTranslations('Products');
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
    const [added, setAdded] = useState(false);
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.image ? urlFor(product.image).url() : '/images/product-placeholder.jpg',
            quantity: 1,
            size: selectedSize
        }));
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="space-y-8">
            <Link href="/products" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft size={16}  className="mr-2 h-4 w-4" />
                {t('backToProducts')}
            </Link>

            <div className="grid md:grid-cols-2 gap-10">
                {/* Product Image */}
                <div className="bg-slate-100 rounded-xl overflow-hidden aspect-square flex items-center justify-center">
                    {product.image ? (
                        <img
                            src={urlFor(product.image).url()}
                            alt={product.name}
                            className="w-full h-full object-contain p-8 hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="text-slate-400">No Image</div>
                    )}
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <Badge variant="outline" className="mb-2">{product.category}</Badge>
                        <h1 className="text-4xl font-bold">{product.name}</h1>
                        <p className="text-2xl font-semibold text-primary mt-2">{product.price.toLocaleString()} XAF</p>
                    </div>

                    <div className="prose max-w-none text-muted-foreground">
                        <p>{product.description}</p>
                    </div>

                    {product.sizes && product.sizes.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="font-semibold">{t('selectSize')}</h3>
                            <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-3">
                                {product.sizes.map((size: string) => (
                                    <div key={size}>
                                        <RadioGroupItem value={size} id={`size-${size}`} className="peer sr-only" />
                                        <Label
                                            htmlFor={`size-${size}`}
                                            className="px-4 py-2 bg-white border rounded-md cursor-pointer hover:bg-slate-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all block"
                                        >
                                            {size}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    )}

                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                        <Button
                            size="lg"
                            className="flex-1 h-14 text-lg"
                            onClick={handleAddToCart}
                            disabled={added}
                        >
                            {added ? (
                                <>
                                    <CheckCircle size={20} className="mr-2 h-5 w-5" />
                                    {t('addedToCart')}
                                </>
                            ) : (
                                <>
                                    <ShoppingCart size={20} className="mr-2 h-5 w-5" />
                                    {t('addToCart')}
                                </>
                            )}
                        </Button>
                        <Link href="/cart" className="flex-1">
                            <Button variant="outline" size="lg" className="w-full h-14 text-lg">
                                {t('viewCart')}
                            </Button>
                        </Link>
                    </div>

                    <div className="border-t pt-6 space-y-4">
                        <h3 className="font-semibold">{t('supportedCrops')}</h3>
                        <div className="flex flex-wrap gap-2">
                            {product.crops?.map((crop: string) => (
                                <Badge key={crop} variant="secondary">{crop}</Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
