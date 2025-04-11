import AdminTable from "./AdminTable"
import { useState } from "react";
import FormModal from "../FormModal";
import AdminItemForm from "./AdminItemEditForm";

const AdminItemTable = ({ items, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <AdminTable
        items={items}
        refetch={refetch}
        basePath="items"
        onEdit={handleEdit}
      />

      {selectedItem && (
        <FormModal isOpen={isModalOpen} onClose={handleClose}>
          <AdminItemForm
            item={selectedItem}
            endpoint={`/items/${selectedItem.id}`}
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

export default AdminItemTable;