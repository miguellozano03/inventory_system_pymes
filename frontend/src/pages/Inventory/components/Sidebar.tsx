import { Link } from "react-router-dom";
import {
  Archive,
  ArrowLeftRight,
  Users,
  ChartColumn,
  CircleUserRound,
  Bolt,
  Tags,
  Truck,
} from "lucide-react";

export const Sidebar = () => {
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

        {/* <Link to="/dashboard/reports" title="Reportes">
          <ChartColumn size={40} />
        </Link> */}

        <Link to="/dashboard/suppliers" title="Proveedores">
          <Truck size={40} />
        </Link>
      </div>

      <div className="flex flex-col gap-8">
        <Link to="/dashboard/settings">
          <Bolt size={40} />
        </Link>
        <Link to="/dashboard/profile">
          <CircleUserRound size={40} />
        </Link>
      </div>
    </div>
  );
};
