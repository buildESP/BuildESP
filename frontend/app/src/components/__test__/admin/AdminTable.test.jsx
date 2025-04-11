import { describe, it, vi, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminTable from "@/components/admin/AdminTable";
import { renderWithProvider } from "@/test/renderWithProvider"; // ✅ Important

// ✅ Mocks des hooks personnalisés
vi.mock("@/hooks/useAdminSelection", () => ({
  default: (items) => ({
    selection: [items[0]?.id],
    handleSelectionChange: vi.fn(),
    handleSelectAll: vi.fn(),
    hasSelection: true,
    indeterminate: false,
  }),
}));

vi.mock("@/hooks/useAdminDelete", () => ({
  default: () => ({
    handleDeleteSelected: vi.fn(),
    deleting: false,
  }),
}));

describe("AdminTable", () => {
  const mockItems = [
    { id: "1", name: "Alice", email: "alice@example.com", role: "Admin" },
    { id: "2", name: "Bob", email: "bob@example.com", role: "User" },
  ];

  const basePath = "/admin";
  let onEdit;

  beforeEach(() => {
    onEdit = vi.fn();
  });

  it("affiche un message d'erreur si basePath est manquant", () => {
    renderWithProvider(<AdminTable items={mockItems} />);
    expect(screen.getByText(/basePath non défini/i)).toBeInTheDocument();
  });

  it("affiche un message si aucun élément n'est fourni", () => {
    renderWithProvider(<AdminTable items={[]} basePath={basePath} />);
    expect(screen.getByText(/aucun élément/i)).toBeInTheDocument();
  });

  it("affiche les colonnes et les lignes", () => {
    renderWithProvider(<AdminTable items={mockItems} basePath={basePath} onEdit={onEdit} />);

    // Vérifie les colonnes
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();

    // Vérifie les lignes
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("déclenche l'édition lorsqu'un seul élément est sélectionné", async () => {
    renderWithProvider(<AdminTable items={mockItems} basePath={basePath} onEdit={onEdit} />);
    const editButton = screen.getByRole("button", { name: /éditer/i });

    await userEvent.click(editButton);

    expect(onEdit).toHaveBeenCalledWith(mockItems[0]);
  });
});
