import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProvider } from '@/test/renderWithProvider'
import AdminTabs from '@/components/admin/AdminTabs'

// Mocking des composants enfants
vi.mock('@/components/admin/AdminItemTable', () => ({
  default: () => <p>Mock Items</p>,
}))
vi.mock('@/components/admin/AdminUserTable', () => ({
  default: () => <p>Mock Users</p>,
}))
vi.mock('@/components/admin/AdminCategoryTable', () => ({
  default: () => <p>Mock Categories</p>,
}))
vi.mock('@/components/admin/AdminSubCategoryTable', () => ({
  default: () => <p>Mock Subcategories</p>,
}))

describe('AdminTabs', () => {
  const mockUsers = [{ id: 1, firstname: 'Alice' }]
  const mockItems = [{ id: 1, name: 'Item 1' }]
  const mockCategories = [{ id: 1, name: 'Cat 1' }]
  const mockSubcategories = [{ id: 1, name: 'Subcat 1' }]
  const mockRefetch = vi.fn()

  it('affiche les tabs et permet de naviguer entre eux', async () => {
    renderWithProvider(
      <AdminTabs
        users={mockUsers}
        items={mockItems}
        categories={mockCategories}
        subcategories={mockSubcategories}
        refetchUsers={mockRefetch}
        refetchItems={mockRefetch}
        refetchCategories={mockRefetch}
        refetchSubcategories={mockRefetch}
      />
    )

    const tabs = screen.getAllByRole('tab')

    // ✅ Onglet par défaut : items
    expect(screen.getByText('Mock Items')).toBeInTheDocument()

    // 🔁 Users
    await userEvent.click(tabs[1])
    expect(screen.getByText('Mock Users')).toBeInTheDocument()

    // 🔁 Categories
    await userEvent.click(tabs[2])
    expect(screen.getByText('Mock Categories')).toBeInTheDocument()

    // 🔁 Subcategories
    await userEvent.click(tabs[3])
    expect(screen.getByText('Mock Subcategories')).toBeInTheDocument()
  })
})
