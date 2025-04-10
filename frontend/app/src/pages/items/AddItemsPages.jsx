import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import { ItemContext } from "../../context/ItemContext";
import usePostData from "../../hooks/usePostData";
import useFetchData from "../../hooks/useFetchData";
import { addItemSchema } from "../../validation/schemas";
import FormComponent from "../../components/FormComponent";
import useAuth from "../../hooks/useAuth";

const AddItemPage = () => {
  const { postData, loading } = usePostData("/items");
  const { data: subcategories, loading: subLoading } = useFetchData("/subcategories");
  const { user } = useAuth();
  const navigate = useNavigate(); 
  const { refetch  } = useContext(ItemContext); // ✅ Get refetch function
  const generatedId = useRef(`${Date.now()}`).current;


  const fields = [
    { name: "name", label: "Nom de l'objet", helperText: "Indique un nom claire pour ton objet" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "picture", label: "Ajoute ton Image", type: "file" }, 
    {
      name: "subcategory_id",
      label: "Sous-Categorie",
      type: "select",
      options: subcategories ? subcategories.map((sub) => ({ value: sub.id, label: sub.name })) : [],
    },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Available", label: "Disponible" },
      { value: "Unavailable", label: "Indisponible" },
    ]},
  ];
  

  const handleSubmit = async (formData) => {

    console.log("Form In page submit:", formData); 

    const response = await postData(
      { ...formData, user_id: user.id },
      "Objet ajouté avec succes!",
      "Echec de l'ajout de l'objet."
    );
  
    if (response) {
      await refetch(); 
      navigate("/my-items"); 
    }
  };

  return (
    <FormComponent
      schema={addItemSchema}
      fields={fields}
      onSubmit={handleSubmit}
      submitLabel="Partager"
      loading={loading || subLoading} 
      entityType = "item"
      entityId= {generatedId}
      title="Ajoute un nouvel objet"
    />
  );
};

export default AddItemPage;
