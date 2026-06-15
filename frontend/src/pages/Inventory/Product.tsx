import { Plus } from "lucide-react";
import { InventoryTable, FilterSelect } from "./components";
import { useProducts } from "@/hooks/inventory/product";

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
    label: "Código de barra",
  },
  {
    key: "sale_price",
    label: "Precio",
    render: (val: number | undefined) =>
      `$${Number(val ?? 0)
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`,
  },
  {
    key: "stock",
    label: "Stock",
    render: (val: number | undefined) => (
      <span className={(val ?? 0) < 10 ? "text-red-500 font-semibold" : ""}>
        {val ?? 0}
      </span>
    ),
  },
];

export function Product() {
  const { products, loading, creating, error } = useProducts();

  return (
    <div className="flex flex-col gap-4 h-full">
      {error && (
        <div className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {error}
        </div>
      )}
      <div className="flex items-center gap-3 flex-wrap">
        <FilterSelect label="Categoría" />
        <FilterSelect label="Proveedor" />
        <FilterSelect label="Precio" />
        <FilterSelect label="Stock" />

        <button className="ml-auto flex items-center gap-2 bg-inv-primary hover:bg-[#52449a] transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg">
          {creating ? "Añadiendo" : "Añadir producto"}
          <Plus size={16} strokeWidth={2.5} />
        </button>
      </div>

      <InventoryTable
        columns={PRODUCT_COLUMNS}
        data={products}
        loading={loading}
      />
    </div>
  );
}
