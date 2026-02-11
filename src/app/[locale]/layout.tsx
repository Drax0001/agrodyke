import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import StoreProvider from '@/components/StoreProvider';
import Navbar from '@/components/layout/Navbar';
import AuthProvider from '@/components/AuthProvider';
import '@/app/globals.css';

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    // ... imports

    return (
        <html lang={locale}>
            <body>
                <StoreProvider>
                    <AuthProvider>
                        <NextIntlClientProvider messages={messages}>
                            <div className="min-h-screen flex flex-col">
                                <Navbar />
                                <main className="flex-grow">
                                    {children}
                                </main>
                                {/* Footer will go here */}
                            </div>
                        </NextIntlClientProvider>
                    </AuthProvider>
                </StoreProvider>
            </body>
        </html>
    );
}
