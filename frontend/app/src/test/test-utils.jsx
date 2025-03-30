import { render as rtlRender, screen } from '@testing-library/react'
import { Provider } from '@/components/ui/provider'
import { MemoryRouter } from 'react-router-dom'

export function renderWithRouter(ui, options) {
  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <Provider>{children}</Provider>
      </MemoryRouter>
    ),
    ...options,
  })
}

export { screen } // 👈 ajoute ça !
