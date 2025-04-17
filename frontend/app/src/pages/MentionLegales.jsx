import { Box, VStack, Heading, Text, Link } from "@chakra-ui/react";

export default function CGU(){
  return (
    <Box p={8} maxW="6xl" mx="auto">
      <VStack spacing={10} align="stretch">
        {/* Mentions Légales Header */}
        <Box>
          <Heading as="h1" size="2xl">
            MENTIONS LÉGALES
          </Heading>
          <Text color="gray.600">En vigueur au 17 avril 2025</Text>
        </Box>

        {/* Introduction */}
        <Box>
          <Text mt={4}>
            Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004
            pour la Confiance en l’économie numérique, il est porté à la
            connaissance des utilisateurs et visiteurs, ci-après l’"Utilisateur",
            du site{" "}
            <Link
              color="blue.500"
              href="http://neighborrow.hephel.fr"
              isExternal
            >
              http://neighborrow.hephel.fr
            </Link>
            , ci-après le "Site", les présentes mentions légales.
          </Text>
          <Text mt={2}>
            La connexion et la navigation sur le Site par l’Utilisateur impliquent
            l’acceptation intégrale et sans réserve des présentes mentions
            légales.
          </Text>
          <Text mt={2}>
            Ces dernières sont accessibles sur le Site à la rubrique "Mentions
            légales".
          </Text>
        </Box>

        {/* Article 1: Édition du Site */}
        <Box>
          <Heading as="h2" size="lg">
            ARTICLE 1 : ÉDITION DU SITE
          </Heading>
          <Text mt={4}>
            L’édition et la direction de la publication du Site sont assurées par
            l’équipe projet Neighborrow, composée d’étudiants de l’école EPITECH,
            située au 24 Rue Pasteur, 94270 Le Kremlin-Bicêtre, France.
          </Text>
          <Text mt={2}>
            Adresse e-mail de contact :{" "}
            <Link href="mailto:neighborrow@hephel.fr" color="blue.500">
              neighborrow@hephel.fr
            </Link>.
          </Text>
          <Text mt={2}>
            Ci-après l’"Éditeur". Le Site est un projet pédagogique réalisé dans
            un cadre scolaire, sans but commercial.
          </Text>
        </Box>

        {/* Article 2: Hébergement */}
        <Box>
          <Heading as="h2" size="lg">
            ARTICLE 2 : HÉBERGEMENT
          </Heading>
          <Text mt={4}>
            L’hébergeur du Site est Amazon Web Services EMEA SARL, dont le siège
            social est situé au 38 avenue John F. Kennedy, L-1855 Luxembourg.
          </Text>
        </Box>

        {/* Article 3: Accès au Site */}
        <Box>
          <Heading as="h2" size="lg">
            ARTICLE 3 : ACCÈS AU SITE
          </Heading>
          <Text mt={4}>
            Le Site est accessible à tout Utilisateur, sauf en cas d’interruption
            pour des raisons techniques, telles que des mises à jour ou des
            modifications de contenu. L’Éditeur ne pourra être tenu responsable
            des conséquences éventuelles de cette indisponibilité pour
            l’Utilisateur.
          </Text>
          <Text mt={2}>
            L’Éditeur s’efforce de rendre le Site accessible à tous. Pour toute
            demande concernant l’accessibilité, l’Utilisateur peut contacter :{" "}
            <Link href="mailto:neighborrow@hephel.fr" color="blue.500">
              neighborrow@hephel.fr
            </Link>.
          </Text>
        </Box>

        {/* Article 4: Collecte des Données */}
        <Box>
          <Heading as="h2" size="lg">
            ARTICLE 4 : COLLECTE DES DONNÉES
          </Heading>
          <Text mt={4}>
            Le Site ne collecte pas de données personnelles à des fins
            commerciales. Si des données personnelles sont collectées (par
            exemple, via un formulaire de contact), elles sont traitées
            conformément à la loi n°78-17 du 6 janvier 1978 relative à
            l’informatique, aux fichiers et aux libertés, ainsi qu’au Règlement
            (UE) 2016/679 du 27 avril 2016 (ci-après, ensemble, la
            "Réglementation applicable en matière de protection des données à
            caractère personnel").
          </Text>
          <Text mt={2}>
            Une politique de confidentialité, disponible à la rubrique "Politique
            de confidentialité" du Site, détaille les modalités de traitement des
            données, incluant les types de données collectées, leur finalité, leur
            durée de conservation et les droits des Utilisateurs.
          </Text>
          <Text mt={2}>
            En vertu de cette réglementation, l’Utilisateur dispose d’un droit
            d’accès, de rectification, de suppression et d’opposition concernant
            ses données personnelles. L’Utilisateur peut exercer ces droits en
            contactant :{" "}
            <Link href="mailto:neighborrow@hephel.fr" color="blue.500">
              neighborrow@hephel.fr
            </Link>.
          </Text>
        </Box>

        {/* Article 5: Propriété Intellectuelle */}
        <Box>
          <Heading as="h2" size="lg">
            ARTICLE 5 : PROPRIÉTÉ INTELLECTUELLE
          </Heading>
          <Text mt={4}>
            Les contenus du Site, incluant les textes, images, logos, code source
            et créations graphiques, sont la propriété intellectuelle de l’équipe
            projet Neighborrow ou de l’école EPITECH, sauf mention contraire.
            Toute utilisation, reproduction, diffusion, commercialisation ou
            modification, totale ou partielle, de ces contenus sans autorisation
            expresse de l’Éditeur est strictement interdite et peut entraîner des
            actions judiciaires conformément à la réglementation en vigueur.
          </Text>
        </Box>

        {/* Article 6: Limitation de Responsabilité */}
        <Box>
          <Heading as="h2" size="lg">
            ARTICLE 6 : LIMITATION DE RESPONSABILITÉ
          </Heading>
          <Text mt={4}>
            Le Site est un projet étudiant réalisé à des fins pédagogiques.
            L’Éditeur ne garantit pas l’exactitude ou l’exhaustivité des
            informations publiées et ne pourra être tenu responsable des dommages
            directs ou indirects résultant de l’utilisation du Site.
          </Text>
          <Text mt={2}>
            Les Utilisateurs sont invités à signaler tout contenu inapproprié ou
            erroné à l’adresse{" "}
            <Link href="mailto:neighborrow@hephel.fr" color="blue.500">
              neighborrow@hephel.fr
            </Link>{" "}
            pour permettre une correction rapide.
          </Text>
        </Box>

        {/* Article 7: Droit Applicable et Juridiction */}
        <Box>
          <Heading as="h2" size="lg">
            ARTICLE 7 : DROIT APPLICABLE ET JURIDICTION
          </Heading>
          <Text mt={4}>
            Les présentes mentions légales sont régies par le droit français. Tout
            litige relatif à l’utilisation du Site sera soumis aux tribunaux
            compétents de Paris, France.
          </Text>
        </Box>

        {/* Article 8: Contact */}
        <Box>
          <Heading as="h2" size="lg">
            ARTICLE 8 : CONTACT
          </Heading>
          <Text mt={4}>
            Pour toute question ou réclamation concernant le Site, l’Utilisateur
            peut contacter l’Éditeur à l’adresse suivante :{" "}
            <Link href="mailto:neighborrow@hephel.fr" color="blue.500">
              neighborrow@hephel.fr
            </Link>.
          </Text>
        </Box>

        {/* Article 9: Mise à Jour des Mentions Légales */}
        <Box>
          <Heading as="h2" size="lg">
            ARTICLE 9 : MISE À JOUR DES MENTIONS LÉGALES
          </Heading>
          <Text mt={4}>
            Les présentes mentions légales peuvent être modifiées à tout moment.
            Les Utilisateurs sont invités à les consulter régulièrement pour
            prendre connaissance des éventuelles modifications.
          </Text>
        </Box>

        {/* Politique de Confidentialité Placeholder */}
        <Box>
          <Heading as="h1" size="2xl">
            POLITIQUE DE CONFIDENTIALITÉ
          </Heading>
          <Text mt={2}>Neighborrow</Text>
          <Text color="gray.600">En vigueur au 17 avril 2025</Text>
        </Box>
      </VStack>
    </Box>
  );
}