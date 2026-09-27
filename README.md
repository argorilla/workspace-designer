# Workspace Designer

Workspace Designer is a coding challenge implementation for a monis.rent workspace rental configurator. Users can assemble a workspace, see a live preview and monthly estimate, and complete an in-app rental simulation.

> **Live URL:** Not available yet — add the deployment URL here after it has been successfully verified.

## Features

- An empty initial configuration with a `$0` estimated total.
- Two desks: the Oakline Desk supports up to two monitors, while the Studio Desk supports one.
- Three chairs with distinct preview designs: Flow Task Chair, Soft Work Chair, and Gaming Chair.
- A Focus Monitor quantity control from `0–2`, constrained by the selected desk's capacity.
- A lamp and plant that can be enabled independently.
- A reactive workspace preview built entirely with HTML and CSS.
- A selected-item summary and estimated monthly rental total derived from the active configuration.
- Review, confirmation, loading, and thank-you views that form an in-app rental simulation.
- Selections remain intact when returning from review or confirmation. After the simulation is confirmed, the active configuration resets for a new setup while the thank-you view uses a snapshot of the completed configuration.

## Stack and technical decisions

- **Next.js 16 App Router** provides a clear route structure and separates the page's Server Component from the Client Components that require state and event handlers.
- **TypeScript** keeps the catalog model, product IDs, nullable configuration, and calculation results consistent as selections change.
- **Tailwind CSS 4** handles the responsive layout and component styling without an additional UI dependency.
- **Code-based illustrations** keep the preview lightweight, responsive, and easy to connect to application state. Each desk and chair has a distinct shape, while monitor, lamp, and plant positions are designed to keep accessory combinations legible.

No additional state-management or UI-component dependency is needed. Local component state is sufficient for the scope of this demo.

## Running locally

Prerequisites:

- Node.js 24
- pnpm 11.5.2 (also pinned through the `packageManager` field)

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Run the project's quality checks with:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

To run the production build locally:

```bash
pnpm start
```

## Configuration model and calculations

The catalog, types, and configuration functions are separated from the presentation components:

- `app/_lib/catalog.ts` stores the catalog items and their estimated prices.
- `app/_lib/types.ts` defines the item and configuration types. `deskId` and `chairId` can be empty (`null`), so the initial state does not require placeholder IDs.
- `app/_lib/configuration.ts` handles configuration transitions, selected-item resolution, subtotals, and the monthly total.
- `app/_components/workspace-configurator.tsx` owns the UI state and coordinates the designer, review, confirmation, loading, and thank-you views.

The total is not stored as separate state. The selected-item list, monitor subtotal, and total are always calculated from the catalog and current configuration, giving the summary and every simulated checkout step a single calculation source.

Monitor selection is stored as a quantity rather than duplicated accessory IDs. A monitor cannot be added until a desk is selected. The Oakline Desk supports up to two monitors; the Studio Desk supports one. When an Oakline configuration with two monitors is changed to Studio, the transition function automatically reduces the quantity to one and the UI announces why it changed.

## UX and accessibility decisions

On desktop, the catalog is displayed on the left and the preview and summary on the right. The right panel becomes sticky only when the viewport is wide and tall enough, keeping all content reachable on shorter desktop screens. The review preview follows the same pattern. Sticky elements stop at the section boundary, while mobile uses a normal single-column document flow.

Selection controls use native radio inputs, checkboxes, and buttons so they work with keyboards and are recognized by screen readers. Selection status is communicated visually and semantically; quantity buttons have accessible labels and clear disabled states. Focus moves to the appropriate heading when views change so users do not lose context. On mobile, cards and actions wrap flexibly without relying on fixed widths.

## Demo limitations

All products, product names, and prices in this application are illustrative and were created for the coding challenge. This is not an official monis.rent catalog or integration, and the displayed estimates are not final offers.

The rental flow is entirely simulated in the browser. There is no payment, backend, personal-data submission, email, order request, or real order processing. The configuration is also not persisted after the page is reloaded.

## Trade-offs and possible next steps

- CSS-based illustrations are fast and lightweight, but they do not replace real product assets or a properly scaled room visualization.
- A static catalog is appropriate for this challenge, but a production product would require validated product data, availability, currency, tax, rental-duration, and delivery rules.
- In-memory state keeps the demo simple, but persistence should only be added after privacy and session-recovery requirements have been established.
- Current validation focuses on linting, type checking, and the production build. Realistic next steps include unit tests for transition and calculation functions, integration tests for the configuration flow, and end-to-end tests covering keyboard use and primary breakpoints.
- A real checkout would require authentication, a secure backend, idempotency, observability, and payment and order integrations approved by monis.rent.

## Deploying to Vercel with GitHub Actions

The [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) workflow runs on pushes to `main` or manually through `workflow_dispatch`. It installs dependencies from the lockfile, runs linting and type checking, then builds and deploys the production artifact with the Vercel CLI.

Add these three **Actions secrets** in GitHub under **Settings → Secrets and variables → Actions**:

| Secret | Value |
| --- | --- |
| `VERCEL_TOKEN` | A Vercel access token created by the account or team owner. |
| `VERCEL_ORG_ID` | The ID of the Vercel account or team that owns the project. |
| `VERCEL_PROJECT_ID` | The ID of the target Vercel project. |

To connect the project:

1. Create an empty Vercel project or select an existing project.
2. From the local repository, run `pnpm dlx vercel@latest link` and select the relevant account/team and project. This creates `.vercel/project.json`, where the `orgId` and `projectId` can be found.
3. Copy both IDs into the GitHub Actions secrets, create a `VERCEL_TOKEN` in the Vercel account settings, and save it as the third secret.
4. Ensure that Vercel's built-in Git integration does not also deploy the same push. If the repository was previously imported with automatic deployment enabled, disable or disconnect that Git deployment so this workflow is the only production deployment path.
5. Run the workflow manually for the first deployment and verify the result before replacing the Live URL placeholder above.

The workflow runs the following deployment sequence:

```bash
vercel pull --yes --environment=production
vercel build --prod
vercel deploy --prebuilt --prod
```

The `.vercel` directory and `.env*` files are ignored by Git and must not be committed. The workflow does not hardcode tokens, project IDs, or URLs. Production concurrency is enabled so closely timed runs do not overwrite each other.
