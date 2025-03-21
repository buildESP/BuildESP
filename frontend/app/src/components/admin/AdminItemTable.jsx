import AdminTable from "./AdminTable";

const AdminItemTable = ({ items, refetch }) => {
  return <AdminTable items={items} refetch={refetch} basePath="items" />;
};

export default AdminItemTable;
