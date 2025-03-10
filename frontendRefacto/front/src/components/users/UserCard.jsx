import {
    Button,
    Badge,
    Card,
    HStack,
    Stack,
    Strong,
    Text,
    Avatar
} from "@chakra-ui/react"
import { Link } from "react-router";

const UserCard = ({ user }) => {
    return (
        <Card.Root key={user.id} width="320px" as={Link} to={`/my-neighbors/${user.id}`} _hover={{ transform: "scale(1.05)", transition: "0.2s" }}>
            <Card.Body>
                <HStack mb="6" gap="3">
                    <Avatar.Root>
                    <Avatar.Fallback name={user.name} />
                    <Avatar.Image src={user.picture} />
                    </Avatar.Root>
                    <Stack gap="0">
                        <Text fontWeight="medium" textStyle="sm">
                            {user.firstname} {user.lastname}
                        </Text>
                        <Text color="fg.muted" textStyle="sm">
                            {user.email}
                        </Text>
                    </Stack>
                </HStack>
                <Text fontSize="sm" color="gray.600">
                    Adresse : {user.address || "Non spécifiée"}
                </Text>
            </Card.Body>
            <Card.Footer>
                <Badge colorPalette="green">Disponible</Badge>
            </Card.Footer>
        </Card.Root>
    )
}

export default UserCard;