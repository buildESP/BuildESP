import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, VStack, Input, Text } from "@chakra-ui/react";
import { loginSchema } from "../validation/schemas"; // ✅ Import Zod schema

const LoginForm = ({ onSubmit, error }) => {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm({
      resolver: zodResolver(loginSchema),
    });
  
    const handleFormSubmit = (data) => {
      console.log("Submitting login form with data:", data); // ✅ Debugging
      onSubmit(data); // ✅ Call parent function
    };
  
    return (
      <Box as="form" onSubmit={handleSubmit(handleFormSubmit)} p={4}>
        {error && <Text color="red.500">{error}</Text>}
        <VStack spacing={4}>
          <Input placeholder="Email" {...register("login")} />
          {errors.login && <Text color="red.500">{errors.login.message}</Text>}
  
          <Input placeholder="Password" type="password" {...register("password")} />
          {errors.password && <Text color="red.500">{errors.password.message}</Text>}
  
          <Button
  type="submit"
  colorPalette="blue"
  isLoading={isSubmitting}
>
  Se connecter
</Button>

        </VStack>
      </Box>
    );
  };
  
  export default LoginForm;
