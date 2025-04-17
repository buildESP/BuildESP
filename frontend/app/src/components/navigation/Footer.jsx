import { Box, Grid, Heading, Link, VStack } from '@chakra-ui/react';

const Footer = () => (
  <Box as="footer"  bg="yellow.950" color="yellow.100" py={10}>
    <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} placeItems="center" gap={6}>
      <VStack align="start">
        <Heading size="md" mb={2}>Nous suivre</Heading>
        <Link color={"whiteAlpha.700"} href="https://www.tiktok.com/@neighborrow_">TikTok</Link>
        <Link color={"whiteAlpha.700"} href="https://www.instagram.com/neigh_borrow/">Instagram</Link>
      </VStack>
      <VStack align="start">
        <Heading size="md" mb={2}>Informations Légales</Heading>
        <Link color={"whiteAlpha.700"} href="/Mention-legales">Mentions légales</Link>
        <Link color={"whiteAlpha.700"} href="/condition-of-us">Conditions générales</Link>
      </VStack>
      <VStack align="start">
        <Heading size="md" mb={2}>Des Questions ?</Heading>
        <Link color={"whiteAlpha.700"} href="mailto:neighborrow@hephel.fr">Contactez-nous</Link>
        <Link color={"whiteAlpha.700"} href="#">FAQ</Link>
      </VStack>
    </Grid>
  </Box>
);

export default Footer;
