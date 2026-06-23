import { Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { InventoryTable, FilterSelect } from "./components";
import { useTransactions } from "@/hooks/inventory/transactions/useTransactions";
import type { Transaction } from "@/types/inventory";

const TYPE_LABEL: Record<string, string> = {
  IN: "📥 Entrada",
  OUT: "📤 Salida",
};

function toTableRow(t: Transaction) {
  return {
    type: TYPE_LABEL[t.type] ?? t.type,
    customer: t.customer?.name ?? "—",
    supplier: t.supplier?.name ?? "—",
    user: t.user?.email ?? "-",
    total: `$${Number(t.total).toLocaleString("es-CO")}`,
    created_at: new Date(t.created_at).toLocaleDateString("es-CO"),
  };
}

export function Transactions() {
  const { transactions, loading, error, remove, refetch } = useTransactions();

  const navigate = useNavigate();

  const rows = (transactions ?? []).map(toTableRow);

  const columns = [
    { key: "type", label: "Tipo" },
    { key: "customer", label: "Cliente" },
    { key: "supplier", label: "Proveedor" },
    { key: "user", label: "Usuario" },
    { key: "total", label: "Total" },
    { key: "created_at", label: "Fecha" },
    {
      key: "actions",
      label: "Acciones",
      render: (_: any, t: Transaction) => (
        <button
          onClick={async () => {
            await remove(t.id);
            await refetch();
          }}
          className="p-1.5 text-red-500 hover:bg-inv-bg-main rounded-md"
        >
          <Trash2 size={16} />
        </button>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 h-full">
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="flex items-center gap-3 flex-wrap">
        <FilterSelect label="Tipo" />
        <FilterSelect label="Cliente" />
        <FilterSelect label="Proveedor" />
        <FilterSelect label="Fecha" />

        <button
          onClick={() => navigate("/dashboard/transaction/new")}
          className="ml-auto flex items-center gap-2 bg-inv-primary hover:bg-[#52449a] text-white text-sm font-semibold px-4 py-2 rounded-lg"
        >
          Nueva transacción
          <Plus size={16} />
        </button>
      </div>

      <InventoryTable
        columns={columns}
        data={rows}
        loading={loading}
        rowKey={(t: Transaction) => t.id}
      />
    </div>
  );
}
