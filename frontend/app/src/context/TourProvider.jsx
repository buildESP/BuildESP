// src/context/TourProvider.js
import { useState } from 'react'
import { TourContext } from './useTourContext'

export const TourProvider = ({ steps, children }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(null)

  const start = () => setCurrentStepIndex(0)
  const stop = () => setCurrentStepIndex(null)
  const next = () => setCurrentStepIndex((i) => (i < steps.length - 1 ? i + 1 : null))
  const prev = () => setCurrentStepIndex((i) => (i > 0 ? i - 1 : 0))

  const currentStep = currentStepIndex !== null ? steps[currentStepIndex] : null

  return (
    <TourContext.Provider
      value={{
        currentStepIndex,
        currentStep,
        isActive: currentStepIndex !== null,
        start,
        stop,
        next,
        prev,
      }}
    >
      {children}
    </TourContext.Provider>
  )
}
