import { useState } from "react";
import { User } from "lucide-react";

interface ProfileForm {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  current_password: string;
  new_password: string;
  confirm_password: string;
}

const MOCK_USER = {
  first_name: "Manuel",
  last_name: "Garcia",
  identification: "104124190",
  email: "manuel@inventario.com",
  phone: "310588312",
  role: "Administrador",
};

interface FieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  className = "",
}: FieldProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-xs text-inv-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-inv-border bg-white px-3 py-2 text-sm text-inv-dark outline-none focus:border-inv-primary focus:ring-2 focus:ring-inv-primary/20 transition-all"
      />
    </div>
  );
}

export function Profile() {
  const [form, setForm] = useState<ProfileForm>({
    first_name: MOCK_USER.first_name,
    last_name: MOCK_USER.last_name,
    email: MOCK_USER.email,
    phone: MOCK_USER.phone,
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const set = (key: keyof ProfileForm) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = () => {
    // TODO: connect to API
    console.log("Saving profile:", form);
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Page title */}
      <h1 className="text-center text-2xl font-bold text-inv-dark tracking-widest uppercase">
        Mi Perfil
      </h1>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-inv-border p-8 flex gap-10">
        {/* Left — Avatar + info */}
        <div className="flex flex-col items-center gap-4 min-w-[200px] max-w-[220px] bg-inv-bg-main rounded-xl p-6">
          {/* Avatar */}
          <div className="w-36 h-36 rounded-full bg-inv-border flex items-center justify-center">
            <User size={64} className="text-inv-label" />
          </div>

          {/* Name + role */}
          <div className="text-center">
            <p className="font-bold text-lg text-inv-dark">
              {MOCK_USER.first_name} {MOCK_USER.last_name}
            </p>
            <p className="text-sm text-inv-label">{MOCK_USER.role}</p>
          </div>

          {/* Details */}
          <div className="text-sm text-inv-dark space-y-1 w-full">
            <p>CC: {MOCK_USER.identification}</p>
            <p>Correo: {MOCK_USER.email}</p>
            <p>Tel: {MOCK_USER.phone}</p>
          </div>
        </div>

        {/* Right — Edit form */}
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-base font-bold tracking-widest text-inv-dark uppercase">
            Editar información personal
          </h2>

          {/* Personal fields */}
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Nombres"
              value={form.first_name}
              onChange={set("first_name")}
            />
            <Field
              label="Apellido"
              value={form.last_name}
              onChange={set("last_name")}
            />
          </div>

          <Field
            label="Correo electrónico"
            type="email"
            value={form.email}
            onChange={set("email")}
          />
          <Field
            label="Teléfono celular"
            type="tel"
            value={form.phone}
            onChange={set("phone")}
          />

          {/* Divider */}
          <div className="border-t border-inv-border" />

          {/* Password fields */}
          <Field
            label="Contraseña actual"
            type="password"
            value={form.current_password}
            onChange={set("current_password")}
          />
          <Field
            label="Nueva contraseña"
            type="password"
            value={form.new_password}
            onChange={set("new_password")}
          />
          <Field
            label="Confirmar contraseña"
            type="password"
            value={form.confirm_password}
            onChange={set("confirm_password")}
          />

          {/* Submit */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-inv-primary hover:bg-[#52449a] transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
            >
              Guardar cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
