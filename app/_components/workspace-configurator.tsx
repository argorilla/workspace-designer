"use client";

import { useEffect, useRef, useState } from "react";
import { catalog, defaultConfiguration } from "../_lib/catalog";
import { updateConfiguration } from "../_lib/configuration";
import type { WorkspaceConfiguration } from "../_lib/types";
import { CatalogSection } from "./catalog-section";
import { WorkspacePreview } from "./workspace-preview";
import { WorkspaceReview } from "./workspace-review";

const categories = ["desk", "chair", "accessory"] as const;

export function WorkspaceConfigurator() {
  const [configuration, setConfiguration] = useState<WorkspaceConfiguration>(
    defaultConfiguration,
  );
  const [view, setView] = useState<"designer" | "review">("designer");
  const reviewHeadingRef = useRef<HTMLHeadingElement>(null);
  const reviewButtonRef = useRef<HTMLButtonElement>(null);
  const hasChangedView = useRef(false);

  const selectedIds = [
    configuration.deskId,
    configuration.chairId,
    ...configuration.accessoryIds,
  ];
  const selectedItems = catalog.filter((item) => selectedIds.includes(item.id));
  const desk = catalog.find((item) => item.id === configuration.deskId)!;
  const chair = catalog.find((item) => item.id === configuration.chairId)!;
  const accessories = catalog.filter((item) =>
    configuration.accessoryIds.includes(item.id),
  );
  const monthlyTotal = selectedItems.reduce(
    (total, item) => total + item.monthlyPrice,
    0,
  );

  useEffect(() => {
    if (!hasChangedView.current) {
      return;
    }

    if (view === "review") {
      reviewHeadingRef.current?.focus();
    } else {
      reviewButtonRef.current?.focus();
    }
  }, [view]);

  function changeView(nextView: "designer" | "review") {
    hasChangedView.current = true;
    setView(nextView);
  }

  if (view === "review") {
    return (
      <WorkspaceReview
        desk={desk}
        chair={chair}
        accessories={accessories}
        selectedItems={selectedItems}
        monthlyTotal={monthlyTotal}
        headingRef={reviewHeadingRef}
        onBack={() => changeView("designer")}
      />
    );
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] xl:gap-14">
      <div className="order-2 space-y-8 lg:order-1">
        {categories.map((category) => (
          <CatalogSection
            key={category}
            category={category}
            items={catalog.filter((item) => item.category === category)}
            selectedIds={selectedIds}
            onSelectionChange={(item, selected) =>
              setConfiguration((current) =>
                updateConfiguration(current, item, selected),
              )
            }
          />
        ))}
        <p className="text-xs leading-5 text-slate-500">
          Prices shown are estimated monthly rental rates and may vary by
          availability and delivery location.
        </p>
      </div>

      <aside
        className="order-1 lg:sticky lg:top-8 lg:order-2"
        aria-labelledby="preview-heading"
      >
        <h2 id="preview-heading" className="sr-only">
          Your workspace preview
        </h2>
        <WorkspacePreview desk={desk} chair={chair} accessories={accessories} />
        <div className="mx-2 -mt-3 rounded-b-[1.5rem] border border-t-0 border-slate-200 bg-white px-5 pb-5 pt-7 shadow-sm sm:px-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
                Current selection
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                Your monthly workspace
              </h2>
            </div>
            <div className="text-right" aria-live="polite" aria-atomic="true">
              <p className="text-2xl font-bold tracking-tight">${monthlyTotal}</p>
              <p className="text-xs text-slate-500">estimated / month</p>
            </div>
          </div>
          <ul
            className="mt-5 grid grid-cols-1 gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600 sm:grid-cols-2"
            aria-label="Selected workspace items"
          >
            {selectedItems.map((item) => (
              <li key={item.id} className="flex justify-between gap-2">
                <span className="truncate">{item.name}</span>
                <span className="font-medium text-slate-900">
                  ${item.monthlyPrice}
                </span>
              </li>
            ))}
          </ul>
          <button
            ref={reviewButtonRef}
            type="button"
            onClick={() => changeView("review")}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-emerald-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
          >
            Review your setup
          </button>
        </div>
      </aside>
    </div>
  );
}
