'use client';

import { NextIntlClientProvider } from 'next-intl';

export default function IntlClientProvider({ messages, children }: { messages: any, children: React.ReactNode }) {
  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}
