import HeroSection from '@/components/HeroSection'
import CategoriesGallery from '@/components/CategoriesGallery'
import ItemsGallery from '@/components/items/ItemsGallery'
import useFetchData from '@/hooks/useFetchData'
import useSearch from '@/hooks/useSearch'
import { Box, Button, Flex, Skeleton, Text } from '@chakra-ui/react'
import { useTourContext } from '@/context/useTourContext'
import TourOverlay from '@/components/tour/TourOverlay'
import useAuth from '@/hooks/useAuth'
import { useEffect, useState } from 'react'

const HomePage = () => {
  const { data: items, loading, error } = useFetchData('/items')
  const { searchTerm } = useSearch()
  const { user } = useAuth()
  const { start } = useTourContext()

  const [hasSeenTour, setHasSeenTour] = useState(true)

  // check localStorage only on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const seen = localStorage.getItem("hasSeenTour")
      setHasSeenTour(Boolean(seen))
    }
  }, [])

  if (loading) return <Skeleton />
  if (error) return <Text color="red.500">{error}</Text>

  const filteredItems = items?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleStartTour = () => {
    start()
    localStorage.setItem("hasSeenTour", "true")
    setHasSeenTour(true)
  }

  return (
    <Box>
      <TourOverlay />

      {user && !hasSeenTour && (
        <Flex justify="flex-end" p={4}>
          <Button onClick={handleStartTour} colorScheme="teal" variant="outline">
            Démarrer la visite 👋
          </Button>
        </Flex>
      )}

      <HeroSection />
      <CategoriesGallery />
      <ItemsGallery items={filteredItems} title="Objets du Voisinage" />
    </Box>
  )
}

export default HomePage
