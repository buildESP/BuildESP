import { screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { renderWithProvider } from "@/test/renderWithProvider"
import ItemsGallery from "@/components/items/ItemsGallery"

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

  it("affiche le titre et le bouton d’ajout", () => {
    renderWithProvider(<ItemsGallery items={mockItems} title="Mes objets" />)
    expect(screen.getByText("Mes objets")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /ajouter un item/i })).toBeInTheDocument()
  })

  it("affiche le message si aucun item", () => {
    renderWithProvider(<ItemsGallery items={[]} />)
    expect(screen.getByText(/aucun item disponible/i)).toBeInTheDocument()
  })

  it("affiche les 6 premiers items max", () => {
    renderWithProvider(<ItemsGallery items={mockItems} />)
    const visibleItems = screen.getAllByTestId("item-card")
    expect(visibleItems).toHaveLength(6)
    expect(visibleItems[0]).toHaveTextContent("Item 1")
  })

  it("change de page quand on clique sur un bouton", async () => {
    renderWithProvider(<ItemsGallery items={mockItems} />)

    const page2Button = screen.getByRole("button", { name: "2" })
    fireEvent.click(page2Button)

    await waitFor(() => {
      const itemCards = screen.getAllByTestId("item-card")
      expect(itemCards[0]).toHaveTextContent("Item 7")
    })
  })


})
