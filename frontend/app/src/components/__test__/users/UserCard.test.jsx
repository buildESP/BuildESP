import { describe, it, expect } from 'vitest'
import { screen } from '@/test/test-utils'
import { renderWithProvider } from '@/test/renderWithProvider'
import UserCard from '@/components/users/UserCard'

describe('UserCard', () => {
  const user = {
    id: 42,
    firstname: 'Jean',
    lastname: 'Valjean',
    email: 'jean@voisin.fr',
    address: '',
    picture: ''
  }

  it('affiche les infos de l’utilisateur et un lien correct', () => {
    renderWithProvider(<UserCard user={user} />)

    // Nom complet
    expect(screen.getByText('Jean Valjean')).toBeInTheDocument()

    // Email
    expect(screen.getByText('jean@voisin.fr')).toBeInTheDocument()

    // Adresse par défaut
    expect(screen.getByText(/non spécifiée/i)).toBeInTheDocument()

    // Badge "Disponible"
    expect(screen.getByText(/disponible/i)).toBeInTheDocument()

    // Le lien
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/my-neighbors/42')
  })
})
