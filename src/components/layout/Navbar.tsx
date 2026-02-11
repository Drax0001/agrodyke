'use client';

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { ShoppingCart, Menu, Globe, User, LogOut, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { supabase } from '@/lib/supabase';
import { logout } from '@/lib/features/auth/authSlice';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';

export default function Navbar() {
    const t = useTranslations('Navbar');
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const cartItemsCount = useSelector((state: RootState) =>
        state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
    );
    const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

    const toggleLanguage = () => {
        const nextLocale = locale === 'en' ? 'fr' : 'en';
        router.replace(pathname, { locale: nextLocale });
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        dispatch(logout());
        router.push('/login');
    };

    return (
        <nav className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold tracking-tight">
                            AGRODYKE
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/products" className="hover:text-accent transition-colors">
                            {t('products')}
                        </Link>
                        <Link href="/crops" className="hover:text-accent transition-colors">
                            {t('crops')}
                        </Link>
                        <Link href="/calculator" className="hover:text-accent transition-colors">
                            {t('calculator')}
                        </Link>

                        <button
                            onClick={toggleLanguage}
                            className="flex items-center space-x-1 hover:text-accent transition-colors"
                        >
                            <Globe className="w-5 h-5" />
                            <span className="uppercase">{locale}</span>
                        </button>

                        <Link href="/cart" className="relative flex items-center hover:text-accent transition-colors">
                            <ShoppingCart className="w-6 h-6" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user?.avatar_url || ''} alt={user?.full_name || 'User'} />
                                            <AvatarFallback>{user?.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">{user?.full_name || 'User'}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => router.push('/profile')}>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => router.push('/orders')}>
                                        <ShoppingBag className="mr-2 h-4 w-4" />
                                        <span>My Orders</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link href="/login">
                                <Button variant="secondary" size="sm">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <Link href="/cart" className="relative flex items-center">
                            <ShoppingCart className="w-6 h-6" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-primary-foreground text-primary border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/products" className="block px-3 py-2 rounded-md font-medium hover:bg-slate-100">
                            {t('products')}
                        </Link>
                        <Link href="/crops" className="block px-3 py-2 rounded-md font-medium hover:bg-slate-100">
                            {t('crops')}
                        </Link>
                        <Link href="/calculator" className="block px-3 py-2 rounded-md font-medium hover:bg-slate-100">
                            {t('calculator')}
                        </Link>
                        <button
                            onClick={toggleLanguage}
                            className="w-full text-left px-3 py-2 rounded-md font-medium hover:bg-slate-100 uppercase"
                        >
                            {t('language') || 'Language'}: {locale}
                        </button>

                        <div className="border-t border-slate-200 mt-2 pt-2">
                            {isAuthenticated ? (
                                <>
                                    <div className="px-3 py-2 flex items-center space-x-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user?.avatar_url || ''} />
                                            <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium">{user?.full_name}</p>
                                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left block px-3 py-2 rounded-md font-medium hover:bg-slate-100 text-destructive"
                                    >
                                        Log out
                                    </button>
                                </>
                            ) : (
                                <Link href="/login" className="block px-3 py-2 rounded-md font-medium hover:bg-slate-100 text-primary">
                                    Login / Sign Up
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
