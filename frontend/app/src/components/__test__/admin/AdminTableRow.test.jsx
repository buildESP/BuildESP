import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { renderWithProvider } from "@/test/renderWithProvider";
import { Table } from "@chakra-ui/react";
import AdminTableRow from "@/components/admin/AdminTableRow";

// On mock FormattedCell pour simplifier le test
vi.mock("../FormattedCell", () => ({
  __esModule: true,
  default: ({ keyName, value }) => <span>{`${keyName}:${value}`}</span>,
}));

describe("AdminTableRow", () => {
  const item = {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
  };

  const columnKeys = ["name", "email"];
  const handleSelectionChange = vi.fn();
  const setEditingRowId = vi.fn();

  it("affiche les cellules correctement", () => {
    renderWithProvider(
        <Table.Root>
          <Table.Body>
            <AdminTableRow
              item={item}
              columnKeys={columnKeys}
              selection={["1"]}
              handleSelectionChange={handleSelectionChange}
              editingRowId={null}
              setEditingRowId={setEditingRowId}
            />
          </Table.Body>
        </Table.Root>
      );
    
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("alice@example.com")).toBeInTheDocument();
  });

  it("déclenche handleSelectionChange au clic sur le checkbox", async () => {
    renderWithProvider(
      <Table.Root>
        <Table.Body>
          <AdminTableRow
            item={item}
            columnKeys={columnKeys}
            selection={[]}
            handleSelectionChange={handleSelectionChange}
            editingRowId={null}
            setEditingRowId={setEditingRowId}
          />
        </Table.Body>
      </Table.Root>
    );

    const checkbox = screen.getByRole("checkbox", { name: /sélectionner la ligne/i });
    await userEvent.click(checkbox);

    expect(handleSelectionChange).toHaveBeenCalledWith("1", true);
  });

  it("réinitialise editingRowId si la ligne est décochée", async () => {
    renderWithProvider(
      <Table.Root>
        <Table.Body>
          <AdminTableRow
            item={item}
            columnKeys={columnKeys}
            selection={["1"]}
            handleSelectionChange={handleSelectionChange}
            editingRowId="1"
            setEditingRowId={setEditingRowId}
          />
        </Table.Body>
      </Table.Root>
    );

    const checkbox = screen.getByRole("checkbox", { name: /sélectionner la ligne/i });
    await userEvent.click(checkbox); // décochage

    expect(handleSelectionChange).toHaveBeenCalledWith("1", false);
    expect(setEditingRowId).toHaveBeenCalledWith(null);
  });
});
