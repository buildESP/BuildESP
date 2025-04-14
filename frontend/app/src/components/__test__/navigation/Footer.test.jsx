import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProvider } from '@/test/renderWithProvider'
import Footer from '@/components/navigation/Footer'

describe('Footer', () => {
  it('render le footer avec les sections et liens', () => {
    renderWithProvider(<Footer />)

    // ✅ Titres des sections
    expect(screen.getByRole('heading', { name: /a propos de nous/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /informations légales/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /des questions/i })).toBeInTheDocument()

    // ✅ Liens importants
    expect(screen.getByRole('link', { name: /confidentialité/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /faq/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /mentions légales/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /conditions générales/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contactez-nous/i })).toBeInTheDocument()
  })
})
