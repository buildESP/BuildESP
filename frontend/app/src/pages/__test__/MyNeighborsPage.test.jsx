import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProvider } from "../../test/renderWithProvider";
import ItemsPage from "../MyNeighborsPage";
import useFetchData from "../../hooks/useFetchData";

// Mock the useFetchData hook
vi.mock("../../hooks/useFetchData");

describe("ItemsPage", () => {
    it("renders a loading skeleton when data is loading", () => {
        useFetchData.mockReturnValue({ data: null, loading: true, error: null });

        renderWithProvider(<ItemsPage />);

        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("renders an error message when there is an error", () => {
        useFetchData.mockReturnValue({ data: null, loading: false, error: "Failed to fetch data" });

        renderWithProvider(<ItemsPage />);

        const errorMessage = screen.getByText("Failed to fetch data");
        expect(errorMessage).toBeInTheDocument();

        // Check if the element has the correct Chakra UI style
        expect(errorMessage).toHaveStyle({ color: "var(--chakra-colors-red-500)" });
    });

    it("renders the NeighborGallery component with users when data is fetched successfully", () => {
        const mockUsers = [
            { id: 1, name: "John Doe" },
            { id: 2, name: "Jane Smith" },
        ];
        useFetchData.mockReturnValue({ data: mockUsers, loading: false, error: null });

        renderWithProvider(<ItemsPage />);

        expect(screen.getByText("Mes Voisins")).toBeInTheDocument();

        mockUsers.forEach((user) => {
            // Use a custom matcher to find the text
            const userElement = screen.getByText((content, element) => {
                return element?.textContent?.includes(user.name);
            });
            expect(userElement).toBeInTheDocument();
        });
    });
});