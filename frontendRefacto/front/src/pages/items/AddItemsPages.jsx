import { useContext } from "react";
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
  const { refetch, addNewItem  } = useContext(ItemContext); // ✅ Get refetch function


  const fields = [
    { name: "name", label: "Item Name", helperText: "Give your item a clear name" },
    { name: "description", label: "Description", type: "textarea", helperText: "Describe your item" },
    { name: "picture", label: "Image URL", helperText: "Provide an image link" },
    {
      name: "subcategory_id",
      label: "Subcategory",
      type: "select",
      options: subcategories
        ? subcategories.map((sub) => ({ value: sub.id, label: sub.name })) 
        : [],
    },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Available", label: "Available" },
      { value: "Unavailable", label: "Unavailable" },
    ]},
  ];

  const handleSubmit = async (formData) => {
    const response = await postData(
      { ...formData, user_id: user.id },
      "✅ Item added successfully!",
      "❌ Failed to add item."
    );
  
    if (response) {
      await refetch(); // ✅ Fetch updated items from API
      navigate("/my-items"); // ✅ Redirect to My Items page
    }
  };

  return (
    <FormComponent
      schema={addItemSchema}
      fields={fields}
      onSubmit={handleSubmit}
      submitLabel="Add Item"
      loading={loading || subLoading} 
      title="List a New Item"
    />
  );
};

export default AddItemPage;
