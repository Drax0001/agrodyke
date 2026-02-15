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
    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center gap-3">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full border ${
              step.id <= currentStep
                ? "border-green-700 bg-green-700 text-white"
                : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            {step.id}
          </div>
          <span className={step.id === currentStep ? "text-green-700" : ""}>
            {step.label}
          </span>
          {index < steps.length - 1 ? (
            <span className="text-slate-300">—</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}
