'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/features/cart/cartSlice';
import { AGRODYKE_CONTACT } from '@/lib/constants';
import Image from 'next/image';
import { Product } from '@/lib/sanityFetch';

interface ProductCatalogProps {
    products: Product[];
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
    const dispatch = useDispatch();

    const handleWhatsAppOrder = (product: any) => {
        const message = `Hello, I want to order:\n- Product: ${product.name}\n- Quantity: 1\n- Location: (Please enter your location)`;
        window.open(`https://wa.me/${AGRODYKE_CONTACT.WHATSAPP.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-extrabold text-primary">Our Products</h1>
                <p className="mt-4 text-secondary">Premium organic fertilizers and agricultural solutions.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow border-slate-200">
                        <div className="aspect-square bg-slate-100 relative">
                            {product.image ? (
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                    Image Placeholder
                                </div>
                            )}
                        </div>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
                                <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                                    {product.category}
                                </Badge>
                            </div>
                            <p className="text-sm text-secondary line-clamp-2">{product.description}</p>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {product.crops.map((crop) => (
                                    <Badge key={crop} variant="outline" className="text-[10px] uppercase tracking-wider">
                                        {crop}
                                    </Badge>
                                ))}
                            </div>
                            <p className="text-2xl font-bold text-primary">{product.price.toLocaleString()} XAF</p>
                        </CardContent>
                        <CardFooter className="grid grid-cols-2 gap-2 border-t pt-4">
                            <Button
                                variant="outline"
                                className="w-full flex items-center justify-center space-x-2"
                                onClick={() => dispatch(addToCart({ ...product, quantity: 1, size: product.sizes[0] }))}
                            >
                                <ShoppingCart className="w-4 h-4" />
                                <span>Add to Cart</span>
                            </Button>
                            <Button
                                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white flex items-center justify-center space-x-2"
                                onClick={() => handleWhatsAppOrder(product)}
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span>WhatsApp</span>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
