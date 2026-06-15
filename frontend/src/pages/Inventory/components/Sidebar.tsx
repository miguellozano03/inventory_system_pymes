import { Link } from "react-router-dom";
import {
  Archive,
  ArrowLeftRight,
  Users,
  ChartColumn,
  CircleUserRound,
  Bolt,
} from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen w-full justify-between items-center py-8">
      <div className="flex flex-col gap-8">
        <Link to="/dashboard/inventory">
          <Archive size={40} />
        </Link>
        <Link to="/dashboard/transactions">
          <ArrowLeftRight size={40} />
        </Link>
        <Link to="/dashboard/customers">
          <Users size={40} />
        </Link>
        <Link to="">
          <ChartColumn size={40} />
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
