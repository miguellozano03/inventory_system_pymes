import { Table } from "../Components/Table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TableSection } from "@/components/shared/TableSection";

const columns: string[] = ["ID", "Fecha de transacción", "Tipo de transacción", "Vendedor", "Total", "Detalles"];

const mockTransactions: any[] = [];

export const TransactionDashboard = () => {
  return (
    <div className="w-full min-h-[calc(100vh-3rem)] space-y-6 rounded-xl bg-card p-6 shadow-sm">
      <h1>Transacciones</h1>

      <TableSection
        filters={<></>}
        action={
          <Button className="cursor-pointer">
            Añadir transacción <Plus />
          </Button>
        }
      >
        <Table headers={columns} data={mockTransactions} />
      </TableSection>
    </div>
  );
};
