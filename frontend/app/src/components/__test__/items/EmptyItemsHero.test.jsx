import { render, screen } from '@/test/test-utils.jsx'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import EmptyItemsHero from '../../items/EmptyItemsHero'
import { useNavigate } from 'react-router-dom'

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}))

describe('EmptyItemsHero', () => {
  it('affiche le titre et le texte', () => {
    render(<EmptyItemsHero />)
    expect(screen.getByRole('heading', { name: /aucun objet disponible/i })).toBeInTheDocument()
    expect(screen.getByText(/vous n’avez encore ajouté aucun objet/i)).toBeInTheDocument()
  })

  it('navigue vers /add-item quand on clique sur le bouton', async () => {
    const mockNavigate = vi.fn()
    useNavigate.mockReturnValue(mockNavigate)

    render(<EmptyItemsHero />)

    const button = screen.getByText(/ajouter un objet/i)
    await userEvent.click(button)

    expect(mockNavigate).toHaveBeenCalledWith('/add-item')
  })
})
