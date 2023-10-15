import React, {SyntheticEvent, useContext, useEffect, useState} from "react";
import {RemoveUserContext} from "../../context/RemoveUserContext";
import {useNavigate} from "react-router-dom";
import {
    Box,
    CircularProgress,
    IconButton,
    TableContainer,
    TextField,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import FilterListIcon from "@mui/icons-material/FilterList";
import {CustomerSingleItem} from "./CustomerSingleItem";
import {config} from "../../config/config";
import {toast} from "react-toastify";
import {GetListOfCustomersResponse} from 'types'
import {useAuth} from "../../hooks/useAuth";
import {CustomerTableOptions} from "./CustomerTableOptions";


export const CustomerTable = () => {
    const [customerList, setCustomerList] = useState<GetListOfCustomersResponse>([])
    const [search, setSearch] = useState('')
    const [inputVal, setInputVal] = useState(search);
    const {isDeleting} = useContext(RemoveUserContext)
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(true); // Dodane pole loading

    const {checkWpToken, wpToken} = useAuth()

    const navigate = useNavigate()


    const setSearchFromLocalState = (e: SyntheticEvent) => {
        e.preventDefault();
        setSearch(inputVal);
    };


    useEffect(() => {
        (async () => {
            try {
                checkWpToken();
                setLoading(true); // Ustawienie loading na true przed pobraniem danych

                const res = await fetch(`${config.API_URL}/customer/list?page=${page}&perPage=${rowsPerPage}`, {
                    credentials: 'include',
                });
                const data = await res.json();
                setCustomerList(data.customers);
                setMaxPage(data.pagesCount)
            } catch (e) {
                toast.error(`Coś poszło nie tak, spróbuj raz jeszcze.`, {
                    position: "bottom-right",
                    theme: "dark",
                    autoClose: 2000,
                });
                setCustomerList([]);
            } finally {
                setLoading(false); // Ustawienie loading na false po pobraniu danych (niezależnie od sukcesu lub błędu)
            }
        })();
    }, [rowsPerPage, page, isDeleting]);

    const handleChange = (e: any, p: any) => {
        setPage(p)
    }

    return (
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
                        {/*<Box>*/}
                        {/*    <Tooltip title="Filtry">*/}
                        {/*        <IconButton>*/}
                        {/*            <FilterListIcon/>*/}
                        {/*        </IconButton>*/}
                        {/*    </Tooltip>*/}
                        {/*</Box>*/}
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
                                    customerList.map(customer => (
                                        <CustomerSingleItem customer={customer} key={customer.id}/>
                                    ))
                                }
                            </TableBody>
                        </Table>
                        <Box sx={{p: 2}}>
                            <CustomerTableOptions maxPage={maxPage} handleChangePage={handleChange}/>
                        </Box>
                    </TableContainer>
                </>
            )}
        </>
    )
}