import type { CatalogCategory, CatalogItem } from "../_lib/types";
import { ItemIcon } from "./item-icon";

const categoryLabels: Record<CatalogCategory, string> = {
  desk: "Desk",
  chair: "Chair",
  accessory: "Finishing touches",
};

type CatalogSectionProps = {
  category: CatalogCategory;
  items: CatalogItem[];
  selectedIds: string[];
  onSelectionChange: (item: CatalogItem, selected: boolean) => void;
};

export function CatalogSection({
  category,
  items,
  selectedIds,
  onSelectionChange,
}: CatalogSectionProps) {
  const isSingleChoice = category !== "accessory";

  return (
    <fieldset aria-labelledby={`${category}-heading`}>
      <legend className="sr-only">{categoryLabels[category]}</legend>
      <div className="mb-3 flex items-baseline justify-between">
        <h2
          id={`${category}-heading`}
          className="text-base font-semibold text-slate-900"
        >
          {categoryLabels[category]}
        </h2>
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
          {isSingleChoice ? "Choose one" : "Add any"}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => {
          const isSelected = selectedIds.includes(item.id);

          return (
            <label
              key={item.id}
              className={`relative grid min-h-28 cursor-pointer grid-cols-[88px_1fr] items-center gap-3 rounded-2xl border p-3 outline-none transition duration-150 hover:border-emerald-600 hover:bg-emerald-50/40 focus-within:ring-2 focus-within:ring-emerald-700 focus-within:ring-offset-2 ${
                isSelected
                  ? "border-emerald-700 bg-emerald-50/60 ring-1 ring-emerald-700"
                  : "border-slate-200 bg-white"
              }`}
            >
              <input
                className="sr-only"
                type={isSingleChoice ? "radio" : "checkbox"}
                name={isSingleChoice ? category : item.id}
                value={item.id}
                checked={isSelected}
                onChange={(event) => onSelectionChange(item, event.target.checked)}
              />

              <span
                className={`absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  isSelected
                    ? "bg-emerald-800 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
                aria-hidden="true"
              >
                {isSelected ? "Selected" : isSingleChoice ? "Select" : "Add"}
              </span>

              <span className="flex h-20 items-center justify-center rounded-xl bg-[#f1f0eb] p-2">
                <ItemIcon kind={item.kind} color={item.color} />
              </span>
              <span className="min-w-0 pr-1">
                <span className="block pr-12 text-sm font-semibold leading-5 text-slate-900">
                  {item.name}
                </span>
                <span className="mt-1 block text-xs leading-4 text-slate-500">
                  {item.description}
                </span>
                <span className="mt-2 block text-sm font-bold text-emerald-800">
                  ${item.monthlyPrice}/mo
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
