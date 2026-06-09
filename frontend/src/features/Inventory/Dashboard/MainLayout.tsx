import { Outlet } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar";

export const MainLayout = () => {
  return (
    <main className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 overflow-auto p-6">
        <Outlet />
      </div>
    </main>
  );
};