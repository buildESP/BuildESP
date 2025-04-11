import { useState, useEffect } from "react"
import { ItemContext } from "./ItemContext"
import useFetchData from "../hooks/useFetchData"

/**
 * 📌 Fournit le contexte des Items à l'application.
 *
 * Ce Provider :
 * - Récupère les **items** depuis l'API `/items`.
 * - Permet de **rafraîchir** la liste via `refetch()`.
 * - Gère des **items locaux** via `addNewItem()` pour un affichage instantané.
 *
 * @param {React.ReactNode} children - Composants enfants.
 * @returns {JSX.Element}
 */
const ItemProvider = ({ children }) => {
  // 🔹 Récupération des items depuis l'API
  const { data: items, loading, error, refetch } = useFetchData("/items")

  // 🔹 Items ajoutés dynamiquement (localement)
  const [userItems, setUserItems] = useState([])

  /**
   * 🔄 Initialise les items locaux avec ceux de l'API (une seule fois)
   */
  useEffect(() => {
    const shouldInitialize =
      Array.isArray(items) && items.length > 0 && userItems.length === 0

    if (shouldInitialize) {
      setUserItems(items)
    }
  }, [items, userItems.length])

  /**
   * ✅ Ajoute un item localement (en haut de la liste)
   * @param {Object} newItem - Le nouvel item à ajouter.
   */
  const addNewItem = (newItem) => {
    setUserItems((prev) => [newItem, ...prev])
  }

  // 🧩 Combine les items locaux et ceux de l'API (en évitant les doublons si nécessaire)
  const combinedItems = [...userItems, ...(items ?? []).filter(apiItem => !userItems.find(u => u.id === apiItem.id))]

  return (
    <ItemContext.Provider
      value={{
        items: combinedItems,
        loading,
        error,
        refetch,
        addNewItem,
      }}
    >
      {children}
    </ItemContext.Provider>
  )
}

export default ItemProvider
