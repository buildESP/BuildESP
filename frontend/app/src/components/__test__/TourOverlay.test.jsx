import { describe, it, vi, expect } from "vitest"
import { screen } from "@testing-library/react"
import { renderWithTourProvider } from "@/test/renderWithTourProvider"
import TourOverlay from "@/components/tour/TourOverlay"

vi.mock("@/context/useTourContext", async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useTourContext: vi.fn()
  }
})

import { useTourContext } from "@/context/useTourContext"

describe("TourOverlay", () => {


  it("affiche un overlay plein écran quand le tour est actif", () => {
    useTourContext.mockReturnValue({ isActive: true })

    renderWithTourProvider(<TourOverlay />)

    // 💡 Ajoute ça dans TourOverlay: data-testid="tour-overlay"
    expect(screen.getByTestId("tour-overlay")).toBeInTheDocument()
  })
})
