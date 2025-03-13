import { useNavigate } from "react-router";
import usePostData from "../hooks/usePostData";
import { registerSchema } from "../validation/schemas";
import FormComponent from "../components/FormComponent";

const RegisterPage = () => {
    const { postData, loading } = usePostData("/users");
    const navigate = useNavigate();

    const fields = [
      { name: "firstname", label: "First Name" },
      { name: "lastname", label: "Last Name" },
      { name: "email", label: "Email", type: "email" },
      { name: "password", label: "Password", type: "password" },
      { name: "address", label: "Address" },
      { name: "postcode", label: "Postcode" },
      { name: "phone", label: "Phone", type: "tel" },
      { name: "picture", label: "Profile Picture URL" },
    ];
  
    const handleSubmit = async (formData) => {
      const response = await postData(
        { ...formData, is_admin: false },
        "🎉 Account created successfully!",
        "❌ Registration failed. Please try again."
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
        loading={loading}
      />
    );
  };
  
  export default RegisterPage;
