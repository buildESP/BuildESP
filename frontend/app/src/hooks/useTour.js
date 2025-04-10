// src/hooks/useTour.js
import { useState, useCallback } from 'react'

const useTour = (steps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(null)

  const start = useCallback(() => {
    setCurrentStepIndex(0)
  }, [])

  const next = useCallback(() => {
    setCurrentStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : null))
  }, [steps])

  const prev = useCallback(() => {
    setCurrentStepIndex((prev) => (prev > 0 ? prev - 1 : 0))
  }, [])

  const stop = useCallback(() => setCurrentStepIndex(null), [])

  return {
    currentStepIndex,
    currentStep: steps[currentStepIndex],
    start,
    next,
    prev,
    stop,
    isActive: currentStepIndex !== null,
  }
}

export default useTour
