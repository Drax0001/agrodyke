"use client";

import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import { CAMEROON_REGIONS } from "@/lib/constants";
import { CheckoutFormValues } from "@/lib/validations";

interface DeliveryStepProps {
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export default function DeliveryStep({
  onNext,
  onBack,
  isSubmitting
}: DeliveryStepProps) {
  const t = useTranslations();
  const {
    register,
    formState: { errors }
  } = useFormContext<CheckoutFormValues>();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{t("checkout.step2")}</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">
            {t("checkout.delivery.region")}
          </label>
          <select
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...register("delivery.region")}
          >
            <option value="">{t("checkout.delivery.regionPlaceholder")}</option>
            {CAMEROON_REGIONS.map((region) => (
              <option key={region.value} value={region.value}>
                {t(region.labelKey)}
              </option>
            ))}
          </select>
          {errors.delivery?.region ? (
            <p className="text-xs text-red-500">{errors.delivery.region.message}</p>
          ) : null}
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">
            {t("checkout.delivery.city")}
          </label>
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...register("delivery.city")}
            placeholder={t("checkout.delivery.city")}
          />
          {errors.delivery?.city ? (
            <p className="text-xs text-red-500">{errors.delivery.city.message}</p>
          ) : null}
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">
            {t("checkout.delivery.neighborhood")}
          </label>
          <input
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...register("delivery.neighborhood")}
            placeholder={t("checkout.delivery.neighborhood")}
          />
          {errors.delivery?.neighborhood ? (
            <p className="text-xs text-red-500">
              {errors.delivery.neighborhood.message}
            </p>
          ) : null}
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-semibold text-slate-600">
            {t("checkout.delivery.address")}
          </label>
          <textarea
            className="h-24 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...register("delivery.address")}
            placeholder={t("checkout.delivery.address")}
          />
          {errors.delivery?.address ? (
            <p className="text-xs text-red-500">{errors.delivery.address.message}</p>
          ) : null}
        </div>
        <div className="space-y-1 md:col-span-2">
          <label className="text-xs font-semibold text-slate-600">
            {t("checkout.delivery.notes")}
          </label>
          <textarea
            className="h-20 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
            {...register("delivery.notes")}
            placeholder={t("checkout.delivery.notesPlaceholder")}
          />
        </div>
      </div>

      <div className="mt-6 text-xs font-semibold text-slate-600">
        {t("checkout.delivery.method")}
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-600">
        <label className="flex items-center gap-2">
          <input type="radio" value="delivery" {...register("delivery.method")} />
          {t("checkout.delivery.methodDelivery")}
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" value="pickup" {...register("delivery.method")} />
          {t("checkout.delivery.methodPickup")}
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-semibold text-slate-600"
        >
          {t("checkout.actions.backToCustomer")}
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          className="rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
        >
          {t("checkout.actions.continueToPayment")}
        </button>
      </div>
    </div>
  );
}
