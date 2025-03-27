import { Table } from "@chakra-ui/react";
import FormattedCell from "../FormattedCell";
import { Checkbox } from "../ui/checkbox";



const AdminTableRow = ({ item, columnKeys, selection, handleSelectionChange, editingRowId, setEditingRowId }) => {


  return (
    <Table.Row key={item.id} data-selected={selection.includes(item.id) ? "" : undefined}>
      <Table.Cell w="5%">
        <Checkbox
          aria-label="Sélectionner la ligne"
          checked={selection.includes(item.id)}
          onCheckedChange={(changes) => {
            handleSelectionChange(item.id, changes.checked);
            if (!changes.checked && editingRowId === item.id) setEditingRowId(null); // 🔹 Quitter le mode édition si décoché
          }}
        />
      </Table.Cell>

      {columnKeys.map((key) => (
        <Table.Cell key={key} w="15%" textAlign="left">

          <FormattedCell keyName={key} value={item[key]} item={item} />
        </Table.Cell>
      ))}
    </Table.Row>
  );
};

export default AdminTableRow;