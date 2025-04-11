import {
  Table,
  ActionBar,
  Button,
  Kbd,
  Portal,
  Text,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import useAdminSelection from "@/hooks/useAdminSelection";
import useAdminDelete from "@/hooks/useAdminDelete";
import AdminTableRow from "./AdminTableRow";
import { Checkbox } from "../ui/checkbox";
import { LuPlus } from "react-icons/lu";


const AdminTable = ({ items, refetch, basePath, onEdit }) => {
  const {
    selection,
    handleSelectionChange,
    handleSelectAll,
    hasSelection,
    indeterminate,
  } = useAdminSelection(items);
  const { handleDeleteSelected, deleting } = useAdminDelete(basePath, refetch);





  const handleEditClick = () => {
    if (selection.length !== 1) return;
    const item = items.find((i) => i.id === selection[0]);
    if (item && onEdit) onEdit(item); // 👈 Utilise la prop onEdit pour déclencher la modale côté parent
  };





  if (!basePath) {
    console.error("AdminTable : basePath manquant !");
    return <Text color="red.500">Erreur: basePath non défini.</Text>;
  }

  if (!items || items.length === 0) {
    return <Text>Aucun élément à afficher.</Text>;
  }

  const columnKeys = Object.keys(items[0]).filter(
    (key) => key !== "id" && key !== "password"
  );




  return (
    <>
      <Table.Root w="full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="15%">
              <HStack>
                <Checkbox
                  aria-label="Tout sélectionner"
                  checked={
                    indeterminate ? "indeterminate" : selection.length > 0
                  }
                  onCheckedChange={(changes) =>
                    handleSelectAll(changes.checked)
                  }
                />
                <IconButton variant="subtle" size="xs">
                  <LuPlus />
                </IconButton>
              </HStack>
            </Table.ColumnHeader>

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
              <ActionBar.SelectionTrigger>
                {selection.length} sélectionné(s)
              </ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteSelected(selection)}
                isLoading={deleting}
              >
                Supprimer <Kbd>⌫</Kbd>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleEditClick}
                disabled={selection.length !== 1}
              >
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
