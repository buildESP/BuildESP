// src/components/tour/TourOverlay.jsx
import { Box } from '@chakra-ui/react'
import { useTourContext } from '@/context/useTourContext'

const TourOverlay = () => {
  const { isActive } = useTourContext()

  if (!isActive) return null

  return (
    <Box
      data-testid="tour-overlay"
      position="fixed"
      inset="0"
      bg="blackAlpha.600"
      zIndex="overlay"
      pointerEvents="none"
    />
  )
}

export default TourOverlay
