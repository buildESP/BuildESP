// AdminUserForm.jsx
import FormComponent from "../FormComponent";
import usePutData from "@/hooks/usePutData";
import { userUpdateSchema } from "@/validation/schemas";

const AdminUserForm = ({ user, endpoint, onSuccess, refetch }) => {
  const { putData, loading } = usePutData(endpoint);

  const fields = [
    { name: "firstname", label: "Prénom" },
    { name: "lastname", label: "Nom" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Mot de passe", type: "password" },
    { name: "address", label: "Adresse" },
    { name: "postcode", label: "Code postal" },
    { name: "phone", label: "Téléphone" },
    { name: "rating", label: "Note", type: "number" },
    { name: "picture", label: "Photo", type: "file" },
    {
      name: "is_admin",
      label: "Administrateur",
      type: "select",
      options: [
        { value: true, label: "Oui" },
        { value: false, label: "Non" },
      ],
    },
  ];

  const handleSubmit = async (formData) => {
    const completedData = {
      ...formData,
      firstname: formData.firstname ?? user.firstname,
      lastname: formData.lastname ?? user.lastname,
      email: formData.email ?? user.email,
      address: formData.address ?? user.address,
      postcode: formData.postcode ?? user.postcode,
      phone: formData.phone ?? user.phone,
      rating: formData.rating ?? user.rating,
      picture: formData.picture ?? user.picture,
      is_admin: formData.is_admin ?? user.is_admin,
      ...(formData.password ? { password: formData.password } : {}),
    };

    const result = await putData(completedData, user);
    if (result) {
      refetch?.();
      onSuccess?.();
    }
  };

  return (
    <FormComponent
      schema={userUpdateSchema}
      fields={fields}
      defaultValues={user}
      onSubmit={handleSubmit}
      submitLabel="Mettre à jour l’utilisateur"
      loading={loading}
    />
  );
};

export default AdminUserForm;
