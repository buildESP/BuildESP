import AdminTable from "./AdminTable";
import FormModal from "../FormModal";
import AdminCategoryForm from "../admin/AdminCategoryForm";
import { useState } from "react";

const AdminCategoryTable = ({ categories, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <>
      <AdminTable
        items={categories}
        refetch={refetch}
        basePath="categories"
        onEdit={handleEdit}
      />

      {selectedCategory && (
        <FormModal isOpen={isModalOpen} onClose={handleClose}>
          <AdminCategoryForm
            category={selectedCategory}
            endpoint={`/categories/${selectedCategory.id}`}
            onSuccess={() => {
              handleClose();
              refetch();
            }}
          />
        </FormModal>
      )}
    </>
  );
};

export default AdminCategoryTable;
