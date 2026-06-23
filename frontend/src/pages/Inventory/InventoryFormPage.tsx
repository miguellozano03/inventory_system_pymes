import { useParams, useNavigate } from "react-router-dom";

import {
  ProductForm,
  CustomerForm,
  TransactionForm,
  CategoryForm,
  SupplierForm,
} from "./forms";

export default function InventoryFormPage() {
  const { module, action, id } = useParams<{
    module: string;
    action: string;
    id?: string;
  }>();

  const navigate = useNavigate();

  const moduleNames: Record<string, string> = {
    product: "Producto",
    category: "Categoría",
    customer: "Cliente",
    supplier: "Proveedor",
    transaction: "Transacción",
  };

  const currentModuleName = moduleNames[module || ""] || "Elemento";
  const isEdit = action === "edit";

  const renderForm = () => {
    switch (module) {
      case "product":
        return <ProductForm isEdit={isEdit} id={id} />;

      case "customer":
        return <CustomerForm isEdit={isEdit} id={id} />;

      case "transaction":
        return <TransactionForm />;

      case "category":
        return <CategoryForm isEdit={isEdit} id={id} />;

      case "supplier":
        return <SupplierForm isEdit={isEdit} id={id} />;

      default:
        return <p className="text-red-500">Módulo no válido</p>;
    }
  };

  return (
    <div className="min-h-screen bg-inv-bg-main p-6 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="bg-inv-dark p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">
              {isEdit ? "Modificar" : "Crear"} {currentModuleName}
            </h1>

            <p className="text-sm opacity-80 mt-1">
              {isEdit
                ? `Editando ID: ${id}`
                : `Nuevo registro de ${currentModuleName.toLowerCase()}`}
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="text-xs border px-4 py-2 rounded hover:bg-white/10"
          >
            Volver
          </button>
        </div>

        <div className="p-8">{renderForm()}</div>
      </div>
    </div>
  );
}
