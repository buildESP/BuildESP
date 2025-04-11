import {  screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProvider } from "@/test/renderWithProvider"; // adapte le chemin

import LoginForm from "../LoginForm";
import { describe, it, expect, vi } from "vitest";

describe("LoginForm", () => {
  it("affiche les champs du formulaire", () => {
    renderWithProvider(<LoginForm onSubmit={vi.fn()} />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /se connecter/i })).toBeInTheDocument();
  });

  it("affiche une erreur si les champs sont vides ou invalides", async () => {
    renderWithProvider(<LoginForm onSubmit={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    await waitFor(() => {
      expect(screen.getByText("L’e-mail est requis")).toBeInTheDocument();
      expect(
        screen.getByText("Le mot de passe doit contenir au moins 6 caractères")
      ).toBeInTheDocument();
    });
  });

  it("soumet le formulaire avec des données valides", async () => {
    const mockSubmit = vi.fn();
    renderWithProvider(<LoginForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "strongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        login: "test@example.com",
        password: "strongpassword",
      });
    });
  });

  it("affiche une erreur personnalisée si elle est passée en prop", () => {
    renderWithProvider(<LoginForm onSubmit={vi.fn()} error="Identifiants invalides" />);
    expect(screen.getByText("Identifiants invalides")).toBeInTheDocument();
  });
});
