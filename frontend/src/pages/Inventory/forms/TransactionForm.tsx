import { useNavigate } from "react-router-dom";
import { useTransactions } from "@/hooks/inventory/transactions/useTransactions";
import type { TransactionCreate } from "@/types/inventory";

import TransactionFormFields from "../components/forms/TransactionFormFields";

interface Props {
  id?: string;
}

export default function TransactionForm({ id }: Props) {
  const navigate = useNavigate();

  const { transactions, create, loading, creating } = useTransactions();

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
