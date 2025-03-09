import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { login } from "../services/authServices";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";

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
    setError(null);
    try {
      const data = await login(loginData.login, loginData.password);
      loginUser(data.token, data.userId);
      navigate("/my-items");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box p={8} maxW="md" mx="auto">
      <Heading mb={6}>Connexion</Heading>
      {error && <Text color="red.500">{error}</Text>}
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Input placeholder="Email" name="login" onChange={handleChange} />
        <Input placeholder="Mot de passe" type="password" name="password" onChange={handleChange} />
        <Button type="submit" colorScheme="blue">Se connecter</Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
