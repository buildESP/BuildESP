import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen, renderWithRouter } from '@/test/test-utils.jsx'
import userEvent from '@testing-library/user-event'
import ItemCard from '../../items/ItemCard'

// 🔧 Mocks
const mockNavigate = vi.fn()
const mockDeleteData = vi.fn().mockResolvedValue(true)
const mockRefetch = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: actual.Link,
  }
})

vi.mock('../../../hooks/useAuth.js', () => ({
  default: () => ({ user: { id: 1 } }),
}))

vi.mock('../../../hooks/useDeleteData', () => ({
  default: () => ({
    deleteData: mockDeleteData,
    loading: false,
  }),
}))

vi.mock('../../../hooks/useItems', () => ({
  default: () => ({ refetch: mockRefetch }),
}))

describe('ItemCard', () => {
  const item = {
    id: 42,
    name: 'Tournevis',
    description: 'Un super tournevis',
    picture: '',
    user_id: 1,
    status: 'Available',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('affiche le nom et le statut', () => {
    renderWithRouter(<ItemCard item={item} />)

    // Vérifie l'image avec alt
    expect(screen.getByAltText(/tournevis/i)).toBeInTheDocument()

    // Vérifie le badge de statut
    expect(screen.getByText(/available/i)).toBeInTheDocument()
  })

  it('affiche les boutons du propriétaire', () => {
    renderWithRouter(<ItemCard item={item} />)

    expect(screen.getByRole('button', { name: /supprimer/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /indisponible/i })).toBeInTheDocument()
  })

  it('supprime l’item et navigue après confirmation', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    renderWithRouter(<ItemCard item={item} />)

    const deleteButton = screen.getByRole('button', { name: /supprimer/i })
    await userEvent.click(deleteButton)

    expect(mockDeleteData).toHaveBeenCalledWith(42)
    expect(mockRefetch).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/my-items')
  })
})
