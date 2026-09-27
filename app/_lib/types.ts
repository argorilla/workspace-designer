export type CatalogCategory = "desk" | "chair" | "accessory";
export type CatalogItemKind = "desk" | "chair" | "monitor" | "lamp" | "plant";
export type CatalogItem = { id: string; name: string; description: string; category: CatalogCategory; kind: CatalogItemKind; monthlyPrice: number; color: string };
export type WorkspaceConfiguration = { deskId: CatalogItem["id"]; chairId: CatalogItem["id"]; accessoryIds: CatalogItem["id"][] };
