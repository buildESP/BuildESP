import { useNavigate } from "react-router";
import usePostData from "../hooks/usePostData";
import { registerSchema } from "../validation/schemas";
import FormComponent from "../components/FormComponent";
import { useRef } from "react";
const RegisterPage = () => {
  const { postData, loading } = usePostData("/users");
  const navigate = useNavigate();
  const generatedId = useRef(`${Date.now()}`).current;

  const fields = [
    { name: "firstname", label: "Prénom" },
    { name: "lastname", label: "Nom" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Mot de passe", type: "password" },
    { name: "address", label: "Addresse" },
    { name: "postcode", label: "Code Postal" },
    { name: "phone", label: "Téléphone", type: "tel" },
    { name: "picture", label: "Avatar" },
  ];

  const handleSubmit = async (formData) => {
    const response = await postData(
      { ...formData, is_admin: false },
      "Compte créé avec succes!",
      "Echec de l'enregistrement."
    );

    if (response) {
      navigate("/login");
    }
  };

  return (
    <FormComponent
      schema={registerSchema}
      fields={fields}
      onSubmit={handleSubmit}
      submitLabel="Register"
      entityType="user"
      entityId={generatedId}
      loading={loading}
    />
  );
};

export default RegisterPage;
