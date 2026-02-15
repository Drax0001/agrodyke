import { z } from "zod";

export const customerInfoSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z
    .string()
    .regex(/^(\+?237)?[26]\d{7,8}$/, "Please enter a valid Cameroon phone number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  preferredLanguage: z.enum(["fr", "en"])
});

export const deliveryInfoSchema = z.object({
  region: z.string().min(1, "Please select a region"),
  city: z.string().min(2, "Please enter your city"),
  neighborhood: z.string().min(2, "Please enter your neighborhood"),
  address: z.string().min(5, "Please provide a delivery address"),
  notes: z.string().optional(),
  method: z.enum(["delivery", "pickup"])
});

export const paymentSchema = z
  .object({
    method: z.enum(["mtn", "orange", "whatsapp"]),
    phoneToDebit: z
      .string()
      .regex(/^(\+?237)?[26]\d{7,8}$/, "Invalid phone number")
      .optional()
  })
  .refine(
    (data) => {
      if (data.method === "mtn" || data.method === "orange") {
        return !!data.phoneToDebit;
      }
      return true;
    },
    { message: "Phone number is required for mobile money payment", path: ["phoneToDebit"] }
  );

export const checkoutSchema = z.object({
  customer: customerInfoSchema,
  delivery: deliveryInfoSchema,
  payment: paymentSchema
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^(\+?237)?[26]\d{7,8}$/),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().min(10).max(2000),
  preferredLanguage: z.enum(["fr", "en"])
});
