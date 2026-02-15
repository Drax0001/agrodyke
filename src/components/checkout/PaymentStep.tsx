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
            className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold ${
              method === option
                ? "border-green-700 bg-green-50 text-green-900"
                : "border-slate-200 text-slate-700"
            }`}
          >
            <span>{t(`checkout.payment.${option}`)}</span>
            <span className="text-xs text-slate-500">{t(`checkout.payment.${option}Hint`)}</span>
          </button>
        ))}
      </div>

      {(method === "mtn" || method === "orange") && (
        <div className="mt-6 space-y-2 text-sm text-slate-700">
          <div className="text-xs font-semibold uppercase text-green-700">
            {t("checkout.payment.receiverLabel")}
          </div>
          <div>{t(`checkout.payment.${method}Number`)}</div>
          <label className="text-xs font-semibold text-slate-600">
            {t("checkout.payment.phoneToDebit")}
          </label>
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...register("payment.phoneToDebit")}
            placeholder={t("checkout.payment.phoneToDebit")}
          />
          {errors.payment?.phoneToDebit ? (
            <p className="text-xs text-red-500">{errors.payment.phoneToDebit.message}</p>
          ) : null}
        </div>
      )}

      <div className="mt-6 text-xs font-semibold text-slate-600">
        {t("checkout.payment.trust")}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-semibold text-slate-600"
        >
          {t("checkout.actions.backToDelivery")}
        </button>
        <button
          type="button"
          onClick={onPay}
          disabled={isProcessing}
          className="rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {payLabel}
        </button>
      </div>
    </div>
  );
}
