import { describe, it, expect, vi } from 'vitest'
import { renderWithProvider, screen } from '@/test/renderWithProvider'
import userEvent from '@testing-library/user-event'
import AdminUserTable from '@/components/admin/AdminUserTable'

// Mock du composant AdminTable : déclenche handleEdit avec un user factice
vi.mock('@/components/admin/AdminTable', () => ({
  default: ({ onEdit }) => (
    <button onClick={() => onEdit({ id: 101, firstname: 'Alice', lastname: 'Durand' })}>
      Simuler édition
    </button>
  ),
}))

// Mock de FormModal : rend les enfants si `isOpen` est true
vi.mock('@/components/FormModal', () => ({
  __esModule: true,
  default: ({ isOpen, children }) => (isOpen ? <div data-testid="modal">{children}</div> : null),
}))

// Mock de AdminUserForm : affiche les infos du user et l'endpoint
vi.mock('@/components/admin/AdminUserForm', () => ({
  __esModule: true,
  default: ({ user, endpoint }) => (
    <div>
      <p data-testid="user-name">{user.firstname} {user.lastname}</p>
      <p data-testid="endpoint">{endpoint}</p>
    </div>
  ),
}))

describe('AdminUserTable', () => {
  it('ouvre la modale avec les infos utilisateur après édition', async () => {
    const users = [{ id: 101, firstname: 'Alice', lastname: 'Durand' }]
    const refetch = vi.fn()

    renderWithProvider(<AdminUserTable users={users} refetch={refetch} />)

    const editButton = screen.getByRole('button', { name: /simuler édition/i })
    await userEvent.click(editButton)

    expect(screen.getByTestId('modal')).toBeInTheDocument()
    expect(screen.getByTestId('user-name')).toHaveTextContent('Alice Durand')
    expect(screen.getByTestId('endpoint')).toHaveTextContent('/users/101')
  })
})
