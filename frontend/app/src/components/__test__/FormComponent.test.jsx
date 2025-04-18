import { renderWithProvider } from "@/test/renderWithProvider";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { it , expect, describe} from "vitest";
import FormComponent from "@/components/FormComponent";
import { vi } from "vitest";
import { z } from "zod";

// Mock du hook d'upload d'image
vi.mock("@/hooks/useUploadImage", () => ({
  default: () => ({
    uploadImage: vi.fn(() => Promise.resolve("https://mocked.image/uploaded.jpg")),
    uploading: false,
  }),
}));

describe("FormComponent", () => {
  const schema = z.object({
    name: z.string().min(2, "Name is required"),
    description: z.string().optional(),
    category: z.string().min(1),
    picture: z.string().optional(),
  });

  const mockFields = [
    { name: "name", label: "Nom", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
    {
      name: "category",
      label: "Catégorie",
      type: "select",
      options: [
        { value: "books", label: "Books" },
        { value: "tools", label: "Tools" },
      ],
    },
    { name: "picture", label: "Image", type: "file" },
  ];

  const defaultValues = {
    name: "Test Item",
    description: "Une belle description",
    category: "books",
    picture: "https://existing.image.jpg",
  };

  const onSubmit = vi.fn();

  it("remplit et soumet le formulaire", async () => {
    renderWithProvider(
      <FormComponent
        schema={schema}
        fields={mockFields}
        onSubmit={onSubmit}
        loading={false}
        submitLabel="Envoyer"
        defaultValues={defaultValues}
        title="Créer un élément"
      />
    );

    // Vérifie présence des champs
    expect(screen.getByLabelText(/Nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Catégorie/i)).toBeInTheDocument();
  
    fireEvent.change(screen.getByLabelText(/Nom/i), {
      target: { value: "Un nouveau nom" },
    });

    // Clique sur le bouton submit
    fireEvent.click(screen.getByRole("button", { name: /Envoyer/i }));

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Un nouveau nom",
          description: defaultValues.description,
          category: defaultValues.category,
          picture: defaultValues.picture,
        })
      )
    );
  });
});
