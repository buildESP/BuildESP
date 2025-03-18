import { Editable, EditablePreview, EditableInput, EditableControl, IconButton, HStack } from "@chakra-ui/react";








const EditableCell = ({  value, onChange }) => {

    const defaultValue = typeof value === "object" ? JSON.stringify(value) : String(value ?? "");


 

  return (
    <Editable.Root defaultValue={defaultValue} onChange={onChange}>
      <HStack>
        <Editable.Preview />
        <Editable.Input onChange={onChange} /> 
      </HStack>
    </Editable.Root>
  );
};

export default EditableCell;
