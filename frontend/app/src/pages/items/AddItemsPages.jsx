import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import { ItemContext } from "../../context/ItemContext";
import usePostData from "../../hooks/usePostData";
import useFetchData from "../../hooks/useFetchData";
import { addItemSchema } from "../../validation/schemas";
import FormComponent from "../../components/FormComponent";
import useAuth from "../../hooks/useAuth";
import { getImageUrl } from "../../services/s3Service"; // Assurez-vous que le chemin est correct

const AddItemPage = () => {
  const { postData, loading } = usePostData("/items");
  const { data: subcategories, loading: subLoading } = useFetchData("/subcategories");
  const { user } = useAuth();
  const navigate = useNavigate();
  const { refetch } = useContext(ItemContext);
  const generatedId = useRef(`${Date.now()}`).current;

  const fields = [
    { 
      name: "name", 
      label: "Nom de l'objet", 
      helperText: "Indique un nom clair pour ton objet" 
    },
    { 
      name: "description", 
      label: "Description", 
      type: "textarea" 
    },
    { 
      name: "picture", 
      label: "Ajoute ton Image", 
      type: "file" 
    }, 
    {
      name: "subcategory_id",
      label: "Sous-Categorie",
      type: "select",
      options: subcategories ? subcategories.map((sub) => ({ 
        value: sub.id, 
        label: sub.name 
      })) : [],
    },
    { 
      name: "status", 
      label: "Status", 
      type: "select", 
      options: [
        { value: "Available", label: "Disponible" },
        { value: "Unavailable", label: "Indisponible" },
      ]
    },
  ];

  const handleSubmit = async (formData) => {
    console.log("Data sent to onSubmit:", formData);

    let finalPictureUrl = formData.picture;

    // Si une image a été uploadée et renvoie une URL S3
    if (formData.picture && typeof formData.picture === 'string' && formData.picture.startsWith('https://')) {
      const fileKey = formData.picture.split('.amazonaws.com/')[1];
      if (fileKey) {
        try {
          finalPictureUrl = await getImageUrl(fileKey); // Générer une URL signée
          console.log("✅ URL signée générée:", finalPictureUrl);
        } catch (error) {
          console.error("❌ Erreur lors de la génération de l'URL signée:", error);
          return; // Arrêter si la génération échoue
        }
      }
    }

    const response = await postData(
      { 
        ...formData, 
        user_id: user.id,
        picture: finalPictureUrl // Utiliser l'URL signée ou l'URL originale si pas de modification
      },
      "Objet ajouté avec succès !",
      "Échec de l'ajout de l'objet."
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
      entityType="item"
      entityId={generatedId}
      title="Ajoute un nouvel objet"
    />
  );
};

export default AddItemPage;