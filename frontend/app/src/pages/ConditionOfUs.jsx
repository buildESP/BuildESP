import { Box, VStack, Heading, Text, Link } from "@chakra-ui/react";

export default function CGU() {
  return (
    <Box p={8} maxW="6xl" mx="auto">
      <VStack spacing={10} align="stretch">

        {/* Partie CGU */}
        <Box>
          <Heading as="h1" size="2xl">
            CONDITIONS GÉNÉRALES D’UTILISATION (CGU)
          </Heading>
          <Text color="gray.600">En vigueur au 28 mars 2025</Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">PRÉAMBULE</Heading>
          <Text>
            Les présentes conditions générales d’utilisation (dites « CGU ») ont pour objet de régir les modalités d’accès et d’utilisation du site internet{" "}
            <Link color="blue.500" href="http://neighborrow.hephel.fr" isExternal>
              http://neighborrow.hephel.fr
            </Link>{" "}
            et de l’application mobile éditée par la société Neighborrow. Elles encadrent juridiquement la mise à disposition des services de prêt d’objets entre voisins et définissent les droits et obligations des utilisateurs.
          </Text>
          <Text>
            Toute inscription implique l’acceptation pleine et entière des présentes CGU. L’utilisateur déclare en avoir pris connaissance et les accepter sans réserve.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 1 – MENTIONS LÉGALES</Heading>
          <Text>
            Le site et l’application sont édités par des élèves d'Epitech dans le cadre d'un projet de fin d'études.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 2 – ACCÈS AU SERVICE</Heading>
          <Text>
            Le site et l’application permettent aux utilisateurs majeurs d’accéder gratuitement à un service de mise en relation pour le prêt de biens entre particuliers résidant à proximité.
          </Text>
          <Text>
            L’accès aux fonctionnalités nécessite une inscription avec fourniture d’informations exactes. L’utilisateur accède à son espace personnel à l’aide d’un identifiant et d’un mot de passe confidentiel. Il peut demander sa désinscription à tout moment via son espace personnel.
          </Text>
          <Text>
            Le service peut être temporairement suspendu pour maintenance ou en cas de force majeure, sans que la responsabilité de la société soit engagée.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">
            ARTICLE 3 – TRAITEMENT DES DONNÉES PERSONNELLES (RGPD)
          </Heading>
          <Text>
            Neighborrow collecte et traite les données personnelles des utilisateurs dans le respect du Règlement (UE) 2016/679 (RGPD) et de la loi Informatique et Libertés.
          </Text>
          <Text>
            Les données collectées sont limitées au strict nécessaire pour :
          </Text>
          <Text>- La gestion des comptes utilisateurs ;</Text>
          <Text>- La mise en relation entre utilisateurs ;</Text>
          <Text>- La prévention des abus ;</Text>
          <Text>- Le respect des obligations légales.</Text>
          <Text>
            L’utilisateur peut exercer ses droits via son espace personnel ou par mail à :{" "}
            <Link href="mailto:neighborrow@contact.com" color="blue.500">
              neighborrow@contact.com
            </Link>
          </Text>
          <Text>
            Les données ne sont conservées que le temps strictement nécessaire à la finalité du traitement.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 4 – PARTAGE DES DONNÉES AVEC DES TIERS</Heading>
          <Text>
            Les données peuvent être partagées avec des prestataires techniques (hébergement, support, analytique) uniquement si cela est nécessaire au bon fonctionnement du service, et uniquement après consentement explicite de l’utilisateur.
          </Text>
          <Text>
            Ces tiers sont tenus à une obligation de conformité au RGPD. L’utilisateur peut à tout moment retirer son consentement au partage.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 5 – SÉCURITÉ DES DONNÉES</Heading>
          <Text>
            Neighborrow met en œuvre des mesures de sécurité conformes à l’état de l’art :
          </Text>
          <Text>- chiffrement des données sensibles ;</Text>
          <Text>- pseudonymisation ;</Text>
          <Text>- hébergement sécurisé conforme ISO 27001 ;</Text>
          <Text>- redondance des bases de données ;</Text>
          <Text>- audits de sécurité réguliers.</Text>
          <Text>
            En cas de faille de sécurité, les utilisateurs concernés seront informés dans les meilleurs délais conformément à l’article 33 du RGPD.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 6 – OBLIGATIONS DES UTILISATEURS</Heading>
          <Text>
            Les utilisateurs s’engagent à :
          </Text>
          <Text>- Ne prêter/demander que des biens licites ;</Text>
          <Text>- Respecter les lois en vigueur et les autres utilisateurs ;</Text>
          <Text>- Utiliser les biens prêtés avec soin et dans leur usage prévu ;</Text>
          <Text>- Ne pas publier de contenus haineux, violents ou illicites ;</Text>
          <Text>- Signaler tout comportement abusif ou contenu suspect.</Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 7 – BIENS ET ANNONCES STRICTEMENT INTERDITS</Heading>
          <Text>
            Sont strictement interdits sur la plateforme (liste non exhaustive) :
          </Text>
          <Text>- Armes de toutes catégories (L. 311-2 du Code de la sécurité intérieure)</Text>
          <Text>- Explosifs, munitions, feux d’artifice non homologués</Text>
          <Text>- Substances illicites (stupéfiants, produits dopants, etc.)</Text>
          <Text>- Produits contrefaits ou volés (article 321-1 du Code pénal)</Text>
          <Text>- Biens nécessitant une licence spéciale non déclarée</Text>
          <Text>- Matériels d’espionnage, brouilleurs, outils de piratage</Text>
          <Text>- Biens à caractère sexuel ou liés à la prostitution, au proxénétisme, à la traite d’êtres humains</Text>
          <Text>
            La publication de tels contenus entraîne la suppression immédiate de l’annonce, la suspension du compte, et le cas échéant, la transmission aux autorités compétentes.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 8 – RESPONSABILITÉ ET LITIGES ENTRE UTILISATEURS</Heading>
          <Text>
            Neighborrow agit en tant qu’intermédiaire technique et n’est pas partie aux contrats de prêt entre utilisateurs.
          </Text>
          <Text>
            Chaque utilisateur est seul responsable du bon déroulement du prêt, de l’état du bien prêté ou reçu, et des dommages éventuels. En cas de litige, les utilisateurs doivent tenter une résolution amiable.
          </Text>
          <Text>
            La plateforme peut suspendre ou exclure un utilisateur en cas de comportement inapproprié ou signalé.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 9 – MODÉRATION DES CONTENUS</Heading>
          <Text>
            Tout contenu publié (annonce, message, commentaire) engage la responsabilité de son auteur.
          </Text>
          <Text>
            Sont interdits notamment :
          </Text>
          <Text>- propos diffamatoires, racistes, incitant à la haine ou à la violence ;</Text>
          <Text>- apologie du terrorisme ou de crimes ;</Text>
          <Text>- contenu à caractère pornographique ou pédopornographique.</Text>
          <Text>
            Neighborrow met en œuvre un système de signalement, de modération automatique et humaine. Tout contenu illicite sera supprimé dans un délai raisonnable. La société coopère avec les autorités en cas de contenus graves.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 10 – PROPRIÉTÉ INTELLECTUELLE</Heading>
          <Text>
            La plateforme, ses codes, textes, images, graphismes, logos et bases de données sont protégés par le Code de la propriété intellectuelle.
          </Text>
          <Text>
            Les utilisateurs ne disposent d’aucun droit de reproduction sans autorisation préalable écrite. Le logiciel utilisé est protégé et la société détient l’intégralité des droits d’exploitation. Toute reproduction non autorisée est passible de sanctions.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 11 – SUSPENSION OU FERMETURE DE COMPTE</Heading>
          <Text>
            Neighborrow peut suspendre temporairement ou définitivement l’accès d’un utilisateur à la plateforme en cas :
          </Text>
          <Text>- de non-respect des CGU ;</Text>
          <Text>- de comportement frauduleux ;</Text>
          <Text>- de publication de contenus interdits ;</Text>
          <Text>- d’atteinte à la sécurité du service.</Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 12 – MODIFICATION DES CGU</Heading>
          <Text>
            Neighborrow se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés des changements par email ou notification. L’utilisation du service après modification vaut acceptation.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 13 – DROIT APPLICABLE ET JURIDICTION COMPÉTENTE</Heading>
          <Text>
            Les présentes CGU sont régies par le droit français et les règlements européens applicables (notamment RGPD, DSA, LCEN).
          </Text>
          <Text>
            En cas de litige, les parties privilégieront une résolution amiable. À défaut, les juridictions compétentes seront celles du siège social de la société.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 14 – CONTACT</Heading>
          <Text>
            Pour toute question concernant les CGU ou signalement d’abus, les utilisateurs peuvent contacter l’éditeur à l’adresse suivante :{" "}
            <Link href="mailto:neighborrow@contact.com" color="blue.500">
              neighborrow@contact.com
            </Link>
          </Text>
        </Box>

        {/* Partie Politique de Confidentialité */}
        <Box>
          <Heading as="h1" size="2xl">
            POLITIQUE DE CONFIDENTIALITÉ
          </Heading>
          <Text>Neighborrow</Text>
          <Text color="gray.600">En vigueur au 28 mars 2025</Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 1 : PRÉAMBULE</Heading>
          <Text>
            La présente politique de confidentialité a pour but d’informer les utilisateurs du site{" "}
            <Link color="blue.500" href="http://neighborrow.hephel.fr" isExternal>
              http://neighborrow.hephel.fr
            </Link>
            :
          </Text>
          <Text>
            Sur la manière dont sont collectées leurs données personnelles. Sont considérées comme des données personnelles toute information permettant d’identifier un utilisateur, telles que : nom, prénom, adresse e-mail, adresse postale, numéro de téléphone, localisation, adresse IP, etc.
          </Text>
          <Text>Sur les droits dont ils disposent concernant ces données ;</Text>
          <Text>Sur la personne responsable du traitement des données personnelles ;</Text>
          <Text>Sur les destinataires éventuels de ces données ;</Text>
          <Text>Sur la politique du site en matière de cookies.</Text>
          <Text>
            Cette politique complète les mentions légales et les Conditions Générales d’Utilisation consultables à l’adresse suivante :{" "}
            <Link color="blue.500" href="http://neighborrow.hephel.frcgu" isExternal>
              http://neighborrow.hephel.frcgu
            </Link>
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">
            ARTICLE 2 : PRINCIPES RELATIFS À LA COLLECTE ET AU TRAITEMENT DES DONNÉES PERSONNELLES
          </Heading>
          <Text>
            Conformément à l’article 5 du Règlement (UE) 2016/679 (RGPD), les données personnelles sont :
          </Text>
          <Text>- Traitées de manière licite, loyale et transparente ;</Text>
          <Text>- Collectées pour des finalités déterminées, explicites et légitimes ;</Text>
          <Text>- Adéquates, pertinentes et limitées à ce qui est strictement nécessaire ;</Text>
          <Text>- Exactes et mises à jour autant que possible ;</Text>
          <Text>- Conservées pendant une durée limitée, proportionnée à leur finalité ;</Text>
          <Text>- Sécurisées par des mesures techniques et organisationnelles appropriées.</Text>
          <Text>
            Le traitement des données n’est licite que si au moins l’une des conditions suivantes est remplie :
          </Text>
          <Text>- Consentement explicite de l’utilisateur ;</Text>
          <Text>- Nécessité contractuelle (exécution du service de mise en relation) ;</Text>
          <Text>- Obligation légale ;</Text>
          <Text>- Intérêt légitime de Neighborrow, sous réserve du respect des droits et libertés fondamentaux.</Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 3 : DONNÉES À CARACTÈRE PERSONNEL COLLECTÉES ET TRAITÉES</Heading>
          <Heading as="h3" size="md" mt={4}>Article 3.1 : Données collectées</Heading>
          <Text>
            Les données collectées sont les suivantes :
          </Text>
          <Text>- Lors de l’inscription : nom, prénom, adresse e-mail, mot de passe (chiffré), code postal, ville, numéro de téléphone (facultatif) ;</Text>
          <Text>- Lors de l’utilisation de la plateforme : historique des prêts, évaluations, messages, objets proposés ou empruntés ;</Text>
          <Text>- Données techniques : adresse IP, navigateur, pages visitées, temps de connexion.</Text>
          <Text>
            Finalités de la collecte :
          </Text>
          <Text>- Création de compte et gestion de l’espace personnel ;</Text>
          <Text>- Mise en relation entre voisins ;</Text>
          <Text>- Suivi de l’utilisation de la plateforme ;</Text>
          <Text>- Prévention des comportements illicites ou frauduleux ;</Text>
          <Text>- Communication d’informations sur le service ;</Text>
          <Text>- Amélioration du service et statistiques.</Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">
            Article 3.2 : Mode de collecte des données
          </Heading>
          <Text>
            Données automatiquement collectées lors de la navigation :
          </Text>
          <Text>- Adresse IP, type de navigateur, pages consultées, durée de visite, cookies.</Text>
          <Text>
            Données collectées via formulaire :
          </Text>
          <Text>- Informations saisies à l’inscription ou à l’usage de fonctionnalités spécifiques (messagerie, annonce, évaluation).</Text>
          <Text>
            Durée de conservation :
          </Text>
          <Text>- Données de compte : tant que le compte est actif, puis 3 ans après suppression ;</Text>
          <Text>- Données techniques : jusqu’à 13 mois (cookies) ;</Text>
          <Text>- Données en cas de litige ou signalement : jusqu’à 5 ans.</Text>
          <Text>
            Certaines données peuvent être conservées plus longtemps si une obligation légale l’impose.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">Article 3.3 : Hébergement des données</Heading>
          <Text>
            Le site{" "}
            <Link color="blue.500" href="http://neighborrow.hephel.fr" isExternal>
              http://neighborrow.hephel.fr
            </Link>{" "}
            est hébergé par :
          </Text>
          <Text>[Nom de l’hébergeur à compléter]</Text>
          <Text>[Adresse]</Text>
          <Text>Contact : [email/téléphone à compléter]</Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">Article 3.4 : Transmission des données à des tiers</Heading>
          <Text>
            Les données personnelles peuvent être transmises à des prestataires techniques exclusivement pour le bon fonctionnement du service (hébergement, support, analytics).
          </Text>
          <Text>
            Les sous-traitants sont tenus au respect du RGPD et ne peuvent en aucun cas exploiter les données à des fins commerciales.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">Article 3.5 : Politique en matière de cookies</Heading>
          <Text>
            Des cookies peuvent être installés lors de la navigation, notamment pour :
          </Text>
          <Text>- Assurer le fonctionnement du site (cookies essentiels) ;</Text>
          <Text>- Réaliser des mesures d’audience (cookies analytiques) ;</Text>
          <Text>- Améliorer l’expérience utilisateur (cookies de session).</Text>
          <Text>
            Certains cookies nécessitent le consentement explicite de l’utilisateur. Celui-ci peut les accepter, refuser ou configurer via une bannière ou depuis son navigateur.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">
            ARTICLE 4 : RESPONSABLE DU TRAITEMENT ET DÉLÉGUÉ À LA PROTECTION DES DONNÉES
          </Heading>
          <Heading as="h3" size="md" mt={4}>Article 4.1 : Responsable du traitement</Heading>
          <Text>
            Les données personnelles sont collectées par :
          </Text>
          <Text>
            Neighborrow, société [forme juridique à compléter], au capital de [montant à compléter] €, immatriculée au RCS de Paris sous le n° [n° à compléter].
          </Text>
          <Text>Contact :</Text>
          <Text>- Adresse : [adresse complète du siège social]</Text>
          <Text>- Téléphone : [à compléter]</Text>
          <Text>
            - Email :{" "}
            <Link color="blue.500" href="mailto:neighborrow@contact.com">
              neighborrow@contact.com
            </Link>
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">
            Article 4.2 : Délégué à la protection des données (DPO)
          </Heading>
          <Text>
            Le Délégué à la Protection des Données (DPO) est :
          </Text>
          <Text>[Nom du DPO à compléter]</Text>
          <Text>- Email : [à compléter]</Text>
          <Text>- Adresse : [à compléter]</Text>
          <Text>
            Si, après nous avoir contactés, vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL :{" "}
            <Link color="blue.500" href="http://www.cnil.fr" isExternal>
              www.cnil.fr
            </Link>
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 5 : DROITS DES UTILISATEURS</Heading>
          <Text>
            Conformément aux articles 15 à 22 du RGPD, l’utilisateur dispose des droits suivants :
          </Text>
          <Text>- Droit d’accès, de rectification, d’effacement ;</Text>
          <Text>- Droit à la limitation du traitement ;</Text>
          <Text>- Droit d’opposition au traitement ;</Text>
          <Text>- Droit à la portabilité ;</Text>
          <Text>- Droit de retirer son consentement à tout moment ;</Text>
          <Text>- Droit de définir le sort de ses données après son décès ;</Text>
          <Text>- Droit d’introduire une réclamation auprès de la CNIL.</Text>
          <Text>
            Pour exercer vos droits :
          </Text>
          <Text>
            Contact :{" "}
            <Link color="blue.500" href="mailto:neighborrow@contact.com">
              neighborrow@contact.com
            </Link>
          </Text>
          <Text>
            L’utilisateur pourra être invité à fournir une pièce justificative (identité, adresse e-mail, n° de compte).
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg">ARTICLE 6 : MODIFICATION DE LA POLITIQUE DE CONFIDENTIALITÉ</Heading>
          <Text>
            Neighborrow se réserve le droit de modifier la présente politique à tout moment. En cas de modification substantielle, les utilisateurs en seront informés.
          </Text>
          <Text>
            L’utilisateur est invité à consulter cette politique régulièrement.
          </Text>
          <Text>- Date de publication : 28 mars 2025</Text>
          <Text>- Dernière mise à jour : 28 mars 2025</Text>
        </Box>

      </VStack>
    </Box>
  );
}