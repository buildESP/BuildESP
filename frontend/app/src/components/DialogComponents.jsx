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
        }
    };

    return (
        <DialogRoot>
            <DialogTrigger asChild>
                <Button colorScheme="blue">Emprunter</Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Emprunter {item.name}</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <Text>Sélectionnez les dates d'emprunt :</Text>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={new Date()}
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
                    />
                </DialogBody>
                <DialogFooter>
                    <DialogCloseTrigger asChild>
                        <Button variant="outline">Annuler</Button>
                    </DialogCloseTrigger>
                    <DialogActionTrigger asChild>
                        <Button colorScheme="blue" onClick={handleConfirm} isLoading={loading} loadingText="Envoi en cours...">
                            Confirmer
                        </Button>
                    </DialogActionTrigger>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
};

export default DialogComponents;
