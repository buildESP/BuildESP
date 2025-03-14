import { Table, ActionBar, Button, Kbd, Portal, Text } from "@chakra-ui/react";
import useAdminSelection from "@/hooks/useAdminSelection";
import useAdminDelete from "@/hooks/useAdminDelete";
import AdminTableRow from "./AdminTableRow";
import { Checkbox } from "../ui/checkbox";
/**
 * Composant réutilisable pour afficher une table d'administration.
 */
const AdminTable = ({ items, refetch, basePath }) => {
  const { selection, handleSelectionChange, handleSelectAll, hasSelection, indeterminate } = useAdminSelection(items);
  const { handleDeleteSelected, deleting } = useAdminDelete(basePath, refetch);

  if (!basePath) {
    console.error(" AdminTable : basePath manquant !");
    return <Text color="red.500">Erreur: basePath non défini.</Text>;
  }

  if (!items || items.length === 0) {
    return <Text>Aucun élément à afficher.</Text>;
  }

  const columnKeys = Object.keys(items[0]).filter((key) => key !== "id" && key !== "password");

  return (
    <>
      <Table.Root w="full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="5%"> {/* Ajuste la largeur */}
              <Checkbox
                aria-label="Tout sélectionner"
                checked={indeterminate ? "indeterminate" : selection.length > 0}
                onCheckedChange={(changes) => handleSelectAll(changes.checked)}
              />
            </Table.ColumnHeader>

            {/* ✅ Colonnes dynamiques */}
            {columnKeys.map((key) => (
              <Table.ColumnHeader key={key} w="15%" textAlign="left">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {items.map((item) => (
            <AdminTableRow
              key={item.id}
              item={item}
              columnKeys={columnKeys}
              selection={selection}
              handleSelectionChange={handleSelectionChange}
            />
          ))}
        </Table.Body>
      </Table.Root>


      <ActionBar.Root open={hasSelection}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>{selection.length} sélectionné(s)</ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Button variant="outline" size="sm" onClick={() => handleDeleteSelected(selection)} isLoading={deleting}>
                Supprimer <Kbd>⌫</Kbd>
              </Button>
              <Button variant="outline" size="sm">
                Éditer <Kbd>T</Kbd>
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </>
  );
};

export default AdminTable;
