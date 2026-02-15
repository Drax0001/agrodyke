"use client";

import { ReactNode } from "react";

interface CheckoutLayoutProps {
  form: ReactNode;
  summary: ReactNode;
}

export default function CheckoutLayout({ form, summary }: CheckoutLayoutProps) {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row">
      <section className="flex w-full flex-col gap-6 lg:w-3/5">{form}</section>
      <aside className="w-full lg:w-2/5">{summary}</aside>
    </div>
  );
}
