import { Plus } from "lucide-react";
import { InventoryTable, FilterSelect } from "./components";
import { useCustomers } from "@/hooks/inventory/customer";
import type { Customer } from "@/types/inventory";

const CUSTOMER_COLUMNS: { key: keyof Customer; label: string }[] = [
  { key: "identification", label: "Identificación" },
  { key: "name", label: "Nombre" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Teléfono" },
  { key: "address", label: "Dirección" },
  { key: "created_at", label: "Registrado" },
];

export function Customers() {
  const { customers, loading, error } = useCustomers();

  return (
    <div className="flex flex-col gap-4 h-full">
      {error && (
        <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </div>
      )}
      <div className="flex items-center gap-3 flex-wrap">
        <FilterSelect label="Identificación" />
        <FilterSelect label="Nombre" />

        <button className="ml-auto flex items-center gap-2 bg-inv-primary hover:bg-[#52449a] transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg">
          Añadir cliente
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>

      <InventoryTable
        columns={CUSTOMER_COLUMNS}
        data={customers}
        loading={loading}
      />
    </div>
  );
}
