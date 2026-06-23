import { useNavigate } from "react-router-dom";
import type { SupplierCreate, SupplierUpdate } from "@/types/inventory";

import { useSupplier, useSuppliers } from "@/hooks/inventory/supplier";
import SupplierFormFields from "../components/forms/SupplierFormFields";

interface Props {
  isEdit: boolean;
  id?: string;
}

export default function SupplierForm({ isEdit, id }: Props) {
  const navigate = useNavigate();

  const { supplier, update, loading, updating } = useSupplier(id ?? "");
  const { create, creating } = useSuppliers();

  const handleSubmit = async (payload: SupplierCreate | SupplierUpdate) => {
    try {
      if (isEdit && id) {
        await update(payload as SupplierUpdate);
      } else {
        await create(payload as SupplierCreate);
      }

      navigate("/dashboard/suppliers");
    } catch (error) {
      console.error("[SupplierForm]", error);
    }
  };

  return (
    <SupplierFormFields
      isEdit={isEdit}
      supplier={supplier}
      loading={loading || creating || updating}
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
    />
  );
}
