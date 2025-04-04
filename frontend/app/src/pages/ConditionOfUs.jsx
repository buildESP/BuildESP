import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { login } from "../services/authServices";
import { Box, Button, Input, VStack, Heading, Text } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";


const ConditionOfUs = () => {
  const [loginData, setLoginData] = useState({ login: "", password: "" });
  const [error, setError] = useState(null);
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(loginData.login, loginData.password);
      loginUser(data.token, data.userId);

      // ✅ Notification de succès
      toast.success(" Connexion réussie !", { position: "top-right" });

      navigate("/");
    } catch (err) {
      console.error("Erreur de connexion :", err);

      // ✅ Si le serveur renvoie un message d'erreur, on l'affiche
      const errorMessage = err.message || " Une erreur est survenue.";
      toast.error(errorMessage, { position: "top-right" });
    }
  };

  return (
<div>
    <div>
        <h1>CONDITIONS GÉNÉRALES D’UTILISATION (CGU)</h1>
        <p>En vigueur au 28 mars 2025</p>
    </div>

    <div>
        <h2>PRÉAMBULE</h2>
        <p>Les présentes conditions générales d’utilisation (dites « CGU ») ont pour objet de régir les modalités d’accès et d’utilisation du site internet <a href="http://neighborrow.fr/">http://neighborrow.fr/</a> et de l’application mobile éditée par la société Neighborrow. Elles encadrent juridiquement la mise à disposition des services de prêt d’objets entre voisins et définissent les droits et obligations des utilisateurs.</p>
        <p>Toute inscription implique l’acceptation pleine et entière des présentes CGU. L’utilisateur déclare en avoir pris connaissance et les accepter sans réserve.</p>
    </div>

    <div>
        <h2>ARTICLE 1 – MENTIONS LÉGALES.Concurrent</h2>
        <p>Le site et l’application sont édités par des élève d'Epitech dans le cadre d'un projet de find 'étude</p>
    </div>

    <div>
        <h2>ARTICLE 2 – ACCÈS AU SERVICE</h2>
        <p>Le site et l’application permettent aux utilisateurs majeurs d’accéder gratuitement à un service de mise en relation pour le prêt de biens entre particuliers résidant à proximité.</p>
        <p>L’accès aux fonctionnalités nécessite une inscription avec fourniture d’informations exactes. L’utilisateur accède à son espace personnel à l’aide d’un identifiant et d’un mot de passe confidentiel. Il peut demander sa désinscription à tout moment via son espace personnel.</p>
        <p>Le service peut être temporairement suspendu pour maintenance ou en cas de force majeure, sans que la responsabilité de la société soit engagée.</p>
    </div>

    <div>
        <h2>ARTICLE 3 – TRAITEMENT DES DONNÉES PERSONNELLES (RGPD)</h2>
        <p>Neighborrow collecte et traite les données personnelles des utilisateurs dans le respect du Règlement (UE) 2016/679 (RGPD) et de la loi Informatique et Libertés.</p>
        <p>Les données collectées sont limitées au strict nécessaire pour :</p>
        <p>La gestion des comptes utilisateurs ;</p>
        <p>La mise en relation entre utilisateurs ;</p>
        <p>La prévention des abus ;</p>
        <p>Le respect des obligations légales.</p>
        <p>L’utilisateur peut exercer ses droits d’accès, de rectification, d’opposition, de suppression et de portabilité via :</p>
        <p>son espace personnel ;</p>
        <p>ou par mail à : <a href="mailto:neighborrow@contact.com">neighborrow@contact.com</a></p>
        <p>Les données ne sont conservées que le temps strictement nécessaire à la finalité du traitement.</p>
    </div>

    <div>
        <h2>ARTICLE 4 – PARTAGE DES DONNÉES AVEC DES TIERS</h2>
        <p>Les données peuvent être partagées avec des prestataires techniques (hébergement, support, analytique) uniquement si cela est nécessaire au bon fonctionnement du service, et uniquement après consentement explicite de l’utilisateur.</p>
        <p>Ces tiers sont tenus à une obligation de conformité au RGPD. L’utilisateur peut à tout moment retirer son consentement au partage.</p>
    </div>

    <div>
        <h2>ARTICLE 5 – SÉCURITÉ DES DONNÉES</h2>
        <p>Neighborrow met en œuvre des mesures de sécurité conformes à l’état de l’art :</p>
        <p>chiffrement des données sensibles ;</p>
        <p>pseudonymisation ;</p>
        <p>hébergement sécurisé conforme ISO 27001 ;</p>
        <p>redondance des bases de données ;</p>
        <p>audits de sécurité réguliers.</p>
        <p>En cas de faille de sécurité, les utilisateurs concernés seront informés dans les meilleurs délais conformément à l’article 33 du RGPD.</p>
    </div>

    <div>
        <h2>ARTICLE 6 – OBLIGATIONS DES UTILISATEURS</h2>
        <p>Les utilisateurs s’engagent à :</p>
        <p>Ne prêter/demander que des biens licites ;</p>
        <p>Respecter les lois en vigueur et les autres utilisateurs ;</p>
        <p>Utiliser les biens prêtés avec soin et dans leur usage prévu ;</p>
        <p>Ne pas publier de contenus haineux, violents ou illicites ;</p>
        <p>Signaler tout comportement abusif ou contenu suspect.</p>
    </div>

    <div>
        <h2>ARTICLE 7 – BIENS ET ANNONCES STRICTEMENT INTERDITS</h2>
        <p>Sont strictement interdits sur la plateforme (liste non exhaustive) :</p>
        <p>Armes de toutes catégories (L. 311-2 du Code de la sécurité intérieure)</p>
        <p>Explosifs, munitions, feux d’artifice non homologués</p>
        <p>Substances illicites (stupéfiants, produits dopants, etc.)</p>
        <p>Produits contrefaits ou volés (article 321-1 du Code pénal)</p>
        <p>Biens nécessitant une licence spéciale non déclarée</p>
        <p>Matériels d’espionnage, brouilleurs, outils de piratage</p>
        <p>Biens à caractère sexuel ou liés à la prostitution, au proxénétisme, à la traite d’êtres humains</p>
        <p>La publication de tels contenus entraîne la suppression immédiate de l’annonce, la suspension du compte, et le cas échéant, la transmission aux autorités compétentes.</p>
    </div>


    <div>
        <h2>ARTICLE 8 – RESPONSABILITÉ ET LITIGES ENTRE UTILISATEURS</h2>
        <p>Neighborrow agit en tant qu’intermédiaire technique et n’est pas partie aux contrats de prêt entre utilisateurs.</p>
        <p>Chaque utilisateur est seul responsable du bon déroulement du prêt, de l’état du bien prêté ou reçu, et des dommages éventuels. En cas de litige, les utilisateurs doivent tenter une résolution amiable.</p>
        <p>La plateforme peut suspendre ou exclure un utilisateur en cas de comportement inapproprié ou signalé.</p>
    </div>

    <div>
        <h2>ARTICLE 9 – MODÉRATION DES CONTENUS</h2>
        <p>Tout contenu publié (annonce, message, commentaire) engage la responsabilité de son auteur.</p>
        <p>Sont interdits notamment :</p>
        <p>propos diffamatoires, racistes, incitant à la haine ou à la violence ;</p>
        <p>apologie du terrorisme ou de crimes ;</p>
        <p>contenu à caractère pornographique ou pédopornographique.</p>
        <p>Neighborrow met en œuvre un système de signalement, de modération automatique et humaine. Tout contenu illicite sera supprimé dans un délai raisonnable. La société coopère avec les autorités en cas de contenus graves.</p>
    </div>

    <div>
        <h2>ARTICLE 10 – PROPRIÉTÉ INTELLECTUELLE</h2>
        <p>La plateforme, ses codes, textes, images, graphismes, logos et bases de données sont protégés par le Code de la propriété intellectuelle.</p>
        <p>Les utilisateurs ne disposent d’aucun droit de reproduction sans autorisation préalable écrite. Le logiciel utilisé est protégé et la société détient l’intégralité des droits d’exploitation. Toute reproduction non autorisée est passible de sanctions.</p>
    </div>

    <div>
        <h2>ARTICLE 11 – SUSPENSION OU FERMETURE DE COMPTE</h2>
        <p>Neighborrow peut suspendre temporairement ou définitivement l’accès d’un utilisateur à la plateforme en cas :</p>
        <p>de non-respect des CGU ;</p>
        <p>de comportement frauduleux ;</p>
        <p>de publication de contenus interdits ;</p>
        <p>d’atteinte à la sécurité du service.</p>
    </div>

    <div>
        <h2>ARTICLE 12 – MODIFICATION DES CGU</h2>
        <p>Neighborrow se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés des changements par email ou notification. L’utilisation du service après modification vaut acceptation.</p>
    </div>

    <div>
        <h2>ARTICLE 13 – DROIT APPLICABLE ET JURIDICTION COMPÉTENTE</h2>
        <p>Les présentes CGU sont régies par le droit français et les règlements européens applicables (notamment RGPD, DSA, LCEN).</p>
        <p>En cas de litige, les parties privilégieront une résolution amiable. À défaut, les juridictions compétentes seront celles du siège social de la société.</p>
    </div>

    <div>
        <h2>ARTICLE 14 – CONTACT</h2>
        <p>Pour toute question concernant les CGU ou signalement d’abus, les utilisateurs peuvent contacter l’éditeur à l’adresse suivante : <a href="mailto:neighborrow@contact.com">neighborrow@contact.com</a></p>
    </div>

    <div>
        <h1>POLITIQUE DE CONFIDENTIALITÉ</h1>
        <p>Neighborrow</p>
        <p>En vigueur au 28 mars 2025</p>
    </div>

    <div>
        <h2>ARTICLE 1 : PRÉAMBULE</h2>
        <p>La présente politique de confidentialité a pour but d’informer les utilisateurs du site <a href="http://neighborrow.fr/">http://neighborrow.fr/</a> :</p>
        <p>Sur la manière dont sont collectées leurs données personnelles. Sont considérées comme des données personnelles toute information permettant d’identifier un utilisateur, telles que : nom, prénom, adresse e-mail, adresse postale, numéro de téléphone, localisation, adresse IP, etc. ;</p>
        <p>Sur les droits dont ils disposent concernant ces données ;</p>
        <p>Sur la personne responsable du traitement des données personnelles ;</p>
        <p>Sur les destinataires éventuels de ces données ;</p>
        <p>Sur la politique du site en matière de cookies.</p>
        <p>Cette politique complète les mentions légales et les Conditions Générales d’Utilisation consultables à l’adresse suivante : <a href="http://neighborrow.fr/cgu">http://neighborrow.fr/cgu</a></p>
    </div>

    <div>
        <h2>ARTICLE 2 : PRINCIPES RELATIFS À LA COLLECTE ET AU TRAITEMENT DES DONNÉES PERSONNELLES</h2>
        <p>Conformément à l’article 5 du Règlement (UE) 2016/679 (RGPD), les données personnelles sont :</p>
        <p>Traitées de manière licite, loyale et transparente ;</p>
        <p>Collectées pour des finalités déterminées, explicites et légitimes ;</p>
        <p>Adéquates, pertinentes et limitées à ce qui est strictement nécessaire ;</p>
        <p>Exactes et mises à jour autant que possible ;</p>
        <p>Conservées pendant une durée limitée, proportionnée à leur finalité ;</p>
        <p>Sécurisées par des mesures techniques et organisationnelles appropriées.</p>
        <p>Le traitement des données n’est licite que si au moins l’une des conditions suivantes est remplie :</p>
        <p>Consentement explicite de l’utilisateur ;</p>
        <p>Nécessité contractuelle (exécution du service de mise en relation) ;</p>
        <p>Obligation légale ;</p>
        <p>Intérêt légitime de Neighborrow, sous réserve du respect des droits et libertés fondamentaux.</p>
    </div>

    <div>
        <h2>ARTICLE 3 : DONNÉES À CARACTÈRE PERSONNEL COLLECTÉES ET TRAITÉES</h2>
        <h3>Article 3.1 : Données collectées</h3>
        <p>Les données collectées sont les suivantes :</p>
        <p>Lors de l’inscription : nom, prénom, adresse e-mail, mot de passe (chiffré), code postal, ville, numéro de téléphone (facultatif) ;</p>
        <p>Lors de l’utilisation de la plateforme : historique des prêts, évaluations, messages, objets proposés ou empruntés ;</p>
        <p>Données techniques : adresse IP, navigateur, pages visitées, temps de connexion.</p>
        <p>Finalités de la collecte :</p>
        <p>Création de compte et gestion de l’espace personnel ;</p>
        <p>Mise en relation entre voisins ;</p>
        <p>Suivi de l’utilisation de la plateforme ;</p>
        <p>Prévention des comportements illicites ou frauduleux ;</p>
        <p>Communication d’informations sur le service ;</p>
        <p>Amélioration du service et statistiques.</p>
    </div>

    <div>
        <h3>Article 3.2 : Mode de collecte des données</h3>
        <p>Données automatiquement collectées lors de la navigation :</p>
        <p>Adresse IP, type de navigateur, pages consultées, durée de visite, cookies.</p>
        <p>Données collectées via formulaire :</p>
        <p>Informations saisies à l’inscription ou à l’usage de fonctionnalités spécifiques (messagerie, annonce, évaluation).</p>
        <p>Durée de conservation :</p>
        <p>Données de compte : tant que le compte est actif, puis 3 ans après suppression ;</p>
        <p>Données techniques : jusqu’à 13 mois (cookies) ;</p>
        <p>Données en cas de litige ou signalement : jusqu’à 5 ans.</p>
        <p>Certaines données peuvent être conservées plus longtemps si une obligation légale l’impose.</p>
    </div>

    <div>
        <h3>Article 3.3 : Hébergement des données</h3>
        <p>Le site <a href="http://neighborrow.fr/">http://neighborrow.fr/</a> est hébergé par :</p>
        <p>[Nom de l’hébergeur à compléter]</p>
        <p>[Adresse]</p>
        <p>Contact : [email/téléphone à compléter]</p>
    </div>

    <div>
        <h3>Article 3.4 : Transmission des données à des tiers</h3>
        <p>Les données personnelles peuvent être transmises à des prestataires techniques exclusivement pour le bon fonctionnement du service (hébergement, support, analytics).</p>
        <p>Les sous-traitants sont tenus au respect du RGPD et ne peuvent en aucun cas exploiter les données à des fins commerciales.</p>
    </div>

    <div>
        <h3>Article 3.5 : Politique en matière de cookies</h3>
        <p>Des cookies peuvent être installés lors de la navigation, notamment pour :</p>
        <p>Assurer le fonctionnement du site (cookies essentiels) ;</p>
        <p>Réaliser des mesures d’audience (cookies analytiques) ;</p>
        <p>Améliorer l’expérience utilisateur (cookies de session).</p>
        <p>Certains cookies nécessitent le consentement explicite de l’utilisateur. Celui-ci peut les accepter, refuser ou configurer via une bannière ou depuis son navigateur.</p>
    </div>

    <div>
        <h2>ARTICLE 4 : RESPONSABLE DU TRAITEMENT ET DÉLÉGUÉ À LA PROTECTION DES DONNÉES</h2>
        <h3>Article 4.1 : Responsable du traitement</h3>
        <p>Les données personnelles sont collectées par :</p>
        <p>Neighborrow, société [forme juridique à compléter], au capital de [montant à compléter] €, immatriculée au RCS de Paris sous le n° [n° à compléter].</p>
        <p>Contact :</p>
        <p>Adresse : [adresse complète du siège social]</p>
        <p>Téléphone : [à compléter]</p>
        <p>Email : <a href="mailto:neighborrow@contact.com">neighborrow@contact.com</a></p>
    </div>

    <div>
        <h3>Article 4.2 : Délégué à la protection des données (DPO)</h3>
        <p>Le Délégué à la Protection des Données (DPO) est :</p>
        <p>[Nom du DPO à compléter]</p>
        <p>Email : [à compléter]</p>
        <p>Adresse : [à compléter]</p>
        <p>Si, après nous avoir contactés, vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL : <a href="http://www.cnil.fr">www.cnil.fr</a></p>
    </div>

    <div>
        <h2>ARTICLE 5 : DROITS DES UTILISATEURS</h2>
        <p>Conformément aux articles 15 à 22 du RGPD, l’utilisateur dispose des droits suivants :</p>
        <p>Droit d’accès, de rectification, d’effacement ;</p>
        <p>Droit à la limitation du traitement ;</p>
        <p>Droit d’opposition au traitement ;</p>
        <p>Droit à la portabilité ;</p>
        <p>Droit de retirer son consentement à tout moment ;</p>
        <p>Droit de définir le sort de ses données après son décès ;</p>
        <p>Droit d’introduire une réclamation auprès de la CNIL.</p>
        <p>Pour exercer vos droits :</p>
        <p>Contact : <a href="mailto:neighborrow@contact.com">neighborrow@contact.com</a></p>
        <p>L’utilisateur pourra être invité à fournir une pièce justificative (identité, adresse e-mail, n° de compte).</p>
    </div>

    <div>
        <h2>ARTICLE 6 : MODIFICATION DE LA POLITIQUE DE CONFIDENTIALITÉ</h2>
        <p>Neighborrow se réserve le droit de modifier la présente politique à tout moment. En cas de modification substantielle, les utilisateurs en seront informés.</p>
        <p>L’utilisateur est invité à consulter cette politique régulièrement.</p>
        <p>Date de publication : 28 mars 2025</p>
        <p>Dernière mise à jour : 28 mars 2025</p>
    </div>
</div>
  );
};

export default ConditionOfUs;
