import React from "react";
import type {
  SupplierCreate,
  SupplierUpdate,
  SupplierResponse,
} from "@/types/inventory";

interface Props {
  isEdit: boolean;
  loading?: boolean;
  supplier?: SupplierResponse | null;

  onSubmit: (payload: SupplierCreate | SupplierUpdate) => Promise<void>;
  onCancel: () => void;
}

export default function SupplierFormFields({
  isEdit,
  loading = false,
  supplier,
  onSubmit,
  onCancel,
}: Props) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? "") || null,
      phone: String(formData.get("phone") ?? "") || null,
      address: String(formData.get("address") ?? "") || null,
    };

    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isEdit && supplier?.id && <input type="hidden" value={supplier.id} />}

      {/* NAME */}
      <div>
        <label className="block text-xs font-semibold uppercase mb-1">
          Nombre
        </label>

        <input
          type="text"
          name="name"
          required
          defaultValue={supplier?.name}
          className="w-full border px-3 py-2 rounded-md text-sm"
        />
      </div>

      {/* EMAIL */}
      <div>
        <label className="block text-xs font-semibold uppercase mb-1">
          Email
        </label>

        <input
          type="email"
          name="email"
          defaultValue={supplier?.email ?? ""}
          className="w-full border px-3 py-2 rounded-md text-sm"
        />
      </div>

      {/* PHONE */}
      <div>
        <label className="block text-xs font-semibold uppercase mb-1">
          Teléfono
        </label>

        <input
          type="text"
          name="phone"
          defaultValue={supplier?.phone ?? ""}
          className="w-full border px-3 py-2 rounded-md text-sm"
        />
      </div>

      {/* ADDRESS */}
      <div>
        <label className="block text-xs font-semibold uppercase mb-1">
          Dirección
        </label>

        <textarea
          name="address"
          rows={3}
          defaultValue={supplier?.address ?? ""}
          className="w-full border px-3 py-2 rounded-md text-sm"
        />
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="text-sm text-gray-600"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-inv-primary text-white px-4 py-2 rounded-lg text-sm"
        >
          {loading
            ? "Guardando..."
            : isEdit
              ? "Guardar cambios"
              : "Crear proveedor"}
        </button>
      </div>
    </form>
  );
}
