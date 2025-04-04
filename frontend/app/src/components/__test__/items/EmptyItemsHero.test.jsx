import { renderWithRouter, screen } from '@/test/test-utils.jsx'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import EmptyItemsHero from '@/components/items/EmptyItemsHero'
import * as router from 'react-router-dom'

// ✅ Mock partiel safe (JS only)
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

describe('EmptyItemsHero', () => {
  it('affiche le titre et le texte', () => {
    renderWithRouter(<EmptyItemsHero />)

    expect(
      screen.getByRole('heading', { name: /aucun objet disponible/i })
    ).toBeInTheDocument()

    expect(
      screen.getByText(/vous n’avez encore ajouté aucun objet/i)
    ).toBeInTheDocument()
  })

  it('navigue vers /add-item quand on clique sur le bouton', async () => {
    const mockNavigate = vi.fn()
    router.useNavigate.mockReturnValue(mockNavigate)

    renderWithRouter(<EmptyItemsHero />)

    const button = screen.getByText(/ajouter un objet/i)
    await userEvent.click(button)

    expect(mockNavigate).toHaveBeenCalledWith('/add-item')
  })
})
