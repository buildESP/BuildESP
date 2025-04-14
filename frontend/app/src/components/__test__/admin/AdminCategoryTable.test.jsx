import { describe, it, expect, vi } from 'vitest'
import { renderWithProvider, screen } from '@/test/renderWithProvider'
import userEvent from '@testing-library/user-event'
import AdminCategoryTable from '@/components/admin/AdminCategoryTable'

vi.mock('@/components/admin/AdminTable', () => ({
  default: ({ onEdit }) => (
    <button onClick={() => onEdit({ id: 5, name: 'Catégorie Test' })}>
      Simuler édition
    </button>
  ),
}))

vi.mock('@/components/FormModal', () => ({
  __esModule: true,
  default: ({ isOpen, children }) => (isOpen ? <div data-testid="modal">{children}</div> : null),
}))

vi.mock('@/components/admin/AdminCategoryForm', () => ({
  __esModule: true,
  default: ({ category, endpoint }) => (
    <div>
      <p data-testid="category-name">{category.name}</p>
      <p data-testid="endpoint">{endpoint}</p>
    </div>
  ),
}))

describe('AdminCategoryTable', () => {
  it('ouvre la modale avec la bonne catégorie et endpoint après édition', async () => {
    const categories = [{ id: 1, name: 'Tech' }]
    const refetch = vi.fn()

    renderWithProvider(<AdminCategoryTable categories={categories} refetch={refetch} />)

    const editButton = screen.getByRole('button', { name: /simuler édition/i })
    await userEvent.click(editButton)

    expect(screen.getByTestId('modal')).toBeInTheDocument()
    expect(screen.getByTestId('category-name')).toHaveTextContent('Catégorie Test')
    expect(screen.getByTestId('endpoint')).toHaveTextContent('/categories/5')
  })
})
