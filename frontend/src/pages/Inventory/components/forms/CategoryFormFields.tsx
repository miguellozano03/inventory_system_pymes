export default function CategoryFormFields({
  isEdit,
  id,
}: {
  isEdit: boolean;
  id?: string;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-inv-label mb-1">
          Nombre de la Categoría
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full px-3 py-2 border border-inv-border rounded-md focus:outline-none focus:border-inv-primary text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-inv-label mb-1">
          Descripción
        </label>
        <textarea
          name="description"
          rows={3}
          className="w-full px-3 py-2 border border-inv-border rounded-md focus:outline-none focus:border-inv-primary text-sm"
        />
      </div>
    </div>
  );
}
