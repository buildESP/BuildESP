import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"
import { Link } from "react-router"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import ItemCard from "./ItemCard"
import TourStep from "../tour/TourStep"
import { useTourStep } from '@/hooks/useTourStep'


const pageSize = 6

const ItemsGallery = ({ items }) => {
  const [page, setPage] = useState(1)
  const pageCount = Math.ceil(items.length / pageSize)

  const start = (page - 1) * pageSize
  const end = start + pageSize
  const visibleItems = items.slice(start, end)
  const { isCurrent: isItemStep } = useTourStep("items-gallery")

  const goToPage = (p) => {
    if (p >= 1 && p <= pageCount) setPage(p)
  }

  if (!items || items.length === 0) {
    return <Text color="gray.500">Aucun item disponible.</Text>
  }

  return (
    <Box w="full">
      <HStack justify="space-between" py={4}>
      <TourStep id="items-gallery" />
        <Button colorPalette="green" as={Link} to="/add-item" size="sm">
          Ajouter un item
        </Button>
      </HStack>

      <Grid
        templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
        gap={6}
        position="relative"
  zIndex={isItemStep ? "popover" : "auto"}
  boxShadow={isItemStep ? "0 0 0 4px rgba(66, 153, 225, 0.4)" : "none"}
  animation={isItemStep ? "pulse-glow 1.5s infinite" : undefined}
  transition="box-shadow 0.3s ease"
      >
        {visibleItems.map((item) => (
          <ItemCard  key={item.id} item={item} />
        ))}
      </Grid>

      <HStack justify="center" m={6} wrap="wrap">
        <IconButton
          variant="outline"
          aria-label="Page précédente"
          onClick={() => goToPage(page - 1)}
          isDisabled={page === 1}
        >
          <HiChevronLeft />
        </IconButton>

        <ButtonGroup isAttached variant="outline">
          {Array.from({ length: pageCount }).map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              colorPalette={page === i + 1 ? "green" : "gray"}
              variant={page === i + 1 ? "solid" : "outline"}
            >
              {i + 1}
            </Button>
          ))}
        </ButtonGroup>

        <IconButton
          aria-label="Page suivante"
          onClick={() => goToPage(page + 1)}
          variant="outline"

          isDisabled={page === pageCount}
        >
          <HiChevronRight />
        </IconButton>
      </HStack>
    </Box>
  )
}

export default ItemsGallery
