import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages/Auth";

export const router = createBrowserRouter([
  {
    path: "/",
    // Si entran a la raíz, los mandamos directo al login por ahora
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: (
      <div className="p-8 text-2xl font-bold">
        ¡Aquí va tu tabla de inventario! 📦
      </div>
    ),
  },
  {
    path: "*",
    element: (
      <div className="h-screen flex items-center justify-center text-xl font-semibold">
        404 - Ruta no encontrada
      </div>
    ),
  },
]);
