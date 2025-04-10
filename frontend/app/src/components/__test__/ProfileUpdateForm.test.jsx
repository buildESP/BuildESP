import { describe, it, vi, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProfileUpdateForm from "../ProfileUpdateForm";
import { renderWithProvider } from "@/test/renderWithProvider";

// Mock de usePutData
vi.mock("../../hooks/usePutData", () => ({
  default: () => ({
    putData: vi.fn().mockResolvedValue(true),
    loading: false,
  }),
}));

describe("ProfileUpdateForm", () => {
  const userData = {
    id: { id: "123" },
    firstname: "Jean",
    lastname: "Dupont",
    email: "jean.dupont@example.com",
    address: "123 rue de Paris",
    password: "secret",
    phone: "0707070707",
    picture: "https://example.com/photo.jpg",
  };

  it("annule la modification si on clique sur Cancel", async () => {
    const onCancel = vi.fn();

    renderWithProvider(
      <ProfileUpdateForm userData={userData} onSuccess={vi.fn()} onCancel={onCancel} />
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await userEvent.click(cancelButton);

    expect(onCancel).toHaveBeenCalled();
  });
});
