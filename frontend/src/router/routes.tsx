import { createBrowserRouter } from "react-router-dom";
import { Login, Register } from "@/features/Auth";
import {
  MainLayout,
  ProductDashboard,
  SupplierDashboard,
  HomeDashboard,
  TransactionDashboard,
  Config,
  Account,
} from "@/features/Inventory/Dashboard";
import AnimatedLayout from "@/layouts/AnimatedLayout";

export const router = createBrowserRouter([
  {
    element: <AnimatedLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <h1>Home</h1> },
      { path: "products", element: <ProductDashboard /> },
      { path: "transactions", element: <TransactionDashboard /> },
      { path: "suppliers", element: <SupplierDashboard /> },
      { path: "home", element: <HomeDashboard /> },
      { path: "config", element: <Config /> },
      { path: "account", element: <Account /> },
    ],
  },
]);
