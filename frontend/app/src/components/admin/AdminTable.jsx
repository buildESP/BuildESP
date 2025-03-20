import { useState } from "react";
import { ActionBar, Button, Kbd, Portal, Table, Image, Text } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";

const AdminTable = ({ items }) => {
  const [selection, setSelection] = useState([]);

  if (!items || items.length === 0) {
    return <Text>Aucun élément à afficher.</Text>;
  }

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;

  // ✅ Vérifier si c'est un tableau d'utilisateurs
  const isUserTable = items.some((item) => "password" in item);

  // ✅ Déterminer les colonnes à afficher en excluant "id" et "password" pour les utilisateurs
  let columnKeys = Object.keys(items[0]).filter(
    (key) => key !== "id" && key !== "password"
  );

  // ✅ Si c'est un tableau d'utilisateurs, on remplace "firstname" & "lastname" par "Utilisateur"
  if (isUserTable) {
    columnKeys = columnKeys.filter((key) => key !== "firstname" && key !== "lastname");
    columnKeys.unshift("Utilisateur"); // Ajoute la colonne en première position
  }

  const handleSelectionChange = (itemId, checked) => {
    setSelection((prev) =>
      checked ? [...prev, itemId] : prev.filter((id) => id !== itemId)
    );
  };

  const handleSelectAll = (checked) => {
    setSelection(checked ? items.map((item) => item.id) : []);
  };

  // ✅ Fonction de formatage des valeurs
  const formatValue = (key, value, item) => {
    if (key === "Utilisateur") {
      return `${item.firstname} ${item.lastname}`;
    }

    if (key === "picture" || key === "image_url") {
      return value ? (
        <Image
          src={value}
          alt="Image"
          boxSize="50px"
          objectFit="cover"
          borderRadius="md"
        />
      ) : (
        <Text color="gray.500">Pas d'image</Text>
      );
    }

    if (key === "description") {
      return value?.length > 50 ? `${value.slice(0, 50)}...` : value || "—";
    }

    if (key === "user" && value) {
      return `${value.firstname} ${value.lastname}`;
    }

    if (key === "subcategory") {
      return value?.name || "—";
    }

    if (key === "subcategories") {
      return Array.isArray(value) && value.length > 0
        ? value.map((sub) => sub.name).join(", ")
        : "—";
    }

    if (typeof value === "object") {
      return JSON.stringify(value);
    }

    return value || "—";
  };

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="6">
              <Checkbox
                top="1"
                aria-label="Tout sélectionner"
                checked={indeterminate ? "indeterminate" : selection.length > 0}
                onCheckedChange={(changes) => handleSelectAll(changes.checked)}
              />
            </Table.ColumnHeader>

            {/* ✅ Colonnes dynamiques */}
            {columnKeys.map((key) => (
              <Table.ColumnHeader key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {items.map((item) => (
            <Table.Row
              key={item.id}
              data-selected={selection.includes(item.id) ? "" : undefined}
            >
              <Table.Cell>
                <Checkbox
                  top="1"
                  aria-label="Sélectionner la ligne"
                  checked={selection.includes(item.id)}
                  onCheckedChange={(changes) =>
                    handleSelectionChange(item.id, changes.checked)
                  }
                />
              </Table.Cell>

              {/* ✅ Appliquer les règles de formatage */}
              {columnKeys.map((key) => (
                <Table.Cell key={key}>{formatValue(key, item[key], item)}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/* ✅ Action Bar */}
      <ActionBar.Root open={hasSelection}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger>
                {selection.length} sélectionné(s)
              </ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Button variant="outline" size="sm">
                Supprimer <Kbd>⌫</Kbd>
              </Button>
              <Button variant="outline" size="sm">
                Éditer <Kbd>T</Kbd>
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </>
  );
};

export default AdminTable;
