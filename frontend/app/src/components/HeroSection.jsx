import { Link as RouterLink } from "react-router-dom"
import {
  Box,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react"
import useAuth from "../hooks/useAuth"
import TourStep from "./tour/TourStep"
import { useTourStep } from "@/hooks/useTourStep"
import { useTourContext } from "@/context/useTourContext"
import { motion } from "framer-motion"

const MotionButton = motion(Button)

const HeroSection = () => {
  const { user } = useAuth()
  const { isActive } = useTourContext()
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
        <>
          <MotionButton
            as={RouterLink}
            to="/add-item"
            colorPalette="teal"
            size="lg"
            pointerEvents={isActive ? "none" : "auto"}
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
            zIndex={isHighlightStartBtn ? "popover" : "auto"}
            position="relative"
          >
            Partager un objet
          </MotionButton>

          {/* Step du bouton */}
          <TourStep id="hero-start-btn" />
        </>
      ) : (
        <Button
          as={RouterLink}
          to="/login"
          colorPalette="teal"
          size="lg"
        >
          Emprunter un objet
        </Button>
      )}
    </Box>
  )
}

export default HeroSection
