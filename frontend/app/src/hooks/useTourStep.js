// src/hooks/useTourStep.js
import { useTourContext } from '@/context/useTourContext'

export const useTourStep = (id) => {
  const { currentStep, currentStepIndex, isActive, next, prev, stop } = useTourContext()
  const isCurrent = currentStep?.id === id

  return {
    isCurrent,
    title: currentStep?.title,
    description: currentStep?.description,
    isFirst: currentStepIndex === 0,
    isLast: currentStep?.isLast,
    next,
    prev,
    stop,
    isActive,
  }
}
