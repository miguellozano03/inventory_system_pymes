import { Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { InventoryTable } from "./components";
import { useCategories } from "@/hooks/inventory/category";
import { categoryService } from "@/services/categoryService";
import type { CategoryResponse } from "@/types/inventory";

export function Category() {
  const { categories, loading, error, refetch } = useCategories();

  const navigate = useNavigate();

  const CATEGORY_COLUMNS = [
    {
      key: "name",
      label: "Nombre",
    },
    {
      key: "description",
      label: "Descripción",
      render: (value: string | null) => value ?? "-",
    },
    {
      key: "actions",
      label: "Acciones",
      render: (_: any, category: CategoryResponse) => (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/dashboard/category/edit/${category.id}`)}
            title="Editar"
          >
            <Edit size={16} />
          </button>

          <button
            onClick={async () => {
              await categoryService.delete(category.id);
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
        onClick={() => navigate("/dashboard/category/new")}
        className="ml-auto flex items-center gap-2 bg-inv-primary text-white px-4 py-2 rounded-lg"
      >
        <Plus size={16} />
        Añadir categoría
      </button>

      <InventoryTable
        columns={CATEGORY_COLUMNS}
        data={categories}
        loading={loading}
        rowKey={(c) => c.id}
      />
    </div>
  );
}
