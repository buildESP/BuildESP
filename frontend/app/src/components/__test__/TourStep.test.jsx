import { screen, fireEvent } from "@testing-library/react"
import { describe, it, vi, beforeEach, expect } from "vitest"
import TourStep from "@/components/TourStep"

// 📌 Mock de useTourStep
vi.mock("@/hooks/useTourStep", () => ({
  useTourStep: vi.fn()
}))

import { useTourStep } from "@/hooks/useTourStep"
import { renderWithTourProvider } from "@/test/renderWithTourProvider"

describe("TourStep", () => {
  const baseMock = {
    isCurrent: true,
    isActive: true,
    title: "Titre test",
    description: "Description test",
    isFirst: false,
    isLast: false,
    next: vi.fn(),
    prev: vi.fn(),
    stop: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers() // 💡 pour contrôler les timeouts
    Element.prototype.scrollIntoView = vi.fn() // 💡 mock safe
  })

  it("affiche le popover si c’est le bon step actif", () => {
    useTourStep.mockReturnValue(baseMock)

    renderWithTourProvider(
      <TourStep id="step-1">
        <div data-testid="content">Contenu</div>
      </TourStep>
    )

    // Avance les timers pour trigger scrollIntoView
    vi.runAllTimers()

    expect(screen.getByText("Titre test")).toBeInTheDocument()
    expect(screen.getByText("Description test")).toBeInTheDocument()
    expect(screen.getByTestId("content")).toBeInTheDocument()
  })

  it("n'affiche rien si isCurrent ou isActive est false", () => {
    useTourStep.mockReturnValue({ ...baseMock, isCurrent: false })

    renderWithTourProvider(
      <TourStep id="step-2">
        <div data-testid="content">Contenu</div>
      </TourStep>
    )

    vi.runAllTimers()

    expect(screen.queryByText("Titre test")).not.toBeInTheDocument()
    expect(screen.getByTestId("content")).toBeInTheDocument()
  })

  it("déclenche les callbacks au clic sur les boutons", () => {
    useTourStep.mockReturnValue(baseMock)

    renderWithTourProvider(<TourStep id="step-1"><div /></TourStep>)

    fireEvent.click(screen.getByText("Précédent"))
    fireEvent.click(screen.getByText("Suivant"))

    expect(baseMock.prev).toHaveBeenCalled()
    expect(baseMock.next).toHaveBeenCalled()
  })

  it("affiche le bouton Terminer si c’est le dernier step", () => {
    useTourStep.mockReturnValue({ ...baseMock, isLast: true })

    renderWithTourProvider(<TourStep id="step-last"><div /></TourStep>)

    expect(screen.getByText("Terminer")).toBeInTheDocument()

    fireEvent.click(screen.getByText("Terminer"))
    expect(baseMock.stop).toHaveBeenCalled()
  })


  
})
