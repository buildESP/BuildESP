// src/components/__test__/admin/AdminSubCategoryForm.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProvider } from "@/test/renderWithProvider";
import AdminSubcategoryForm from "@/components/admin/AdminSubCategoryForm";

// 🧪 Mock de usePutData
const mockPutData = vi.fn(() => Promise.resolve(true));

vi.mock("@/hooks/usePutData", () => ({
  default: () => ({
    putData: mockPutData,
    loading: false,
  }),
}));

// Mock de useUploadImage si utilisé par <FormComponent />
vi.mock("@/hooks/useUploadImage", () => ({
  default: () => ({
    uploadImage: vi.fn(() => Promise.resolve("https://mocked.image/uploaded.jpg")),
    uploading: false,
  }),
}));

describe("AdminSubcategoryForm", () => {
  const mockSubcategory = {
    id: 123,
    name: "Old Subcat Name",
    image_url: "https://existing.image.jpg",
  };

  beforeEach(() => {
    mockPutData.mockClear();
  });

  it("submits updated subcategory data", async () => {
    const onSuccess = vi.fn();

    renderWithProvider(
      <AdminSubcategoryForm
        subcategory={mockSubcategory}
        endpoint="/subcategories/123"
        onSuccess={onSuccess}
      />
    );

    // Vérifie les champs
    expect(screen.getByLabelText(/Nom de la sous-catégorie/i)).toBeInTheDocument();

    // Change le nom
    fireEvent.change(screen.getByLabelText(/Nom de la sous-catégorie/i), {
      target: { value: "Nouvelle sous-catégorie" },
    });

    // Clique sur le bouton
    fireEvent.click(
      screen.getByRole("button", { name: /Mettre à jour la sous-catégorie/i })
    );

    // Attends que putData soit appelé
    await waitFor(() => {
      expect(mockPutData).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Nouvelle sous-catégorie",
          image_url: mockSubcategory.image_url,
        }),
        mockSubcategory
      );
    });

    expect(onSuccess).toHaveBeenCalled();
  });
});
