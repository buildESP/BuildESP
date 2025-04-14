import { describe, it, expect, vi } from 'vitest'
import { renderWithProvider, screen } from '@/test/renderWithProvider'
import userEvent from '@testing-library/user-event'
import AdminSubCategoryTable from '@/components/admin/AdminSubCategoryTable'

vi.mock('@/components/admin/AdminTable', () => ({
  default: ({ onEdit }) => (
    <button onClick={() => onEdit({ id: 7, name: 'Sous-catégorie Test' })}>
      Simuler édition
    </button>
  ),
}))

vi.mock('@/components/FormModal', () => ({
  __esModule: true,
  default: ({ isOpen, children }) => (isOpen ? <div data-testid="modal">{children}</div> : null),
}))

vi.mock('@/components/admin/AdminSubCategoryForm', () => ({
  __esModule: true,
  default: ({ subcategory, endpoint }) => (
    <div>
      <p data-testid="subcategory-name">{subcategory.name}</p>
      <p data-testid="endpoint">{endpoint}</p>
    </div>
  ),
}))

describe('AdminSubCategoryTable', () => {
  it('ouvre la modale avec la bonne sous-catégorie et endpoint après édition', async () => {
    const subcategories = [
      { id: 7, name: 'Bricolage', category_id: 3, items: [] },
    ]
    const refetch = vi.fn()

    renderWithProvider(<AdminSubCategoryTable subcategories={subcategories} refetch={refetch} />)

    const editButton = screen.getByRole('button', { name: /simuler édition/i })
    await userEvent.click(editButton)

    expect(screen.getByTestId('modal')).toBeInTheDocument()
    expect(screen.getByTestId('subcategory-name')).toHaveTextContent('Sous-catégorie Test')
    expect(screen.getByTestId('endpoint')).toHaveTextContent('/subcategories/7')
  })
})
