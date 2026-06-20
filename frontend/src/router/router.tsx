import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage } from "@/pages/Auth";
import {
  Product,
  Customers,
  Transactions,
  Profile,
  Settings,
} from "@/pages/Inventory";
import InventoryFormPage from "@/pages/Inventory/InventoryFormPage"; // Importamos tu nuevo formulario
import { InventoryLayout } from "@/layouts";
import { PublicRoute, ProtectedRoute } from "./routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
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
          { path: "products", element: <Product /> },
          { path: "customers", element: <Customers /> },
          { path: "transactions", element: <Transactions /> },
          { path: "profile", element: <Profile /> },
          { path: "settings", element: <Settings /> },

          {
            path: ":module/:action/:id?",
            element: <InventoryFormPage />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <div>404 - Not Found</div>,
  },
]);
