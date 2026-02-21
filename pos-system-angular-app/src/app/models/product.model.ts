export interface Product {
  id: string;
  nombre: string;
  categoria: string;
  precioCosto: number;
  precioVenta: number;
  stock: number;
  stockMinimo: number;
  img?: string;
}

export type ProductStatus = "Óptimo" | "Bajo" | "Agotado";

export function getProductStatus(
  stock: number,
  stockMinimo: number,
): ProductStatus {
  if (stock <= 0) return "Agotado";
  if (stock <= stockMinimo) return "Bajo";
  return "Óptimo";
}
