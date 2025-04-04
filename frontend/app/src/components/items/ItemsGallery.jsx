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
import { Link } from "react-router-dom" // ✅ correction ici
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import ItemCard from "./ItemCard"

const pageSize = 6

const ItemsGallery = ({ items, title = "Items" }) => {
  const [page, setPage] = useState(1)
  const pageCount = Math.ceil(items.length / pageSize)

  const start = (page - 1) * pageSize
  const end = start + pageSize
  const visibleItems = items.slice(start, end)

  const goToPage = (p) => {
    if (p >= 1 && p <= pageCount) setPage(p)
  }

  if (!items || items.length === 0) {
    return <Text color="gray.500">Aucun item disponible.</Text>
  }

  return (
    <Box w="full">
      <HStack justify="space-between" py={4}>
        <Text fontSize="2xl" fontWeight="bold">
          {title}
        </Text>
        <Button colorScheme="green" as={Link} to="/add-item" size="sm">
          Ajouter un item
        </Button>
      </HStack>

      <Grid
        templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }}
        gap={6}
      >
        {visibleItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </Grid>

      <HStack justify="center" m={6} wrap="wrap">
        <IconButton
          variant="outline"
          aria-label="Page précédente"
          onClick={() => goToPage(page - 1)}
          isDisabled={page === 1}
          icon={<HiChevronLeft />}
        />

        <ButtonGroup isAttached variant="outline">
          {Array.from({ length: pageCount }).map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              colorScheme={page === i + 1 ? "green" : "gray"}
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
          icon={<HiChevronRight />}
        />
      </HStack>
    </Box>
  )
}

export default ItemsGallery
