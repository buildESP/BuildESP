import FormComponent from "../FormComponent";
import usePutData from "@/hooks/usePutData";
import { categoryUpdateSchema } from "@/validation/schemas";
import { useRef } from "react";


const AdminCategoryForm = ({ category, endpoint, onSuccess }) => {
  const { putData, loading } = usePutData(endpoint);
  const generatedId = useRef(`${Date.now()}`).current;

  const fields = [
    { name: "name", label: "Nom de la catégorie" },
    { name: "image_url", label: "Image", type: "file" },
  ];

  const handleSubmit = async (formData) => {
    const completedData = {
      name: formData.name ?? category.name,
      image_url: formData.image_url ?? category.image_url,
    };

    const result = await putData(completedData, category);
    if (result) onSuccess?.();
  };

  return (
    <FormComponent
      schema={categoryUpdateSchema}
      fields={fields}
      defaultValues={{
        ...category,
        name: category.name,
        image_url: category.image_url,
      }}
      entityType="category"
      entityId={category.id || generatedId}
      onSubmit={handleSubmit}
      submitLabel="Mettre à jour la catégorie"
      loading={loading}
    />
  );
};

export default AdminCategoryForm;
