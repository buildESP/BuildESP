// components/admin/AdminSubcategoryTable.jsx
import { useState } from "react";
import AdminTable from "./AdminTable";
import FormModal from "../FormModal";
import AdminSubcategoryForm from "./AdminSubCategoryForm";

const AdminSubcategoryTable = ({ subcategories, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const filteredSubcategories = subcategories.map(({ category_id, items, ...rest }) => rest);

  const handleEdit = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedSubcategory(null);
  };

  return (
    <>
      <AdminTable
        items={filteredSubcategories}
        refetch={refetch}
        basePath="subcategories"
        onEdit={handleEdit}
      />

      {selectedSubcategory && (
        <FormModal isOpen={isModalOpen} onClose={handleClose}>
          <AdminSubcategoryForm
            subcategory={selectedSubcategory}
            endpoint={`/subcategories/${selectedSubcategory.id}`}
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

export default AdminSubcategoryTable;
