import {  screen, fireEvent } from '@testing-library/react'
import { vi, describe, beforeEach, expect, it } from 'vitest'
import HomePage from '../HomePage'
import useFetchData from '@/hooks/useFetchData'
import useSearch from '@/hooks/useSearch'
import useAuth from '@/hooks/useAuth'
import { useTourContext } from '@/context/useTourContext'
import { renderWithProvider } from '@/test/renderWithProvider'

// Mock hooks
vi.mock('@/hooks/useFetchData', () => ({
  default: vi.fn(),
}))
vi.mock('@/hooks/useSearch', () => ({
  default: vi.fn(),
}))
vi.mock('@/hooks/useAuth', () => ({
  default: vi.fn(),
}))
vi.mock('@/context/useTourContext', () => ({
  useTourContext: vi.fn(),
}))

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state when data is being fetched', () => {
    useFetchData.mockReturnValue({ data: null, loading: true, error: null })
    useSearch.mockReturnValue({ searchTerm: '' })
    useAuth.mockReturnValue({ user: null })
    useTourContext.mockReturnValue({ start: vi.fn() })

    renderWithProvider(<HomePage />)

    // Vérifie la présence du Skeleton via sa classe générée
    expect(screen.getByText((_, element) =>
      element?.className?.includes('chakra-skeleton')
    )).toBeInTheDocument()
  })

  it('renders error message when there is an error', () => {
    useFetchData.mockReturnValue({ data: null, loading: false, error: 'Error fetching data' })
    useSearch.mockReturnValue({ searchTerm: '' })
    useAuth.mockReturnValue({ user: null })
    useTourContext.mockReturnValue({ start: vi.fn() })

    renderWithProvider(<HomePage />)

    expect(screen.getByText('Error fetching data')).toBeInTheDocument()
  })

  it('renders filtered items based on search term', () => {
    const mockItems = [
      { id: 1, name: 'Item 1', status: 'Available', user_id: 999 },
      { id: 2, name: 'Item 2', status: 'Available', user_id: 123 },
    ]
    useFetchData.mockReturnValue({ data: mockItems, loading: false, error: null })
    useSearch.mockReturnValue({ searchTerm: 'Item 1' })
    useAuth.mockReturnValue({ user: { id: 123 } }) // utilisateur connecté
    useTourContext.mockReturnValue({ start: vi.fn() })

  })

  it('renders tour button for authenticated users who have not seen the tour', () => {
    useFetchData.mockReturnValue({ data: [], loading: false, error: null })
    useSearch.mockReturnValue({ searchTerm: '' })
    useAuth.mockReturnValue({ user: { name: 'John Doe' } })
    const startMock = vi.fn()
    useTourContext.mockReturnValue({ start: startMock })

    localStorage.setItem('hasSeenTour', '') // Simule première visite

    renderWithProvider(<HomePage />)

    const tourButton = screen.getByRole('button', { name: /démarrer la visite/i })
    expect(tourButton).toBeInTheDocument()

    fireEvent.click(tourButton)

    expect(startMock).toHaveBeenCalled()
    expect(localStorage.getItem('hasSeenTour')).toBe('true')
  })

  it('does not render tour button if user has already seen the tour', () => {
    useFetchData.mockReturnValue({ data: [], loading: false, error: null })
    useSearch.mockReturnValue({ searchTerm: '' })
    useAuth.mockReturnValue({ user: { name: 'John Doe' } })
    useTourContext.mockReturnValue({ start: vi.fn() })

    localStorage.setItem('hasSeenTour', 'true') // Simule une visite précédente

    renderWithProvider(<HomePage />)

    expect(screen.queryByRole('button', { name: /démarrer la visite/i })).not.toBeInTheDocument()
  })
})
