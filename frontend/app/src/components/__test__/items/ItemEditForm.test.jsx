import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, waitFor, screen } from "@testing-library/react";
import { renderWithRouter } from "@/test/test-utils.jsx";
import ItemEditForm from "@/components/items/ItemEditForm";

// ─── MOCK DES HOOKS ────────────────────────────────────────────────────────────
vi.mock('@/hooks/useFetchData', () => ({
    default: (url) => {
        if (url === "/subcategories") {
            return { data: [{ id: 3, name: "Mobilier" }], loading: false };
        }
        return { data: null, loading: false };
    },
}));

vi.mock('@/hooks/useAuth', () => ({
    default: () => ({
        user: { id: 1 },
        token: "fake-token",
        isLoggedIn: true,
        login: vi.fn(),
        logout: vi.fn(),
    }),
}));

vi.mock('@/hooks/useUploadImage', () => ({
    default: () => ({
        uploadImage: vi.fn(() => Promise.resolve("https://via.placeholder.com/300")),
        loading: false,
        imageUrl: "https://via.placeholder.com/300",
        setImageUrl: vi.fn(),
    }),
}));

describe("ItemEditForm", () => {
    const mockOnSubmit = vi.fn();
    const item = {
        id: 42,
        name: "Chaise",
        description: "Une chaise sympa",
        picture: "https://via.placeholder.com/300",
        status: "Available",      // => affiché “Disponible”
        subcategory_id: 3,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("pré‑remplit bien les champs name, description, picture et status", () => {
        renderWithRouter(
            <ItemEditForm item={item} onSubmit={mockOnSubmit} loading={false} />
        );

        // Nom et description
        expect(screen.getByDisplayValue("Chaise")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Une chaise sympa")).toBeInTheDocument();

        // Aperçu de l'image
        const img = screen.getByRole("img", { name: /preview/i });
        expect(img).toHaveAttribute("src", item.picture);

        // Statut (Available → “Disponible”)
        expect(screen.getByDisplayValue(/disponible/i)).toBeInTheDocument();
    });

    it("appelle onSubmit AVEC uniquement name, description, picture et status modifiés", async () => {
        renderWithRouter(
            <ItemEditForm item={item} onSubmit={mockOnSubmit} loading={false} />
        );

        // Modifier le nom et le statut
        fireEvent.change(screen.getByLabelText(/nom de l'objet/i), {
            target: { value: "Chaise test" },
        });
        fireEvent.change(screen.getByLabelText(/statut/i), {
            target: { value: "Unavailable" }, // “Indisponible”
        });

        // Soumettre
        fireEvent.click(
            screen.getByRole("button", { name: /mettre à jour/i })
        );

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith({
                name: "Chaise test",
                description: "Une chaise sympa",
                picture: "https://via.placeholder.com/300",
                status: "Unavailable",
            });
        });
    });
});
