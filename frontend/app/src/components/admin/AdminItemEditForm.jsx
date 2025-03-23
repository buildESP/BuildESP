import { Text } from "@chakra-ui/react";
import FormComponent from "../FormComponent";
import usePutData from "@/hooks/usePutData";
import useFetchData from "@/hooks/useFetchData";
import { itemUpdateSchema } from "@/validation/schemas";
import useItems from "@/hooks/useItems";

const AdminItemForm = ({ item, endpoint, onSuccess }) => {
    const { putData, loading } = usePutData(endpoint);
    const { refetch } = useItems();

    const {
        data: users,
        loading: loadingUsers,
    } = useFetchData("/users", { requiresAuth: true });

    const {
        data: subcategories,
        loading: loadingSubcategories,
    } = useFetchData("/subcategories");

    // ✅ Bloque le rendu tant que les données ne sont pas là
    if (
        loadingUsers ||
        loadingSubcategories ||
        !Array.isArray(users) ||
        !Array.isArray(subcategories)
    ) {
        return <Text>Chargement...</Text>;
    }

    const fields = [
        { name: "name", label: "Nom" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "picture", label: "Image", type: "file" },
        {
            name: "status",
            label: "Statut",
            type: "select",
            options: [
                { value: "Available", label: "Disponible" },
                { value: "Unavailable", label: "Indisponible" },
            ],
        },

    ];

    const handleSubmit = async (formData) => {
        const completedData = {
            ...formData,
            user_id: formData.user_id ?? item.user_id,
            subcategory_id: formData.subcategory_id ?? item.subcategory_id,
        };

        console.log("➡️ Sent to PUT:", completedData); // debug complet

        const result = await putData(completedData, item);

        if (result) {
            refetch();
            if (onSuccess) onSuccess();
        }
    };


    return (
        <FormComponent
            schema={itemUpdateSchema}
            fields={fields}
            defaultValues={{
                ...item,
                user_id: item.user_id,
                subcategory_id: item.subcategory_id,
            }} onSubmit={handleSubmit}
            submitLabel="Mettre à jour"
            loading={loading}
        />
    );
};

export default AdminItemForm;
