import FormComponent from "../FormComponent";
import { itemUpdateSchema } from "../../validation/schemas";
import useFetchData from "../../hooks/useFetchData";
import { useRef } from "react";

const ItemEditForm = ({ item, onSubmit, loading }) => {

    const { data: subcategories, loading: subLoading } = useFetchData("/subcategories");
    const generatedId = useRef(`${Date.now()}`).current;
  
    const fields = [
        { name: "name", label: "Nom de l'objet" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "picture", label: "Image URL", type: "file" }, 
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
        entityType = "item"
        entityId= {item.id || generatedId}
        defaultValues={{
          ...item,
          picture: item.picture ?? "",
        }}
      />
      
      );
    };
    

export default ItemEditForm;
