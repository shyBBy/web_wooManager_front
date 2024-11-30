import React, {SyntheticEvent, useEffect, useState} from "react";
import {GetListOfAllOrdersResponse} from 'types'
import Api from "../../api/api";
import {useNavigate} from "react-router-dom";
import {Box, CircularProgress, TableContainer, TextField, Toolbar} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {CustomerSingleItem} from "../User/CustomerSingleItem";
import {CustomerTableOptions} from "../User/CustomerTableOptions";
import {OrderSingleItem} from "./OrderSingleItem";


export const OrderList = () => {
    const [ordersList, setOrdersList] = useState<GetListOfAllOrdersResponse>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('')
    const [inputVal, setInputVal] = useState(search);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const navigate = useNavigate()

    const setSearchFromLocalState = (e: SyntheticEvent) => {
        e.preventDefault();
        setSearch(inputVal);
    };

    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, []);


    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await Api.getAllOrders();
            setOrdersList(data.orders);
        } catch (error) {
            console.error("Błąd pobierania zamówień", error);
        } finally {
            setLoading(false);
        }
    };

    return(
        <>
            {loading ? ( // Wyświetlanie CircularProgress podczas ładowania danych
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Toolbar
                        sx={{
                            pl: {sm: 2},
                            pr: {xs: 1, sm: 1}
                        }}
                    >
                        <Box>
                            <form className="search" onSubmit={e => e.preventDefault()}>
                                <TextField id="outlined-search" label={<SearchIcon/>} type="search" size="small" value={search}
                                           onChange={(e) => {
                                               setSearch(e.target.value)
                                           }}/>
                            </form>
                        </Box>
                    </Toolbar>
                    <TableContainer>
                        <Table size="medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nazwa firmy</TableCell>
                                    <TableCell>NIP</TableCell>
                                    <TableCell>Adres</TableCell>
                                    <TableCell>E-mail</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    ordersList.map(order => (
                                        <OrderSingleItem order={order.order} key={order.order.id}/>
                                    ))
                                }
                            </TableBody>
                        </Table>
                        {/*<Box sx={{p: 2}}>*/}
                        {/*    <CustomerTableOptions maxPage={maxPage} handleChangePage={handleChange}/>*/}
                        {/*</Box>*/}
                    </TableContainer>
                </>
            )}
        </>
    )
}