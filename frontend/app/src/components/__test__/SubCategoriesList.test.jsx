import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProvider } from "@/test/renderWithProvider";
import SubcategoriesList from "@/components/SubCategoriesList";

const mockSubcategories = [
  {
    id: 1,
    name: "Jardinage",
    image_url: "https://example.com/jardinage.jpg"
  },
  {
    id: 2,
    name: "Bricolage",
    image_url: ""
  }
];

describe("SubcategoriesList", () => {
  it("affiche un message s’il n’y a pas de sous-catégories", () => {
    renderWithProvider(<SubcategoriesList subcategories={[]} />);
    expect(screen.getByText(/aucune sous-catégorie disponible/i)).toBeInTheDocument();
  });

  it("affiche les sous-catégories avec leurs noms", () => {
    renderWithProvider(<SubcategoriesList subcategories={mockSubcategories} />);
    
    expect(screen.getByText("Jardinage")).toBeInTheDocument();
    expect(screen.getByText("Bricolage")).toBeInTheDocument();
  
    // Vérifie que les images sont bien présentes
    const jardinageImage = screen.getByAltText("Jardinage");
    const bricolageImage = screen.getByAltText("Bricolage");
  
    expect(jardinageImage).toBeInTheDocument();
    expect(bricolageImage).toBeInTheDocument();
  });
  

  it("crée des liens vers les bonnes sous-catégories", () => {
    renderWithProvider(<SubcategoriesList subcategories={mockSubcategories} />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/subcategories/1");
    expect(links[1]).toHaveAttribute("href", "/subcategories/2");
  });
});
