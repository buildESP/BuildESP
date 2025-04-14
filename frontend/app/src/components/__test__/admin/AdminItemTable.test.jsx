import { describe, it, expect, vi } from 'vitest'
import { renderWithProvider, screen } from '@/test/renderWithProvider'
import AdminItemTable from '@/components/admin/AdminItemTable'
import userEvent from '@testing-library/user-event'

vi.mock('@/components/admin/AdminTable', () => ({
  default: ({ onEdit }) => (
    <button onClick={() => onEdit({ id: 123, name: 'Objet test' })}>
      Simuler édition
    </button>
  ),
}))

vi.mock('@/components/FormModal', () => ({
  __esModule: true,
  default: ({ isOpen, children }) => (isOpen ? <div data-testid="modal">{children}</div> : null),
}))

vi.mock('@/components/admin/AdminItemEditForm', () => ({
  __esModule: true,
  default: ({ item, endpoint }) => (
    <div>
      <p data-testid="item-name">{item.name}</p>
      <p data-testid="endpoint">{endpoint}</p>
    </div>
  ),
}))

describe('AdminItemTable', () => {
  it('ouvre la modale avec le bon item et endpoint après édition', async () => {
    const items = [{ id: 1, name: 'Item 1' }]
    const refetch = vi.fn()

    renderWithProvider(<AdminItemTable items={items} refetch={refetch} />)

    // 🧪 Le bouton simulé depuis AdminTable
    const editButton = screen.getByRole('button', { name: /simuler édition/i })
    await userEvent.click(editButton)

    // 🔍 Vérifie que la modale s'affiche
    expect(screen.getByTestId('modal')).toBeInTheDocument()

    // 🧪 Vérifie que le bon item est injecté
    expect(screen.getByTestId('item-name')).toHaveTextContent('Objet test')

    // 🧪 Vérifie que le bon endpoint est construit
    expect(screen.getByTestId('endpoint')).toHaveTextContent('/items/123')
  })
})
