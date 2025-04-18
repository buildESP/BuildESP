import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProvider } from '@/test/renderWithProvider'
import Footer from '@/components/navigation/Footer'

describe('Footer', () => {
  it('render le footer avec les sections et liens', () => {
    renderWithProvider(<Footer />)

    // ✅ Titres des sections EXACTS présents dans le composant
    expect(screen.getByRole('heading', { name: /Nous suivre/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Informations légales/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Des questions \?/i })).toBeInTheDocument()

    // ✅ Liens importants
    expect(screen.getByRole('link', { name: /TikTok/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Instagram/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Mentions légales/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Conditions générales/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Contactez-nous/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /FAQ/i })).toBeInTheDocument()
  })
})
