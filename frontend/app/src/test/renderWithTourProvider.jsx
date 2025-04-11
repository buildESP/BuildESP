import { render as rtlRender } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Provider } from "@/components/ui/provider"
import AuthProvider from "@/context/AuthProvider"
import ItemProvider from "@/context/ItemProvider"
import { TourProvider } from "@/context/TourProvider"

// Steps par défaut au cas où
const defaultSteps = [
  { id: "items-gallery", title: "Items", description: "Test step" },
  { id: "category-card", title: "Categories", description: "Test step" },
]

export function renderWithTourProvider(ui, { steps = defaultSteps, ...options } = {}) {
  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <Provider>
          <AuthProvider>
            <ItemProvider>
              <TourProvider steps={steps}>
                {children}
              </TourProvider>
            </ItemProvider>
          </AuthProvider>
        </Provider>
      </MemoryRouter>
    ),
    ...options,
  })
}
