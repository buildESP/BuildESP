import { useState } from "react";

/**
 * Hook personnalisé pour gérer la sélection des éléments dans AdminTable.
 */
const useAdminSelection = (items) => {
  const [selection, setSelection] = useState([]);

  const handleSelectionChange = (itemId, checked) => {
    setSelection((prev) =>
      checked ? [...prev, itemId] : prev.filter((id) => id !== itemId)
    );
  };

  const handleSelectAll = (checked) => {
    setSelection(checked ? items.map((item) => item.id) : []);
  };

  return {
    selection,
    setSelection,
    handleSelectionChange,
    handleSelectAll,
    hasSelection: selection.length > 0,
    indeterminate: selection.length > 0 && selection.length < items.length,
  };
};

export default useAdminSelection;
