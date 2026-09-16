import { useNavigate } from "react-router-dom";
import { useTransactions } from "@/hooks/inventory/transactions/useTransactions";
import type { TransactionCreate } from "@/types/inventory";

import TransactionFormFields from "../components/forms/TransactionFormFields";

export default function TransactionForm() {
  const navigate = useNavigate();

  const { create, loading, creating } = useTransactions();

  const handleSubmit = async (payload: TransactionCreate) => {
    try {
      await create(payload);

      navigate("/dashboard/transactions/");
    } catch (error) {
      console.error("[TransactionForm]", error);
    }
  };

  return (
    <TransactionFormFields
      loading={loading || creating}
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
    />
  );
}
