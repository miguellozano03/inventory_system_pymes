import { useState } from "react";
import { Building2 } from "lucide-react";

// Replace with real company data from your auth context/store
const MOCK_COMPANY = {
  name: "XXXXXX SAS",
  nit: "XXXXXXX",
  address: "XXXXXX",
  email: "XXXXX",
  logo: null, // URL string when you have it
};

interface SettingsForm {
  db_location: string;
  base_currency: string;
  default_tax: string;
  min_stock_alert: string;
  date_format: string;
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  inline?: boolean;
}

function Field({ label, value, onChange, inline = false }: FieldProps) {
  if (inline) {
    return (
      <div className="flex items-center gap-3">
        <label className="text-sm text-inv-dark whitespace-nowrap min-w-[200px]">
          {label}
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-lg border border-inv-border bg-white px-3 py-1.5 text-sm text-inv-dark outline-none focus:border-inv-primary focus:ring-2 focus:ring-inv-primary/20 transition-all"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-inv-label">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-inv-border bg-white px-3 py-2 text-sm text-inv-dark outline-none focus:border-inv-primary focus:ring-2 focus:ring-inv-primary/20 transition-all"
      />
    </div>
  );
}

export function Settings() {
  const [form, setForm] = useState<SettingsForm>({
    db_location: "",
    base_currency: "",
    default_tax: "",
    min_stock_alert: "",
    date_format: "",
  });

  const set = (key: keyof SettingsForm) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleBackup = () => {
    // TODO: call API to generate .sql backup
    console.log("Generating backup...");
  };

  const handleSubmit = () => {
    // TODO: call API to save settings
    console.log("Saving settings:", form);
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Main grid */}
      <div className="grid grid-cols-2 gap-6 items-start">
        {/* Left — Company card */}
        <div className="bg-inv-bg-main rounded-2xl border border-inv-border p-8 flex flex-col items-center gap-5">
          <h2 className="text-base font-semibold text-inv-label">
            Datos de la compañía
          </h2>
          "{/* Logo placeholder */}
          <div className="w-48 h-36 rounded-2xl bg-inv-border flex items-center justify-center">
            {MOCK_COMPANY.logo ? (
              <img
                src={MOCK_COMPANY.logo}
                alt="Logo"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <Building2 size={48} className="text-inv-label" />
            )}
          </div>
          {/* Company info */}
          <div className="text-sm text-inv-dark space-y-1 w-full">
            <p>Empresa: {MOCK_COMPANY.name}</p>
            <p>NIT: {MOCK_COMPANY.nit}</p>
            <p>Dirección: {MOCK_COMPANY.address}</p>
            <p>Correo: {MOCK_COMPANY.email}</p>
          </div>
        </div>

        {/* Right — Preferences + Maintenance */}
        <div className="flex flex-col gap-4">
          {/* App preferences */}
          <div className="bg-inv-bg-main rounded-2xl border border-inv-border p-6 flex flex-col gap-4">
            <h2 className="text-base font-semibold text-inv-dark text-center">
              Preferencias de la aplicación (local)
            </h2>

            <Field
              label="Ubicación de la base de datos (local)"
              value={form.db_location}
              onChange={set("db_location")}
            />

            <Field
              label="Moneda Base:"
              value={form.base_currency}
              onChange={set("base_currency")}
              inline
            />
            <Field
              label="Impuestos por defecto:"
              value={form.default_tax}
              onChange={set("default_tax")}
              inline
            />
            <Field
              label="Alertas de stock mínimo global:"
              value={form.min_stock_alert}
              onChange={set("min_stock_alert")}
              inline
            />
            <Field
              label="Formato de fecha"
              value={form.date_format}
              onChange={set("date_format")}
              inline
            />
          </div>

          {/* System maintenance */}
          <div className="bg-inv-bg-main rounded-2xl border border-inv-border p-6 flex flex-col gap-3">
            <h2 className="text-base font-semibold text-inv-dark">
              Mantenimiento del sistema
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-inv-dark">
                  Copia de seguridad (backup)
                </p>
                <p className="text-xs text-inv-label">
                  Ultimo backup: 12/12/2025
                </p>
              </div>
              <button
                onClick={handleBackup}
                className="bg-inv-primary hover:bg-[#52449a] transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg whitespace-nowrap"
              >
                Generar copia .sql
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-inv-primary hover:bg-[#52449a] transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
