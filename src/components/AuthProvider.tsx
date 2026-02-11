'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '@/lib/supabase';
import { setUser, setLoading } from '@/lib/features/auth/authSlice';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();

    useEffect(() => {
        // Check active session
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                dispatch(setUser({
                    id: session.user.id,
                    email: session.user.email || null,
                    full_name: session.user.user_metadata?.full_name,
                    avatar_url: session.user.user_metadata?.avatar_url
                }));
            } else {
                dispatch(setUser(null));
            }
            dispatch(setLoading(false));
        };

        getSession();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                dispatch(setUser({
                    id: session.user.id,
                    email: session.user.email || null,
                    full_name: session.user.user_metadata?.full_name,
                    avatar_url: session.user.user_metadata?.avatar_url
                }));
            } else {
                dispatch(setUser(null));
            }
            dispatch(setLoading(false));
        });

        return () => subscription.unsubscribe();
    }, [dispatch]);

    return <>{children}</>;
}
