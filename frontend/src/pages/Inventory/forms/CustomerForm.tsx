import { useNavigate } from "react-router-dom";

import { useCustomer, useCustomers } from "@/hooks/inventory/customer";
import type { CustomerCreate, CustomerUpdate } from "@/types/inventory";
import CustomerFormFields from "../components/forms/CustomerFormFields";

interface Props {
  isEdit: boolean;
  id?: string;
}

export default function CustomerForm({ isEdit, id }: Props) {
  const navigate = useNavigate();

  const customerHook = useCustomer(id ?? "");
  const customersHook = useCustomers();

  const handleSubmit = async (payload: CustomerCreate | CustomerUpdate) => {
    try {
      if (isEdit && id) {
        await customerHook.update(payload as CustomerUpdate);
      } else {
        await customersHook.create(payload as CustomerCreate);
      }

      navigate("/dashboard/customers");
    } catch (error) {
      console.error("[CustomerForm]", error);
    }
  };

  return (
    <CustomerFormFields
      isEdit={isEdit}
      customer={customerHook.customer}
      loading={
        customerHook.loading || customerHook.updating || customersHook.creating
      }
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
    />
  );
}
