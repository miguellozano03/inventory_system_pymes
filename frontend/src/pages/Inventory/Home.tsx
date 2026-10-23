import {
  Archive,
  ArrowLeftRight,
  Tags,
  Truck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    label: "Productos",
    description: "Consulta y administra tu inventario.",
    to: "/dashboard/products",
    icon: Archive,
  },
  {
    label: "Clientes",
    description: "Gestiona la información de tus clientes.",
    to: "/dashboard/customers",
    icon: Users,
  },
  {
    label: "Proveedores",
    description: "Mantén tus proveedores al día.",
    to: "/dashboard/suppliers",
    icon: Truck,
  },
  {
    label: "Categorías",
    description: "Organiza tus productos por categoría.",
    to: "/dashboard/categories",
    icon: Tags,
  },
  {
    label: "Transacciones",
    description: "Revisa las entradas y salidas.",
    to: "/dashboard/transactions",
    icon: ArrowLeftRight,
  },
];

export default function Home() {
  return (
    <main className="flex flex-col gap-8">
      <section className="rounded-2xl bg-inv-primary px-8 py-10 text-white">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/80">
          Panel de control
        </p>
        <h1 className="text-3xl font-bold">¡Bienvenido a tu inventario!</h1>
        <p className="mt-3 max-w-2xl text-white/85">
          Administra tus productos, clientes, proveedores y movimientos desde un
          solo lugar. Selecciona una sección para comenzar.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-inv-dark">
          Accesos rápidos
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sections.map(({ label, description, to, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-start gap-4 rounded-xl border border-inv-border bg-white p-5 transition-colors hover:border-inv-primary"
            >
              <span className="rounded-lg bg-inv-bg-main p-3 text-inv-primary">
                <Icon size={22} />
              </span>
              <span>
                <span className="block font-semibold text-inv-dark">
                  {label}
                </span>
                <span className="mt-1 block text-sm text-inv-label">
                  {description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}