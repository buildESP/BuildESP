import FormComponent from "../components/FormComponent";
import { itemUpdateSchema } from "../validation/schemas";
import useFetchData from "../hooks/useFetchData";

const ItemEditForm = ({ item, onSubmit, loading }) => {

    const { data: subcategories, loading: subLoading } = useFetchData("/subcategories");

    const fields = [
        { name: "name", label: "Nom de l'item" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "picture", label: "Image URL" },
        {
          name: "subcategory_id",
          label: "Sous-catégorie",
          type: "select",
          options: subcategories
            ? subcategories.map((sub) => ({ value: sub.id, label: sub.name }))
            : [],
            defaultValue: item.subcategory_id,
        },
        {
          name: "status",
          label: "Statut",
          type: "select",
          options: [
            { value: "Available", label: "Disponible" },
            { value: "Unavailable", label: "Indisponible" },
          ],
        },
      ];

      return (
        <FormComponent
          schema={itemUpdateSchema}
          fields={fields}
          onSubmit={onSubmit}
          submitLabel="Mettre à jour"
          loading={loading || subLoading} 
          title="Modifier l'item"
          defaultValues={{ ...item, subcategory_id: item.subcategory_id }}        />
      );
    };
    

export default ItemEditForm;
