import React, { useEffect, useState, useCallback } from "react";
import Api from "../../api/api";
import { Box, CircularProgress, TableContainer, TextField, Toolbar } from "@mui/material";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { OrderSingleItem } from "./OrderSingleItem";
import { GetListOfOrdersResponse } from "../../interfaces/order.interfaces";

export const OrderList = () => {
    const [ordersList, setOrdersList] = useState<GetListOfOrdersResponse>([]); // Lista zamówień
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState(""); // Wartość zatwierdzona do wyszukiwania
    const [searchInput, setSearchInput] = useState(""); // Wartość wpisywana przez użytkownika

    // Funkcja pobierająca dane z API
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await Api.getAllOrders(search); // Pobranie danych z API z filtrem
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

    // Funkcja obsługująca wyszukiwanie
    const handleSearch = () => {
        setSearch(searchInput); // Zatwierdzenie wyszukiwania
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch(); // Wywołanie wyszukiwania po naciśnięciu Enter
        }
    };

    const handleBlur = () => {
        handleSearch(); // Wywołanie wyszukiwania po opuszczeniu pola
    };

    return (
        <>
            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Toolbar
                        sx={{
                            pl: { sm: 2 },
                            pr: { xs: 1, sm: 1 },
                        }}
                    >
                        <Box>
                            <TextField
                                id="outlined-search"
                                label="Wyszukaj zamówienie"
                                placeholder="Podaj nr zamówienia, aby wyszukać"
                                type="search"
                                size="small"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)} // Aktualizacja searchInput
                                onKeyDown={handleKeyDown} // Obsługa Enter
                                onBlur={handleBlur} // Obsługa opuszczenia pola
                            />
                        </Box>
                    </Toolbar>
                    <TableContainer>
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Zamówienie</TableCell>
                                    <TableCell>Data</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Faktura VAT?</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ordersList.map((order) => (
                                    <OrderSingleItem order={order} key={order.id} />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </>
    );
};