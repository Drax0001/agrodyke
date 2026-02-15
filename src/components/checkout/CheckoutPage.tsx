"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import OrderSummary from "@/components/checkout/OrderSummary";
import ProgressIndicator from "@/components/checkout/ProgressIndicator";
import CheckoutLayout from "@/components/checkout/CheckoutLayout";
import CustomerInfoStep from "@/components/checkout/CustomerInfoStep";
import DeliveryStep from "@/components/checkout/DeliveryStep";
import PaymentStep from "@/components/checkout/PaymentStep";
import PaymentProcessing from "@/components/checkout/PaymentProcessing";
import OrderConfirmation from "@/components/checkout/OrderConfirmation";
import PaymentError from "@/components/checkout/PaymentError";
import WhatsAppRedirect from "@/components/checkout/WhatsAppRedirect";
import { useCartStore } from "@/store/cart";
import Logo from "@/components/shared/Logo";
import { CheckoutFormValues, checkoutSchema } from "@/lib/validations";
import { formatXaf, getCartSubtotal, getDeliveryFee } from "@/lib/utils";
import { generateOrderWhatsAppURL } from "@/lib/whatsapp";

export default function CheckoutPage() {
  const t = useTranslations();
  const locale = useLocale() as "fr" | "en";
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "failed" | "whatsapp">("idle");
  const [reference, setReference] = useState("");
  const [orderId, setOrderId] = useState("");
  const [countdown, setCountdown] = useState(120);
  const statusRef = useRef(status);

  const methods = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customer: {
        fullName: "",
        phone: "",
        email: "",
        preferredLanguage: locale
      },
      delivery: {
        region: "",
        city: "",
        neighborhood: "",
        address: "",
        notes: "",
        method: "delivery"
      },
      payment: {
        method: "mtn",
        phoneToDebit: ""
      }
    }
  });

  const {
    trigger,
    watch,
    formState: { isSubmitting }
  } = methods;
  const deliveryRegion = watch("delivery.region");
  const deliveryMethod = watch("delivery.method");
  const deliveryFee = getDeliveryFee(deliveryRegion, deliveryMethod);
  const subtotal = getCartSubtotal(items);
  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (items.length === 0) {
      if (typeof window !== "undefined") {
        window.alert(t("checkout.empty"));
      }
      router.replace(`/${locale}`);
    }
  }, [items.length, locale, router, t]);

  useEffect(() => {
    methods.setValue("customer.preferredLanguage", locale);
  }, [locale, methods]);

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const goToDelivery = async () => {
    const valid = await trigger([
      "customer.fullName",
      "customer.phone",
      "customer.email",
      "customer.preferredLanguage"
    ]);
    if (valid) {
      setStep(2);
    }
  };

  const goToPayment = async () => {
    const valid = await trigger([
      "delivery.region",
      "delivery.city",
      "delivery.neighborhood",
      "delivery.address",
      "delivery.method"
    ]);
    if (valid) {
      setStep(3);
    }
  };

  const payLabel = (() => {
    const method = methods.getValues("payment.method");
    const formatted = formatXaf(total, locale);
    if (method === "mtn") {
      return `${t("checkout.payment.payCTA")} ${formatted} MTN`;
    }
    if (method === "orange") {
      return `${t("checkout.payment.payCTA")} ${formatted} Orange`;
    }
    return t("checkout.payment.payCTA");
  })();

  const handlePay = async () => {
    const valid = await trigger(["payment.method", "payment.phoneToDebit"]);
    if (!valid) {
      return;
    }

    const formValues = methods.getValues();
    const method = formValues.payment.method;
    const orderReference = `AG-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(
      Math.random() * 900 + 100
    )}`;
    setOrderId(orderReference);

    if (method === "whatsapp") {
      const itemsPayload = items.map((item) => ({
        name: t(`${item.nameKey}.name`),
        quantity: item.quantity,
        price: item.priceXAF
      }));
      const url = generateOrderWhatsAppURL({
        items: itemsPayload,
        total,
        customerName: formValues.customer.fullName,
        customerPhone: formValues.customer.phone,
        city: formValues.delivery.city,
        region: formValues.delivery.region,
        address: formValues.delivery.address,
        locale
      });
      window.open(url, "_blank", "noreferrer");
      setStatus("whatsapp");
      return;
    }

    try {
      setStatus("processing");
      setCountdown(120);
      const response = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          phoneNumber: formValues.payment.phoneToDebit,
          operator: method === "mtn" ? "MTN" : "ORANGE",
          orderId: orderReference,
          items: items.map((item) => ({
            name: t(`${item.nameKey}.name`),
            quantity: item.quantity,
            price: item.priceXAF
          })),
          customerName: formValues.customer.fullName
        })
      });

      if (!response.ok) {
        setStatus("failed");
        return;
      }

      const data = await response.json();
      setReference(data.reference);

      for (let i = 0; i < 24; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        if (statusRef.current !== "processing") {
          return;
        }
        const statusResponse = await fetch(`/api/payment/status?reference=${data.reference}`);
        if (!statusResponse.ok) {
          continue;
        }
        const statusData = await statusResponse.json();
        if (statusData.status === "SUCCESSFUL") {
          setStatus("success");
          useCartStore.getState().clearCart();
          return;
        }
        if (statusData.status === "FAILED") {
          setStatus("failed");
          return;
        }
      }

      setStatus("failed");
    } catch {
      setStatus("failed");
    }
  };

  useEffect(() => {
    if (status !== "processing") {
      return;
    }
    const interval = setInterval(() => {
      setCountdown((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Logo size={32} />
          <Link
            href={`/${locale}`}
            className="text-sm font-semibold text-green-700 hover:text-green-600"
          >
            {t("checkout.backToStore")}
          </Link>
        </div>
      </header>

      <FormProvider {...methods}>
        <CheckoutLayout
          form={
            <div className="flex flex-col gap-6">
              <h1 className="text-2xl font-semibold text-slate-900">
                {t("checkout.title")}
              </h1>
              <ProgressIndicator currentStep={step} />
              {status === "processing" && (
                <PaymentProcessing
                  reference={reference}
                  secondsLeft={countdown}
                  onCancel={() => {
                    setStatus("idle");
                    setStep(3);
                  }}
                />
              )}
              {status === "success" && (
                <OrderConfirmation
                  orderId={orderId}
                  total={formatXaf(total, locale)}
                  onReturn={() => router.push(`/${locale}`)}
                />
              )}
              {status === "failed" && (
                <PaymentError
                  onRetry={() => {
                    setStatus("idle");
                    setStep(3);
                  }}
                  onWhatsApp={() => {
                    const url = generateOrderWhatsAppURL({
                      items: items.map((item) => ({
                        name: t(`${item.nameKey}.name`),
                        quantity: item.quantity,
                        price: item.priceXAF
                      })),
                      total,
                      customerName: methods.getValues("customer.fullName"),
                      customerPhone: methods.getValues("customer.phone"),
                      city: methods.getValues("delivery.city"),
                      region: methods.getValues("delivery.region"),
                      address: methods.getValues("delivery.address"),
                      locale
                    });
                    window.open(url, "_blank", "noreferrer");
                  }}
                />
              )}
              {status === "whatsapp" && (
                <WhatsAppRedirect onReturn={() => router.push(`/${locale}`)} />
              )}
              {status === "idle" && (
                <>
                  {step === 1 && (
                    <CustomerInfoStep onNext={goToDelivery} isSubmitting={isSubmitting} />
                  )}
                  {step === 2 && (
                    <DeliveryStep
                      onNext={goToPayment}
                      onBack={() => setStep(1)}
                      isSubmitting={isSubmitting}
                    />
                  )}
                  {step === 3 && (
                    <PaymentStep
                      onBack={() => setStep(2)}
                      onPay={handlePay}
                      isProcessing={status === "processing"}
                      payLabel={payLabel}
                    />
                  )}
                </>
              )}
            </div>
          }
          summary={<OrderSummary deliveryFee={deliveryFee} />}
        />
      </FormProvider>
    </div>
  );
}
