import { Input, Kbd } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { InputGroup } from "./ui/input-group";

export const SearchInput = ({ value, onChange }) => (
  <InputGroup flex="1" startElement={<LuSearch />} endElement={<Kbd>⌘K</Kbd>}>
    <Input
      placeholder="Search contacts"
      value={value}
      onChange={onChange}
    />
  </InputGroup>
);
