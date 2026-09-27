import type { RefObject } from "react";
import type { CatalogItem, MonitorQuantity } from "../_lib/types";

type ConfirmationProps = {
  selectedItems: CatalogItem[];
  monitorQuantity: MonitorQuantity;
  monthlyTotal: number;
  headingRef: RefObject<HTMLHeadingElement | null>;
  isLoading: boolean;
  onBack: () => void;
  onConfirm: () => void;
};

export function CheckoutConfirmation({
  selectedItems,
  monitorQuantity,
  monthlyTotal,
  headingRef,
  isLoading,
  onBack,
  onConfirm,
}: ConfirmationProps) {
  return (
    <section
      aria-labelledby="confirmation-heading"
      className="mx-auto max-w-3xl"
    >
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
        Demo checkout
      </p>
      <h2
        id="confirmation-heading"
        ref={headingRef}
        tabIndex={-1}
        className="text-3xl font-semibold tracking-[-0.035em] text-slate-950 outline-none sm:text-4xl"
      >
        Confirm your demo rental
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        Review this final summary before completing the simulated rental flow.
      </p>

      <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <ul className="space-y-3" aria-label="Demo rental configuration">
          {selectedItems.map((item) => {
            const quantity = item.kind === "monitor" ? monitorQuantity : 1;
            return (
              <li
                key={item.id}
                className="flex min-w-0 items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0"
              >
                <span className="min-w-0">
                  <span className="block font-medium text-slate-900">
                    {item.name}
                    {item.kind === "monitor" ? ` × ${quantity}` : ""}
                  </span>
                  {item.kind === "monitor" && (
                    <span className="mt-0.5 block text-xs text-slate-500">
                      ${item.monthlyPrice} per unit
                    </span>
                  )}
                </span>
                <span className="shrink-0 font-semibold text-slate-900">
                  ${item.monthlyPrice * quantity}/mo
                </span>
              </li>
            );
          })}
        </ul>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-slate-200 pt-5">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Estimated monthly total
            </p>
            <p className="text-xs text-slate-500">Illustrative demo pricing</p>
          </div>
          <p className="text-3xl font-bold tracking-tight text-slate-950">
            ${monthlyTotal}
          </p>
        </div>

        <div className="mt-6 rounded-2xl bg-amber-50 px-4 py-4 text-sm leading-6 text-amber-950">
          This is a coding-challenge simulation. No payment is collected and no
          real order or rental request is sent to monis.rent. Products and
          prices are illustrative, not an official catalog or final offer.
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:border-emerald-700 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Back to review
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-xl bg-emerald-900 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-emerald-900/60"
          >
            {isLoading ? "Completing demo rental…" : "Confirm demo rental"}
          </button>
        </div>
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={isLoading ? "mt-4 text-center text-sm text-slate-600" : "sr-only"}
        >
          {isLoading ? "Completing the demo rental. No real order is being sent." : ""}
        </p>
      </div>
    </section>
  );
}

type ThankYouProps = {
  headingRef: RefObject<HTMLHeadingElement | null>;
  onBackToDesigner: () => void;
};

export function CheckoutThankYou({
  headingRef,
  onBackToDesigner,
}: ThankYouProps) {
  return (
    <section
      aria-labelledby="thank-you-heading"
      className="mx-auto max-w-2xl rounded-[2rem] border border-emerald-200 bg-white px-5 py-10 text-center shadow-sm sm:px-10 sm:py-14"
    >
      <span
        className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-900"
        aria-hidden="true"
      >
        ✓
      </span>
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
        Demo rental request completed
      </p>
      <h2
        id="thank-you-heading"
        ref={headingRef}
        tabIndex={-1}
        className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-slate-950 outline-none sm:text-4xl"
      >
        Your workspace is ready to take shape
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
        Thanks for trying the workspace designer. This completed only an
        in-app simulation: no payment was taken and no real order or request
        was processed by monis.rent.
      </p>
      <button
        type="button"
        onClick={onBackToDesigner}
        className="mt-8 inline-flex min-h-12 cursor-pointer items-center justify-center rounded-xl bg-emerald-900 px-6 text-sm font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
      >
        Back to designer
      </button>
    </section>
  );
}
