import { describe, it, expect, vi, beforeEach } from "vitest"
import { screen, fireEvent } from "@testing-library/react"
import { renderWithProvider } from "@/test/renderWithProvider"
import Navbar from "@/components/navigation/Navbar"
import { APP_NAME } from "@/config"

const mockLogout = vi.fn()

// ✅ Hook useAuth par défaut pour la majorité des tests
vi.mock("@/hooks/useAuth", () => ({
  default: () => ({
    user: { id: 1, name: "User" },
    logout: mockLogout,
    isAdmin: false,
  }),
}))

// ✅ Mock Color Mode + Desktop mode forcé
vi.mock("@/components/ui/color-mode", async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useColorMode: () => ({
      colorMode: "light",
      toggleColorMode: vi.fn(),
      setColorMode: vi.fn(),
    }),
    ColorModeProvider: ({ children }) => <>{children}</>,
  }
})

// ✅ Mock breakpoint en desktop par défaut
vi.mock("@chakra-ui/react", async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...mod,
    useBreakpointValue: () => true, // force desktop
  }
})

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("affiche le nom de l'application", () => {
    renderWithProvider(<Navbar />)
    expect(screen.getByText(APP_NAME)).toBeInTheDocument()
  })

  it("affiche les liens pour un utilisateur connecté", () => {
    renderWithProvider(<Navbar />)
    expect(screen.getByRole("link", { name: /mes objets/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /profil/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /déconnexion/i })).toBeInTheDocument()
  })

  it("appelle logout quand on clique sur déconnexion", () => {
    renderWithProvider(<Navbar />)
    const logoutBtn = screen.getByRole("button", { name: /déconnexion/i })
    fireEvent.click(logoutBtn)
    expect(mockLogout).toHaveBeenCalled()
  })


  


  
})
