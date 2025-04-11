import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authServices";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(email);
      toast.success("Un email de réinitialisation a été envoyé !", { position: "top-right" });
      navigate("/login");
    } catch (err) {
      console.error("Erreur lors de la réinitialisation du mot de passe :", err);
      const errorMessage = err.message || "Une erreur est survenue.";
      toast.error(errorMessage, { position: "top-right" });
    }
  };

  return (
    <Box p={8} maxW="md" mx="auto">
      <Heading mb={6}>Mot de passe oublié</Heading>
      {error && <Text color="red.500">{error}</Text>}
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Input
          bg="green.contrast"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <Button type="submit" colorPalette="teal">Envoyer un email de réinitialisation</Button>
      </VStack>
    </Box>
  );
};

export default ForgotPasswordPage;
