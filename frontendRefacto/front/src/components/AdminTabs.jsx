import { Tabs } from "@chakra-ui/react"
import { LuFolder, LuSquareCheck, LuUser } from "react-icons/lu"

const AdminTabs = () => {
    return (
        <Tabs.Root defaultValue="items">
            <Tabs.List>
                <Tabs.Trigger value="items">
                    <LuUser />
                    Items
                </Tabs.Trigger>
                <Tabs.Trigger value="users">
                    <LuFolder />
                    Utilisateurs
                </Tabs.Trigger>
                <Tabs.Trigger value="categories">
                    <LuSquareCheck />
                    Catégories et Sous Catégories
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="items">Table des Items</Tabs.Content>
            <Tabs.Content value="users">Table des Users </Tabs.Content>
            <Tabs.Content value="categories">
                Table des categoreis et Sous-categoreis
            </Tabs.Content>
        </Tabs.Root>
    )
}

export default AdminTabs;