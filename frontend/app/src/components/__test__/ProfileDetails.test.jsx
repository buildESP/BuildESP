import { it, expect } from "vitest"
import { screen } from "@testing-library/react"
import { renderWithProvider } from "@/test/renderWithProvider"
import ProfileDetails from "@/components/ProfileDetails"



  it("affiche un message d'erreur si error est défini", () => {
    renderWithProvider(<ProfileDetails error="Erreur de chargement" />)
    expect(screen.getByText(/erreur de chargement/i)).toBeInTheDocument()
  })

  it("affiche un message si userData est null", () => {
    renderWithProvider(<ProfileDetails userData={null} />)
    expect(screen.getByText(/user data not found/i)).toBeInTheDocument()
  })

  it("affiche les détails utilisateur correctement", () => {
    const mockUser = {
      firstname: "Alice",
      lastname: "Martin",
      email: "alice@example.com",
      address: "123 rue de Paris",
      phone: "0123456789",
      picture: "https://example.com/alice.jpg"
    }

    renderWithProvider(<ProfileDetails userData={mockUser} />)

    expect(screen.getByText(/alice martin/i)).toBeInTheDocument()
    expect(screen.getByText(/alice@example.com/i)).toBeInTheDocument()
    expect(screen.getByText(/123 rue de paris/i)).toBeInTheDocument()
    expect(screen.getByText(/0123456789/i)).toBeInTheDocument()
  })

  it("affiche les valeurs par défaut si des champs sont manquants", () => {
    const incompleteUser = {
      firstname: "Bob",
      lastname: "Doe",
      email: "bob@example.com"
    }

    renderWithProvider(<ProfileDetails userData={incompleteUser} />)

    expect(screen.getByText(/bob doe/i)).toBeInTheDocument()
    expect(screen.getByText(/bob@example.com/i)).toBeInTheDocument()
    expect(screen.getByText(/no address provided/i)).toBeInTheDocument()
    expect(screen.getByText(/no phone number/i)).toBeInTheDocument()
  })
