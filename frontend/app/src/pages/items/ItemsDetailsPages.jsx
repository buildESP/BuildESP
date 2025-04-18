import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { Box, Spinner, Text, Button, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import usePutData from "../../hooks/usePutData";
import { HiChevronLeft } from "react-icons/hi"

import ItemDetails from "../../components/items/ItemDetails";
import ItemEditForm from "../../components/items/ItemEditForm";
const ItemDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: item, loading, error, refetch } = useFetchData(`/items/${id}`);
    const { user } = useAuth();
    const { putData, loading: updating } = usePutData(`/items/${id}`);
    const [isEditing, setIsEditing] = useState(false);
    const isMobile = useBreakpointValue({ base: true, md: false });
  
    if (loading) return <Spinner />;
    if (error) return <Text color="red.500">{error}</Text>;
    if (!item) return <Text color="gray.500">Item introuvable.</Text>;
  
    const isOwner = user && item.user_id === user.id;
  
    const handleSubmit = async (updatedData) => {
        const payload = { 
            ...updatedData, 
            user_id: user.id, 
            subcategory_id: updatedData.subcategory_id || item.subcategory_id 

          };
      await putData(payload, item, " Item mis à jour!", " Échec de la mise à jour.");
      setIsEditing(false);
      refetch();
    };
  

    return (
      <Box maxW="6xl" mx="auto" p={{ base: 4, md: 6 }}>
      {/* ✅ Wrap fleche + content in the same flex */}
      <Flex align="start" gap={6} direction={{ base: "column", md: "row" }}>
        <Button
          onClick={() => navigate(-1)}
          colorPalette="yellow"
          variant="surface"
          minW="40px"
          alignSelf="flex-start"
          mt="1"
        >
          <HiChevronLeft />
        </Button>

        <Box flex="1">
          {isEditing ? (
            <ItemEditForm item={item} onSubmit={handleSubmit} loading={updating} />
          ) : (
            <ItemDetails
              item={item}
              isOwner={isOwner}
              onEdit={() => setIsEditing(true)}
            />
          )}
        </Box>
      </Flex>
    </Box>
    );
  };
  

export default ItemDetailsPage;
