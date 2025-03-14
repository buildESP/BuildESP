import { Image, Text } from "@chakra-ui/react";

/**
 * 📌 Composant qui formate dynamiquement une valeur de tableau
 */
const FormattedCell = ({ keyName, value, item }) => {
  if (keyName === "Utilisateur") {
    return <Text>{`${item.firstname} ${item.lastname}`}</Text>;
  }

  if (keyName === "picture" || keyName === "image_url") {
    return value ? (
      <Image src={value} alt="Image" boxSize="50px" objectFit="cover" borderRadius="md" />
    ) : (
      <Text color="gray.500">Pas d'image</Text>
    );
  }

  if (keyName === "description") {
    return <Text>{value?.length > 50 ? `${value.slice(0, 50)}...` : value || "—"}</Text>;
  }

  if (keyName === "user" && value) {
    return <Text>{`${value.firstname} ${value.lastname}`}</Text>;
  }

  if (keyName === "subcategory") {
    return <Text>{value?.name || "—"}</Text>;
  }

  if (keyName === "subcategories") {
    return <Text>
      {Array.isArray(value) && value.length > 0 ? value.map((sub) => sub.name).join(", ") : "—"}
    </Text>;
  }

  return <Text>{typeof value === "object" ? JSON.stringify(value) : value || "—"}</Text>;
};

export default FormattedCell;
