import { describe, it, expect, vi, beforeEach } from "vitest"
import { fireEvent, waitFor } from "@testing-library/react"
import { renderWithRouter, screen } from "@/test/test-utils"
import ItemDetails from "@/components/items/ItemDetails"
import React from "react"

// 📦 Mocks
const mockDeleteData = vi.fn(() => Promise.resolve(true))
const mockRefetch = vi.fn()
const mockNavigate = vi.fn()

// 🔧 Mock hooks
vi.mock('@/hooks/useDeleteData', () => ({
  default: () => ({
    deleteData: mockDeleteData,
    loading: false,
  }),
}))

vi.mock('@/hooks/useItems', () => ({
  default: () => ({
    refetch: mockRefetch,
  }),
}))

vi.mock('@/hooks/useAuth', () => ({
  default: () => ({
    user: { id: 123 },
  }),
}))

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router")
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// 🧪 Test item
const item = {
  id: 123,
  name: "Chaise",
  description: "Une chaise confortable",
  status: "Available",
  picture: "https://via.placeholder.com/300",
  user_id: 123,
}

const renderItem = (isOwner = true, onEdit = vi.fn(), customItem = item) => {
  return renderWithRouter(
    <ItemDetails item={customItem} isOwner={isOwner} onEdit={onEdit} />
  )
}

describe("ItemDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("affiche les infos de l'objet", () => {
    renderItem()
    expect(screen.getByText("Chaise")).toBeInTheDocument()
    expect(screen.getByText(/Une chaise confortable/)).toBeInTheDocument()
    expect(screen.getByText(/Statut: Available/)).toBeInTheDocument()
  })

  it("affiche les boutons d'action si owner", () => {
    renderItem(true)
    expect(screen.getByText(/éditer/i)).toBeInTheDocument()
    expect(screen.getByText(/supprimer/i)).toBeInTheDocument()
  })

  it("n'affiche pas les boutons si non-owner", () => {
    const notOwnerItem = { ...item, user_id: 2 }
    renderItem(false, vi.fn(), notOwnerItem)
    expect(screen.queryByText(/éditer/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/supprimer/i)).not.toBeInTheDocument()
  })

  it("affiche un message si l'utilisateur est le propriétaire", () => {
    renderItem(false)
    expect(
      screen.getByText(/vous ne pouvez pas emprunter votre propre objet/i)
    ).toBeInTheDocument()
  })

  it("supprime l'objet et redirige après confirmation", async () => {
    vi.spyOn(window, "confirm").mockReturnValueOnce(true)

    renderItem()

    fireEvent.click(screen.getByText(/supprimer/i))

    await waitFor(() => {
      expect(mockDeleteData).toHaveBeenCalledWith(123)
      expect(mockRefetch).toHaveBeenCalled()
      expect(mockNavigate).toHaveBeenCalledWith("/my-items")
    })
  })
})
