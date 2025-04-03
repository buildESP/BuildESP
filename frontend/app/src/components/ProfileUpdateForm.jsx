import usePutData from "../hooks/usePutData";
import FormComponent from "./FormComponent";
import { updateProfileSchema } from "../validation/schemas"

const ProfileUpdateForm = ({ userData, onSuccess, onCancel }) => {
  const { putData, loading } = usePutData(`/users/${userData.id}`);

  const fields = [
    { name: "firstname", label: "Prénom" },
    { name: "lastname", label: "Nom" },
    { name: "email", label: "Email", type: "Email", disabled: true },
    { name: "address", label: "Addresse" },
    { name: "password", label: "Password" },
    { name: "phone", label: "Téléphone", type: "tel" },
    { name: "picture", label: "Photo", type: "file" },


  ];

  const handleSubmit = async (updatedData) => {
    const response = await putData(updatedData, userData, "🎉 Profile updated!", "❌ Update failed.");
    if (response) onSuccess(); 
  };


  return (
    <FormComponent
      schema={updateProfileSchema}
      fields={fields}
      onSubmit={handleSubmit}
      submitLabel="Update Profile"
      loading={loading}
      title="Edit Your Profile"
      defaultValues={userData} 
      onCancel={onCancel}
    />
  );
};

export default ProfileUpdateForm;
