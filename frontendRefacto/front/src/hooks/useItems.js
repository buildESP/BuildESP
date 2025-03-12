import { useContext } from "react";
import { ItemContext } from "../context/ItemContext";

/**
 * 📌 Hook personnalisé pour accéder au contexte des items.
 *
 * Ce hook permet de récupérer les **items** stockés dans le contexte et d'interagir
 * avec les méthodes associées (ajout, suppression, mise à jour, etc.).
 *
 * 🚨 **Doit être utilisé à l'intérieur d'un `<ItemProvider>` !**
 *
 * @returns {Object} - Objet contenant les items et les méthodes de gestion des items.
 * @throws {Error} - Erreur si le hook est utilisé en dehors d'un `ItemProvider`.
 */
const useItems = () => {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error("useItems doit être utilisé dans un ItemProvider");
  }

  return context;
};

export default useItems;
