import { useState, useEffect } from "react";
import { User as UserIcon } from "lucide-react";
import { useMe } from "@/hooks/auth/useMe";
import { useUpdateProfile } from "@/hooks/auth/useUpdateProfile";
import { useChangePassword } from "@/hooks/auth/useChangePassword";

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
  const { user, setUser, isLoading: isLoadingUser } = useMe();
  const {
    updateProfile,
    isLoading: isSavingProfile,
    error: profileError,
  } = useUpdateProfile();
  const {
    changePassword,
    isLoading: isSavingPassword,
    error: passwordError,
    success: passwordSuccess,
  } = useChangePassword();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [passwordMismatch, setPasswordMismatch] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    }
  }, [user]);

  const setField = (key: keyof typeof form) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const setPasswordField = (key: keyof typeof passwordForm) => (val: string) =>
    setPasswordForm((prev) => ({ ...prev, [key]: val }));

  const handleSaveProfile = async () => {
    if (!user) return;

    const payload: Record<string, string> = {};
    if (form.first_name !== user.first_name)
      payload.first_name = form.first_name;
    if (form.last_name !== user.last_name) payload.last_name = form.last_name;
    if (form.email !== user.email) payload.email = form.email;

    if (Object.keys(payload).length === 0) return;

    const updated = await updateProfile(payload);
    if (updated) setUser(updated);
  };

  const handleChangePassword = async () => {
    setPasswordMismatch(false);

    if (!passwordForm.current_password || !passwordForm.new_password) return;

    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setPasswordMismatch(true);
      return;
    }

    const ok = await changePassword({
      old_password: passwordForm.current_password,
      new_password: passwordForm.new_password,
    });

    if (ok) {
      setPasswordForm({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    }
  };

  if (isLoadingUser) {
    return (
      <div className="text-center text-inv-label py-10">Cargando perfil...</div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-red-500 py-10">
        No se pudo cargar el perfil.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      <h1 className="text-center text-2xl font-bold text-inv-dark tracking-widest uppercase">
        Mi Perfil
      </h1>

      <div className="bg-white rounded-2xl border border-inv-border p-8 flex gap-10">
        {/* Left — Avatar + info */}
        <div className="flex flex-col items-center gap-4 min-w-[200px] max-w-[220px] bg-inv-bg-main rounded-xl p-6">
          <div className="w-36 h-36 rounded-full bg-inv-border flex items-center justify-center">
            <UserIcon size={64} className="text-inv-label" />
          </div>

          <div className="text-center">
            <p className="font-bold text-lg text-inv-dark">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-sm text-inv-label">{user.role}</p>
          </div>

          <div className="text-sm text-inv-dark space-y-1 w-full">
            <p>CC: {user.identification}</p>
            <p>Correo: {user.email}</p>
          </div>
        </div>

        {/* Right — Edit form */}
        <div className="flex-1 flex flex-col gap-5">
          <h2 className="text-base font-bold tracking-widest text-inv-dark uppercase">
            Editar información personal
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Nombres"
              value={form.first_name}
              onChange={setField("first_name")}
            />
            <Field
              label="Apellido"
              value={form.last_name}
              onChange={setField("last_name")}
            />
          </div>

          <Field
            label="Correo electrónico"
            type="email"
            value={form.email}
            onChange={setField("email")}
          />

          {profileError && (
            <p className="text-sm text-red-500">{profileError}</p>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleSaveProfile}
              disabled={isSavingProfile}
              className="flex items-center gap-2 bg-inv-primary hover:bg-[#52449a] disabled:opacity-50 transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
            >
              {isSavingProfile ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>

          <div className="border-t border-inv-border" />

          <h2 className="text-base font-bold tracking-widest text-inv-dark uppercase">
            Cambiar contraseña
          </h2>

          <Field
            label="Contraseña actual"
            type="password"
            value={passwordForm.current_password}
            onChange={setPasswordField("current_password")}
          />
          <Field
            label="Nueva contraseña"
            type="password"
            value={passwordForm.new_password}
            onChange={setPasswordField("new_password")}
          />
          <Field
            label="Confirmar contraseña"
            type="password"
            value={passwordForm.confirm_password}
            onChange={setPasswordField("confirm_password")}
          />

          {passwordMismatch && (
            <p className="text-sm text-red-500">Las contraseñas no coinciden</p>
          )}
          {passwordError && (
            <p className="text-sm text-red-500">{passwordError}</p>
          )}
          {passwordSuccess && (
            <p className="text-sm text-green-600">{passwordSuccess}</p>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleChangePassword}
              disabled={isSavingPassword}
              className="flex items-center gap-2 bg-inv-primary hover:bg-[#52449a] disabled:opacity-50 transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
            >
              {isSavingPassword ? "Cambiando..." : "Cambiar contraseña"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
