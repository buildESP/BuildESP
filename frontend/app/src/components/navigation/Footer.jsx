import { Box, Grid, Heading, Link, VStack } from '@chakra-ui/react';

const Footer = () => (
  <Box as="footer" bg="yellow.950" color="yellow.100" py={10}>
    <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
      <VStack align="start">
        <Heading size="md" mb={2}> A propos de nous</Heading>
        <Link color={"whiteAlpha.700"} href="#">Confidentialité</Link>
        <Link color={"whiteAlpha.700"} href="#">FAQ</Link>
      </VStack>
      <VStack align="start">
        <Heading size="md" mb={2}>Informations Légales</Heading>
        <Link color={"whiteAlpha.700"} href="#">Mentions légales</Link>
        <Link color={"whiteAlpha.700"} href="#">Conditions générales</Link>
      </VStack>
      <VStack align="start">
        <Heading size="md" mb={2}>Des Questions</Heading>
        <Link color={"whiteAlpha.700"} href="#">Contactez-nous</Link>
      </VStack>
    </Grid>
  </Box>
);

export default Footer;
