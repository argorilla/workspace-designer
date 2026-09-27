import type { RefObject } from "react";
import type { CatalogItem } from "../_lib/types";
import { ItemIcon } from "./item-icon";
import { WorkspacePreview } from "./workspace-preview";

type WorkspaceReviewProps = {
  desk: CatalogItem;
  chair: CatalogItem;
  accessories: CatalogItem[];
  selectedItems: CatalogItem[];
  monthlyTotal: number;
  headingRef: RefObject<HTMLHeadingElement | null>;
  onBack: () => void;
};

function ReviewItem({ item }: { item: CatalogItem }) {
  return (
    <li className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
      <span className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-[#f1f0eb] p-2">
        <ItemIcon kind={item.kind} color={item.color} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-slate-900">
          {item.name}
        </span>
        <span className="mt-1 block text-xs text-slate-500">
          {item.description}
        </span>
      </span>
      <span className="shrink-0 text-sm font-bold text-emerald-800">
        ${item.monthlyPrice}/mo
      </span>
    </li>
  );
}

export function WorkspaceReview({
  desk,
  chair,
  accessories,
  selectedItems,
  monthlyTotal,
  headingRef,
  onBack,
}: WorkspaceReviewProps) {
  return (
    <section aria-labelledby="review-heading">
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
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-700 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
        >
          Back to designer
        </button>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] xl:gap-12">
        <WorkspacePreview desk={desk} chair={chair} accessories={accessories} />

        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-start justify-between gap-5 border-b border-slate-100 pb-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
                Selected items
              </p>
              <h3 className="mt-1 text-xl font-semibold text-slate-950">
                Monthly rental estimate
              </h3>
            </div>
            <div className="text-right">
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
              {accessories.length > 0 ? (
                <ul className="space-y-3">
                  {accessories.map((item) => (
                    <ReviewItem key={item.id} item={item} />
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
            Prices are estimated monthly rental rates. Final pricing may vary
            based on availability and delivery location.
          </div>
        </div>
      </div>
    </section>
  );
}
