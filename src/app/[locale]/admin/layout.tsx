'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { LayoutDashboard, Package, Users, Settings, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!isAuthenticated) return null; // Will redirect

    return (
        <div className="flex min-h-screen flex-col md:flex-row bg-slate-100">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white border-r">
                <div className="h-16 flex items-center px-6 border-b">
                    <span className="text-xl font-bold text-primary">Agrodyke Admin</span>
                </div>
                <nav className="p-4 space-y-2">
                    <Link href="/admin">
                        <Button
                            variant={pathname === '/admin' ? "secondary" : "ghost"}
                            className="w-full justify-start"
                        >
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                        </Button>
                    </Link>
                    <Link href="/admin/orders">
                        <Button
                            variant={pathname.includes('/admin/orders') ? "secondary" : "ghost"}
                            className="w-full justify-start"
                        >
                            <Package className="mr-2 h-4 w-4" />
                            Orders
                        </Button>
                    </Link>
                    <Link href="/admin/users">
                        <Button
                            variant={pathname.includes('/admin/users') ? "secondary" : "ghost"}
                            className="w-full justify-start"
                        >
                            <Users className="mr-2 h-4 w-4" />
                            Users
                        </Button>
                    </Link>
                    <Link href="/admin/settings">
                        <Button
                            variant={pathname.includes('/admin/settings') ? "secondary" : "ghost"}
                            className="w-full justify-start"
                        >
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Button>
                    </Link>
                </nav>
                <div className="p-4 border-t mt-auto">
                    <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => router.push('/')}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Exit Admin
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
}
