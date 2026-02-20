"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { CheckoutFormValues } from "@/lib/validations";

interface PaymentStepProps {
  onBack: () => void;
  onPay: () => void;
  isProcessing: boolean;
  payLabel: string;
}

export default function PaymentStep({
  onBack,
  onPay,
  isProcessing,
  payLabel
}: PaymentStepProps) {
  const t = useTranslations();
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<CheckoutFormValues>();
  const method = watch("payment.method");
  const customerPhone = watch("customer.phone");
  const phoneToDebit = watch("payment.phoneToDebit");

  useEffect(() => {
    if ((method === "mtn" || method === "orange") && !phoneToDebit && customerPhone) {
      setValue("payment.phoneToDebit", customerPhone);
    }
  }, [customerPhone, method, phoneToDebit, setValue]);

  const inputClass =
    "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/30";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{t("checkout.step3")}</h2>
      <input type="hidden" {...register("payment.method")} />
      <div className="mt-4 grid gap-4">
        {(["mtn", "orange", "whatsapp"] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setValue("payment.method", option)}
            className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-green-500/30 ${method === option
                ? "border-green-600 bg-green-50 text-green-900 ring-1 ring-green-600"
                : "border-slate-200 text-slate-700 hover:border-green-200"
              }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${method === option
                    ? "border-green-600 bg-white"
                    : "border-slate-300 bg-slate-50"
                  }`}
              >
                {method === option && (
                  <div className="h-2.5 w-2.5 rounded-full bg-green-600" />
                )}
              </div>
              <span>{t(`checkout.payment.${option}`)}</span>
            </div>
            <span className="text-xs text-slate-500">
              {t(`checkout.payment.${option}Hint`)}
            </span>
          </button>
        ))}
      </div>

      {(method === "mtn" || method === "orange") && (
        <div className="mt-6 space-y-2 text-sm text-slate-700">
          <div className="text-xs font-semibold uppercase text-green-700">
            {t("checkout.payment.receiverLabel")}
          </div>
          <div className="font-mono text-slate-900">
            {t(`checkout.payment.${method}Number`)}
          </div>

          <label className="block pt-2 text-xs font-semibold text-slate-600">
            {t("checkout.payment.phoneToDebit")}
          </label>
          <input
            className={inputClass}
            {...register("payment.phoneToDebit")}
            placeholder="e.g. 237675405348"
          />
          <p className="text-[10px] text-slate-500">
            Format: 237xxxxxxxxx (CamPay)
          </p>
          {errors.payment?.phoneToDebit ? (
            <p className="text-xs text-red-500">{errors.payment.phoneToDebit.message}</p>
          ) : null}
        </div>
      )}

      <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-slate-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-700">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        {t("checkout.payment.trust")}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
        >
          {t("checkout.actions.backToDelivery")}
        </button>
        <button
          type="button"
          onClick={onPay}
          disabled={isProcessing}
          className="rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-60"
        >
          {payLabel}
        </button>
      </div>
    </div>
  );
}
