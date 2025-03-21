import { Tabs } from "@chakra-ui/react";
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu";
import AmdinItemTable from "./AdminItemTable";
import AdminUserTable from "./AdminUserTable";
import AdminCategoryTable from "./AdminCategoryTable";

const AdminTabs = ({ users, items, categories, refetchUsers, refetchItems, refetchCategories }) => {
  return (
    <Tabs.Root defaultValue="items">
      <Tabs.List>
        <Tabs.Trigger value="items">
          <LuFolder />

          Items
        </Tabs.Trigger>
        <Tabs.Trigger value="users">
          <LuUser />
          Utilisateurs
        </Tabs.Trigger>
        <Tabs.Trigger value="categories">
          <LuSquareCheck />
          Catégories et Sous Catégories
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="items">
        <AmdinItemTable items={items} refetch={refetchItems} />
      </Tabs.Content>
      <Tabs.Content value="users">
        <AdminUserTable users={users} refetch={refetchUsers} />
      </Tabs.Content>
      <Tabs.Content value="categories">
        <AdminCategoryTable categories={categories} refetch={refetchCategories} />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default AdminTabs;
