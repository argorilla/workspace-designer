import type { CatalogItem, WorkspaceConfiguration } from "./types";

export function updateConfiguration(
  current: WorkspaceConfiguration,
  item: CatalogItem,
  selected: boolean,
): WorkspaceConfiguration {
  if (item.category === "desk") {
    return { ...current, deskId: item.id };
  }

  if (item.category === "chair") {
    return { ...current, chairId: item.id };
  }

  const accessoryIds = selected
    ? [...current.accessoryIds, item.id]
    : current.accessoryIds.filter((id) => id !== item.id);

  return { ...current, accessoryIds: [...new Set(accessoryIds)] };
}
