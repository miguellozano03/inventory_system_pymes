import { Table } from "../Components/Table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { ComboboxGeneric } from "@/components/shared/ComboboxGeneric";
import { TableSection } from "@/components/shared/TableSection";

interface Supplier {
  id: string;
  nombre: string;
  cc: string;
  telefono: string;
  email: string;
  direccion?: string;
}

const columns = [
  "Nombres",
  "Apellidos",
  "CC",
  "Teléfono",
  "Email",
  "Dirección",
  "Notas",
];

const mockSuppliers: Supplier[] = [
  {
    id: "1",
    nombre: "Andrés Pérez",
    cc: "1023456789",
    telefono: "+57 300 1234567",
    email: "andres@proveedor.com",
    direccion: "Calle 10 #20-30",
  },
  {
    id: "2",
    nombre: "María Gómez",
    cc: "1122334455",
    telefono: "+57 310 7654321",
    email: "maria@proveedor.com",
    direccion: "Carrera 5 #12-45",
  },
];

const ccOptions = ["1023456789", "1122334455"];
const phoneOptions = ["+57 300 1234567", "+57 310 7654321"];
const emailOptions = ["andres@proveedor.com", "maria@proveedor.com"];

export const SupplierDashboard = () => {
  return (
    <div className="w-full min-h-[calc(100vh-3rem)] space-y-6 rounded-xl bg-card p-6 shadow-sm">
      <h1>Proveedores Inventario</h1>

      <TableSection
        filters={
          <>
            <ComboboxGeneric items={ccOptions} placeholder="CC" />
            <ComboboxGeneric items={phoneOptions} placeholder="Teléfono" />
            <ComboboxGeneric items={emailOptions} placeholder="Email" />
          </>
        }
        action={
          <Button className="cursor-pointer">
            Añadir proveedor <Plus />
          </Button>
        }
      >
        <Table headers={columns} data={mockSuppliers} />
      </TableSection>
    </div>
  );
};
