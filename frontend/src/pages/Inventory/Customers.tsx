import { Plus, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { InventoryTable, FilterSelect } from "./components";
import { useCustomers } from "@/hooks/inventory/customer";
import type { Customer } from "@/types/inventory";

export function Customers() {
  const { customers, loading, error } = useCustomers();
  const navigate = useNavigate();

  // Definimos las columnas dentro del componente o manteniendo una referencia
  // Usamos el campo "id" u otra clave existente para la columna de acciones aprovechando el método custom 'render'
  const CUSTOMER_COLUMNS: any[] = [
    { key: "identification", label: "Identificación" },
    { key: "name", label: "Nombre" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Teléfono" },
    { key: "address", label: "Dirección" },
    { key: "created_at", label: "Registrado" },
    {
      key: "id", // Usamos el ID del cliente para mapear la columna
      label: "Acciones",
      render: (_value: any, row: Customer) => (
        <div className="flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Evita disparar el onRowClick de la fila si existiera
              navigate(`/dashboard/customer/edit/${row.id}`);
            }}
            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="Editar Cliente"
          >
            <Edit2 size={16} />
          </button>
        </div>
      ),
    },
  ];

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

        <button
          onClick={() => navigate("/dashboard/customer/new")}
          className="ml-auto flex items-center gap-2 bg-inv-primary hover:bg-[#52449a] transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg"
        >
          Añadir cliente
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>

      <InventoryTable
        columns={CUSTOMER_COLUMNS}
        data={customers}
        loading={loading}
        rowKey={(row) => row.id}
      />
    </div>
  );
}
