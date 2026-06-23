import { useNavigate } from "react-router-dom";
import type { CategoryCreate, CategoryUpdate } from "@/types/inventory";
import { useCategory, useCategories } from "@/hooks/inventory/category";

import CategoryFormFields from "../components/forms/CategoryFormFields";

interface Props {
  isEdit: boolean;
  id?: string;
}

export default function CategoryForm({ isEdit, id }: Props) {
  const navigate = useNavigate();

  const { category, update, loading, updating } = useCategory(id ?? "");
  const { create, creating } = useCategories();

  const handleSubmit = async (payload: CategoryCreate | CategoryUpdate) => {
    try {
      if (isEdit && id) {
        await update(payload as CategoryUpdate);
      } else {
        await create(payload as CategoryCreate);
      }

      navigate("/dashboard/categories");
    } catch (error) {
      console.error("[CategoryForm]", error);
    }
  };

  return (
    <CategoryFormFields
      isEdit={isEdit}
      category={category}
      loading={loading || creating || updating}
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
    />
  );
}
