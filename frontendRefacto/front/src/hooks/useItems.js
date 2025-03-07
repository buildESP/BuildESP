import { useContext } from "react";
import { ItemContext } from "../context/ItemContext";

const useItems = () => {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItems doit être utilisé dans un ItemProvider");
  }
  return context;
};

export default useItems;
