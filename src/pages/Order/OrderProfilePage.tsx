import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {MainLayout} from "../../layouts/MainLayout";
import {config} from "../../config/config";
import { GetOneOrderResponse } from "../../interfaces/order.interfaces";
import { MainContent } from "../../components/Orders/OrderProfilePage/MainContent/MainContent";
import Api from "../../api/api";



export const OrderProfilePage = () => {
    const [order, setOrder] = useState<GetOneOrderResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams<{ id?: string }>();

    useEffect(() => {
        if (id) {
            fetch(`${config.API_URL}/order/${id}`, {
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    setOrder(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Błąd ładowania zamówienia:", error);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <div>Ładowanie...</div>;
    }

    if (!order) {
        return <div>Nie znaleziono zamówienia</div>;
    }

    return (
        <MainLayout>
            <MainContent data={order} />
        </MainLayout>
    );
};