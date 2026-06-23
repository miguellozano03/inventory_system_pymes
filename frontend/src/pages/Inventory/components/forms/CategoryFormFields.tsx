import React from "react";
import type {
  CategoryCreate,
  CategoryUpdate,
  CategoryResponse,
} from "@/types/inventory";

interface Props {
  isEdit: boolean;
  loading?: boolean;
  category?: CategoryResponse | null;

  onSubmit: (payload: CategoryCreate | CategoryUpdate) => Promise<void>;
  onCancel: () => void;
}

export default function CategoryFormFields({
  isEdit,
  loading = false,
  category,
  onSubmit,
  onCancel,
}: Props) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload = {
      name: String(formData.get("name") ?? ""),
      description: String(formData.get("description") ?? "") || null,
    };

    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isEdit && category?.id && <input type="hidden" value={category.id} />}

      {/* NAME */}
      <div>
        <label className="block text-xs font-semibold uppercase mb-1">
          Nombre
        </label>

        <input
          type="text"
          name="name"
          required
          defaultValue={category?.name}
          className="w-full border px-3 py-2 rounded-md text-sm"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-xs font-semibold uppercase mb-1">
          Descripción
        </label>

        <textarea
          name="description"
          rows={3}
          defaultValue={category?.description ?? ""}
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
              : "Crear categoría"}
        </button>
      </div>
    </form>
  );
}
