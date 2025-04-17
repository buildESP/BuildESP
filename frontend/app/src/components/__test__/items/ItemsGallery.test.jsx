import { screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import ItemsGallery from "@/components/items/ItemsGallery"
import { renderWithTourProvider } from "@/test/renderWithTourProvider"

// 🧪 MOCK DE ItemCard AVEC data-testid
vi.mock("@/components/items/ItemCard", () => {
  return {
    __esModule: true,
    default: ({ item }) => (
      <div data-testid="item-card">
        <p>{item.name}</p>
      </div>
    ),
  }
})

const mockItems = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  description: `Description ${i + 1}`,
  status: "Available",
  picture: "https://via.placeholder.com/300",
  user_id: 1,
}))

describe("ItemsGallery", () => {
  beforeEach(() => vi.clearAllMocks())

  

  it("affiche le message si aucun item", () => {
    renderWithTourProvider(<ItemsGallery items={[]} />)
    expect(screen.getByText(/aucun item disponible/i)).toBeInTheDocument()
  })

  it("affiche les 6 premiers items max", () => {
    renderWithTourProvider(<ItemsGallery items={mockItems} />)
    const visibleItems = screen.getAllByTestId("item-card")
    expect(visibleItems).toHaveLength(6)
    expect(visibleItems[0]).toHaveTextContent("Item 1")
  })

  it("change de page quand on clique sur un bouton", async () => {
    renderWithTourProvider(<ItemsGallery items={mockItems} />, {
      steps: [{ id: "items-gallery", title: "Focus!", description: "..." }]
    })
    
    const page2Button = screen.getByRole("button", { name: "2" })
    fireEvent.click(page2Button)

    await waitFor(() => {
      const itemCards = screen.getAllByTestId("item-card")
      expect(itemCards[0]).toHaveTextContent("Item 7")
    })
  })


})
