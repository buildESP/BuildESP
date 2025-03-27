import React from "react";
import {
    DialogRoot,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
    DialogFooter,
    DialogActionTrigger,
    DialogCloseTrigger,
} from './ui/dialog';
import { Button, Text } from '@chakra-ui/react';
import usePostData from "../hooks/usePostData";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const DialogComponents = ({ item }) => {
    const { postData, loading } = usePostData("/exchanges");
    const { user } = useAuth();

    const handleConfirm = async () => {
        if (!user) {
            toast.error("Vous devez être connecté pour emprunter un objet");
            return;
        }

        const exchangeData = {
            item_id: item.id,
            lender_user_id: item.user_id, // ID du propriétaire de l'objet
            borrow_user_id: user.id, // ID de l'utilisateur qui emprunte
            start_date: new Date().toISOString(), // Date actuelle
            end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Date dans 7 jours
            status: "Pending" // Statut initial
        };

        const response = await postData(
            exchangeData,
            "Demande d'emprunt envoyée avec succès !",
            "Erreur lors de l'envoi de la demande d'emprunt"
        );

        if (response) {
        }
    };

    return (
        <DialogRoot>
            {/* Bouton pour ouvrir la boîte de dialogue */}
            <DialogTrigger asChild>
                <Button colorScheme="blue">Emprunter</Button>
            </DialogTrigger>

            {/* Contenu de la boîte de dialogue */}
            <DialogContent>
                <DialogHeader>
                    {/* Titre de la boîte de dialogue */}
                    <DialogTitle>Emprunter {item.name}</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    {/* Message de confirmation */}
                    <Text>Voulez-vous notifier le propriétaire pour emprunter cet objet ?</Text>
                </DialogBody>
                <DialogFooter>
                    {/* Bouton pour annuler */}
                    <DialogCloseTrigger asChild>
                        <Button variant="outline">Annuler</Button>
                    </DialogCloseTrigger>

                    {/* Bouton pour confirmer l'emprunt */}
                    <DialogActionTrigger asChild>
                        <Button
                            colorScheme="blue"
                            onClick={handleConfirm}
                            isLoading={loading}
                            loadingText="Envoi en cours..."
                        >
                            Confirmer
                        </Button>
                    </DialogActionTrigger>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
};

export default DialogComponents;