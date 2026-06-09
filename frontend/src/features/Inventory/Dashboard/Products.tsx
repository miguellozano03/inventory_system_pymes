import { Table } from "../Components/Table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { ComboboxGeneric } from "@/components/shared/ComboboxGeneric";
import { TableSection } from "@/components/shared/TableSection";

interface Product {
  id: string;
  proveedor: string;
  categoria: string;
  nombre: string;
  descripcion: string;
  codigo: string;
  precio: string;
  unidad: string;
  stock: number;
}

const columns = [
  "Proveedor",
  "Categoría",
  "Nombre",
  "Descripción",
  "Código de barras",
  "Precio",
  "Unidad de medida",
  "Stock",
];

const mockProducts: Product[] = [
  {
    id: "1",
    proveedor: "TecnoWorld",
    categoria: "Periféricos",
    nombre: "Teclado Mecánico RGB",
    descripcion: "Switch Blue, Layout Español",
    codigo: "770123456001",
    precio: "185.000",
    unidad: "UND",
    stock: 25,
  },
  {
    id: "2",
    proveedor: "LogiStore",
    categoria: "Mouse",
    nombre: "Mouse Inalámbrico G502",
    descripcion: "Sensor HERO 25K, Negro",
    codigo: "770123456002",
    precio: "210.000",
    unidad: "UND",
    stock: 12,
  },
  {
    id: "3",
    proveedor: "OfficeSupply",
    categoria: "Muebles",
    nombre: "Silla Ergonómica Pro",
    descripcion: "Soporte lumbar ajustable",
    codigo: "770123456003",
    precio: "450.000",
    unidad: "UND",
    stock: 5,
  },
];

// Combobox options for filters
const categories = ["Periféricos", "Mouse", "Muebles"];
const providers = ["TecnoWorld", "LogiStore", "OfficeSupply"];
const priceRanges = ["<100.000", "100.000-300.000", ">300.000"];
const stockRanges = ["0-5", "6-20", ">20"];

export function ProductDashboard() {
  return (
    <div className="w-full min-h-[calc(100vh-3rem)] space-y-6 rounded-xl bg-card p-6 shadow-sm">
      <h1>Productos Inventario</h1>

      <TableSection
        filters={
          <>
            <ComboboxGeneric items={categories} placeholder="Categoría" />
            <ComboboxGeneric items={providers} placeholder="Proveedor" />
            <ComboboxGeneric items={priceRanges} placeholder="Precio" />
            <ComboboxGeneric items={stockRanges} placeholder="Stock" />
          </>
        }
        action={
          <Button className="cursor-pointer">
            Añadir producto <Plus />
          </Button>
        }
      >
        <Table headers={columns} data={mockProducts} />
      </TableSection>

    </div>
  );
}