export interface Supplier {
  id: string;
  empresa: string;
  vendedor: string;
  telefono: string;
  diaVisita:
    | "Lunes"
    | "Martes"
    | "Miércoles"
    | "Jueves"
    | "Viernes"
    | "Sábado"
    | "Domingo"
    | "Variable";
  activo: boolean;
}

export const DAYS_OF_WEEK = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
  "Variable",
];
