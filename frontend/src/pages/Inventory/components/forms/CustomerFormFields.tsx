import type {
  Customer,
  CustomerCreate,
  CustomerUpdate,
} from "@/types/inventory";

interface Props {
  isEdit: boolean;
  loading?: boolean;
  customer?: Customer | null;

  onCancel: () => void;

  onSubmit: (payload: CustomerCreate | CustomerUpdate) => Promise<void>;
}

export default function CustomerFormFields({
  isEdit,
  loading = false,
  customer,
  onSubmit,
  onCancel,
}: Props) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload = {
      identification: String(formData.get("identification") ?? ""),
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      address: String(formData.get("address") ?? ""),
    };

    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-inv-label mb-1">
            Identificación / CC
          </label>

          <input
            type="text"
            name="identification"
            required
            defaultValue={customer?.identification}
            className="w-full px-3 py-2 border border-inv-border rounded-md focus:outline-none focus:border-inv-primary text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-inv-label mb-1">
            Nombre Completo
          </label>

          <input
            type="text"
            name="name"
            required
            defaultValue={customer?.name}
            className="w-full px-3 py-2 border border-inv-border rounded-md focus:outline-none focus:border-inv-primary text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-inv-label mb-1">
            Email
          </label>

          <input
            type="email"
            name="email"
            required
            defaultValue={customer?.email}
            className="w-full px-3 py-2 border border-inv-border rounded-md focus:outline-none focus:border-inv-primary text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-inv-label mb-1">
            Teléfono
          </label>

          <input
            type="text"
            name="phone"
            required
            defaultValue={customer?.phone}
            className="w-full px-3 py-2 border border-inv-border rounded-md focus:outline-none focus:border-inv-primary text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-inv-label mb-1">
            Dirección
          </label>

          <input
            type="text"
            name="address"
            required
            defaultValue={customer?.address}
            className="w-full px-3 py-2 border border-inv-border rounded-md focus:outline-none focus:border-inv-primary text-sm"
          />
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
              : "Crear Cliente"}
        </button>
      </div>
    </form>
  );
}
