import type { RefObject } from "react";
import type { CatalogItem, MonitorQuantity } from "../_lib/types";
import { ItemIcon } from "./item-icon";
import { WorkspacePreview } from "./workspace-preview";

type WorkspaceReviewProps = {
  desk: CatalogItem;
  chair: CatalogItem;
  accessories: CatalogItem[];
  monitor: CatalogItem;
  monitorQuantity: MonitorQuantity;
  selectedItems: CatalogItem[];
  monthlyTotal: number;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onBack: () => void;
  onRent: () => void;
};

function ReviewItem({
  item,
  quantity = 1,
}: {
  item: CatalogItem;
  quantity?: number;
}) {
  return (
    <li className="grid min-w-0 grid-cols-[56px_minmax(0,1fr)] items-center gap-x-3 gap-y-1 rounded-2xl border border-slate-200 bg-white p-3 sm:grid-cols-[64px_minmax(0,1fr)] sm:gap-x-4 sm:p-4">
      <span className="row-span-2 flex size-14 items-center justify-center rounded-xl bg-[#f1f0eb] p-2 sm:size-16">
        <ItemIcon kind={item.kind} color={item.color} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-slate-900">
          {item.name}{item.kind === "monitor" ? ` × ${quantity}` : ""}
        </span>
        <span className="mt-1 block text-xs text-slate-500">
          {item.description}
        </span>
      </span>
      <span className="col-start-2 text-sm font-bold text-emerald-800">
        {item.kind === "monitor"
          ? `$${item.monthlyPrice} per unit · $${item.monthlyPrice * quantity}/mo`
          : `$${item.monthlyPrice}/mo`}
      </span>
    </li>
  );
}

export function WorkspaceReview({
  desk,
  chair,
  accessories,
  monitor,
  monitorQuantity,
  selectedItems,
  monthlyTotal,
  headingRef,
  onBack,
  onRent,
}: WorkspaceReviewProps) {
  const reviewAccessories = [
    ...(monitorQuantity > 0 ? [monitor] : []),
    ...accessories,
  ];
  return (
    <section aria-labelledby="review-heading" className="min-w-0">
      <div className="mb-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">
            Setup review
          </p>
          <h2
            id="review-heading"
            ref={headingRef}
            tabIndex={-1}
            className="text-3xl font-semibold tracking-[-0.035em] text-slate-950 outline-none sm:text-4xl"
          >
            Review your workspace
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Check your selected furniture and estimated monthly rental before
            returning to make any changes.
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition cursor-pointer hover:border-emerald-700 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
        >
          Back to designer
        </button>
      </div>

      <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] xl:gap-12">
        <div className="review-sticky-preview min-w-0">
          <WorkspacePreview
            desk={desk}
            chair={chair}
            accessories={accessories}
            monitorQuantity={monitorQuantity}
          />
        </div>

        <div className="min-w-0 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col items-start gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:justify-between sm:gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
                Selected items
              </p>
              <h3 className="mt-1 text-xl font-semibold text-slate-950">
                Monthly rental estimate
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-3xl font-bold tracking-tight text-slate-950">
                ${monthlyTotal}
              </p>
              <p className="text-xs text-slate-500">estimated / month</p>
            </div>
          </div>

          <div className="mt-5 space-y-6">
            <section aria-labelledby="furniture-heading">
              <h4
                id="furniture-heading"
                className="mb-3 text-sm font-semibold text-slate-700"
              >
                Desk &amp; chair
              </h4>
              <ul className="space-y-3">
                {selectedItems
                  .filter((item) => item.category !== "accessory")
                  .map((item) => (
                    <ReviewItem key={item.id} item={item} />
                  ))}
              </ul>
            </section>

            <section aria-labelledby="accessories-heading">
              <h4
                id="accessories-heading"
                className="mb-3 text-sm font-semibold text-slate-700"
              >
                Accessories
              </h4>
              {reviewAccessories.length > 0 ? (
                <ul className="space-y-3">
                  {reviewAccessories.map((item) => (
                    <ReviewItem
                      key={item.id}
                      item={item}
                      quantity={
                        item.kind === "monitor" ? monitorQuantity : 1
                      }
                    />
                  ))}
                </ul>
              ) : (
                <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-600">
                  No accessories selected.
                </p>
              )}
            </section>
          </div>

          <div className="mt-6 rounded-2xl bg-emerald-50 px-4 py-4 text-sm leading-6 text-emerald-950">
            This coding-challenge demo uses illustrative products and prices.
            It is not the official monis.rent catalog or a final rental offer.
            Availability, final pricing, rental duration, and delivery must be
            confirmed directly with monis.rent.
          </div>
          <button
            type="button"
            onClick={onRent}
            className="mt-4 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-emerald-900 px-5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
          >
            Rent this setup
          </button>
          <p className="mt-3 text-center text-xs leading-5 text-slate-500">
            Continues to an in-app demo confirmation. No payment or real order
            will be submitted.
          </p>
        </div>
      </div>
    </section>
  );
}
