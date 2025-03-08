import { useState, useEffect } from "react";

import { ItemContext } from "./ItemContext";
import useFetchData from "../hooks/useFetchData";

const ItemProvider = ({ children }) => {
  const { data: items, loading, error, refetch  } = useFetchData("/items");

  const [userItems, setUserItems] = useState([]);

  // ✅ Update items whenever the API data changes
  useEffect(() => {
    setUserItems(items);
  }, [items]);

  const addNewItem = (newItem) => {
    setUserItems((prevItems) => [newItem, ...prevItems]); // ✅ Add new item to state
  };

  return (
    <ItemContext.Provider value={{ items, loading, error, refetch, addNewItem  }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
