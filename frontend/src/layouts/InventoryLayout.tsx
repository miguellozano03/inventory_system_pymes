import { Sidebar } from "@/pages/Dashboard/components";
import { Outlet } from "react-router-dom";

export function InventoryLayout() {
  return (
    <div className="flex h-screen w-full bg-inv-bg-main">
      <div className="border-r border-inv-border w-20 shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto p-6">
        <Outlet />
      </div>
    </div>
  );
}
