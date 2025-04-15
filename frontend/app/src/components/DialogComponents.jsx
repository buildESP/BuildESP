import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    DialogRoot,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
    DialogActionTrigger,
    DialogCloseTrigger,
} from './ui/dialog';
import { Button, Text, VStack, HStack } from '@chakra-ui/react';
import usePostData from "../hooks/usePostData";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import useItems from "../hooks/useItems";

const DialogComponents = ({ item }) => {
    const { postData, loading } = usePostData("/exchanges");
    const { user } = useAuth();
    const { refetch } = useItems();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        return date;
    });

    useEffect(() => {
        const maxEndDate = new Date(startDate);
        maxEndDate.setDate(startDate.getDate() + 7);

        if (endDate > maxEndDate || endDate < startDate) {
            setEndDate(maxEndDate);
        }
    }, [startDate]);

    const handleConfirm = async () => {
        if (!user) {
            toast.error("Vous devez être connecté pour emprunter un objet");
            return;
        }

        const exchangeData = {
            item_id: item.id,
            lender_user_id: item.user_id,
            borrow_user_id: user.id,
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString(),
            status: "Pending"
        };

        const response = await postData(
            exchangeData,
            "Demande d'emprunt envoyée avec succès !",
            "Erreur lors de l'envoi de la demande d'emprunt"
        );

        if (response) {
            toast.success("Emprunt confirmé !");
            await refetch(); // 👈 On recharge les items directement après la demande
        }
    };

    return (
        <DialogRoot>
            <DialogTrigger asChild>
                <Button variant="surface" colorPalette="blue">Emprunter</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Emprunter {item.name}</DialogTitle>
                </DialogHeader>

                <DialogBody>
                    <VStack spacing={4} align="start">
                        <Text>Sélectionnez les dates d'emprunt :</Text>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            minDate={new Date()}
                            dateFormat="dd/MM/yyyy"
                            inline
                        />
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            minDate={startDate}
                            maxDate={(() => {
                                const date = new Date(startDate);
                                date.setDate(date.getDate() + 7);
                                return date;
                            })()}
                            dateFormat="dd/MM/yyyy"
                            inline
                        />

                        <HStack justify="flex-end" w="full" pt={4}>
                            <DialogCloseTrigger asChild>
                                <Button variant="outline" colorPalette="gray">
                                    Annuler
                                </Button>
                            </DialogCloseTrigger>

                            <DialogActionTrigger asChild>
                                <Button
                                    colorPalette="blue"
                                    onClick={handleConfirm}
                                    isLoading={loading}
                                    loadingText="Envoi en cours..."
                                >
                                    Confirmer
                                </Button>
                            </DialogActionTrigger>
                        </HStack>
                    </VStack>
                </DialogBody>
            </DialogContent>
        </DialogRoot>
    );
};

export default DialogComponents;
