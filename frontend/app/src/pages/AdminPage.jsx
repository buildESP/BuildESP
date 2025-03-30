import useFetchData from "@/hooks/useFetchData";
import AdminTabs from "@/components/admin/AdminTabs";
import { Spinner, Text, Box } from "@chakra-ui/react";

const AdminPage = () => {
  // Chargement des données
  const { data: users, loading: loadingUsers, error: errorUsers, refetch: refetchUsers } = useFetchData("/users", {requiresAuth: true});
  const { data: items, loading: loadingItems, error: errorItems, refetch: refetchItems } = useFetchData("/items");
  const { data: categories, loading: loadingCategories, error: errorCategories, refetch: refetchCategories } = useFetchData("/categories");
  const { data: subcategories, loading: loadingSubcategories, error: errorSubcategories, refetch: refetchSubcategories } = useFetchData("/subcategories");


  // Gestion du chargement global
  const isLoading = loadingUsers || loadingItems || loadingCategories || loadingSubcategories;
  const hasError = errorUsers || errorItems || errorCategories || errorSubcategories;

  if (isLoading) return <Spinner />;
  if (hasError) return <Text color="red.500">Erreur de chargement des données.</Text>;

  return (
    <Box p={6}>
      <AdminTabs 
        users={users} 
        items={items} 
        categories={categories}
        subcategories={subcategories}
        refetchUsers={refetchUsers}
        refetchItems={refetchItems}
        refetchCategories={refetchCategories}
        refetchSubcategories={refetchSubcategories}
      />
    </Box>
  );
};

export default AdminPage;
