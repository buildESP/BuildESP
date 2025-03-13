import { useState, useEffect } from "react";
import { ItemContext } from "./ItemContext";
import useFetchData from "../hooks/useFetchData";

/**
 * 📌 **Fournit le contexte des Items à l'application.**
 *
 * Ce Provider :
 * - Charge les **items** depuis l'API `/items`.
 * - Permet de **rafraîchir** la liste avec `refetch()`.
 * - Stocke les items dans un `state` pour **mise à jour rapide**.
 *
 * @component
 * @param {React.ReactNode} children - Les composants enfants ayant accès au contexte.
 * @returns {JSX.Element} - Un Provider contenant les items.
 */
const ItemProvider = ({ children }) => {
  // 🔹 Récupération des items depuis l'API
  const { data: items, loading, error, refetch } = useFetchData("/items");

  // 🔹 Stockage local des items (permet de les mettre à jour dynamiquement)
  const [userItems, setUserItems] = useState([]);

  /**
   * 🔄 **Met à jour les items lorsque les données de l'API changent.**
   */
  useEffect(() => {
    setUserItems(items);
  }, [items]);

  /**
   * ✅ **Ajoute un nouvel item à la liste locale.**
   * - **Permet d'ajouter un item instantanément** sans attendre l'API.
   * - **Ajoute en début de liste** pour un affichage rapide.
   *
   * @param {Object} newItem - L'objet représentant le nouvel item.
   */
  const addNewItem = (newItem) => {
    setUserItems((prevItems) => [newItem, ...prevItems]);
  };

  return (
    <ItemContext.Provider value={{ items, loading, error, refetch, addNewItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
