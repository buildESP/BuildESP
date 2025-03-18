import { Table, ActionBar, Button, Kbd, Portal, Text, IconButton, HStack } from "@chakra-ui/react";
import useAdminSelection from "@/hooks/useAdminSelection";
import useAdminDelete from "@/hooks/useAdminDelete";
import usePutData from "@/hooks/usePutData";
import AdminTableRow from "./AdminTableRow";
import { Checkbox } from "../ui/checkbox";
import { LuPlus } from "react-icons/lu";
import { useState } from "react";
/**
 * Composant réutilisable pour afficher une table d'administration.
 */
const AdminTable = ({ items, refetch, basePath }) => {
  const { selection, handleSelectionChange, handleSelectAll, hasSelection, indeterminate } = useAdminSelection(items);
  const { handleDeleteSelected, deleting } = useAdminDelete(basePath, refetch);
  const { putData, loading } = usePutData(basePath); // ✅ Hook API pour mise à jour




  const [editingRowId, setEditingRowId] = useState(null); // 🔹 Ajout de l'état d'édition
  const [editedData, setEditedData] = useState({}); // ✅ Stocke les modifications



  if (!basePath) {
    console.error(" AdminTable : basePath manquant !");
    return <Text color="red.500">Erreur: basePath non défini.</Text>;
  }

  if (!items || items.length === 0) {
    return <Text>Aucun élément à afficher.</Text>;
  }

  const columnKeys = Object.keys(items[0]).filter((key) => key !== "id" && key !== "password");


  const handleEditChange = (rowId, key, event) => {
    const value = event.target.value;
  
    setEditedData((prev) => ({
      ...prev,
      [rowId]: {
        ...(prev[rowId] || items.find((item) => item.id === rowId)), // ✅ Conserve les anciennes valeurs
        [key]: value, // ✅ Stocke la vraie valeur modifiée
      },
    }));
  };
  



  const handleSaveEdit = async () => {
    if (!editingRowId || !editedData[editingRowId]) return;

    const originalData = items.find((item) => item.id === editingRowId); // ✅ Récupérer les données originales
    const updatedData = { ...originalData, ...editedData[editingRowId] }; // ✅ Fusionner avec les modifications

    console.log("Données envoyées :", updatedData); // 🔍 Debugging

    await putData(updatedData, originalData);

    setEditingRowId(null); // ✅ Quitter le mode édition après envoi
    setEditedData((prev) => {
      const newData = { ...prev };
      delete newData[editingRowId];
      return newData;
    });

    refetch(); // ✅ Rafraîchir les données après mise à jour
  };

  return (
    <>
      <Table.Root w="full">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="15%">
              <HStack>
                <Checkbox
                  aria-label="Tout sélectionner"
                  checked={indeterminate ? "indeterminate" : selection.length > 0}
                  onCheckedChange={(changes) => handleSelectAll(changes.checked)}
                />
                <IconButton variant='subtle' size="xs"><LuPlus /></IconButton>
              </HStack>
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
              editingRowId={editingRowId}
              setEditingRowId={setEditingRowId}
              handleEditChange={handleEditChange}
            />
          ))}
        </Table.Body>
      </Table.Root>


      <ActionBar.Root open={hasSelection || editingRowId !== null}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              {editingRowId ? (
                <>
                  <Button variant="solid" size="sm" colorPalette="green" onClick={handleSaveEdit} isLoading={loading}>
                    Enregistrer
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setEditingRowId(null)}>
                    Quitter
                  </Button>
                </>
              ) : (
                <>
                  <ActionBar.SelectionTrigger>{selection.length} sélectionné(s)</ActionBar.SelectionTrigger>
                  <ActionBar.Separator />
                  <Button variant="outline" size="sm" onClick={() => handleDeleteSelected(selection)} isLoading={deleting}>
                    Supprimer <Kbd>⌫</Kbd>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setEditingRowId(selection.length === 1 ? selection[0] : null)}
                    disabled={selection.length !== 1}>
                    Éditer <Kbd>T</Kbd>
                  </Button>
                </>
              )}
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </>
  );
};

export default AdminTable;
