import { NavLink } from "react-router-dom";
import { Mail } from "lucide-react";
import { PasswordInput } from "../Components/PasswordInput";
import { IconInput } from "../Components/IconInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const Login = () => {
  return (
    <main className="flex h-screen w-full select-none">
      <div className="flex-1 flex flex-col justify-center items-center px-10 bg-background">
        <div className="w-full max-w-md flex flex-col gap-8">
          <h1 className="text-5xl font-bold text-primary">Iniciar sesion</h1>

          <form action="" className="flex flex-col gap-6">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                  Email
                </label>
                <IconInput
                  icon={<Mail size={18} className="text-foreground" />}
                  placeholder="Ingresa tu correo"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                  Contraseña
                </label>
                <PasswordInput placeholder="Ingresa tu contraseña" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm text-foreground cursor-pointer select-none"
              >
                Mantener sesion iniciada
              </label>
            </div>

            <Button
              type="submit"
              className="uppercase font-bold tracking-widest h-14 w-full bg-primary text-white rounded-md mt-4 cursor-pointer"
            >
              Iniciar sesion
            </Button>
          </form>

          <p>
            ¿No tienes una cuenta?{" "}
            <NavLink
              to="/register"
              className="text-primary font-semibold px-1 rounded-md transition-all duration-300 ease-out hover:translate-x-0.5 hover:bg-primary/10 active:scale-95"
            >
              Crea una aqui
            </NavLink>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-primary overflow-hidden rounded-l-[40px]">
        <img
          src="img/inventory_system_login.png"
          alt="Warehouse illustration"
          className="w-full h-full object-cover pointer-events-none opacity-55"
        />
      </div>
    </main>
  );
};
