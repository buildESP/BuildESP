import { Button, Spinner, Text, HStack, Box, Popover, Stack, Portal
 } from "@chakra-ui/react";

import useFetchData from "../hooks/useFetchData";
import { Link } from "react-router-dom";

const SubMenu = () => {
  const { data: categories, loading, error } = useFetchData("/categories");

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Stack align="center" direction="row" spacing={6} p={4} bg="gray.100">
      {categories.map((category) => (
        <Popover.Root key={category.id}>
          {/* ✅ Bouton de la catégorie */}
          <Popover.Trigger asChild>
            <Button variant="ghost" size="sm">{category.name}</Button>
          </Popover.Trigger>

          <Portal>
            <Popover.Positioner>
              <Popover.Content width="200px">
                <Popover.Arrow />
                <Popover.Body>
                  <Popover.Title fontWeight="medium">{category.name}</Popover.Title>
                  {category.subcategories.length > 0 ? (
                    category.subcategories.map((sub) => (
                      <Text key={sub.id} p={2} _hover={{ bg: "gray.200" }}>
                        <Link to={`/subcategories/${sub.id}`}>{sub.name}</Link>
                      </Text>
                    ))
                  ) : (
                    <Text color="gray.500" p={2}>Aucune sous-catégorie</Text>
                  )}
                </Popover.Body>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      ))}
    </Stack>
  );
};

export default SubMenu;