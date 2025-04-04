import FormComponent from "../FormComponent";
import usePutData from "@/hooks/usePutData";
import { subcategoryUpdateSchema } from "@/validation/schemas";

const AdminSubcategoryForm = ({ subcategory, endpoint, onSuccess }) => {
  const { putData, loading } = usePutData(endpoint);

  const fields = [
    { name: "name", label: "Nom de la sous-catégorie" },
    { name: "image_url", label: "Image", type: "file" },

  ];

  const handleSubmit = async (formData) => {
    const updatedData = {
      name: formData.name ?? subcategory.name,
      image_url: formData.image_url ?? subcategory.image_url,

    };

    const result = await putData(updatedData, subcategory);
    if (result) onSuccess?.();
  };

  return (
    <FormComponent
    schema={subcategoryUpdateSchema} // ✅ validation Zod

      fields={fields}
      defaultValues={{
        ...subcategory,
        name: subcategory.name,
        image_url: subcategory.image_url ?? "",
      }}      onSubmit={handleSubmit}
      submitLabel="Mettre à jour la sous-catégorie"
      loading={loading}
    />
  );
};

export default AdminSubcategoryForm;
