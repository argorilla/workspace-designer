import type {
  CatalogItem,
  MonitorQuantity,
  WorkspaceConfiguration,
} from "./types";

export function updateConfiguration(
  current: WorkspaceConfiguration,
  item: CatalogItem,
  selected: boolean,
): WorkspaceConfiguration {
  if (item.category === "desk") {
    const monitorLimit = item.maxMonitorQuantity ?? 1;
    return {
      ...current,
      deskId: item.id,
      monitorQuantity: Math.min(
        current.monitorQuantity,
        monitorLimit,
      ) as MonitorQuantity,
    };
  }

  if (item.category === "chair") {
    return { ...current, chairId: item.id };
  }

  const accessoryIds = selected
    ? [...current.accessoryIds, item.id]
    : current.accessoryIds.filter((id) => id !== item.id);

  return { ...current, accessoryIds: [...new Set(accessoryIds)] };
}

export function updateMonitorQuantity(
  current: WorkspaceConfiguration,
  quantity: number,
  monitorLimit: 0 | 1 | 2,
): WorkspaceConfiguration {
  return {
    ...current,
    monitorQuantity: Math.max(
      0,
      Math.min(quantity, monitorLimit),
    ) as MonitorQuantity,
  };
}
