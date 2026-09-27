export type CatalogCategory = "desk" | "chair" | "accessory";
export type CatalogItemKind =
  | "desk"
  | "chair"
  | "gaming-chair"
  | "monitor"
  | "lamp"
  | "plant";
export type MonitorQuantity = 0 | 1 | 2;
export type CatalogItem = {
  id: string;
  name: string;
  description: string;
  category: CatalogCategory;
  kind: CatalogItemKind;
  monthlyPrice: number;
  color: string;
  maxMonitorQuantity?: 1 | 2;
};
export type WorkspaceConfiguration = {
  deskId: CatalogItem["id"];
  chairId: CatalogItem["id"];
  accessoryIds: CatalogItem["id"][];
  monitorQuantity: MonitorQuantity;
};
