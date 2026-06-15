import { Plus } from "lucide-react";
import { InventoryTable, FilterSelect } from "./components";
import type { Transaction } from "@/types/inventory";

const TRANSACTION_COLUMNS = [
  { key: "type", label: "Tipo" },
  { key: "customer", label: "Cliente" },
  { key: "supplier", label: "Proveedor" },
  { key: "user", label: "Usuario" },
  { key: "total", label: "Total" },
  { key: "created_at", label: "Fecha" },
];

const TYPE_LABEL: Record<string, string> = {
  IN: "📥 Entrada",
  OUT: "📤 Salida",
};

function toTableRow(t: Transaction): Record<string, string> {
  return {
    type: TYPE_LABEL[t.type] ?? t.type,
    customer: t.customer ?? "—",
    supplier: t.supplier ?? "—",
    user: t.user,
    total: `$${Number(t.total).toLocaleString("es-CO")}`,
    created_at: new Date(t.created_at).toLocaleDateString("es-CO"),
  };
}

interface TransactionsProps {
  data?: Transaction[];
}

export function Transactions({ data = [] }: TransactionsProps) {
  const rows = data.map(toTableRow);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center gap-3 flex-wrap">
        <FilterSelect label="Tipo" />
        <FilterSelect label="Cliente" />
        <FilterSelect label="Proveedor" />
        <FilterSelect label="Fecha" />

        <button className="ml-auto flex items-center gap-2 bg-inv-primary hover:bg-[#52449a] transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg">
          Nueva transacción
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>

      <InventoryTable
        columns={TRANSACTION_COLUMNS}
        data={rows.length ? rows : undefined}
      />
    </div>
  );
}
