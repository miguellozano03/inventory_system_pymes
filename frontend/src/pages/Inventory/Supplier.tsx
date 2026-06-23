import { Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { InventoryTable } from "./components";
import { useSuppliers } from "@/hooks/inventory/supplier";
import type { SupplierResponse } from "@/types/inventory";

export function Supplier() {
  const { suppliers, loading, error, refetch, remove } = useSuppliers();
  const navigate = useNavigate();

  const COLUMNS = [
    {
      key: "name",
      label: "Nombre",
    },
    {
      key: "email",
      label: "Email",
      render: (v: string | null) => v ?? "-",
    },
    {
      key: "phone",
      label: "Teléfono",
      render: (v: string | null) => v ?? "-",
    },
    {
      key: "actions",
      label: "Acciones",
      render: (_: any, supplier: SupplierResponse) => (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/dashboard/supplier/edit/${supplier.id}`)}
            title="Editar"
          >
            <Edit size={16} />
          </button>

          <button
            onClick={async () => {
              await remove(supplier.id);
              await refetch();
            }}
            title="Eliminar"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={() => navigate("/dashboard/supplier/new")}
        className="ml-auto flex items-center gap-2 bg-inv-primary text-white px-4 py-2 rounded-lg"
      >
        <Plus size={16} />
        Añadir proveedor
      </button>

      <InventoryTable
        columns={COLUMNS}
        data={suppliers}
        loading={loading}
        rowKey={(s) => s.id}
      />
    </div>
  );
}
