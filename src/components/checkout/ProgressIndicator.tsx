"use client";

import { useTranslations } from "next-intl";

interface ProgressIndicatorProps {
  currentStep: 1 | 2 | 3;
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const t = useTranslations();
  const steps = [
    { id: 1, label: t("checkout.step1") },
    { id: 2, label: t("checkout.step2") },
    { id: 3, label: t("checkout.step3") }
  ];

  return (
    <div className="flex items-center justify-between sm:justify-start sm:gap-6">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-1 items-center sm:flex-none">
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-colors ${step.id <= currentStep
                  ? "border-green-700 bg-green-700 text-white"
                  : "border-slate-200 bg-white text-slate-400"
                }`}
            >
              {step.id}
            </div>

            {/* Short label for mobile, full for desktop if needed */}
            <span
              className={`text-xs font-semibold sm:text-sm ${step.id === currentStep ? "text-green-700" : "text-slate-500 hidden sm:block"
                }`}
            >
              {step.label}
            </span>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div className="mx-2 h-px flex-1 bg-slate-200 sm:mx-4 sm:w-16 sm:flex-none" />
          )}
        </div>
      ))}
    </div>
  );
}
