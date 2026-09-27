"use client";

import { useEffect, useRef, useState } from "react";
import { catalog, defaultConfiguration } from "../_lib/catalog";
import {
  updateConfiguration,
  updateMonitorQuantity,
} from "../_lib/configuration";
import type { CatalogItem, WorkspaceConfiguration } from "../_lib/types";
import { CatalogSection } from "./catalog-section";
import { CheckoutConfirmation, CheckoutThankYou } from "./checkout-views";
import { WorkspacePreview } from "./workspace-preview";
import { WorkspaceReview } from "./workspace-review";

const categories = ["desk", "chair", "accessory"] as const;
type ConfiguratorView = "designer" | "review" | "confirmation" | "thank-you";

export function WorkspaceConfigurator() {
  const [configuration, setConfiguration] = useState<WorkspaceConfiguration>(
    defaultConfiguration,
  );
  const [view, setView] = useState<ConfiguratorView>("designer");
  const [isConfirming, setIsConfirming] = useState(false);
  const [configurationMessage, setConfigurationMessage] = useState("");
  const reviewHeadingRef = useRef<HTMLHeadingElement>(null);
  const confirmationHeadingRef = useRef<HTMLHeadingElement>(null);
  const thankYouHeadingRef = useRef<HTMLHeadingElement>(null);
  const reviewButtonRef = useRef<HTMLButtonElement>(null);
  const confirmationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const hasChangedView = useRef(false);

  const selectedIds = [
    configuration.deskId,
    configuration.chairId,
    ...configuration.accessoryIds,
  ];
  const monitor = catalog.find((item) => item.kind === "monitor")!;
  const selectedItems = catalog.filter(
    (item) =>
      selectedIds.includes(item.id) ||
      (item.kind === "monitor" && configuration.monitorQuantity > 0),
  );
  const desk = catalog.find((item) => item.id === configuration.deskId)!;
  const chair = catalog.find((item) => item.id === configuration.chairId)!;
  const monitorLimit = desk.maxMonitorQuantity ?? 1;
  const accessories = catalog.filter((item) =>
    configuration.accessoryIds.includes(item.id),
  );
  const monthlyTotal = selectedItems.reduce(
    (total, item) =>
      total +
      item.monthlyPrice *
        (item.kind === "monitor" ? configuration.monitorQuantity : 1),
    0,
  );

  useEffect(() => {
    if (!hasChangedView.current) {
      return;
    }

    if (view === "review") {
      reviewHeadingRef.current?.focus();
    } else if (view === "confirmation") {
      confirmationHeadingRef.current?.focus();
    } else if (view === "thank-you") {
      thankYouHeadingRef.current?.focus();
    } else {
      reviewButtonRef.current?.focus();
    }
  }, [view]);

  useEffect(() => {
    return () => {
      if (confirmationTimerRef.current) {
        clearTimeout(confirmationTimerRef.current);
      }
    };
  }, []);

  function changeView(nextView: ConfiguratorView) {
    hasChangedView.current = true;
    setView(nextView);
  }

  function handleDemoConfirmation() {
    if (isConfirming) {
      return;
    }

    setIsConfirming(true);
    confirmationTimerRef.current = setTimeout(() => {
      confirmationTimerRef.current = null;
      setIsConfirming(false);
      changeView("thank-you");
    }, 900);
  }

  function handleSelectionChange(item: CatalogItem, selected: boolean) {
    if (
      item.category === "desk" &&
      configuration.monitorQuantity > (item.maxMonitorQuantity ?? 1)
    ) {
      setConfigurationMessage(
        `${item.name} supports one monitor, so the monitor quantity was reduced to 1.`,
      );
    } else {
      setConfigurationMessage("");
    }

    setConfiguration((current) =>
      updateConfiguration(current, item, selected),
    );
  }

  function handleMonitorQuantityChange(quantity: number) {
    setConfigurationMessage("");
    setConfiguration((current) =>
      updateMonitorQuantity(current, quantity, monitorLimit),
    );
  }

  if (view === "review") {
    return (
      <WorkspaceReview
        desk={desk}
        chair={chair}
        accessories={accessories}
        monitorQuantity={configuration.monitorQuantity}
        monitor={monitor}
        selectedItems={selectedItems}
        monthlyTotal={monthlyTotal}
        headingRef={reviewHeadingRef}
        onBack={() => changeView("designer")}
        onRent={() => changeView("confirmation")}
      />
    );
  }

  if (view === "confirmation") {
    return (
      <CheckoutConfirmation
        selectedItems={selectedItems}
        monitorQuantity={configuration.monitorQuantity}
        monthlyTotal={monthlyTotal}
        headingRef={confirmationHeadingRef}
        isLoading={isConfirming}
        onBack={() => changeView("review")}
        onConfirm={handleDemoConfirmation}
      />
    );
  }

  if (view === "thank-you") {
    return (
      <CheckoutThankYou
        headingRef={thankYouHeadingRef}
        onBackToDesigner={() => changeView("designer")}
      />
    );
  }

  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)] xl:gap-14">
      <div className="order-2 min-w-0 space-y-8 lg:order-1">
        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className={
            configurationMessage
              ? "rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-5 text-amber-950"
              : "sr-only"
          }
        >
          {configurationMessage}
        </p>
        {categories.map((category) => (
          <CatalogSection
            key={category}
            category={category}
            items={catalog.filter((item) => item.category === category)}
            selectedIds={selectedIds}
            monitorQuantity={configuration.monitorQuantity}
            monitorLimit={monitorLimit}
            onSelectionChange={handleSelectionChange}
            onMonitorQuantityChange={handleMonitorQuantityChange}
          />
        ))}
        <p className="text-xs leading-5 text-slate-500">
          Prices shown are estimated monthly rental rates and may vary by
          availability and delivery location.
        </p>
      </div>

      <aside
        className="designer-sticky-panel order-1 min-w-0 lg:order-2"
        aria-labelledby="preview-heading"
      >
        <h2 id="preview-heading" className="sr-only">
          Your workspace preview
        </h2>
        <WorkspacePreview
          desk={desk}
          chair={chair}
          accessories={accessories}
          monitorQuantity={configuration.monitorQuantity}
        />
        <div className="mx-2 -mt-3 rounded-b-[1.5rem] border border-t-0 border-slate-200 bg-white px-5 pb-5 pt-7 shadow-sm sm:px-6">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between sm:gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
                Current selection
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">
                Your monthly workspace
              </h2>
            </div>
            <div
              className="text-left sm:text-right"
              aria-live="polite"
              aria-atomic="true"
            >
              <p className="text-2xl font-bold tracking-tight">${monthlyTotal}</p>
              <p className="text-xs text-slate-500">estimated / month</p>
            </div>
          </div>
          <ul
            className="mt-5 grid grid-cols-1 gap-x-5 gap-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600 sm:grid-cols-2"
            aria-label="Selected workspace items"
          >
            {selectedItems.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <span className="min-w-0">
                  <span className="block truncate">
                    {item.name}
                    {item.kind === "monitor"
                      ? ` × ${configuration.monitorQuantity}`
                      : ""}
                  </span>
                  {item.kind === "monitor" && (
                    <span className="block text-xs text-slate-400">
                      ${item.monthlyPrice} per unit
                    </span>
                  )}
                </span>
                <span className="shrink-0 font-medium text-slate-900">
                  $
                  {item.monthlyPrice *
                    (item.kind === "monitor"
                      ? configuration.monitorQuantity
                      : 1)}
                </span>
              </li>
            ))}
          </ul>
          <button
            ref={reviewButtonRef}
            type="button"
            onClick={() => changeView("review")}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl cursor-pointer bg-emerald-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
          >
            Review your setup
          </button>
        </div>
      </aside>
    </div>
  );
}
