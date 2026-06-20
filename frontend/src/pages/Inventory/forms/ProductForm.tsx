import { useNavigate } from "react-router-dom";
import { useProduct, useProducts } from "@/hooks/inventory/product";
import type { ProductCreate, ProductUpdate } from "@/types/inventory";
import ProductFormFields from "../components/forms/ProductFormFields";

interface Props {
  isEdit: boolean;
  id?: string;
}

export default function ProductForm({ isEdit, id }: Props) {
  const navigate = useNavigate();

  const { product, update, loading, updating } = useProduct(id ?? "");
  const { create, creating } = useProducts();

  const handleSubmit = async (payload: ProductCreate | ProductUpdate) => {
    try {
      if (isEdit && id) {
        await update(payload as ProductUpdate);
      } else {
        await create(payload as ProductCreate);
      }

      navigate("/dashboard/products");
    } catch (error) {
      console.error("[ProductForm]", error);
    }
  };
  console.log("ProductFormFields:", ProductFormFields);

  return (
    <ProductFormFields
      isEdit={isEdit}
      product={product}
      loading={loading || updating || creating}
      onSubmit={handleSubmit}
      onCancel={() => navigate(-1)}
    />
  );
}
