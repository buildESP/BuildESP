import { Link as RouterLink } from "react-router-dom"
import {
  Box,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react"
import useAuth from "../hooks/useAuth"
import TourStep from "./TourStep"
import { useTourStep } from "@/hooks/useTourStep"
import { motion } from "framer-motion"

const MotionButton = motion(Button)

const HeroSection = () => {
  const { user } = useAuth()

  // Hook pour savoir si ce step est actif
  const { isCurrent: isHighlightStartBtn } = useTourStep("hero-start-btn")

  return (
    <Box
      bgGradient="to-br"
      gradientFrom="green.200"
      gradientTo="yellow.50"
      py={16}
      px={8}
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      {/* Step principal sur la section */}
      <TourStep id="hero" />

      <Heading as="h1" size="xl" color="green.900" mb={4}>
        Partagez et empruntez des outils avec vos voisins
      </Heading>

      <Text fontSize="lg" color="green.800" maxW="600px" mb={6}>
        Neighborrow est une plateforme où vous pouvez prêter et emprunter des
        outils et équipements dans votre quartier. Économisez de l'argent,
        réduisez les déchets et créez du lien avec votre communauté !
      </Text>

      {user ? (
        <Button
          as={RouterLink}
          to="/add-item"
          colorPalette="teal"
          size="lg"
        >
          Partager un objet
        </Button>
      ) : (
        <>
          <MotionButton
            as={RouterLink}
            to="/login"
            colorPalette="teal"
            size="lg"
            animate={isHighlightStartBtn ? { scale: [1, 1.05, 1] } : {}}
            transition={
              isHighlightStartBtn
                  ? {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : {}
            }
            boxShadow={
              isHighlightStartBtn
                ? "0 0 0 4px rgba(66, 153, 225, 0.4)"
                : "none"
            }
              zIndex={isHighlightStartBtn ? "popover" : "auto"} // "popover" = 9999
  position="relative"
          >
            Emprunter un objet
          </MotionButton>

          {/* Step du bouton */}
          <TourStep id="hero-start-btn" />
        </>
      )}
    </Box>
  )
}

export default HeroSection
