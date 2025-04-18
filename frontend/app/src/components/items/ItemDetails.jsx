import {
  Box,
  Image,
  Text,
  HStack,
  Button,
  Stack,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import useDeleteData from "../../hooks/useDeleteData";
import useItems from "../../hooks/useItems";
import useAuth from "../../hooks/useAuth";
import useFetchData from "../../hooks/useFetchData";
import DialogComponents from "../../components/DialogComponents.jsx";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
} from "../../components/ui/dialog";
import { Avatar } from "../ui/avatar";

const ItemDetails = ({ item, isOwner, onEdit }) => {
  const navigate = useNavigate();
  const { deleteData: deleteItem, loading: loadingItem } = useDeleteData(`/items`);
  const { deleteData: deleteExchange, loading: loadingExchange } = useDeleteData(`/exchanges`);
  const { refetch } = useItems();
  const { user } = useAuth();
  const { data: exchanges, refetch: refetchExchanges } = useFetchData("/exchanges", { requiresAuth: true });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const latestExchange = item.exchanges?.[item.exchanges.length - 1];
  const isUnavailable = latestExchange?.status === "Unavailable";
  const displayStatus = isUnavailable || item.status !== "Available" ? "Indisponible" : "Disponible";
  const statusColor = displayStatus === "Disponible" ? "green" : "red";

  const [showReportModal, setShowReportModal] = useState(false);

  const myExchange = exchanges?.find(
    (exchange) => exchange.item_id === item.id && exchange.borrow_user_id === user?.id
  );

  const handleDeleteItem = async () => {
    if (window.confirm("Voulez-vous vraiment supprimer cet item ?")) {
      const success = await deleteItem(item.id);
      if (success) {
        await refetch();
        navigate("/my-items");
      }
    }
  };

  const handleDeleteRequest = async () => {
    if (!myExchange) return;
    const success = await deleteExchange(myExchange.id);
    if (success) {
      toast.success("Demande d'emprunt supprimée avec succès !");
      await refetchExchanges();
      await refetch();
    } else {
      toast.error("Erreur lors de la suppression de la demande.");
    }
    setIsDialogOpen(false);
  };

  return (
    <Box
      maxW="6xl"
      mx="auto"
      p={{ base: 4, md: 6 }}
      borderRadius="lg"
      bg="rgba(255, 255, 204, 0.25)"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
      border="1px solid rgba(255, 255, 0, 0.3)"
    >
      <Stack direction={{ base: "column", md: "row" }} spacing={{ base: 8, md: 12 }} align="start">
        {/* Image */}
        <Box flex="1" maxW={{ base: "100%", md: "50%" }}>
          <Image
            src={item.picture}
            alt={item.name}
            w="100%"
            h={{ base: "250px", md: "350px" }}
            objectFit="cover"
            borderRadius="md"
          />

          <HStack mt={6} spacing={4}>
            {isOwner ? (
              <>
                <Button onClick={onEdit} colorPalette="blue">Éditer</Button>
                <Button onClick={handleDeleteItem} colorPalette="red" isLoading={loadingItem}>Supprimer</Button>
              </>
            ) : item.status === "Available" && user?.id !== item.user_id ? (
              myExchange ? (
                <DialogRoot open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button colorPalette="red" isLoading={loadingExchange}>
                      Supprimer ma demande d'emprunt
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader style={{ position: "relative" }}>
                      <DialogTitle>Confirmer la suppression</DialogTitle>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsDialogOpen(false)}
                        style={{
                          position: "absolute",
                          top: "0.5rem",
                          right: "0.5rem",
                          fontSize: "1.2rem",
                          lineHeight: "1",
                        }}
                        aria-label="Fermer"
                      >
                        ✕
                      </Button>
                    </DialogHeader>

                    <DialogBody>
                      <Text>
                        Voulez-vous vraiment annuler votre demande d'emprunt pour <strong>{item.name}</strong> ?
                      </Text>
                    </DialogBody>

                    <DialogFooter>
                      <DialogActionTrigger asChild>
                        <Button colorPalette="red" onClick={handleDeleteRequest}>
                          Oui, annuler
                        </Button>
                      </DialogActionTrigger>
                    </DialogFooter>
                  </DialogContent>
                </DialogRoot>
              ) : (
                <DialogComponents item={item} />
              )
            ) : (
              <Text color="gray.500" fontStyle="italic">
                {user?.id === item.user_id
                  ? "Vous ne pouvez pas emprunter votre propre objet"
                  : "Cet objet n'est pas disponible pour le moment"}
              </Text>
            )}
            <Button colorPalette="red" variant="outline" onClick={() => setShowReportModal(true)}>
              Signaler
            </Button>
          </HStack>
        </Box>

        {/* Détails */}
        <Box flex="1" w="full">
          <Text fontSize="2xl" color="yellow.900" fontWeight="bold" mb={2}>{item.name}</Text>
          <Text mb={4} color="yellow.900">{item.description}</Text>

          <HStack>
            <Text color="yellow.900" fontWeight="bold">Statut :</Text>
            <Badge colorPalette={statusColor}>{displayStatus}</Badge>
          </HStack>

          {/* Utilisateur */}
          <Box mt={10} p={4} borderWidth="1px" borderRadius="md">
            <HStack spacing={4}>
              <Avatar src={item.user.picture} name={item.user.firstname} />
              <Box>
                <Text color="yellow.900" fontWeight="bold">
                  {item.user.firstname} {item.user.lastname}
                </Text>
                <Text fontSize="sm" color="yellow.800">{item.user.email}</Text>
                <Text fontSize="sm" color="gray.500">Note : {item.user.rating}</Text>
              </Box>
            </HStack>
          </Box>
        </Box>
      </Stack>

      {showReportModal && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bg="white"
          p={0} // Retirer le padding
          borderRadius="lg"
          boxShadow="xl"
          zIndex={9999}
          w="520px"
          h="560px"
        >
          <Box display="flex" justifyContent="flex-end" mt={2}> {/* Espacement uniquement en haut */}
            <Button size="sm" variant="ghost" onClick={() => setShowReportModal(false)}>
              ✕
            </Button>
          </Box>

          <iframe
            src="https://automation.hephel.fr/form/neighborrow-report"
            width="100%"
            height="510px"
            style={{ border: "none", borderRadius: "8px" }}
            title="Formulaire de signalement"
          />
        </Box>
      )}

    </Box>
  );
};

export default ItemDetails;
