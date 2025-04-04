import { describe, it, expect, vi } from "vitest"
import { fireEvent } from "@testing-library/react"
import EditableCell from "@/components/EditTableCell"
import { renderWithProvider, screen } from "@/test/renderWithProvider" // adapte si ton render est ailleurs

describe("EditableCell", () => {
  it("affiche la valeur initiale", () => {
    renderWithProvider(<EditableCell value="Test value" onChange={vi.fn()} />)

    expect(screen.getByText("Test value")).toBeInTheDocument()
  })

  it("permet de modifier la valeur", async () => {
    const handleChange = vi.fn()

    renderWithProvider(<EditableCell value="Initial" onChange={handleChange} />)

    // Clique sur le texte pour entrer en mode édition
    fireEvent.click(screen.getByText("Initial"))

    const input = screen.getByDisplayValue("Initial")
    expect(input).toBeInTheDocument()

    // Modifie la valeur
    fireEvent.change(input, { target: { value: "Nouveau texte" } })

    // Simule un blur pour valider la modification
    fireEvent.blur(input)

    expect(handleChange).toHaveBeenCalled()
    expect(handleChange).toHaveBeenCalledWith(expect.anything()) 
  })
})
