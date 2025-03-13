import AdminTable from "./AdminTable";

const AdminCategoryTable = ({ categories, refetch }) => {
  return <AdminTable items={categories} refetch={refetch} />;
};

export default AdminCategoryTable;
