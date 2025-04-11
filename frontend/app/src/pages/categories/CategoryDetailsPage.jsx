import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import useItems from "../../hooks/useItems";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";
import SubcategoriesList from "../../components/SubCategoriesList";
import ItemsGallery from "../../components/items/ItemsGallery";

const CategoryDetailPage = () => {
  const { id } = useParams(); 
  const { data: category, loading: loadingCategory, error: errorCategory } = useFetchData(`/categories/${id}`);
  const { items, loading: loadingItems, error: errorItems } = useItems();

  if (loadingCategory || loadingItems) return <Spinner />;
  if (errorCategory || errorItems)
    return <Text color="red.500">{errorCategory || errorItems}</Text>;

  // ✅ Récupérer les IDs des sous-catégories
  const subcategoryIds = category.subcategories?.map((sub) => sub.id.toString()) || [];

  // ✅ Filtrer les items associés à ces sous-catégories
  const filteredItems = items.filter((item) =>
    subcategoryIds.includes(item.subcategory_id?.toString())
  );


  return (
    <VStack spacing={8} p={6} align="stretch">
      <Text fontSize="2xl" fontWeight="bold" textAlign="center">
        {category.name}
      </Text>

      {category.subcategories && (
        <SubcategoriesList
          subcategories={category.subcategories}
          categoryName={category.name}
        />
      )}

      {filteredItems.length > 0 ? (
        <ItemsGallery
          items={filteredItems}
          title={`Objets dans la catégorie "${category.name}"`}
        />
      ) : (
        <Text color="gray.500" textAlign="center">
          Aucun objet trouvé pour cette catégorie.
        </Text>
      )}
    </VStack>
  );
};

export default CategoryDetailPage;
