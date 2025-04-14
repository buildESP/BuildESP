import { Link as RouterLink } from "react-router-dom";
import { useBreakpointValue, Box, Flex, HStack, Button, IconButton, useDisclosure, VStack, Badge } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { LuBell, LuMoon, LuSun } from "react-icons/lu";
import {
  DrawerRoot,
  DrawerBackdrop,
  DrawerTrigger,
  DrawerContent,
  DrawerCloseTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
} from "../ui/drawer";
import useAuth from "../../hooks/useAuth";
import { useColorMode } from "../ui/color-mode";
import { APP_NAME } from "@/config";
import useSearch from "@/hooks/useSearch";
import SearchInput from "../SearchInput";
import useFetchData from "../../hooks/useFetchData";
import NotificationsDialog from "../notifications/NotificationsDialog";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode, colorMode } = useColorMode();
  const { searchTerm, handleSearchChange } = useSearch();
  const { data: exchanges } = useFetchData('/exchanges', { requiresAuth: true });
  const [isNotifOpen, setNotifOpen] = useState(false);

  const pendingRequests = exchanges?.filter(
    (exchange) => exchange.lender_user_id === user?.id && exchange.status === "Pending"
  ) || [];

  const isDesktop = useBreakpointValue({ base: false, md: true });

  const bellAnimation = keyframes`
    0% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    50% { transform: rotate(10deg); }
    75% { transform: rotate(-5deg); }
    100% { transform: rotate(0deg); }
  `;

  const animation = pendingRequests.length > 0 ? `${bellAnimation} 1s infinite` : "none";

  return (
    <Box bg="green.300" px={4} boxShadow="md" position="fixed" zIndex="1000" w="100vw">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box fontWeight="bold" as={RouterLink} to="/" fontSize="lg" color="yellow.900">
          {APP_NAME}
        </Box>

        {isDesktop ? (
          <HStack spacing={4}>
            <SearchInput value={searchTerm} onChange={handleSearchChange} />
            {user && (
              <Box position="relative">
                <Button onClick={() => setNotifOpen(true)} variant="ghost" color="yellow.900">
                  <Box animation={animation}>
                    <LuBell size={24} />
                  </Box>
                  {pendingRequests.length > 0 && (
                    <Badge colorScheme="red" borderRadius="full" position="absolute" top="-1" right="-1" fontSize="0.6em">
                      {pendingRequests.length}
                    </Badge>
                  )}
                </Button>
              </Box>
            )}

            <Button as={RouterLink} to="/" variant="ghost" color="yellow.900">Accueil</Button>
            {user ? (
              <>
                <Button as={RouterLink} to="/my-items" variant="ghost" color="yellow.900">Mes Objets</Button>
                <Button as={RouterLink} to="/exchanges" variant="ghost" color="yellow.900">Mes Échanges</Button>
                <Button as={RouterLink} to="/my-neighbors" variant="ghost" color="yellow.900">Mes Voisins</Button>
                <Button as={RouterLink} to="/profile" variant="ghost" color="yellow.900">Profil</Button>
                {isAdmin && (
                  <Button
                    as={RouterLink}
                    to="/admin"
                    variant="ghost"
                    color="yellow.900"
                  >
                    Admin
                  </Button>
                )}
                <Button onClick={logout} variant="ghost" color="red.600">Déconnexion</Button>
              </>
            ) : (
              <>
                <Button as={RouterLink} to="/login" variant="ghost" color="yellow.900">Se connecter</Button>
                <Button as={RouterLink} to="/register" variant="ghost" color="yellow.900">S'enregistrer</Button>
              </>
            )}
            <IconButton onClick={toggleColorMode} variant="outline" size="sm">
              {colorMode === "light" ? <LuSun /> : <LuMoon />}
            </IconButton>
          </HStack>
        ) : (
          <DrawerRoot open={isOpen} onOpenChange={(e) => (e.open ? onOpen() : onClose())}>
            <DrawerTrigger asChild>
              <IconButton aria-label="Menu" onClick={onOpen}>
                <CiMenuBurger size={24} color="white" />
              </IconButton>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerCloseTrigger />
              <DrawerHeader><DrawerTitle>Menu</DrawerTitle></DrawerHeader>
              <DrawerBody>
                <VStack spacing={4}>
                  {user && (
                    <Button variant="ghost" onClick={() => setNotifOpen(true)}>
                      <LuBell /> Notifications
                      {pendingRequests.length > 0 && (
                        <Badge ml={2} colorScheme="red">{pendingRequests.length}</Badge>
                      )}
                    </Button>
                  )}
                  <Button as={RouterLink} to="/" variant="ghost" onClick={onClose}>Accueil</Button>
                  {user ? (
                    <>
                      <Button as={RouterLink} to="/my-items" variant="ghost">Mes Objets</Button>
                      <Button as={RouterLink} to="/exchanges" variant="ghost">Mes Échanges</Button>
                      <Button as={RouterLink} to="/my-neighbors" variant="ghost">Mes Voisins</Button>
                      <Button as={RouterLink} to="/profile" variant="ghost">Profil</Button>
                      {isAdmin && (
                        <Button
                          as={RouterLink}
                          to="/admin"
                          variant="ghost"
                          color="yellow.900"
                        >
                          Admin
                        </Button>
                      )}
                      <Button onClick={logout} variant="ghost" color="red.600">Déconnexion</Button>
                    </>
                  ) : (
                    <>
                      <Button as={RouterLink} to="/login" variant="ghost">Se connecter</Button>
                      <Button as={RouterLink} to="/register" variant="ghost">S'enregistrer</Button>
                    </>
                  )}
                  <IconButton onClick={toggleColorMode} variant="outline" size="sm">
                    {colorMode === "light" ? <LuSun /> : <LuMoon />}
                  </IconButton>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </DrawerRoot>
        )}
      </Flex>
      {user && <NotificationsDialog isOpen={isNotifOpen} onClose={() => setNotifOpen(false)} />}
    </Box>
  );
};

export default Navbar;
