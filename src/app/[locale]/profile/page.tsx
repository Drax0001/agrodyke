'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useRouter } from '@/i18n/routing';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, LetterText, Shield, Calendar, ShoppingBag, LogOut, ChevronRight, Circle } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { supabase } from '@/lib/supabase';
import { logout } from '@/lib/features/auth/authSlice';
import { useDispatch } from 'react-redux';

export default function ProfilePage() {
    const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const t = useTranslations('Profile');
    const dispatch = useDispatch();

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Circle size={32} className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        router.push('/login');
        return null;
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        dispatch(logout());
        router.push('/');
    };

    return (
        <div className="container py-12 max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Profile Info Card */}
                <Card className="col-span-1 md:col-span-1 h-fit">
                    <CardHeader className="text-center pb-2">
                        <div className="flex justify-center mb-4">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={user.avatar_url || ''} />
                                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                                    {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <CardTitle>{user.full_name || 'Agrodyke User'}</CardTitle>
                        <Badge variant="secondary" className="mt-2 capitalize">
                            {user.role || 'user'}
                        </Badge>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                            <LetterText size={16} className="mr-2 h-4 w-4 shrink-0" />
                            <span className="truncate">{user.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                            <Shield size={16} className="mr-2 h-4 w-4 shrink-0" />
                            <span className="capitalize">{user.role || 'User'} Level Access</span>
                        </div>
                        <div className="pt-4 border-t">
                            <Button
                                variant="destructive"
                                className="w-full justify-start"
                                onClick={handleLogout}
                            >
                                <LogOut size={16} className="mr-2 h-4 w-4" />
                                {t('logout')}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Settings / Activity View */}
                <div className="col-span-1 md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Details</CardTitle>
                            <CardDescription>View and manage your account information</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">{t('fullName')}</p>
                                    <p className="text-base font-semibold">{user.full_name || 'Not set'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">{t('email')}</p>
                                    <p className="text-base font-semibold">{user.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">{t('role')}</p>
                                    <p className="text-base font-semibold capitalize">{user.role || 'user'}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">User ID</p>
                                    <p className="text-xs font-mono bg-slate-50 p-1.5 rounded border truncate">
                                        {user.id}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Links</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Link href="/orders" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b last:border-0 group">
                                <div className="flex items-center">
                                    <div className="p-2 bg-primary/10 rounded-lg mr-4">
                                        <ShoppingBag size={20} className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">My Orders</p>
                                        <p className="text-sm text-muted-foreground">View your purchase history and status</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </Link>

                            {user.role === 'admin' && (
                                <Link href="/admin" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b last:border-0 group">
                                    <div className="flex items-center">
                                        <div className="p-2 bg-primary/10 rounded-lg mr-4">
                                            <Shield size={20} className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">Admin Dashboard</p>
                                            <p className="text-sm text-muted-foreground">Manage platform data and analytics</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
