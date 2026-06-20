import { useParams, useNavigate } from "react-router-dom";

import { CustomerForm, ProductForm } from "./forms";

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
  };

  const currentModuleName = moduleNames[module || ""] || "Elemento";
  const isEdit = action === "edit";

  const renderFormFields = () => {
    switch (module) {
      case "product":
        return <ProductForm isEdit={isEdit} id={id} />;
      // case "category":
      //   return <CategoryFormFields isEdit={isEdit} id={id} />;
      case "customer":
        return <CustomerForm isEdit={isEdit} id={id} />;
      case "supplier":
        return <SupplierFormFields isEdit={isEdit} id={id} />;
      default:
        return <p className="text-red-500">Módulo de inventario no válido.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-inv-bg-main p-6 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white rounded-xl border border-inv-border shadow-sm overflow-hidden">
        <div className="bg-inv-dark p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold tracking-wide">
              {isEdit ? "Modificar" : "Añadir"} {currentModuleName}
            </h1>
            <p className="text-sm text-inv-border mt-1">
              {isEdit
                ? `Actualizando registro único ID: ${id}`
                : `Completa los datos del nuevo ${currentModuleName.toLowerCase()}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-xs bg-transparent hover:bg-white/10 border border-white/20 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Volver
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">{renderFormFields()}</div>
        </div>
      </div>
    </div>
  );
}
