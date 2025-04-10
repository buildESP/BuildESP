import { screen } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import HeroSection from "@/components/HeroSection"
import { renderWithTourProvider } from "@/test/renderWithTourProvider"

// Mocks
vi.mock("@/hooks/useTourStep", () => ({
  useTourStep: vi.fn(),
}))
vi.mock("@/hooks/useAuth", () => ({
  default: vi.fn(),
}))

import { useTourStep } from "@/hooks/useTourStep"
import useAuth from "@/hooks/useAuth"

describe("HeroSection", () => {
  const mockUseAuth = useAuth
  const mockUseTourStep = useTourStep

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("affiche le bouton 'Partager un objet' si l'utilisateur est connecté", () => {
    mockUseAuth.mockReturnValue({ user: { name: "Alice" } })
    mockUseTourStep.mockReturnValue({ isCurrent: false })

    renderWithTourProvider(<HeroSection />)

    expect(
      screen.getByRole("link", { name: "Partager un objet" })
    ).toBeInTheDocument()
  })

  it("affiche le bouton 'Emprunter un objet' si l'utilisateur n'est pas connecté", () => {
    mockUseAuth.mockReturnValue({ user: null })
    mockUseTourStep.mockReturnValue({ isCurrent: false })

    renderWithTourProvider(<HeroSection />)

    expect(
      screen.getByRole("link", { name: "Emprunter un objet" })
    ).toBeInTheDocument()
  })

  it("met en surbrillance le bouton 'Partager un objet' si l'utilisateur est connecté et que c’est le step actif", () => {
    mockUseAuth.mockReturnValue({ user: { name: "Alice" } })
    mockUseTourStep.mockReturnValue({ isCurrent: true })
  
    renderWithTourProvider(<HeroSection />)
  
    const startBtn = screen.getByRole("link", {
      name: "Partager un objet",
    })
  
    expect(startBtn).toBeInTheDocument()
    expect(startBtn).toHaveStyle("z-index: var(--chakra-z-index-popover)")
    expect(startBtn).toHaveStyle("box-shadow: 0 0 0 4px rgba(66, 153, 225, 0.4)")
  })
  
})
