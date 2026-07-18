import { useState, useEffect } from "react";
import { Building2 } from "lucide-react";
import { useCompany } from "@/hooks/inventory/company";
import type { CompanyUpdate } from "@/types/company";

interface FieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
}

function Field({ label, type = "text", value, onChange }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-inv-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-inv-border bg-white px-3 py-2 text-sm text-inv-dark outline-none focus:border-inv-primary focus:ring-2 focus:ring-inv-primary/20 transition-all"
      />
    </div>
  );
}

export function Settings() {
  const { company, loading, updating, error, update } = useCompany();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (company) {
      setForm({
        name: company.name,
        email: company.email,
        phone: company.phone,
      });
    }
  }, [company]);

  const setField = (key: keyof typeof form) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async () => {
    if (!company) return;

    const payload: CompanyUpdate = {};
    if (form.name !== company.name) payload.name = form.name;
    if (form.email !== company.email) payload.email = form.email;
    if (form.phone !== company.phone) payload.phone = form.phone;

    if (Object.keys(payload).length === 0) return;

    await update(payload);
  };

  if (loading) {
    return (
      <div className="text-center text-inv-label py-10">
        Cargando compañía...
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-center text-red-500 py-10">
        No se pudo cargar la compañía.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      <h1 className="text-center text-2xl font-bold text-inv-dark tracking-widest uppercase">
        Mi Compañía
      </h1>

      <div className="bg-white rounded-2xl border border-inv-border p-8 flex gap-10">
        {/* Left — Logo + info */}
        <div className="flex flex-col items-center gap-4 min-w-[200px] max-w-[220px] bg-inv-bg-main rounded-xl p-6">
          <div className="w-36 h-36 rounded-2xl bg-inv-border flex items-center justify-center">
            <Building2 size={48} className="text-inv-label" />
          </div>

          <div className="text-sm text-inv-dark space-y-1 w-full">
            <p>Empresa: {company.name}</p>
            <p>NIT: {company.nit}</p>
            <p>Correo: {company.email}</p>
            <p>Tel: {company.phone}</p>
          </div>
        </div>

        {/* Right — Edit form */}
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-base font-bold tracking-widest text-inv-dark uppercase">
            Editar información de la compañía
          </h2>

          <Field
            label="Nombre de la empresa"
            value={form.name}
            onChange={setField("name")}
          />
          <Field
            label="Correo electrónico"
            type="email"
            value={form.email}
            onChange={setField("email")}
          />
          <Field
            label="Teléfono"
            type="tel"
            value={form.phone}
            onChange={setField("phone")}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={updating}
              className="bg-inv-primary hover:bg-[#52449a] disabled:opacity-50 transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
            >
              {updating ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
