// src/hooks/usePageTour.js
import { useMemo } from 'react'
import { TourProvider } from '@/context/TourProvider'

export const usePageTour = (steps) => {
  const Wrapper = useMemo(() => {
    return ({ children }) => (
      <TourProvider steps={steps}>
        {children}
      </TourProvider>
    )
  }, [steps])

  return { Wrapper }
}
