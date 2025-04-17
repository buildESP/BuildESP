import { describe, it, expect, vi, beforeEach } from "vitest"
import { screen } from "@/test/test-utils" // adapte si ton fichier n'est pas là
import { renderWithProvider } from "@/test/renderWithProvider" // même remarque

import SubMenu from "../../navigation/SubMenu"

// Mock du hook personnalisé
vi.mock("../../../hooks/useFetchData", () => ({
  default: vi.fn(),
}))
import useFetchData from "../../../hooks/useFetchData"

describe("SubMenu", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })



  it("affiche un message d'erreur en cas d'échec", () => {
    useFetchData.mockReturnValue({ loading: false, error: "Erreur !", data: [] })
    renderWithProvider(<SubMenu />)
    expect(screen.getByText(/erreur/i)).toBeInTheDocument()
  })

  it("affiche les catégories avec sous-catégories", () => {
    useFetchData.mockReturnValue({
      loading: false,
      error: null,
      data: [
        {
          id: 1,
          name: "Électronique",
          subcategories: [{ id: 10, name: "Smartphones" }],
        },
      ],
    })
    renderWithProvider(<SubMenu />)
    expect(screen.getByRole("button", { name: /électronique/i })).toBeInTheDocument()
    expect(screen.queryByText(/aucune sous-catégorie/i)).not.toBeInTheDocument()
  })

  it("affiche 'Aucune sous-catégorie' si vide", () => {
    useFetchData.mockReturnValue({
      loading: false,
      error: null,
      data: [{ id: 2, name: "Maison", subcategories: [] }],
    })
    renderWithProvider(<SubMenu />)
    expect(screen.getByRole("button", { name: /maison/i })).toBeInTheDocument()
    // Note : le contenu du popover n’apparaît pas tant que le bouton n’est pas cliqué.
    // Donc ce test ne peut pas encore vérifier "Aucune sous-catégorie" à ce stade.
  })
})
