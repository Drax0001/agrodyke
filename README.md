# AGRODYKE — Bilingual Landing + Checkout (Next.js 16)

This repository implements the AGRODYKE 6‑in‑1 organic fertilizer landing page and checkout for the CEMAC region, aligned to the SRS/SDD. It is a bilingual (FR/EN) Next.js 16 App Router project with a content‑rich landing page and a multi‑step checkout flow (CamPay + WhatsApp).

## Status Summary (What’s Done)

### Phase 1 — Landing Core + Foundations
- i18n routing (`/fr`, `/en`), locale metadata, and root redirect to `/fr`.
- Shared UI primitives: container, section heading, image placeholders.
- Landing page fully componentized:
  - Sticky header with language toggle, active section highlight, and mobile menu drawer.
  - Hero (full‑height, overlay, CTAs, badge, scroll indicator).
  - 6‑in‑1 value strip with animations.
  - Product overview with SRS copy + highlights.
  - Benefits grid (12 cards).
  - How‑it‑works steps + herbicide disclaimer.
  - Crop guide tabs/accordion shell (placeholders for PDF‑derived details).
  - Composition table with “Safe” badges.
  - Advantages with count‑up stats + before/after placeholder.
  - Testimonials grid placeholders.
  - Pricing cards connected to cart + WhatsApp CTA.
  - About, Contact, FAQ, Footer, and floating WhatsApp button.
- All text moved into translation files.
- Placeholder blocks for all images (assets will be swapped later).

### Phase 2 — Checkout Flow Expansion
- Multi‑step checkout with `react-hook-form` + `zod`.
- Progress indicator and step components (Customer, Delivery, Payment).
- Delivery fee rules by region (configurable).
- Order summary shows unit price, line total, delivery fee, total.
- Remove confirmation + optional promo code input.
- Payment method cards and trust signals.
- WhatsApp order flow wired for chat‑based orders.

### Phase 3 — Payments + Contact API
- CamPay client (`lib/campay.ts`).
- Payment API routes:
  - `POST /api/payment/initiate`
  - `GET /api/payment/status`
  - `POST /api/payment/webhook`
- Contact API route: `POST /api/contact`
- Rate limiting utility for payment + contact routes.
- Checkout payment polling, processing state, success/error states.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript 5
- Tailwind CSS v4 (`@theme` in `globals.css`)
- `next-intl` for i18n
- Zustand for cart
- Framer Motion for animations
- React Hook Form + Zod for validation
- CamPay API integration (server routes)

## Project Structure

```
src/
  app/
    [locale]/
      page.tsx
      checkout/page.tsx
    api/
      contact/route.ts
      payment/
        initiate/route.ts
        status/route.ts
        webhook/route.ts
    globals.css
    layout.tsx
    page.tsx
  components/
    landing/
      Header.tsx Hero.tsx SixInOne.tsx ProductOverview.tsx Benefits.tsx
      HowItWorks.tsx CropGuide.tsx Composition.tsx Advantages.tsx
      Testimonials.tsx Pricing.tsx About.tsx Contact.tsx FAQ.tsx Footer.tsx
      WhatsAppFloat.tsx
    checkout/
      CheckoutLayout.tsx ProgressIndicator.tsx CustomerInfoStep.tsx
      DeliveryStep.tsx PaymentStep.tsx OrderSummary.tsx PaymentProcessing.tsx
      OrderConfirmation.tsx PaymentError.tsx WhatsAppRedirect.tsx
    shared/
      Container.tsx SectionHeading.tsx Logo.tsx
    ui/
      ImagePlaceholder.tsx LanguageToggle.tsx Accordion.tsx Tabs.tsx
  i18n/
    routing.ts
    request.ts
  lib/
    animations.ts campay.ts constants.ts rateLimit.ts utils.ts validations.ts whatsapp.ts
  messages/
    en.json
    fr.json
  store/
    cart.ts
```

## Setup

Install dependencies (pnpm recommended):
```bash
pnpm install
```

Run the dev server:
```bash
pnpm dev
```

## Environment Variables

Create `.env.local` with:
```env
CAMPAY_API_KEY=your_campay_api_key
CAMPAY_API_SECRET=your_campay_api_secret
CAMPAY_ENV=sandbox   # or production

RESEND_API_KEY=re_xxxxxxxxxxxx
NOTIFICATION_EMAIL=globalbusinessincorp@yahoo.com
```

## Notes

- Tailwind v4+ does not use `tailwind.config.ts`; tokens are defined in `src/app/globals.css`.
- Images are placeholders for now. Replace `ImagePlaceholder` blocks with `next/image` once assets are provided.

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```
