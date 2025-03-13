import usePutData from "../hooks/usePutData";
import FormComponent from "./FormComponent";
import { updateProfileSchema } from "../validation/schemas"

const ProfileUpdateForm = ({ userData, onSuccess, onCancel }) => {
  const { putData, loading } = usePutData(`/users/${userData.id}`);

  const fields = [
    { name: "firstname", label: "First Name" },
    { name: "lastname", label: "Last Name" },
    { name: "email", label: "Email", type: "email", disabled: true },
    { name: "address", label: "Address" },
    { name: "phone", label: "Phone", type: "tel" },
    { name: "picture", label: "Profile Picture URL" },
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
