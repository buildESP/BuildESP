import { describe, it, expect, vi } from "vitest"
import { screen } from "@testing-library/react"
import { renderWithProvider } from "@/test/renderWithProvider"
import FormModal from "@/components/FormModal"

describe("FormModal", () => {
  it("ne rend rien quand isOpen est false", () => {
    renderWithProvider(
      <FormModal isOpen={false} onClose={vi.fn()}>
        <div>Contenu de test</div>
      </FormModal>
    )

    expect(screen.queryByText(/contenu de test/i)).not.toBeInTheDocument()
  })

  it("affiche le titre par défaut et les enfants quand isOpen est true", () => {
    renderWithProvider(
      <FormModal isOpen={true} onClose={vi.fn()}>
        <div>Contenu visible</div>
      </FormModal>
    )

    expect(screen.getByText(/modifier l’élément/i)).toBeInTheDocument()
    expect(screen.getByText(/contenu visible/i)).toBeInTheDocument()
  })

  it("affiche un titre personnalisé si fourni", () => {
    renderWithProvider(
      <FormModal isOpen={true} onClose={vi.fn()} title="Mon Titre Perso">
        <p>Contenu test</p>
      </FormModal>
    )

    expect(screen.getByText("Mon Titre Perso")).toBeInTheDocument()
    expect(screen.getByText(/contenu test/i)).toBeInTheDocument()
  })
})
