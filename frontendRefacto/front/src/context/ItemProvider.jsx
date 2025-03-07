import { ItemContext } from "./ItemContext";
import useFetchData from "../hooks/useFetchData";

const ItemProvider = ({ children }) => {
  const { data: items, loading, error } = useFetchData("/items");

  return (
    <ItemContext.Provider value={{ items, loading, error }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
