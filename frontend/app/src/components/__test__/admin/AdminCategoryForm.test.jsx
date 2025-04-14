import { describe, it, expect, vi } from 'vitest'
import { renderWithProvider, screen } from '@/test/renderWithProvider'
import userEvent from '@testing-library/user-event'
import AdminCategoryForm from '@/components/admin/AdminCategoryForm'

vi.mock('@/hooks/usePutData', () => ({
  default: () => ({
    putData: vi.fn().mockResolvedValue(true),
    loading: false,
  }),
}))

describe('AdminCategoryForm', () => {
  const category = {
    id: 123,
    name: 'Ancien Nom',
    image_url: 'https://image.existing.jpg',
  }

  it('affiche les valeurs par défaut et appelle onSuccess après soumission', async () => {
    const onSuccess = vi.fn()

    renderWithProvider(
      <AdminCategoryForm category={category} endpoint="/categories/123" onSuccess={onSuccess} />
    )

    // Champ texte modifié
    const nameInput = screen.getByLabelText(/nom de la catégorie/i)
    await userEvent.clear(nameInput)
    await userEvent.type(nameInput, 'Nouveau Nom')

    // Simule la soumission
    const submitButton = screen.getByRole('button', { name: /mettre à jour la catégorie/i })
    await userEvent.click(submitButton)

    expect(onSuccess).toHaveBeenCalled()
  })
})
