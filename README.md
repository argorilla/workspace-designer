# Workspace Designer

A workspace rental configurator created for the Desent coding challenge, using illustrative products and pricing inspired by the monis.rent use case.

**Live demo:** [workspace-designer-murex.vercel.app](https://workspace-designer-murex.vercel.app/)

## Approach

The experience starts with an empty workspace. Users choose one of two desks, one of three chairs, and optional accessories while the preview, item summary, and estimated monthly total update immediately. Monitor quantity is limited by the selected desk: the Oakline Desk supports up to two monitors, while the Studio Desk supports one; switching from Oakline with two monitors to Studio automatically reduces the quantity to one. Once a setup is complete, users can review it and step through an accessible confirmation, loading, and thank-you flow that simulates checkout without creating a real order.

## Tech choices

Next.js App Router provides a simple page structure while keeping interactive state inside focused Client Components. TypeScript keeps catalog data, configuration transitions, and derived totals consistent. Tailwind CSS handles the responsive layout and visual system without an additional component library. The workspace illustration is built in code with HTML and CSS, avoiding external image assets and making each selected item easy to reflect in the live preview.

## With more time

- Connect the experience to a validated monis.rent catalog and real-time product availability.
- Support actual rental prices, currencies, durations, delivery rules, and taxes.
- Add a secure, tested checkout backed by order and payment services, including authentication, idempotency, and operational monitoring.

## Run locally

Requires Node.js 24 and pnpm 11.5.2.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional project checks:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Demo note

The products, names, and prices in this project are illustrative. This is not an official monis.rent catalog or integration. Checkout is an in-browser simulation: no payment, personal data, network request, or real rental order is processed.
