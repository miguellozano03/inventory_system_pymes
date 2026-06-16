import { Plus } from "lucide-react";
import { useState } from "react";
import { InventoryTable, FilterSelect, Modal } from "./components";
import { useProducts } from "@/hooks/inventory/product/useProducts";
import { productService } from "@/services/productService";

import type {
  ProductResponse,
  ProductCreate,
  ProductUpdate,
} from "@/types/inventory";

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

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
        className={Number(value ?? 0) < 10 ? "text-red-500 font-semibold" : ""}
      >
        {value ?? 0}
      </span>
    ),
  },
];

export function Product() {
  const { products, loading, error, create, refetch } = useProducts();

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<ProductResponse | null>(
    null,
  );

  const handleCreate = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  const handleEdit = (product: ProductResponse) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSubmit = async (payload: ProductCreate | ProductUpdate) => {
    try {
      if (editingProduct) {
        await productService.update(
          editingProduct.id,
          payload as ProductUpdate,
        );
      } else {
        await create(payload as ProductCreate);
      }

      await refetch();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="flex items-center gap-3 flex-wrap">
        <FilterSelect label="Categoría" />
        <FilterSelect label="Proveedor" />
        <FilterSelect label="Precio" />
        <FilterSelect label="Stock" />

        <button
          onClick={handleCreate}
          className="ml-auto flex items-center gap-2 bg-inv-primary hover:bg-[#52449a] text-white text-sm font-semibold px-4 py-2 rounded-lg"
        >
          Añadir producto
          <Plus size={16} />
        </button>
      </div>

      <InventoryTable
        columns={PRODUCT_COLUMNS}
        data={products}
        loading={loading}
        onRowClick={(product) => {
          setEditingProduct(product);
          setIsFormOpen(true);
        }}
        rowKey={(product) => product.id}
      />
      <Modal
        isOpen={isFormOpen}
        title={editingProduct ? "Editar producto" : "Nuevo producto"}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Nombre"
            className="
        w-full
        border
        rounded-lg
        px-3
        py-2
      "
          />

          <button
            type="submit"
            className="
        w-full
        bg-inv-primary
        text-white
        rounded-lg
        py-2
      "
          >
            Guardar
          </button>
        </form>
      </Modal>
    </div>
  );
}
