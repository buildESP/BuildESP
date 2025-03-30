import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AuthProvider from '@/context/AuthProvider'
import { AuthContext } from '@/context/AuthContext'
import React, { useContext } from 'react'

// 🧪 Mock du service auth
vi.mock('@/services/authServices', () => ({
  getUserInfo: vi.fn().mockResolvedValue({ id: 1, name: 'Alice', is_admin: false }),
  logout: vi.fn(),
}))

const TestComponent = () => {
  const { user, isAuthenticated, login, logout } = useContext(AuthContext)

  return (
    <div>
      <p>User: {user?.name}</p>
      <p>isAuthenticated: {isAuthenticated.toString()}</p>

      <button onClick={() => login('fakeToken', '1')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

const renderWithProvider = () =>
  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  )

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('initialise avec un utilisateur null', () => {
    renderWithProvider()

    expect(screen.getByText(/user:/i)).toHaveTextContent('User:')
    expect(screen.getByText(/isAuthenticated:/i)).toHaveTextContent('isAuthenticated: false')
  })

  it('login met à jour le contexte avec les infos utilisateur', async () => {
    renderWithProvider()

    userEvent.click(screen.getByText(/login/i))

    await waitFor(() => {
      expect(screen.getByText(/user: Alice/i)).toBeInTheDocument()
      expect(screen.getByText(/isAuthenticated: true/i)).toBeInTheDocument()
    })
  })

  it('logout reset les valeurs du contexte', async () => {
    renderWithProvider()

    // Login first
    userEvent.click(screen.getByText(/login/i))
    await waitFor(() => screen.getByText(/user: Alice/i))

    // Then logout
    userEvent.click(screen.getByText(/logout/i))

    await waitFor(() => {
      expect(screen.getByText(/user:/i)).toHaveTextContent('User:')
      expect(screen.getByText(/isAuthenticated:/i)).toHaveTextContent('isAuthenticated: false')
    })
  })
})
