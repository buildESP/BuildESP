import AdminTable from "./AdminTable";

const  AdminUserTable = ({ users, refetch }) => {
  return <AdminTable items={users} refetch={refetch} basePath="users" />;
};

export default  AdminUserTable;
