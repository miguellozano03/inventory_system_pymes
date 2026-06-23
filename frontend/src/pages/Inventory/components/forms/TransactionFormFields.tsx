import React, { useState } from "react";
import type {
  TransactionCreate,
  TransactionDetailCreate,
} from "@/types/inventory";

import { useProducts } from "@/hooks/inventory/product";
import { useCustomers } from "@/hooks/inventory/customer";
import { useSuppliers } from "@/hooks/inventory/supplier";

interface Props {
  loading?: boolean;
  onCancel: () => void;
  onSubmit: (payload: TransactionCreate) => Promise<void>;
}

export default function TransactionFormFields({
  loading = false,
  onSubmit,
  onCancel,
}: Props) {
  const { products } = useProducts();
  const { customers } = useCustomers();
  const { suppliers } = useSuppliers();

  const [type, setType] = useState<"IN" | "OUT">("OUT");
  const [customerId, setCustomerId] = useState("");
  const [supplierId, setSupplierId] = useState("");

  const [details, setDetails] = useState<TransactionDetailCreate[]>([]);

  const addRow = () => {
    setDetails((prev) => [...prev, { product_id: "", quantity: 1 }]);
  };

  const updateRow = (
    index: number,
    field: keyof TransactionDetailCreate,
    value: string | number,
  ) => {
    setDetails((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        [field]: value,
      };
      return next;
    });
  };

  const removeRow = (index: number) => {
    setDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const isValid = () => {
    return (
      details.length > 0 && details.every((d) => d.product_id && d.quantity > 0)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid()) {
      console.log("Formulario inválido:", details);
      return;
    }

    const payload: TransactionCreate = {
      type,
      customer_id: customerId || undefined,
      supplier_id: supplierId || undefined,
      details,
    };

    console.log("PAYLOAD FINAL:", payload);

    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* HEADER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase mb-1">
            Tipo
          </label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value as "IN" | "OUT")}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="OUT">Salida</option>
            <option value="IN">Entrada</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase mb-1">
            Cliente
          </label>

          <select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Sin cliente</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase mb-1">
            Proveedor
          </label>

          <select
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Sin proveedor</option>
            {suppliers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* DETAILS */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs font-bold uppercase">Productos</p>

          <button
            type="button"
            onClick={addRow}
            className="text-sm text-blue-600"
          >
            + Agregar
          </button>
        </div>

        <div className="space-y-2">
          {details.map((row, index) => (
            <div key={index} className="grid grid-cols-3 gap-2">
              {/* PRODUCT */}
              <select
                value={row.product_id}
                onChange={(e) => updateRow(index, "product_id", e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="">Producto</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              {/* QTY */}
              <input
                type="number"
                min={1}
                value={row.quantity}
                onChange={(e) =>
                  updateRow(index, "quantity", Number(e.target.value))
                }
                className="border px-2 py-1 rounded"
              />

              {/* DELETE */}
              <button
                type="button"
                onClick={() => removeRow(index)}
                className="text-red-500"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 mt-6">
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>

        <button
          type="submit"
          disabled={loading || !isValid()}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Guardando..." : "Crear"}
        </button>
      </div>
    </form>
  );
}
