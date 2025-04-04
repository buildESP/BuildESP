import { describe, it, vi, expect } from 'vitest'
import { screen } from '@/test/test-utils'
import { renderWithProvider } from '@/test/renderWithProvider'
import CategoriesGallery from '@/components/CategoriesGallery'

// 👇 Mock du hook custom
vi.mock('@/hooks/useFetchData', () => ({
  default: vi.fn()
}))

import useFetchData from '@/hooks/useFetchData'

describe('CategoriesGallery', () => {


  it('affiche un message d’erreur si échec', () => {
    useFetchData.mockReturnValue({ data: [], loading: false, error: 'Erreur serveur' })

    renderWithProvider(<CategoriesGallery />)
    expect(screen.getByText(/erreur serveur/i)).toBeInTheDocument()
  })

  it('affiche les catégories + carte spéciale', () => {
    const mockCategories = [
      { id: 1, name: 'Bricolage', image_url: '' },
      { id: 2, name: 'Jardinage', image_url: '' }
    ]

    useFetchData.mockReturnValue({ data: mockCategories, loading: false, error: null })

    renderWithProvider(<CategoriesGallery />)

    // Carte statique
    expect(screen.getByText(/ça circule/i)).toBeInTheDocument()

    // Catégories dynamiques
    expect(screen.getByText('Bricolage')).toBeInTheDocument()
    expect(screen.getByText('Jardinage')).toBeInTheDocument()

    // Liens
    expect(screen.getByRole('link', { name: /bricolage/i })).toHaveAttribute('href', '/categories/1')
    expect(screen.getByRole('link', { name: /jardinage/i })).toHaveAttribute('href', '/categories/2')
  })
})
