import { Input, Kbd } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { InputGroup } from "./ui/input-group";

const SearchInput = ({ value, onChange }) => (
  <InputGroup flex="1" startElement={<LuSearch />} >
    <Input
      placeholder="Search contacts"
      value={value}
      onChange={onChange}
    />
  </InputGroup>
);

export default SearchInput;