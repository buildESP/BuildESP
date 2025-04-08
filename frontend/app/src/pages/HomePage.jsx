// src/pages/HomePage.jsx
import HeroSection from '@/components/HeroSection'
import CategoriesGallery from '@/components/CategoriesGallery'
import ItemsGallery from '@/components/items/ItemsGallery'
import useFetchData from '@/hooks/useFetchData'
import useSearch from '@/hooks/useSearch'
import { Box, Button, Flex, Skeleton, Text } from '@chakra-ui/react'
import { usePageTour } from '@/hooks/usePageTour'
import { useTourContext } from '@/context/useTourContext'
import TourOverlay from '@/components/TourOverlay'

const steps = [
  {
    id: 'hero',
    title: 'Bienvenue 👋',
    description: "Voici la section d'accueil de l'application.",
  },
  {
    id: 'hero-start-btn',
    title: 'Commencer ici 🚀',
    description: 'Clique sur ce bouton pour démarrer ton expérience.',
  },
  {
    id: 'category-card',
    title: 'Choisis une catégorie 🗂️',
    description: 'Sélectionne une catégorie qui t’intéresse pour explorer les objets disponibles.',
  },
  {
    id: 'items-gallery',
    title: 'Emprunter un objet 🔧',
    description: 'Parcourons les objets proposés et clique pour en emprunter un !',
    isLast: true,
  },
]


const HomePageContent = () => {
  const { data: items, loading, error } = useFetchData('/items')
  const { searchTerm } = useSearch()
  const { start } = useTourContext()

  if (loading) return <Skeleton />
  if (error) return <Text color="red.500">{error}</Text>

  const filteredItems = items?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box>
      <TourOverlay />
      <Flex justify="flex-end" p={4}>
        <Button onClick={start} colorScheme="teal" variant="outline">
          Démarrer la visite 👋
        </Button>
      </Flex>
      <HeroSection />
      <CategoriesGallery />
      <ItemsGallery items={filteredItems} title="Objets du Voisinage" />
    </Box>
  )
}

const HomePage = () => {
  const { Wrapper } = usePageTour(steps)

  return (
    <Wrapper>
      <HomePageContent />
    </Wrapper>
  )
}

export default HomePage
