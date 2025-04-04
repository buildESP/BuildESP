import { useState } from "react";

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return { searchTerm, handleSearchChange };
};

export default useSearch;
