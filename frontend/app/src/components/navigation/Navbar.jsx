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
  List
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
import useSearch from "@/hooks/useSearch"; // Import the search hook
import SearchInput  from "../SearchInput";
import useItems from "../../hooks/useItems";
const Navbar = () => {
  const { user, logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [open, setOpen] = useState(false);
  const { toggleColorMode, colorMode } = useColorMode()
  const { searchTerm, handleSearchChange } = useSearch();
  const { items } = useItems();
  const filteredItems = items?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const isDesktop = useBreakpointValue({ base: false, md: true });
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
            <SearchInput value={searchTerm} onChange={handleSearchChange} />
            <div>
              
              {/* <div>
              {searchTerm && filteredItems && filteredItems.length > 0 && (
              <div>
              {filteredItems.map((item) => (
              // <div key={item.id} style={{ color: "white", backgroundColor: "green" }}>
              // {item.name}
              // </div>
              <List.Root key={item.id} >
              <List.Item></List.Item>
              <Link href="...">{item.name}</Link>
              </List.Root>

              
            ))}
           </div>
        )}


              </div> */}
                      {searchTerm && filteredItems && filteredItems.length > 0 && (
                        <div>
                          {filteredItems.map((item) => (
                            <Box
                              key={item.id}
                              as={RouterLink}
                              to={`/items/${item.id}`}
                              onClick={() => handleSearchChange({ target: { value: "" } })} // 🔹 Clears input
                              style={{
                                display: "block",
                                color: "white",
                                backgroundColor: "green",
                                padding: "8px",
                                marginBottom: "4px",
                                textDecoration: "none",
                                borderRadius: "4px",
                              }}
                            >
                              {item.name}
                            </Box>
                          ))}
                        </div>
                      )}


            </div>
            
           
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