import useFetchData from "../../hooks/useFetchData";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";

const ItemsPage = () => {
  const { data: items, loading, error } = useFetchData("/items");

  if (loading) return <Spinner />;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <ItemsGallery items={items} title="Items in this Subcategory" />

  );
};

export default ItemsPage;
