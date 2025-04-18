// src/pages/__test__/HomePage.test.jsx
import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderWithRouter } from '@/test/test-utils.jsx'
import { screen, fireEvent } from '@testing-library/react'
import HomePage from '@/pages/HomePage'
import useFetchData from '@/hooks/useFetchData'
import useSearch from '@/hooks/useSearch'
import useAuth from '@/hooks/useAuth'
import { useTourContext } from '@/context/useTourContext'

// ─── Stub global de localStorage ───────────────────────────────────────────────
const store = {}
const localStorageMock = {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => { store[key] = String(value) }),
    removeItem: vi.fn((key) => { delete store[key] }),
    clear:    vi.fn(() => { Object.keys(store).forEach(k => delete store[k]) }),
}
vi.stubGlobal('localStorage', localStorageMock)

// ─── Stub des sous‑composants pour éviter les appels internes à useFetchData… ────
vi.mock('@/components/HeroSection',        () => ({ default: () => <div data-testid="HeroSection" /> }))
vi.mock('@/components/CategoriesGallery',   () => ({ default: () => <div data-testid="CategoriesGallery" /> }))
vi.mock('@/components/items/ItemsGallery',  () => ({
    default: ({ items }) => (
        <div data-testid="ItemsGallery">
            {items?.map(i => <div key={i.id}>{i.name}</div>)}
        </div>
    ),
}))
vi.mock('@/components/tour/TourOverlay',    () => ({ default: () => <div data-testid="TourOverlay" /> }))

// ─── Mocks des hooks ────────────────────────────────────────────────────────────
vi.mock('@/hooks/useFetchData',   () => ({ default: vi.fn(() => ({ data: null, loading: false, error: null })) }))
vi.mock('@/hooks/useSearch',      () => ({ default: vi.fn(() => ({ searchTerm: '' })) }))
vi.mock('@/hooks/useAuth',        () => ({ default: vi.fn(() => ({ user: { id: 1 } })) }))
vi.mock('@/context/useTourContext',() => ({ useTourContext: vi.fn(() => ({ start: vi.fn() })) }))

describe('HomePage', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        localStorage.clear()
    })

    it('affiche un Skeleton pendant le loading', () => {
        useFetchData.mockReturnValueOnce({ data: null, loading: true, error: null })

        const { container } = renderWithRouter(<HomePage />)
        expect(container.querySelector('.chakra-skeleton')).toBeInTheDocument()
    })

    it("affiche un message d'erreur si error", () => {
        useFetchData.mockReturnValueOnce({ data: null, loading: false, error: 'Erreur fetch' })

        renderWithRouter(<HomePage />)
        expect(screen.getByText('Erreur fetch')).toBeInTheDocument()
    })

    it('rend HeroSection, CategoriesGallery, ItemsGallery et TourOverlay', () => {
        useFetchData.mockReturnValueOnce({
            data: [{ id: 1, name: 'MonObjet', status: 'Available', user_id: 2 }],
            loading: false,
            error: null,
        })

        renderWithRouter(<HomePage />)

        // ItemsGallery stub rend bien MonObjet
        expect(screen.getByText('MonObjet')).toBeInTheDocument()
        // Vérifie le titre passé en prop
        expect(screen.getByText(/Objets du Voisinage/i)).toBeInTheDocument()
        // Stub de TourOverlay est monté
        expect(screen.getByTestId('TourOverlay')).toBeInTheDocument()
    })

    it('affiche le bouton Démarrer la visite si le tour n’a pas été vu', () => {
        useFetchData.mockReturnValue({ data: [], loading: false, error: null })
        localStorage.getItem.mockReturnValue(null)

        renderWithRouter(<HomePage />)
        expect(screen.getByRole('button', { name: /démarrer la visite/i })).toBeInTheDocument()
    })

    it('cache le bouton si le tour a déjà été vu', () => {
        useFetchData.mockReturnValue({ data: [], loading: false, error: null })
        localStorage.getItem.mockReturnValue('true')

        renderWithRouter(<HomePage />)
        expect(screen.queryByRole('button', { name: /démarrer la visite/i })).toBeNull()
    })

    it('démarre le tour et enregistre hasSeenTour quand on clique', () => {
        const startMock = vi.fn()
        useTourContext.mockReturnValue({ start: startMock })
        useFetchData.mockReturnValue({ data: [], loading: false, error: null })
        localStorage.getItem.mockReturnValue(null)

        renderWithRouter(<HomePage />)
        fireEvent.click(screen.getByRole('button', { name: /démarrer la visite/i }))

        expect(startMock).toHaveBeenCalled()
        expect(localStorage.setItem).toHaveBeenCalledWith('hasSeenTour', 'true')
        // et le bouton disparaît après clic
        expect(screen.queryByRole('button', { name: /démarrer la visite/i })).toBeNull()
    })
})
