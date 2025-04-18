import { renderWithProvider } from "@/test/renderWithProvider";
import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayouts";

// 🧪 Composants mockés
vi.mock("@/components/navigation/Navbar", () => ({
  default: () => <nav>Mocked Navbar</nav>,
}));
vi.mock("@/components/navigation/SubMenu", () => ({
  default: () => <div>Mocked SubMenu</div>,
}));
vi.mock("@/components/navigation/Footer", () => ({
  default: () => <footer>Mocked Footer</footer>,
}));

// 🧪 Faux contenu pour l’Outlet
const FakePage = () => <div>Contenu de la page</div>;

describe("MainLayout", () => {
  it("affiche la structure de layout avec Navbar, SubMenu, Outlet et Footer", () => {
    renderWithProvider(
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<FakePage />} />
        </Route>
      </Routes>
    );

    expect(screen.getByText("Mocked Navbar")).toBeInTheDocument();
    expect(screen.getByText("Mocked SubMenu")).toBeInTheDocument();
    expect(screen.getByText("Mocked Footer")).toBeInTheDocument();
    expect(screen.getByText("Contenu de la page")).toBeInTheDocument();
  });
});
