'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import AppLoader from '@/components/layout/AppLoader';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    const { isLoading: authLoading } = useSelector((state: RootState) => state.auth);

    return (
        <>
            {authLoading && <AppLoader />}
            <div className={`transition-opacity duration-500 ${authLoading ? 'opacity-0' : 'opacity-100'}`}>
                {children}
            </div>
        </>
    );
}
