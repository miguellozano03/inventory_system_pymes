import { Link } from "react-router-dom";
import {
  Archive,
  ArrowLeftRight,
  Users,
  CircleUserRound,
  Bolt,
  Tags,
  Truck,
  LogOut,
} from "lucide-react";

import { useLogout } from "@/hooks/auth";

export const Sidebar = () => {
  const { logoutUser } = useLogout();

  return (
    <div className="flex flex-col h-screen w-full justify-between items-center py-8">
      <div className="flex flex-col gap-8">
        <Link to="/dashboard/categories" title="Categorías">
          <Tags size={40} />
        </Link>

        <Link to="/dashboard/products" title="Productos">
          <Archive size={40} />
        </Link>

        <Link to="/dashboard/transactions" title="Transacciones">
          <ArrowLeftRight size={40} />
        </Link>

        <Link to="/dashboard/customers" title="Clientes">
          <Users size={40} />
        </Link>

        <Link to="/dashboard/suppliers" title="Proveedores">
          <Truck size={40} />
        </Link>
      </div>

      <div className="flex flex-col gap-8">
        <Link to="/dashboard/settings" title="Configuración">
          <Bolt size={40} />
        </Link>

        <Link to="/dashboard/profile" title="Perfil">
          <CircleUserRound size={40} />
        </Link>

        <button
          type="button"
          onClick={logoutUser}
          title="Cerrar sesión"
          className="cursor-pointer"
        >
          <LogOut size={40} />
        </button>
      </div>
    </div>
  );
};
