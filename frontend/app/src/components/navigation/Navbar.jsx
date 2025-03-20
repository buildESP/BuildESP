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
import { CiMenuBurger } from "react-icons/ci";
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
import useAuth from "../../hooks/useAuth"; // 🔹 Import du hook d'authentification
import { LuMoon, LuSun } from "react-icons/lu"
import { useColorMode } from "../ui/color-mode";
import { APP_NAME } from "@/config";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setOpen] = useState(false);
  const { toggleColorMode, colorMode } = useColorMode()


  const isDesktop = useBreakpointValue({ base: false, md: true });
  console.log("🔹 Navbar : Utilisateur =", user);
  return (
    <Box bg="green.300" px={4} boxShadow="md" position="fixed" zIndex="1000"
      w="100vw"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box fontWeight="bold" as={RouterLink} to="/" fontSize="lg" color="yellow.900">
          {APP_NAME}
        </Box>

        {isDesktop ? (
          <HStack as="nav" spacing={4}>
            <Button as={RouterLink} to="/" variant="ghost" color="yellow.900">
              Accueil
            </Button>
            {user ? (
              <>
                <Button as={RouterLink} to="/my-items" variant="ghost" color="yellow.900">
                  Mes Objets
                </Button>
                <Button as={RouterLink} to="/my-neighbors" variant="ghost" color="yellow.900">
                  Mes Voisins
                </Button>
                <Button as={RouterLink} to="/profile" variant="ghost" color="yellow.900">
                  Profil
                </Button>
                <Button onClick={logout} variant="ghost" color="red.600">
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Button as={RouterLink} to="/login" variant="ghost" color="yellow.900">
                  Se connecter
                </Button>
                <Button as={RouterLink} to="/register" variant="ghost" color="yellow.900">
                  S'enregistrer
                </Button>
              </>
            )}
            <IconButton onClick={toggleColorMode} variant="outline" size="sm">
              {colorMode === "light" ? <LuSun /> : <LuMoon />}
            </IconButton>
          </HStack>
        ) : (
          <DrawerRoot open={isOpen} onOpenChange={(e) => setOpen(e.open)}>
            <DrawerBackdrop />
            <DrawerTrigger asChild>
              <IconButton
                aria-label="Open Menu"
                onClick={onOpen}

              >
                <CiMenuBurger size={24} color="white" /></IconButton>
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
                      <Button as={RouterLink} to="/my-items" variant="ghost" color="yellow.900">
                        Mes Objets
                      </Button>
                      <Button as={RouterLink} to="/profile" variant="ghost" color="yellow.900">
                        Profil
                      </Button>
                      <Button onClick={logout} variant="ghost" color="red.600">
                        Déconnexion
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button as={RouterLink} to="/login" variant="ghost" color="yellow.900">
                        Se connecter
                      </Button>
                      <Button as={RouterLink} to="/register" variant="ghost" color="yellow.900">
                        S'enregistrer
                      </Button>
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
    </Box>
  );
};

export default Navbar;