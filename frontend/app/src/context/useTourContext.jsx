// src/context/useTourContext.js
import { createContext, useContext } from 'react'

export const TourContext = createContext()

export const useTourContext = () => {
  const context = useContext(TourContext)
  if (!context) {
    throw new Error('useTourContext must be used within a TourProvider')
  }
  return context
}
