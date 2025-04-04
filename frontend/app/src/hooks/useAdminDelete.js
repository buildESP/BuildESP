import useDeleteData from "@/hooks/useDeleteData";
import { useState } from "react";

/**
 * Gère la suppression en lot avec un délai entre chaque batch.
 */
const useAdminDelete = (basePath, refetch) => {
  const { deleteData, loading } = useDeleteData(basePath);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteSelected = async (selection) => {
    if (!window.confirm(`Voulez-vous vraiment supprimer ces ${selection.length} éléments ?`)) return;

    setDeleting(true);
    const batchSize = 10;
    const delayBetweenBatches = 500;

    try {
      for (let i = 0; i < selection.length; i += batchSize) {
        const batch = selection.slice(i, i + batchSize);
        await Promise.all(batch.map((itemId) => deleteData(itemId)));

        console.log(`✅ Batch ${i / batchSize + 1} supprimé (${batch.length} éléments)`);

        if (i + batchSize < selection.length) {
          await new Promise((resolve) => setTimeout(resolve, delayBetweenBatches));
        }
      }
      refetch();
    } catch (error) {
      console.error(" Erreur lors de la suppression en lot :", error);
    } finally {
      setDeleting(false);
    }
  };

  return { handleDeleteSelected, deleting };
};

export default useAdminDelete;
