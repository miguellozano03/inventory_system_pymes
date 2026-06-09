import {
  Package,
  ArrowLeftRight,
  Users,
  UserCircle,
  Settings,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Sidebar = () => {
  const iconClasses =
    "size-9 text-foreground transition-transform hover:scale-110";
  return (
    <nav className="flex h-screen w-20 flex-col border-r border-border bg-sidebar py-4 shadow-sm">
      <div className="flex flex-col gap-2 px-2 items-center">
        <Link to="/home">
          <Button
            variant="ghost"
            className="h-16 w-16 rounded-xl cursor-pointer"
          >
            <Home className={iconClasses} />
          </Button>
        </Link>

        <Link to="/products">
          <Button
            variant="ghost"
            className="h-16 w-16 rounded-xl cursor-pointer"
          >
            <Package className={iconClasses} />
          </Button>
        </Link>

        <Link to="/transactions">
          <Button
            variant="ghost"
            className="h-16 w-16 rounded-xl cursor-pointer"
          >
            <ArrowLeftRight className={iconClasses} />
          </Button>
        </Link>

        <Link to="/suppliers">
          <Button
            variant="ghost"
            className="h-16 w-16 rounded-xl cursor-pointer"
          >
            <Users className={iconClasses} />
          </Button>
        </Link>
      </div>

      <div className="mt-auto flex flex-col items-center gap-6">
        <Link to="/account">
          <Button
            variant="ghost"
            className="h-16 w-16 rounded-xl cursor-pointer"
          >
            <UserCircle className={iconClasses} />
          </Button>
        </Link>

        <Link to="/config">
          <Button
            variant="ghost"
            className="h-16 w-16 rounded-xl cursor-pointer"
          >
            <Settings className={iconClasses} />
          </Button>
        </Link>
      </div>
    </nav>
  );
};
