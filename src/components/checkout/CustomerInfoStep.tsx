"use client";

import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { CheckoutFormValues } from "@/lib/validations";

interface CustomerInfoStepProps {
  onNext: () => void;
  isSubmitting: boolean;
}

export default function CustomerInfoStep({
  onNext,
  isSubmitting
}: CustomerInfoStepProps) {
  const t = useTranslations();
  const {
    register,
    formState: { errors }
  } = useFormContext<CheckoutFormValues>();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{t("checkout.step1")}</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">
            {t("checkout.customer.fullName")}
          </label>
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...register("customer.fullName")}
            placeholder={t("checkout.customer.fullName")}
          />
          {errors.customer?.fullName ? (
            <p className="text-xs text-red-500">{errors.customer.fullName.message}</p>
          ) : null}
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">
            {t("checkout.customer.phone")}
          </label>
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...register("customer.phone")}
            placeholder={t("checkout.customer.phone")}
          />
          {errors.customer?.phone ? (
            <p className="text-xs text-red-500">{errors.customer.phone.message}</p>
          ) : null}
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-semibold text-slate-600">
            {t("checkout.customer.email")}
          </label>
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...register("customer.email")}
            placeholder={t("checkout.customer.email")}
          />
          {errors.customer?.email ? (
            <p className="text-xs text-red-500">{errors.customer.email.message}</p>
          ) : null}
        </div>
      </div>

      <div className="mt-4 text-xs font-semibold text-slate-600">
        {t("checkout.customer.language")}
      </div>
      <div className="mt-2 flex items-center gap-4 text-sm text-slate-600">
        <label className="flex items-center gap-2">
          <input type="radio" value="fr" {...register("customer.preferredLanguage")} />
          {t("checkout.customer.languageFR")}
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" value="en" {...register("customer.preferredLanguage")} />
          {t("checkout.customer.languageEN")}
        </label>
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={isSubmitting}
        className="mt-6 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {t("checkout.actions.continueToDelivery")}
      </button>
    </div>
  );
}
