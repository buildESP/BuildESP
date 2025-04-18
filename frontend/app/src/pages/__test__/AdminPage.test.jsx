import { render, screen, waitFor } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react"; // Chakra UI Provider
import { AuthProvider } from "@/context/AuthProvider"; // Assurez-vous que le AuthProvider est importé correctement
import AdminPage from "@/pages/AdminPage"; // Le composant AdminPage

// Mocking the useFetchData hook to simulate fetching data
vi.mock('@/hooks/useFetchData', () => ({
    default: () => ({
        data: {
            users: [{ id: 1, name: 'Test User' }],
            items: [{ id: 1, name: 'Test Item' }],
            categories: [{ id: 1, name: 'Test Category' }],
            subcategories: [{ id: 1, name: 'Test Subcategory' }]
        },
        loading: false,
        error: null,
    })
}));

describe('AdminPage', () => {
    it('affiche le spinner pendant le chargement des données', () => {
        render(
            <ChakraProvider>
                <AuthProvider>
                    <AdminPage />
                </AuthProvider>
            </ChakraProvider>
        );

        // Vérifiez si le spinner est affiché pendant le chargement
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('affiche une erreur si une donnée échoue à charger', async () => {
        // Mocking useFetchData to simulate an error
        vi.mock('@/hooks/useFetchData', () => ({
            default: () => ({
                data: null,
                loading: false,
                error: 'Erreur de données',
            })
        }));

        render(
            <ChakraProvider>
                <AuthProvider>
                    <AdminPage />
                </AuthProvider>
            </ChakraProvider>
        );

        // Vérifiez si le message d'erreur est affiché
        await waitFor(() => expect(screen.getByText(/Erreur de chargement des données/i)).toBeInTheDocument());
    });

    it('affiche correctement les données une fois qu’elles sont chargées', async () => {
        render(
            <ChakraProvider>
                <AuthProvider>
                    <AdminPage />
                </AuthProvider>
            </ChakraProvider>
        );

        // Vérifiez que les utilisateurs, items, catégories et sous-catégories sont affichés
        await waitFor(() => {
            expect(screen.getByText('Test User')).toBeInTheDocument();
            expect(screen.getByText('Test Item')).toBeInTheDocument();
            expect(screen.getByText('Test Category')).toBeInTheDocument();
            expect(screen.getByText('Test Subcategory')).toBeInTheDocument();
        });
    });
});
