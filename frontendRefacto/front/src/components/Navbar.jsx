import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Button,
  IconButton,
  useDisclosure,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import {
  DrawerRoot,
  DrawerBackdrop,
  DrawerTrigger,
  DrawerContent,
  DrawerCloseTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
} from "./ui/drawer";
import useAuth from "../hooks/useAuth"; // 🔹 Import du hook d'authentification

const Navbar = () => {
  const { user, logout } = useAuth(); // ✅ Remplace isAuthenticated par user
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setOpen] = useState(false);

  const isDesktop = useBreakpointValue({ base: false, md: true });

  console.log("🔹 Navbar : Utilisateur =", user); // 🔥 Vérifie si user est bien mis à jour

  return (
    <Box bg="gray.100" px={4} boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box fontWeight="bold" fontSize="lg" color="gray.800">
          Neighborrow
        </Box>

        {isDesktop ? (
          <HStack as="nav" spacing={4}>
            <Button as={RouterLink} to="/" variant="ghost" color="gray.800">
              Accueil
            </Button>
            {user ? (
              <>
                <Button as={RouterLink} to="/profile" variant="ghost" color="gray.800">
                  Profil
                </Button>
                <Button onClick={logout} variant="ghost" color="red.600">
                  Déconnexion
                </Button>
              </>
            ) : (
              <Button as={RouterLink} to="/login" variant="ghost" color="gray.800">
                Se connecter
              </Button>
            )}
          </HStack>
        ) : (
          <DrawerRoot open={isOpen} onOpenChange={(e) => setOpen(e.open)}>
            <DrawerBackdrop />
            <DrawerTrigger asChild>
              <IconButton
                icon={<FiMenu />}
                aria-label="Open Menu"
                onClick={onOpen}
                variant="ghost"
                color="gray.800"
              />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerCloseTrigger />
              <DrawerHeader>
                <DrawerTitle>Menu</DrawerTitle>
              </DrawerHeader>
              <DrawerBody>
                <VStack spacing={4} align="start">
                  <Button as={RouterLink} to="/" variant="ghost" onClick={onClose}>
                    Accueil
                  </Button>
                  {user ? (
                    <>
                      <Button as={RouterLink} to="/profile" variant="ghost" onClick={onClose}>
                        Profil
                      </Button>
                      <Button onClick={() => { logout(); onClose(); }} variant="ghost" color="red.600">
                        Déconnexion
                      </Button>
                    </>
                  ) : (
                    <Button as={RouterLink} to="/login" variant="ghost" onClick={onClose}>
                      Se connecter
                    </Button>
                  )}
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </DrawerRoot>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;