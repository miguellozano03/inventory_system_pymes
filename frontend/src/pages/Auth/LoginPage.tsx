import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/auth";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, isLoading, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
    } catch (err) {
      setPassword("");
    }
  };

  return (
    <div className="flex h-screen w-full bg-white">
      <div className="flex flex-1 items-center justify-center bg-white">
        <div className="w-full max-w-md px-8 flex flex-col gap-8">
          <h1 className="text-[44px] font-bold text-[#3a3543] tracking-tight leading-tight">
            Iniciar sesion
          </h1>

          <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-[15px] font-medium text-[#8a8a8a]">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-xl border border-[#dcdcdc] focus:outline-none focus:border-purple-600 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Input de Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[15px] font-medium text-[#8a8a8a]">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2.5 rounded-xl border border-[#dcdcdc] focus:outline-none focus:border-purple-600 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <div className="error-alert">{error}</div>}

            <button
              type="submit"
              className="mt-6 w-full bg-[#634b9f] text-white py-3.5 rounded-xl font-black text-xl italic tracking-wider uppercase shadow-md hover:bg-[#523d85] transition-all"
            >
              {isLoading ? "Cargando..." : "Entrar al Sistema"}
            </button>
          </form>

          <p>
            ¿No tienes una cuenta?.{" "}
            <Link
              to="/register"
              className="text-inv-primary font-bold hover:underline"
            >
              Crea una aquí
            </Link>
          </p>
        </div>
      </div>
      <div className="hidden md:flex flex-1 bg-white">
        <div className="w-full h-full bg-[#634b9f] rounded-l-4xl overflow-hidden flex items-center justify-center relative">
          <img
            src="/auth/inventory_system_login.png"
            alt="Warehouse illustration"
            className="w-full h-full object-cover mix-blend-luminosity opacity-40 p-10"
          />
        </div>
      </div>
    </div>
  );
};
