import usePutData from "../hooks/usePutData";
import FormComponent from "./FormComponent";
import { updateProfileSchema } from "../validation/schemas"
import { useRef } from "react";
const ProfileUpdateForm = ({ userData, onSuccess, onCancel }) => {
  const { putData, loading } = usePutData(`/users/${userData.id}`);
    const generatedId = useRef(`${Date.now()}`).current;

  const fields = [
    { name: "firstname", label: "Prénom" },
    { name: "lastname", label: "Nom" },
    { name: "email", label: "Email", type: "email", disabled: true },
    { name: "address", label: "Addresse",  },
    { name: "password", label: "Mot de passe", type: 'password' },
    { name: "phone", label: "Téléphone", type: "tel" },
    { name: "picture", label: "Photo", type: "file" },


  ];

  const handleSubmit = async (updatedData) => {
    const response = await putData(updatedData, userData, "Profil mis à jour!", "La mise à jour à échoué.");
    if (response) onSuccess(); 
  };


  return (
    <FormComponent
      schema={updateProfileSchema}
      fields={fields}
      onSubmit={handleSubmit}
      submitLabel="Mise à jour du profil"
      loading={loading}
      entityType = "avatar"
      entityId= {userData.id.id || generatedId}
      title="Modification du profil"
      defaultValues={userData} 
      onCancel={onCancel}
    />
  );
};

export default ProfileUpdateForm;