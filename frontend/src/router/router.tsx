import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage } from "@/pages/Auth";
import {
  Product,
  Customers,
  Transactions,
  Profile,
  Settings,
} from "@/pages/Inventory";
import { InventoryLayout } from "@/layouts";
import { PublicRoute, ProtectedRoute } from "./routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard/inventory" replace />,
  },

  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <InventoryLayout />,
        children: [
          { path: "inventory", element: <Product /> },
          { path: "customers", element: <Customers /> },
          { path: "transactions", element: <Transactions /> },
          { path: "profile", element: <Profile /> },
          { path: "settings", element: <Settings /> },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <div>404 - Not Found</div>,
  },
]);
