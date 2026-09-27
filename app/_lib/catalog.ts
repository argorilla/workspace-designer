import type { CatalogItem, WorkspaceConfiguration } from "./types";

export const catalog: CatalogItem[] = [
  { id: "desk-oak", name: "Oakline Desk", description: "Long oak top · fits up to 2 monitors", category: "desk", kind: "desk", monthlyPrice: 42, color: "#B97B4B", maxMonitorQuantity: 2 },
  { id: "desk-white", name: "Studio Desk", description: "Compact white top · fits 1 monitor", category: "desk", kind: "desk", monthlyPrice: 36, color: "#E7E4DD", maxMonitorQuantity: 1 },
  { id: "chair-task", name: "Flow Task Chair", description: "Breathable mesh · adjustable", category: "chair", kind: "chair", monthlyPrice: 28, color: "#243A37" },
  { id: "chair-soft", name: "Soft Work Chair", description: "Upholstered seat · sand", category: "chair", kind: "chair", monthlyPrice: 32, color: "#B1A28B" },
  { id: "chair-gaming", name: "Gaming Chair", description: "High-back support · racing style", category: "chair", kind: "gaming-chair", monthlyPrice: 38, color: "#714B67" },
  { id: "monitor-27", name: "Focus Monitor", description: "27-inch QHD display", category: "accessory", kind: "monitor", monthlyPrice: 24, color: "#334155" },
  { id: "lamp-arc", name: "Arc Desk Lamp", description: "Warm, dimmable light", category: "accessory", kind: "lamp", monthlyPrice: 8, color: "#D79A45" },
  { id: "plant-pothos", name: "Pothos Plant", description: "Easy-care living plant", category: "accessory", kind: "plant", monthlyPrice: 6, color: "#5A7D61" },
];

export const defaultConfiguration: WorkspaceConfiguration = {
  deskId: null,
  chairId: null,
  accessoryIds: [],
  monitorQuantity: 0,
};

export function createEmptyConfiguration(): WorkspaceConfiguration {
  return { ...defaultConfiguration, accessoryIds: [] };
}
