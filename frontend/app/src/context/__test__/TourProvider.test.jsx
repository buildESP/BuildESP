import { describe, it, expect, vi, beforeEach } from "vitest"
import { screen, render, fireEvent, waitFor } from "@testing-library/react"
import { TourProvider } from "../TourProvider"
import { useTourContext } from "../useTourContext"

const mockSteps = [
  { id: "hero", title: "Welcome", description: "Intro" },
  { id: "category", title: "Category", description: "Choose a category" },
  { id: "items", title: "Items", description: "Pick an item" },
]

const TestComponent = () => {
  const {
    isActive,
    currentStep,
    currentStepIndex,
    start,
    stop,
    next,
    prev,
  } = useTourContext()

  return (
    <div>
      <p>Active: {isActive ? "yes" : "no"}</p>
      <p data-testid="step">{currentStep?.title ?? "none"}</p>
      <p data-testid="index">{currentStepIndex ?? "null"}</p>

      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={next}>Next</button>
      <button onClick={prev}>Prev</button>
    </div>
  )
}

describe("TourProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderTour = () =>
    render(
      <TourProvider steps={mockSteps}>
        <TestComponent />
      </TourProvider>
    )

  it("starts tour at step 0", () => {
    renderTour()
    fireEvent.click(screen.getByText("Start"))

    expect(screen.getByTestId("step")).toHaveTextContent("Welcome")
    expect(screen.getByTestId("index")).toHaveTextContent("0")
    expect(screen.getByText("Active: yes")).toBeInTheDocument()
  })

  it("navigates to next step", () => {
    renderTour()
    fireEvent.click(screen.getByText("Start"))
    fireEvent.click(screen.getByText("Next"))

    expect(screen.getByTestId("step")).toHaveTextContent("Category")
    expect(screen.getByTestId("index")).toHaveTextContent("1")
  })

  it("stops the tour", () => {
    renderTour()
    fireEvent.click(screen.getByText("Start"))
    fireEvent.click(screen.getByText("Stop"))

    expect(screen.getByTestId("step")).toHaveTextContent("none")
    expect(screen.getByTestId("index")).toHaveTextContent("null")
    expect(screen.getByText("Active: no")).toBeInTheDocument()
  })

  it("does not go beyond last step", async () => {
    renderTour()
    fireEvent.click(screen.getByText("Start"))
    fireEvent.click(screen.getByText("Next")) // -> 1
    fireEvent.click(screen.getByText("Next")) // -> 2
    fireEvent.click(screen.getByText("Next")) // -> null
  
    await waitFor(() => {
      expect(screen.getByTestId("step")).toHaveTextContent("none")
      expect(screen.getByTestId("index")).toHaveTextContent("null")
      expect(screen.getByText("Active: no")).toBeInTheDocument()
    })
  })
  

  it("does not go before first step", () => {
    renderTour()
    fireEvent.click(screen.getByText("Start"))
    fireEvent.click(screen.getByText("Prev")) // en dessous de 0

    expect(screen.getByTestId("step")).toHaveTextContent("Welcome")
    expect(screen.getByTestId("index")).toHaveTextContent("0")
  })
})
