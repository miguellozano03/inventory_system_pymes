import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage } from "@/pages/Auth";
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
        element: (
          <div>
            ¡Bienvenido al Dashboard del Inventario! (Aquí va tu componente)
          </div>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <div>404 - Not Found</div>,
  },
]);
