import React, { useEffect, useState, useCallback } from "react";
import Api from "../../api/api";
import { Box, CircularProgress, TableContainer, TextField, Toolbar } from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { WooCommerceOrdersResponse } from "../../types/order/WooCommerceOrder";
import { OrderSingleItem } from "./OrderSingleItem";

export const OrderList = () => {
    const [ordersList, setOrdersList] = useState<WooCommerceOrdersResponse>([]); // Lista zamówień
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(""); // Wartość zatwierdzona do wyszukiwania
    const [searchInput, setSearchInput] = useState(""); // Wartość wpisywana przez użytkownika

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const data: WooCommerceOrdersResponse = await Api.getAllOrders(search);
            setOrdersList(data); 
        } catch (error) {
            console.error("Błąd pobierania zamówień", error);
        } finally {
            setLoading(false);
        }
    }, [search]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer>
                    <Table size="medium">
                        <TableHead>
                            <TableRow>
                                <TableCell>Zamówienie</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Kwota</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ordersList.map((order) => (
                                <OrderSingleItem order={order} key={order.id} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};