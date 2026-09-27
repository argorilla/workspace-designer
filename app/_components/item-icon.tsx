import type { CatalogItemKind } from "../_lib/types";

export function ItemIcon({ kind, color }: { kind: CatalogItemKind; color: string }) {
  if (kind === "desk") return <svg viewBox="0 0 80 60" aria-hidden="true" className="h-full w-full"><rect x="10" y="18" width="60" height="9" rx="3" fill={color} /><path d="M17 27v24M63 27v24" stroke="#303A38" strokeWidth="5" strokeLinecap="round" /></svg>;
  if (kind === "chair") return <svg viewBox="0 0 80 60" aria-hidden="true" className="h-full w-full"><rect x="24" y="8" width="31" height="29" rx="9" fill={color} /><rect x="20" y="34" width="39" height="9" rx="4" fill={color} /><path d="M39 43v9M28 53h24" stroke="#303A38" strokeWidth="4" strokeLinecap="round" /></svg>;
  if (kind === "monitor") return <svg viewBox="0 0 80 60" aria-hidden="true" className="h-full w-full"><rect x="13" y="8" width="54" height="35" rx="4" fill={color} /><rect x="18" y="13" width="44" height="25" rx="2" fill="#DDE8E4" /><path d="M40 43v8M29 52h22" stroke={color} strokeWidth="4" strokeLinecap="round" /></svg>;
  if (kind === "lamp") return <svg viewBox="0 0 80 60" aria-hidden="true" className="h-full w-full"><path d="M25 51h31M40 49V29l12-14" stroke="#303A38" strokeWidth="4" strokeLinecap="round" /><path d="M48 11h17l-3 14H50z" fill={color} /><circle cx="58" cy="28" r="4" fill="#F7D88B" /></svg>;
  return <svg viewBox="0 0 80 60" aria-hidden="true" className="h-full w-full"><path d="M40 36C25 33 20 22 23 10c11 1 18 8 17 26Z" fill={color} /><path d="M40 36c15-3 20-14 17-26-11 1-18 8-17 26Z" fill="#7A9C70" /><path d="M40 22v18" stroke="#47664D" strokeWidth="3" /><path d="M27 39h26l-4 16H31z" fill="#C47D56" /></svg>;
}
