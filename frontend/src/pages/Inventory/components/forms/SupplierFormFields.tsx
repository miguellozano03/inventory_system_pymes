export default function SupplierFormFields({
  isEdit,
  id,
}: {
  isEdit: boolean;
  id?: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-inv-label)] mb-1">
          Nombre del Proveedor / Razón Social
        </label>
        <input
          type="text"
          name="name"
          required
          className="w-full px-3 py-2 border border-[var(--color-inv-border)] rounded-md focus:outline-none focus:border-[var(--color-inv-primary)] text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-inv-label)] mb-1">
          Nombre de Contacto
        </label>
        <input
          type="text"
          name="contact_name"
          className="w-full px-3 py-2 border border-[var(--color-inv-border)] rounded-md focus:outline-none focus:border-[var(--color-inv-primary)] text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-inv-label)] mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="w-full px-3 py-2 border border-[var(--color-inv-border)] rounded-md focus:outline-none focus:border-[var(--color-inv-primary)] text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-inv-label)] mb-1">
          Teléfono
        </label>
        <input
          type="text"
          name="phone"
          className="w-full px-3 py-2 border border-[var(--color-inv-border)] rounded-md focus:outline-none focus:border-[var(--color-inv-primary)] text-sm"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-inv-label)] mb-1">
          Dirección
        </label>
        <input
          type="text"
          name="address"
          className="w-full px-3 py-2 border border-[var(--color-inv-border)] rounded-md focus:outline-none focus:border-[var(--color-inv-primary)] text-sm"
        />
      </div>
    </div>
  );
}
