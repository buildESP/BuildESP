import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { login } from "../services/authServices";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";


const LoginPage = () => {
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const [error, setError] = useState(null);
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(loginData.login, loginData.password);
      loginUser(data.token, data.userId);

      // ✅ Notification de succès
      toast.success(" Connexion réussie !", { position: "top-right" });

      navigate("/my-items");
    } catch (err) {
      console.error("Erreur de connexion :", err);

      // ✅ Si le serveur renvoie un message d'erreur, on l'affiche
      const errorMessage = err.message || " Une erreur est survenue.";
      toast.error(errorMessage, { position: "top-right" });
    }
  };

  return (
    <Box p={8} maxW="md" mx="auto">
      <Heading mb={6}>Connexion</Heading>
      {error && <Text color="red.500">{error}</Text>}
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Input bg="green.contrast" placeholder="Email" name="login" onChange={handleChange} />
        <Input bg="green.contrast" placeholder="Mot de passe" type="password" name="password" onChange={handleChange} />
        <Button type="submit" colorPalette="teal">Se connecter</Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
