import { Plus } from "lucide-react";
import { InventoryTable, FilterSelect } from "./components/";
import type { Customer } from "@/types/customers";

const CUSTOMER_COLUMNS = [
  { key: "identification", label: "Identificación" },
  { key: "name", label: "Nombre" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Teléfono" },
  { key: "address", label: "Dirección" },
  { key: "created_at", label: "Registrado" },
];

function toTableRow(c: Customer): Record<string, string> {
  return {
    identification: c.identification,
    name: c.name,
    email: c.email ?? "—",
    phone: c.phone ?? "—",
    address: c.address ?? "—",
    created_at: new Date(c.created_at).toLocaleDateString("es-CO"),
  };
}

interface CustomersProps {
  data?: Customer[];
}

export function Customers({ data = [] }: CustomersProps) {
  const rows = data.map(toTableRow);

  return (
    <div className="flex flex-col gap-4 h-full">
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
        data={rows.length ? rows : undefined}
      />
    </div>
  );
}
