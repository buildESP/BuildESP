import AdminTable from "./AdminTable";
import { useState } from "react";
import FormModal from "../FormModal";
import AdminUserForm from "./AdminUserForm";

const AdminUserTable = ({ users, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <AdminTable
        items={users}
        refetch={refetch}
        basePath="users"
        onEdit={handleEdit}
      />

      {selectedUser && (
        <FormModal isOpen={isModalOpen} onClose={handleClose}>
          <AdminUserForm
            user={selectedUser}
            endpoint={`/users/${selectedUser.id}`}
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

export default AdminUserTable;
