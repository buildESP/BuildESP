import { Tabs } from "@chakra-ui/react";
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu";
import AmdinItemTable from "./AdminItemTable";
import AdminUserTable from "./AdminUserTable";
import AdminCategoryTable from "./AdminCategoryTable";
import AdminSubcategoryTable from "./AdminSubCategoryTable";


const AdminTabs = ({ users, items, categories, refetchUsers, refetchItems, refetchCategories, subcategories, refetchSubcategories }) => {
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
          Catégories
        </Tabs.Trigger>

        <Tabs.Trigger value="subcategories">
          <LuFolder />
          Sous-catégories
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
      <Tabs.Content value="subcategories">
        <AdminSubcategoryTable subcategories={subcategories} refetch={refetchSubcategories} />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default AdminTabs;
