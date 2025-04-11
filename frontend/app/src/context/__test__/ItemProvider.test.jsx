import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { useContext } from 'react'
import { ItemContext } from '@/context/ItemContext'

const mockRefetch = vi.fn()
const mockUseFetchData = {
  data: [{ id: 1, name: 'Marteau' }],
  loading: false,
  error: null,
  refetch: mockRefetch,
}

vi.mock('@/hooks/useFetchData', () => ({
  default: () => mockUseFetchData,
}))

import ItemProvider from '@/context/ItemProvider'

const TestComponent = () => {
  const { items, loading, error, refetch, addNewItem } = useContext(ItemContext)

  return (
    <div>
      <p>Items count: {items.length}</p>
      {loading && <p>Chargement...</p>}
      {error && <p>Erreur : {error}</p>}
      <button onClick={refetch}>Refetch</button>
      <button onClick={() => addNewItem({ id: 2, name: 'Tournevis' })}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

const renderWithProvider = () =>
  render(
    <ItemProvider>
      <TestComponent />
    </ItemProvider>
  )

describe('ItemProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseFetchData.data = [{ id: 1, name: 'Marteau' }]
    mockUseFetchData.loading = false
    mockUseFetchData.error = null
  })

  it('initialise avec les items de l’API', () => {
    renderWithProvider()
    expect(screen.getByText(/items count/i)).toHaveTextContent('Items count: 1')
    expect(screen.getByText(/marteau/i)).toBeInTheDocument()
  })

  it('appelle refetch', async () => {
    renderWithProvider()
    await userEvent.click(screen.getByText(/refetch/i))
    expect(mockRefetch).toHaveBeenCalled()
  })

  it('ajoute un nouvel item dynamiquement', async () => {
    renderWithProvider()
    await userEvent.click(screen.getByText(/add item/i))
    expect(screen.getByText(/tournevis/i)).toBeInTheDocument()
  })

  it('affiche le loading si en cours de chargement', () => {
    mockUseFetchData.loading = true
    mockUseFetchData.data = []
    renderWithProvider()
    expect(screen.getByText(/chargement/i)).toBeInTheDocument()
  })

  it('affiche une erreur si elle existe', () => {
    mockUseFetchData.error = 'Erreur réseau'
    mockUseFetchData.data = []
    renderWithProvider()
    expect(screen.getByText(/erreur : erreur réseau/i)).toBeInTheDocument()
  })
})
