import { Link } from "react-router-dom";
import { useState } from "react";

import { useRegister } from "@/hooks/auth";

export const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    identification: "",
    company_name: "",
    company_nit: "",
    company_email: "",
    company_phone: "",
  });

  const { registerUser } = useRegister();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await registerUser(formData);
    } catch (error) {}
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 font-sans">
      <div className="hidden flex-1 h-screen bg-[#634b9f] p-12 lg:flex lg:flex-col lg:justify-center lg:items-center">
        <img
          src="/auth/inventory_system_register.png"
          alt="Warehouse illustration"
          className="w-full h-full object-cover mix-blend-luminosity opacity-40 p-10"
        />
      </div>

      {/* Sección Derecha: Formulario */}
      <div className="flex flex-col w-full flex-1 p-8 sm:p-12">
        <h2 className="mb-8 text-3xl font-bold text-[#634b9f]">
          Registra un nuevo usuario
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Fila: Nombre y Apellido */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Nombre
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none transition focus:border-[#634b9f] focus:ring-1 focus:ring-[#634b9f]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Apellido
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none transition focus:border-[#634b9f] focus:ring-1 focus:ring-[#634b9f]"
                required
              />
            </div>
          </div>

          {/* Fila: Email y Contraseña */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none transition focus:border-[#634b9f] focus:ring-1 focus:ring-[#634b9f]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none transition focus:border-[#634b9f] focus:ring-1 focus:ring-[#634b9f]"
                required
              />
            </div>
          </div>

          {/* Identificación */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Identificación
            </label>
            <input
              type="text"
              name="identification"
              value={formData.identification}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none transition focus:border-[#634b9f] focus:ring-1 focus:ring-[#634b9f]"
              required
            />
          </div>

          <hr className="my-6 border-gray-100" />
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Datos de la Empresa
          </p>

          {/* Fila: Nombre Empresa y NIT */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Razón Social / Nombre
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none transition focus:border-[#634b9f] focus:ring-1 focus:ring-[#634b9f]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                NIT
              </label>
              <input
                type="text"
                name="company_nit"
                value={formData.company_nit}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none transition focus:border-[#634b9f] focus:ring-1 focus:ring-[#634b9f]"
              />
            </div>
          </div>

          {/* Fila: Correo Empresa y Teléfono */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Correo corporativo
              </label>
              <input
                type="email"
                name="company_email"
                value={formData.company_email}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none transition focus:border-[#634b9f] focus:ring-1 focus:ring-[#634b9f]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="company_phone"
                value={formData.company_phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none transition focus:border-[#634b9f] focus:ring-1 focus:ring-[#634b9f]"
              />
            </div>
          </div>

          {/* Botón de Registro */}
          <div className="pt-4 text-right">
            <button
              type="submit"
              className="w-full rounded-xl bg-[#634b9f] px-8 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-[#523d85] active:scale-[0.98] sm:w-auto"
            >
              REGISTRAR
            </button>
          </div>

          <p>
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="text-inv-primary font-bold hover:underline"
            >
              Inicia sessión aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
