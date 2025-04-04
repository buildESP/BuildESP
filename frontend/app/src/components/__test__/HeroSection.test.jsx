import { describe, it, expect, vi } from 'vitest'
import { screen, renderWithProvider } from '@/test/renderWithProvider'
import HeroSection from '@/components/HeroSection'

vi.mock('@/hooks/useAuth', () => ({
  default: () => ({ user: null }), // par défaut non connecté
}))

describe('HeroSection', () => {
  it('affiche le titre et la description de base', () => {
    renderWithProvider(<HeroSection />)
    expect(screen.getByRole('heading', { name: /partagez et empruntez/i })).toBeInTheDocument()
    expect(
      screen.getByText(/neighborrow est une plateforme où vous pouvez/i)
    ).toBeInTheDocument()
  })

  it("affiche le bouton 'Emprunter un objet' si l'utilisateur n'est pas connecté", () => {
    renderWithProvider(<HeroSection />)
    expect(screen.getByRole('link', { name: /emprunter un objet/i })).toBeInTheDocument()
  })


})
