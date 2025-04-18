import { Box, VStack, Heading, Text, Link } from "@chakra-ui/react";

export default function Faq() {
  return (
    <Box p={8} maxW="6xl" mx="auto">
      <VStack spacing={10} align="stretch">
        {/* FAQ Header */}
        <Box>
          <Heading as="h1" size="2xl">
            Foire aux Questions (FAQ)
          </Heading>
          <Text color="gray.600">Mise à jour le 17 avril 2025</Text>
        </Box>

        {/* General Section */}
        <Box>
          <Heading as="h2" size="lg">
            Général
          </Heading>
          <Box mt={4}>
            <Heading as="h3" size="md">
              Est-ce que l’utilisation de Neighborrow est payante ?
            </Heading>
            <Text mt={2}>
              Non, les prêts d’objets sont gratuits. Cependant, certains prêteurs
              peuvent demander une caution remboursable ou une petite contribution
              pour l’entretien de l’objet, selon l’accord conclu.
            </Text>
          </Box>
        </Box>

        {/* Inscription et compte Section */}
        <Box>
          <Heading as="h2" size="lg">
            Inscription et compte
          </Heading>
          <Box mt={4}>
            <Heading as="h3" size="md">
              Que faire si j’ai oublié mon mot de passe ?
            </Heading>
            <Text mt={2}>
              Rendez-vous sur la page de connexion de l’application ou sur{" "}
              <Link
                color="blue.500"
                href="http://neighborrow.hephel.fr"
                isExternal
              >
                http://neighborrow.hephel.fr
              </Link>
              , cliquez sur « Mot de passe oublié », entrez votre adresse e-mail
              et suivez le lien envoyé pour réinitialiser votre mot de passe.
            </Text>
          </Box>
          <Box mt={4}>
            <Heading as="h3" size="md">
              Comment m’inscrire sur Neighborrow ?
            </Heading>
            <Text mt={2}>
              connectez vous sur {" "}
              <Link
                color="blue.500"
                href="http://neighborrow.hephel.fr"
                isExternal
              >
                http://neighborrow.hephel.fr
              </Link>
              . Cliquez sur « S’inscrire », entrez votre e-mail, créez un mot de
              passe et complétez votre profil avec une adresse vérifiable.
            </Text>
          </Box>
          <Box mt={4}>
            <Heading as="h3" size="md">
              Dois-je fournir une pièce d’identité ?
            </Heading>
            <Text mt={2}>
              Non aucune pièce d'identité n'est requise, cependant  nous pouvons faire une vérification de votre profil et démander des documents en cas de doute.
            </Text>
          </Box>
          <Box mt={4}>
            <Heading as="h3" size="md">
              Mes informations personnelles sont-elles sécurisées ?
            </Heading>
            <Text mt={2}>
              Oui, nous utilisons un chiffrement SSL et respectons les
              réglementations RGPD pour protéger vos données.
            </Text>
          </Box>
        </Box>

        {/* Légalité et objets interdits Section */}
        <Box>
          <Heading as="h2" size="lg">
            Légalité et objets interdits
          </Heading>
          <Box mt={4}>
            <Heading as="h3" size="md">
              Quels objets sont interdits sur Neighborrow ?
            </Heading>
            <Text mt={2}>Les objets suivants sont interdits :</Text>
            <Text mt={2}>
              - Armes (armes à feu, couteaux, objets dangereux).
            </Text>
            <Text mt={2}>
              - Nourriture ou biens périssables (aliments, plantes, cosmétiques).
            </Text>
            <Text mt={2}>
              - Objets à usage unique (consommables, articles jetables).
            </Text>
            <Text mt={2}>
              - Objets illégaux ou contrefaits (drogues, produits volés).
            </Text>
            <Text mt={2}>
              Consultez nos conditions d’utilisation sur{" "}
              <Link
                color="blue.500"
                href="http://neighborrow.hephel.fr"
                isExternal
              >
                http://neighborrow.hephel.fr
              </Link>{" "}
              pour plus de détails.
            </Text>
          </Box>
          <Box mt={4}>
            <Heading as="h3" size="md">
              Que faire si je vois un objet illégal sur la plateforme ?
            </Heading>
            <Text mt={2}>
              Utilisez le système de signalement intégré. Cliquez sur « Signaler »
              près de l’annonce, décrivez le problème, et notre équipe examinera la
              situation sous 24 à 48 heures. Ne contactez pas directement
              l’utilisateur concerné.
            </Text>
          </Box>
        </Box>

        {/* Processus d’emprunt et de prêt Section */}
        <Box>
          <Heading as="h2" size="lg">
            Processus d’emprunt et de prêt
          </Heading>
          <Box mt={4}>
            <Heading as="h3" size="md">
              Comment emprunter un objet sur Neighborrow ?
            </Heading>
            <Text mt={2}>
              1. Inscrivez-vous sur{" "}
              <Link
                color="blue.500"
                href="http://neighborrow.hephel.fr"
                isExternal
              >
                http://neighborrow.hephel.fr
              </Link>{" "}
              et connectez-vous à votre compte.
            </Text>
            <Text mt={2}>
              2. Accédez à la page d’accueil ou à la section « Objets disponibles
              ».
            </Text>
            <Text mt={2}>
              3. Sélectionnez un objet et cliquez sur « Emprunter ».
            </Text>
            <Text mt={2}>
              4. Envoyez une demande au prêteur, qui pourra accepter ou refuser.
            </Text>
            <Text mt={2}>
              5. Une fois accepté, convenez d’un lieu et d’un horaire pour
              récupérer l’objet.
            </Text>
          </Box>
          <Box mt={4}>
            <Heading as="h3" size="md">
              Comment ajouter un objet à prêter ?
            </Heading>
            <Text mt={2}>1. Connectez-vous à votre compte.</Text>
            <Text mt={2}>
              2. Accédez au formulaire « Ajouter un objet » dans l’application ou
              sur le site.
            </Text>
            <Text mt={2}>
              3. Remplissez les détails (description, photos, durée de prêt,
              éventuelle caution).
            </Text>
            <Text mt={2}>
              4. Publiez l’annonce et gérez les demandes via l’application.
            </Text>
          </Box>
        </Box>

        {/* Problèmes liés au prêt/emprunt Section */}
        <Box>
          <Heading as="h2" size="lg">
            Problèmes liés au prêt/emprunt
          </Heading>
          <Box mt={4}>
            <Heading as="h3" size="md">
              Que faire si on ne me rend pas mon objet ?
            </Heading>
            <Text mt={2}>
              1. Contactez l’emprunteur via le chat de l’application pour demander
              le retour.
            </Text>
            <Text mt={2}>
              2. Signalez l’incident via le formulaire de support sur{" "}
              <Link
                color="blue.500"
                href="http://neighborrow.hephel.fr"
                isExternal
              >
                http://neighborrow.hephel.fr
              </Link>.
            </Text>
            <Text mt={2}>
              3. Si nécessaire, portez plainte auprès des autorités locales avec
              les preuves (messages, contrat de prêt).
            </Text>
            <Text mt={2}>
              Nous pouvons vous assister dans la médiation, mais Neighborrow n’est
              pas responsable des vols, pertes ou non-retours.
            </Text>
          </Box>
          <Box mt={4}>
            <Heading as="h3" size="md">
              Que faire si un objet emprunté est endommagé ?
            </Heading>
            <Text mt={2}>
              Informez le prêteur via l’application et signalez l’incident à notre
              équipe via le formulaire de support. Neighborrow n’est pas
              responsable des dégradations, mais nous pouvons faciliter une
              médiation. Documentez l’état de l’objet avec des photos avant et
              après le prêt.
            </Text>
          </Box>
        </Box>

        {/* Précautions et responsabilités Section */}
        <Box>
          <Heading as="h2" size="lg">
            Précautions et responsabilités
          </Heading>
          <Box mt={4}>
            <Heading as="h3" size="md">
              Quelles précautions prendre avant d’emprunter ou de prêter un objet
              ?
            </Heading>
            <Text mt={2}>
              - Prenez des photos de l’objet avant et après le prêt pour
              documenter son état.
            </Text>
            <Text mt={2}>
              - Mettez-vous d’accord sur l’état et le fonctionnement de l’objet via
              le chat de l’application.
            </Text>
            <Text mt={2}>
              - Vérifiez les avis et le profil de l’utilisateur.
            </Text>
            <Text mt={2}>
              - Pour les objets de valeur, envisagez une caution ou une assurance
              (si disponible).
            </Text>
            <Text mt={2}>
              Neighborrow n’est pas responsable des dégradations, pertes ou vols.
            </Text>
          </Box>
          <Box mt={4}>
            <Heading as="h3" size="md">
              Neighborrow est-il responsable en cas de problème (vol, perte,
              dégradation) ?
            </Heading>
            <Text mt={2}>
              Non, Neighborrow est une plateforme de mise en relation et n’est pas
              responsable des vols, pertes ou dégradations. Nous vous encourageons
              à prendre des précautions et à signaler tout problème pour une
              assistance en médiation. En cas de litige grave, vous pouvez porter
              plainte auprès des autorités.
            </Text>
          </Box>
        </Box>

        {/* Autres questions légales Section */}
        <Box>
          <Heading as="h2" size="lg">
            Autres questions légales
          </Heading>
          <Box mt={4}>
            <Heading as="h3" size="md">
              Puis-je prêter ou emprunter des objets de grande valeur ?
            </Heading>
            <Text mt={2}>
              Oui, mais prenez des précautions supplémentaires (caution,
              vérification d’identité, assurance si disponible). Neighborrow n’est
              pas responsable des pertes ou dommages sur les objets de valeur.
            </Text>
          </Box>
          <Box mt={4}>
            <Heading as="h3" size="md">
              Comment Neighborrow protège-t-il les utilisateurs contre les abus ?
            </Heading>
            <Text mt={2}>
              Nous proposons un système de signalement, des avis utilisateurs, et
              une vérification d’identité optionnelle. Les comptes signalés pour
              activité illégale ou abusive peuvent être suspendus après enquête.
            </Text>
          </Box>
        </Box>

        {/* Contact Section */}
        <Box>
          <Heading as="h2" size="lg">
            Une autre question ?
          </Heading>
          <Text mt={4}>
            Si vous ne trouvez pas de réponse à votre question, contactez notre
            équipe à{" "}
            <Link href="mailto:neighborrow@hephel.fr" color="blue.500">
              neighborrow@hephel.fr
            </Link>.
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}