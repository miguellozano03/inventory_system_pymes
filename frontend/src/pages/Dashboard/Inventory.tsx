import { Plus } from "lucide-react";
import { InventoryTable, FilterSelect } from "./components/";

const INVENTORY_COLUMNS = [
  { key: "proveedor", label: "Proveedor" },
  { key: "categoria", label: "Categoría" },
  { key: "nombre", label: "Nombre" },
  { key: "descripcion", label: "Descripción" },
  { key: "codigoBarra", label: "Código de barra" },
  { key: "precio", label: "Precio" },
  { key: "unidadMedida", label: "Unidad de medida" },
  { key: "stock", label: "Stock" },
];

export function Inventory() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center gap-3 flex-wrap">
        <FilterSelect label="Categoría" />
        <FilterSelect label="Proveedor" />
        <FilterSelect label="Precio" />
        <FilterSelect label="Stock" />

        <button className="ml-auto flex items-center gap-2 bg-inv-primary hover:bg-[#52449a] transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg">
          Añadir producto
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>

      <InventoryTable columns={INVENTORY_COLUMNS} />
    </div>
  );
}
