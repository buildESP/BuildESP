import { describe, it, expect } from 'vitest'
import { screen } from '@/test/test-utils'
import { renderWithProvider } from '@/test/renderWithProvider'
import NeighborGallery from '@/components/users/NeighborsGallery'

describe('NeighborGallery', () => {
  it("affiche un message si aucun voisin n'est disponible", () => {
    renderWithProvider(<NeighborGallery users={[]} />)
    expect(screen.getByText(/aucun voisin disponible/i)).toBeInTheDocument()
  })

  it('affiche les cartes des utilisateurs quand la liste est fournie', () => {
    const mockUsers = [
      {
        id: 1,
        firstname: 'Alice',
        lastname: 'Dupont',
        email: 'alice@voisin.com',
        address: '',
        picture: ''
      },
      {
        id: 2,
        firstname: 'Bob',
        lastname: 'Martin',
        email: 'bob@voisin.com',
        address: '',
        picture: ''
      }
    ]

    renderWithProvider(<NeighborGallery users={mockUsers} />)

    // On cherche les noms complets
    expect(screen.getByText('Alice Dupont')).toBeInTheDocument()
    expect(screen.getByText('Bob Martin')).toBeInTheDocument()


  })
})
