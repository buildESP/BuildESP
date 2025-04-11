import { Box, Heading, Text, VStack, Link } from "@chakra-ui/react";

const ConditionOfUs = () => {
  return (
    <Box p={8} maxW="6xl" mx="auto">
      <VStack spacing={10} align="stretch">
        <Box>
          <Heading as="h1" size="2xl">CONDITIONS GÉNÉRALES D’UTILISATION (CGU)</Heading>
          <Text color="gray.600">En vigueur au 28 mars 2025</Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">PRÉAMBULE</Heading>
          <Text>Les présentes conditions générales d’utilisation (dites « CGU ») ont pour objet de régir les modalités d’accès et d’utilisation du site internet <Link color="blue.500" href="http://neighborrow.fr/" isExternal>http://neighborrow.fr/</Link> et de l’application mobile éditée par la société Neighborrow. Elles encadrent juridiquement la mise à disposition des services de prêt d’objets entre voisins et définissent les droits et obligations des utilisateurs.</Text>
          <Text>Toute inscription implique l’acceptation pleine et entière des présentes CGU. L’utilisateur déclare en avoir pris connaissance et les accepter sans réserve.</Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 1 – MENTIONS LÉGALES</Heading>
          <Text>Le site et l’application sont édités par des élèves d'Epitech dans le cadre d'un projet de fin d'études.</Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 2 – ACCÈS AU SERVICE</Heading>
          <Text>Le site et l’application permettent aux utilisateurs majeurs d’accéder gratuitement à un service de mise en relation pour le prêt de biens entre particuliers résidant à proximité.</Text>
          <Text>L’accès aux fonctionnalités nécessite une inscription avec fourniture d’informations exactes. L’utilisateur accède à son espace personnel à l’aide d’un identifiant et d’un mot de passe confidentiel. Il peut demander sa désinscription à tout moment via son espace personnel.</Text>
          <Text>Le service peut être temporairement suspendu pour maintenance ou en cas de force majeure, sans que la responsabilité de la société soit engagée.</Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 3 – TRAITEMENT DES DONNÉES PERSONNELLES (RGPD)</Heading>
          <Text>Neighborrow collecte et traite les données personnelles des utilisateurs dans le respect du Règlement (UE) 2016/679 (RGPD) et de la loi Informatique et Libertés.</Text>
          <Text>Les données collectées sont limitées au strict nécessaire pour :</Text>
          <Text>- La gestion des comptes utilisateurs ;</Text>
          <Text>- La mise en relation entre utilisateurs ;</Text>
          <Text>- La prévention des abus ;</Text>
          <Text>- Le respect des obligations légales.</Text>
          <Text>L’utilisateur peut exercer ses droits via son espace personnel ou par mail à : <Link href="mailto:neighborrow@contact.com" color="blue.500">neighborrow@contact.com</Link></Text>
          <Text>Les données ne sont conservées que le temps strictement nécessaire à la finalité du traitement.</Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 4 – PARTAGE DES DONNÉES AVEC DES TIERS</Heading>
          <Text>Les données peuvent être partagées avec des prestataires techniques (hébergement, support, analytique) uniquement si cela est nécessaire au bon fonctionnement du service, et uniquement après consentement explicite de l’utilisateur.</Text>
          <Text>Ces tiers sont tenus à une obligation de conformité au RGPD. L’utilisateur peut à tout moment retirer son consentement au partage.</Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 5 – SÉCURITÉ DES DONNÉES</Heading>
          <Text>Neighborrow met en œuvre des mesures de sécurité conformes à l’état de l’art :</Text>
          <Text>- chiffrement des données sensibles ;</Text>
          <Text>- pseudonymisation ;</Text>
          <Text>- hébergement sécurisé conforme ISO 27001 ;</Text>
          <Text>- redondance des bases de données ;</Text>
          <Text>- audits de sécurité réguliers.</Text>
          <Text>En cas de faille de sécurité, les utilisateurs concernés seront informés dans les meilleurs délais conformément à l’article 33 du RGPD.</Text>
        </Box>

        {/* ...continuation jusqu'à l'article 14 et Politique de confidentialité... */}
      </VStack>
    </Box>
  );
};

export default ConditionOfUs;