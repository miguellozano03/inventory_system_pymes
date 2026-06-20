import { Plus, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { InventoryTable, FilterSelect } from "./components";
import { useProducts } from "@/hooks/inventory/product/useProducts";

import type { ProductResponse } from "@/types/inventory";
import { useProduct } from "@/hooks/inventory/product";

export interface Column<T> {
  key: keyof T | "actions" | string;
  label: string;
  render?: (value: any, record: T) => React.ReactNode;
}

export function Product() {
  const { products, loading, error, refetch } = useProducts();
  const { remove } = useProduct();
  const navigate = useNavigate();

  const PRODUCT_COLUMNS: Column<ProductResponse>[] = [
    {
      key: "supplier_name",
      label: "Proveedor",
    },
    {
      key: "category_name",
      label: "Categoría",
    },
    {
      key: "name",
      label: "Nombre",
    },
    {
      key: "description",
      label: "Descripción",
    },
    {
      key: "internal_reference",
      label: "Código",
    },
    {
      key: "sale_price",
      label: "Precio",
      render: (value) =>
        `$${Number(value ?? 0)
          .toFixed(0)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
    },
    {
      key: "stock",
      label: "Stock",
      render: (value) => (
        <span
          className={
            Number(value ?? 0) < 10 ? "text-red-500 font-semibold" : ""
          }
        >
          {value ?? 0}
        </span>
      ),
    },

    {
      key: "actions",
      label: "Acciones",
      render: (_, product) => (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/dashboard/product/edit/${product.id}`)}
            className="p-1.5 text-inv-label hover:text-inv-primary hover:bg-inv-bg-main rounded-md transition-colors pointer"
            title="Editar producto"
          >
            <Edit size={16} />
          </button>

          <button
            onClick={async () => {
              await remove(product.id);
              await refetch();
            }}
            className="p-1.5 text-inv-label hover:text-inv-primary hover:bg-inv-bg-main rounded-md transition-colors"
            title="Eliminar producto pointer"
          >
            <Trash2 size={16} />{" "}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-4 h-full">
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="flex items-center gap-3 flex-wrap">
        <FilterSelect label="Categoría" />
        <FilterSelect label="Proveedor" />
        <FilterSelect label="Precio" />
        <FilterSelect label="Stock" />

        <button
          onClick={() => navigate("/dashboard/product/new")}
          className="ml-auto flex items-center gap-2 bg-inv-primary hover:bg-[#52449a] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Añadir producto
          <Plus size={16} />
        </button>
      </div>

      <InventoryTable
        columns={PRODUCT_COLUMNS}
        data={products}
        loading={loading}
        rowKey={(product) => product.id}
      />
    </div>
  );
}
