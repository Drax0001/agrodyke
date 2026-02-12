'use client';

import { Link } from '@/i18n/routing';
import { FacebookLogo, InstagramLogo, TwitterLogo, WhatsappLogo, Envelope, MapPin, Phone } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
    return (
        <footer className="bg-white border-t-2 border-slate-900 pt-16 pb-8">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <h2 className="text-3xl font-display font-bold text-primary tracking-tight">
                                AGRODYKE
                            </h2>
                        </Link>
                        <p className="text-slate-600 font-medium max-w-xs">
                            Empowering farmers with premium organic fertilizers and sustainable agricultural solutions.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-slate-100 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all rounded-md text-primary">
                                <FacebookLogo size={20} weight="fill" />
                            </a>
                            <a href="#" className="p-2 bg-slate-100 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all rounded-md text-primary">
                                <InstagramLogo size={20} weight="fill" />
                            </a>
                            <a href="#" className="p-2 bg-slate-100 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all rounded-md text-primary">
                                <TwitterLogo size={20} weight="fill" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-display font-bold text-xl mb-6 text-slate-900">Shop</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/products" className="text-slate-600 hover:text-primary hover:underline decoration-2 underline-offset-4 font-medium transition-colors">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?category=fertilizers" className="text-slate-600 hover:text-primary hover:underline decoration-2 underline-offset-4 font-medium transition-colors">
                                    Organic Fertilizers
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?category=pesticides" className="text-slate-600 hover:text-primary hover:underline decoration-2 underline-offset-4 font-medium transition-colors">
                                    Bio-Pesticides
                                </Link>
                            </li>
                            <li>
                                <Link href="/calculator" className="text-slate-600 hover:text-primary hover:underline decoration-2 underline-offset-4 font-medium transition-colors">
                                    Dosage Calculator
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-display font-bold text-xl mb-6 text-slate-900">Company</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/about" className="text-slate-600 hover:text-primary hover:underline decoration-2 underline-offset-4 font-medium transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-slate-600 hover:text-primary hover:underline decoration-2 underline-offset-4 font-medium transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-slate-600 hover:text-primary hover:underline decoration-2 underline-offset-4 font-medium transition-colors">
                                    Blog & Guides
                                </Link>
                            </li>
                            <li>
                                <Link href="/policy" className="text-slate-600 hover:text-primary hover:underline decoration-2 underline-offset-4 font-medium transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-display font-bold text-xl mb-6 text-slate-900">Stay Updated</h3>
                        <p className="text-slate-600 mb-4 font-medium">
                            Join our newsletter for farming tips and exclusive offers.
                        </p>
                        <form className="space-y-4">
                            <Input
                                placeholder="Enter your email"
                                className="bg-white border-2 border-slate-900 h-11"
                            />
                            <Button className="w-full bg-accent text-slate-900 hover:bg-accent/90 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]">
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t-2 border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 font-medium text-sm">
                        &copy; {new Date().getFullYear()} Agrodyke using Agro-Brutalism Theme. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <div className="flex items-center text-slate-500 text-sm font-medium">
                            <MapPin weight="fill" className="mr-2 text-primary" />
                            Douala, Cameroon
                        </div>
                        <div className="flex items-center text-slate-500 text-sm font-medium">
                            <Envelope weight="fill" className="mr-2 text-primary" />
                            info@agrodyke.com
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
