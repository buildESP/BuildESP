import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/authServices";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await resetPassword(token, newPassword);

      toast.success("Mot de passe réinitialisé avec succès !", { position: "top-right" });
      navigate("/login");
    } catch (err) {
      const errorMessage = err.message || "Une erreur est survenue.";
      setError(errorMessage);
      toast.error(errorMessage, { position: "top-right" });
    }
  };

  return (
    <Box p={8} maxW="md" mx="auto">
      <Heading mb={6}>Réinitialisation du mot de passe</Heading>
      {error && <Text color="red.500">{error}</Text>}
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button type="submit" colorScheme="teal">Réinitialiser</Button>
      </VStack>
    </Box>
  );
};

export default ResetPasswordPage;