import { Button, Spinner, Text, HStack } from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@chakra-ui/react/menu";
import useFetchData from "../hooks/useFetchData";
import { Link } from "react-router-dom";

const SubMenu = () => {
  const { data: categories, loading, error } = useFetchData("/categories");

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <HStack spacing={4} p={4} bg="gray.100">
      {categories.map((category) => (
        <MenuRoot key={category.id}>
          {/* ✅ Category as a horizontal button */}
          <MenuTrigger asChild>
            <Button variant="ghost" size="sm">{category.name}</Button>
          </MenuTrigger>

          {/* ✅ Vertical Dropdown for Subcategories */}
          {category.subcategories.length > 0 && (
            <MenuContent positioning={{ placement: "", gutter: 4 }}>
              {category.subcategories.map((sub) => (
                <MenuItem key={sub.id} asChild>
                  <Link to={`/subcategories/${sub.id}`}>{sub.name}</Link>
                </MenuItem>
              ))}
            </MenuContent>
          )}
        </MenuRoot>
      ))}
    </HStack>
  );
};

export default SubMenu;
