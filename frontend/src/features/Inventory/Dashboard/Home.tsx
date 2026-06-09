import { Link } from "react-router-dom";
import {
  Package,
  ArrowLeftRight,
  Users,
  UserCircle,
  Settings,
  Home,
} from "lucide-react";

export const HomeDashboard = () => {
  const cards = [
    {
      title: "Productos",
      description: "Gestiona tu inventario",
      href: "/products",
      icon: Package,
      color: "bg-blue-50 dark:bg-blue-950",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Transacciones",
      description: "Registra tus movimientos",
      href: "/transactions",
      icon: ArrowLeftRight,
      color: "bg-green-50 dark:bg-green-950",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Proveedores",
      description: "Administra tus proveedores",
      href: "/suppliers",
      icon: Users,
      color: "bg-purple-50 dark:bg-purple-950",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Mi Cuenta",
      description: "Gestiona tu perfil",
      href: "/account",
      icon: UserCircle,
      color: "bg-amber-50 dark:bg-amber-950",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Configuración",
      description: "Ajustes del sistema",
      href: "/config",
      icon: Settings,
      color: "bg-gray-50 dark:bg-gray-950",
      iconColor: "text-gray-600 dark:text-gray-400",
    },
  ];

  return (
    <main className="min-h-[85vh] flex items-center">
      <section className="w-full max-w-7xl min-h-[90vh] rounded-2xl border bg-card shadow-sm p-8 flex flex-col">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Inicio</h1>

          <p className="text-muted-foreground mt-2">
            Bienvenido a tu sistema de inventarios
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 flex-1">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link key={card.href} to={card.href} className="h-full">
                <article
                  className={`
                  ${card.color}
                  h-full rounded-xl p-6 border
                  transition-all duration-200
                  hover:scale-[1.02]
                  hover:shadow-lg
                `}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-background border">
                      <Icon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">{card.title}</h3>

                      <p className="text-sm text-muted-foreground mt-1">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
};
