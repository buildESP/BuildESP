import { describe, it, expect, vi, beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react'
import AdminItemForm from '@/components/admin/AdminItemEditForm'
import { renderWithProvider } from '@/test/renderWithProvider'

const mockPutData = vi.fn().mockResolvedValue(true)
const mockRefetch = vi.fn()

vi.mock('@/hooks/usePutData', () => ({
  default: () => ({ putData: mockPutData, loading: false })
}))

vi.mock('@/hooks/useItems', () => ({
  default: () => ({ refetch: mockRefetch })
}))

vi.mock('@/hooks/useFetchData', async () => {
  const users = [{ id: 1, firstname: 'Alice' }]
  const subcategories = [{ id: 2, name: 'Books' }]
  return {
    default: (url) => {
      if (url === '/users') return { data: users, loading: false }
      if (url === '/subcategories') return { data: subcategories, loading: false }
      return { data: [], loading: false }
    }
  }
})

describe('AdminItemForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const item = {
    id: 123,
    name: 'Item X',
    description: 'Description',
    status: 'Available',
    user_id: 1,
    subcategory_id: 2
  }

  it('submits updated item data correctly (without image)', async () => {
    const onSuccess = vi.fn()

    renderWithProvider(
      <AdminItemForm
        item={item}
        endpoint="/items/123"
        onSuccess={onSuccess}
      />
    )

    await userEvent.clear(screen.getByLabelText(/nom/i))
    await userEvent.type(screen.getByLabelText(/nom/i), 'Test Updated')

    await userEvent.clear(screen.getByLabelText(/description/i))
    await userEvent.type(screen.getByLabelText(/description/i), 'Nouvelle desc')

    await userEvent.selectOptions(screen.getByLabelText(/statut/i), ['Unavailable'])

    await userEvent.click(screen.getByRole('button', { name: /mettre à jour/i }))

    await waitFor(() => {
      expect(mockPutData).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test Updated',
          description: 'Nouvelle desc',
          status: 'Unavailable',
          user_id: 1,
          subcategory_id: 2,
        }),
        item
      )
      expect(mockRefetch).toHaveBeenCalled()
      expect(onSuccess).toHaveBeenCalled()
    })
  })
})
