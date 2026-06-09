import { NavLink } from "react-router-dom";
import { Mail, IdCard } from "lucide-react";
import { PasswordInput } from "../Components/PasswordInput";
import { IconInput } from "../Components/IconInput";
import { Button } from "@/components/ui/button";

export const Register = () => {
  return (
    <main className="flex h-screen w-full select-none">
      <div className="hidden lg:flex flex-1 bg-primary overflow-hidden rounded-r-[40px]">
        <img
          src="/img/inventory_system_register.png"
          alt="Warehouse illustration"
          className="w-full h-full object-cover pointer-events-none opacity-55"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center px-10 bg-background">
        <div className="w-full max-w-md flex flex-col gap-8">
          <h1 className="text-4xl font-bold text-primary">
            Crea una nueva cuenta
          </h1>

          <form className="flex flex-col gap-6">
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
                  Identificación
                </label>
                <IconInput
                  icon={<IdCard size={18} className="text-foreground" />}
                  placeholder="Ingresa tu identificación"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                  Password
                </label>
                <PasswordInput placeholder="Ingresa tu contraseña" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                  Confirmar contraseña
                </label>
                <PasswordInput placeholder="Ingresa tu contraseña" />
              </div>
            </div>

            <Button
              type="submit"
              className="uppercase font-bold tracking-widest h-14 w-full bg-primary text-white rounded-md mt-4 cursor-pointer"
            >
              Registrar
            </Button>
          </form>

          <p>
            ¿Ya tienes una cuenta?{" "}
            <NavLink
              to="/login"
              className="text-primary font-semibold px-1 rounded-md transition-all duration-300 ease-out hover:translate-x-0.5 hover:bg-primary/10 active:scale-95"
            >
              Inicia sesion aquí
            </NavLink>
          </p>
        </div>
      </div>
    </main>
  );
};
