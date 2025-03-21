import AdminTable from "./AdminTable";

const AdminCategoryTable = ({ categories, refetch }) => {
  return <AdminTable items={categories} refetch={refetch} basePath="categories"/>;
};

export default AdminCategoryTable;
