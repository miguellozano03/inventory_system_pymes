import React from "react";
import type {
  ProductCreate,
  ProductUpdate,
  ProductResponse,
} from "@/types/inventory";

import { useCategories } from "@/hooks/inventory/category";
import { useSuppliers } from "@/hooks/inventory/supplier";

interface Props {
  isEdit: boolean;
  loading?: boolean;
  product?: ProductResponse | null;

  onCancel: () => void;
  onSubmit: (payload: ProductCreate | ProductUpdate) => Promise<void>;
}

export default function ProductFormFields({
  isEdit,
  loading = false,
  product,
  onSubmit,
  onCancel,
}: Props) {
  const { categories, loading: categoriesLoading } = useCategories();
  const { suppliers, loading: suppliersLoading } = useSuppliers();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const supplierIdRaw = String(formData.get("supplier_id") ?? "");

    const payload = {
      internal_reference: String(formData.get("internal_reference") ?? ""),
      name: String(formData.get("name") ?? ""),
      category_id: String(formData.get("category_id") ?? ""),
      supplier_id: supplierIdRaw === "" ? undefined : supplierIdRaw,
      description: String(formData.get("description") ?? ""),
      stock: Number(formData.get("stock") ?? 0),
      cost_price: Number(formData.get("cost_price") ?? 0),
      sale_price: Number(formData.get("sale_price") ?? 0),
      is_active: formData.get("is_active") === "true",
    };

    console.log("PRODUCT", product);
    console.log("CATEGORIES", categories);
    console.log("PAYLOAD", payload);

    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isEdit && product?.id ? (
          <input type="hidden" name="id" value={product.id} />
        ) : null}

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-inv-label mb-1">
            Referencia Interna
          </label>

          <input
            type="text"
            name="internal_reference"
            required
            defaultValue={product?.internal_reference}
            className="w-full px-3 py-2 border border-inv-border rounded-md focus:outline-none focus:border-inv-primary text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-inv-label mb-1">
            Nombre del Producto
          </label>

          <input
            type="text"
            name="name"
            required
            defaultValue={product?.name}
            className="w-full px-3 py-2 border border-inv-border rounded-md focus:outline-none focus:border-inv-primary text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-inv-label mb-1">
            Categoría
          </label>

          <select
            key={product?.category_id}
            name="category_id"
            defaultValue={product?.category_id ?? ""}
            disabled={categoriesLoading}
          >
            <option value="" hidden>
              {categoriesLoading
                ? "Cargando categorías..."
                : "Selecciona una categoría"}
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-inv-label mb-1">
            Proveedor
          </label>

          <select
            key={product?.supplier_id}
            name="supplier_id"
            defaultValue={product?.supplier_id ?? ""}
            disabled={suppliersLoading}
          >
            <option value="" hidden>
              {suppliersLoading
                ? "Cargando proveedores..."
                : "Selecciona un proveedor"}
            </option>

            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-inv-label mb-1">
            Descripción
          </label>

          <textarea
            name="description"
            rows={3}
            defaultValue={product?.description}
            className="w-full px-3 py-2 border border-inv-border rounded-md focus:outline-none focus:border-inv-primary text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-inv-label mb-1">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            min={0}
            required
            defaultValue={product?.stock}
            className="w-full px-3 py-2 border border-inv-border rounded-md focus:outline-none focus:border-inv-primary text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-inv-label mb-1">
            Precio de Costo
          </label>

          <input
            type="number"
            name="cost_price"
            min={0}
            step="0.01"
            required
            defaultValue={product?.cost_price}
            className="w-full px-3 py-2 border border-inv-border rounded-md focus:outline-none focus:border-inv-primary text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-inv-label mb-1">
            Precio de Venta
          </label>

          <input
            type="number"
            name="sale_price"
            min={0}
            step="0.01"
            required
            defaultValue={product?.sale_price}
            className="w-full px-3 py-2 border border-inv-border rounded-md focus:outline-none focus:border-inv-primary text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-inv-label mb-1">
            Estado
          </label>

          <select
            name="is_active"
            required
            defaultValue={String(product?.is_active ?? true)}
            className="w-full px-3 py-2 border border-inv-border rounded-md focus:outline-none focus:border-inv-primary text-sm"
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 pt-4 border-t border-inv-border">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-inv-label hover:text-inv-dark font-medium transition-colors"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={loading}
          className="text-sm bg-inv-primary hover:opacity-90 text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm transition-opacity disabled:opacity-50"
        >
          {loading
            ? "Guardando..."
            : isEdit
              ? "Guardar Cambios"
              : "Crear Producto"}
        </button>
      </div>
    </form>
  );
}
