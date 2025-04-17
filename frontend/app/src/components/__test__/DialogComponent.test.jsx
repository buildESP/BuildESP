import { describe, it, vi, expect, beforeEach } from "vitest"
import { screen, fireEvent, waitFor } from "@testing-library/react"
import { renderWithProvider } from "@/test/renderWithProvider"
import DialogComponents from "@/components/DialogComponents"
import { toast } from "react-toastify"

// Mocks initiaux
const mockPostData = vi.fn()
const mockUsePostData = { postData: mockPostData, loading: false }

vi.mock("@/hooks/usePostData", () => ({
  default: () => mockUsePostData,
}))

const mockUseAuth = { user: { id: 1 } }

vi.mock("@/hooks/useAuth", () => ({
  default: () => mockUseAuth,
}))

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

describe("DialogComponents", () => {
  const mockItem = { id: 123, user_id: 456, name: "Perceuse" }

  beforeEach(() => {
    vi.clearAllMocks()
    // Reset defaults for each test
    mockUseAuth.user = { id: 1 }
    mockPostData.mockResolvedValue(true)
  })

  it("affiche le bouton 'Emprunter'", () => {
    renderWithProvider(<DialogComponents item={mockItem} />)
    expect(screen.getByRole("button", { name: /emprunter/i })).toBeInTheDocument()
  })

  it("ouvre le dialogue avec le nom de l'objet", async () => {
    renderWithProvider(<DialogComponents item={mockItem} />)
    fireEvent.click(screen.getByRole("button", { name: /emprunter/i }))
    await waitFor(() => {
      expect(screen.getByText(/emprunter perceuse/i)).toBeInTheDocument()
    })
  })

  it("appelle postData et affiche un toast en cas de succès", async () => {
    renderWithProvider(<DialogComponents item={mockItem} />)

    fireEvent.click(screen.getByRole("button", { name: /emprunter/i }))
    const confirmBtn = await screen.findByRole("button", { name: /confirmer/i })
    fireEvent.click(confirmBtn)

    await waitFor(() => {
      expect(mockPostData).toHaveBeenCalled()
    })
  })

  it("affiche une erreur si l'utilisateur n'est pas connecté", async () => {
    mockUseAuth.user = null

    renderWithProvider(<DialogComponents item={mockItem} />)

    fireEvent.click(screen.getByRole("button", { name: /emprunter/i }))
    const confirmBtn = await screen.findByRole("button", { name: /confirmer/i })
    fireEvent.click(confirmBtn)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Vous devez être connecté pour emprunter un objet")
    })
  })
})
