import { render as rtlRender, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from '@/components/ui/provider'
import AuthProvider from '@/context/AuthProvider'
import ItemProvider from '@/context/ItemProvider'

export function renderWithProvider(ui, options) {
    return rtlRender(ui, {
        wrapper: ({ children }) => (
            <MemoryRouter>
                <Provider>

                    <AuthProvider>
                        <ItemProvider>
                            {children}
                        </ItemProvider>
                    </AuthProvider>

                </Provider>
            </MemoryRouter>
        ),
        ...options,
    })
}


export { screen }
