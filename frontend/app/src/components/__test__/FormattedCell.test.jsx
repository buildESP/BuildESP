import { describe, it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { renderWithProvider } from "@/test/renderWithProvider"
import FormattedCell from "@/components/FormattedCell"

describe("FormattedCell", () => {
  it("affiche le nom complet de l'utilisateur", () => {
    renderWithProvider(<FormattedCell keyName="Utilisateur" item={{ firstname: "Alice", lastname: "Dupont" }} />)
    expect(screen.getByText("Alice Dupont")).toBeInTheDocument()
  })

  it("affiche une image pour 'picture'", () => {
    renderWithProvider(<FormattedCell keyName="picture" value="http://image.url/photo.jpg" />)
    const img = screen.getByRole("img")
    expect(img).toHaveAttribute("src", "http://image.url/photo.jpg")
  })

  it("affiche un message si l'image est absente", () => {
    renderWithProvider(<FormattedCell keyName="image_url" value={null} />)
    expect(screen.getByText("Pas d'image")).toBeInTheDocument()
  })

  it("tronque une longue description", () => {
    const longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt."
    renderWithProvider(<FormattedCell keyName="description" value={longText} />)
    expect(screen.getByText(/Lorem ipsum.*\.\.\./)).toBeInTheDocument()
  })

  it("affiche un nom complet pour une clé 'user'", () => {
    const user = { firstname: "Bob", lastname: "Martin" }
    renderWithProvider(<FormattedCell keyName="user" value={user} />)
    expect(screen.getByText("Bob Martin")).toBeInTheDocument()
  })

  it("affiche un nom pour une sous-catégorie", () => {
    renderWithProvider(<FormattedCell keyName="subcategory" value={{ name: "Électroménager" }} />)
    expect(screen.getByText("Électroménager")).toBeInTheDocument()
  })

  it("affiche un nom pour une catégorie", () => {
    renderWithProvider(<FormattedCell keyName="category" value={{ name: "Maison" }} />)
    expect(screen.getByText("Maison")).toBeInTheDocument()
  })

  it("affiche une liste de sous-catégories", () => {
    const subcats = [{ name: "TV" }, { name: "Hi-Fi" }]
    renderWithProvider(<FormattedCell keyName="subcategories" value={subcats} />)
    expect(screen.getByText("TV, Hi-Fi")).toBeInTheDocument()
  })

  it("affiche un object JSON stringifié si value est un objet", () => {
    renderWithProvider(<FormattedCell keyName="data" value={{ test: 123 }} />)
    expect(screen.getByText('{"test":123}')).toBeInTheDocument()
  })

  it("affiche une valeur simple", () => {
    renderWithProvider(<FormattedCell keyName="note" value="ok" />)
    expect(screen.getByText("ok")).toBeInTheDocument()
  })

  it("affiche — si aucune valeur", () => {
    renderWithProvider(<FormattedCell keyName="random" value={undefined} />)
expect(screen.getByText("—")).toBeInTheDocument()

})
})
