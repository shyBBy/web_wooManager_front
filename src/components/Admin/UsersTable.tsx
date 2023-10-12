import React, {SyntheticEvent, useContext, useEffect, useState} from "react";
import {Box, IconButton, TableContainer, TextField, Toolbar, Tooltip} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useNavigate} from "react-router-dom";
import {config} from "../../config/config";

import {GetListOfUsersResponse} from 'types'
import {UserSingleItem} from "./UserSingleItem";
import {RemoveUserContext} from "../../context/RemoveUserContext";

export const UsersTable = () => {

    const [usersList, setUsersList] = useState<GetListOfUsersResponse>([])
    //@TODO: Do utworzenia typ dla order
    const [order, setOrder] = useState<any>('asc');
    const [sort, setSort] = useState('')
    const [sortValue, setSortValue] = useState('')
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [maxPage, setMaxPage] = useState(0)
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState('')
    const [inputVal, setInputVal] = useState(search);
    const {isDeleting} = useContext(RemoveUserContext)

    const navigate = useNavigate()

    const setSearchFromLocalState = (e: SyntheticEvent) => {
        e.preventDefault();
        setSearch(inputVal);
    };

    //@TODO: Zrobić reagowanie na kazda zmiane stanu w 'search'
    useEffect(() => {
        (async () => {

            const res = await fetch(`${config.API_URL}/user/list?page=${page}&count=${rowsPerPage}&order=${order}&search=${search}`, {
                credentials: 'include',
            })
            const data = await res.json()
            setMaxPage(data.pagesCount)
            setUsersList(data.users)
            setCount(data.resultsCount)

        })();
    }, [rowsPerPage, page, search, isDeleting]);

    const handleChange = (e: any, p: any) => {
        setPage(p)
    }


    if (usersList === null) {
        return <p>Wczytywanie...</p>
    }

    return (
        <>
            <>
                <Toolbar
                    sx={{
                        pl: {sm: 2},
                        pr: {xs: 1, sm: 1}
                    }}
                >
                    <Box>
                        <form className="search" onSubmit={e => e.preventDefault()}>
                            <TextField id="outlined-search" label={<SearchIcon/>} type="search" size="small"
                                       value={search}
                                       onChange={(e) => {
                                           setSearch(e.target.value)
                                       }}/>
                        </form>
                    </Box>
                    <Box>

                    </Box>
                    <Box>
                        <Tooltip title="Filtry">
                            <IconButton>
                                <FilterListIcon/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Zdjecie</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell>Konto aktywne</TableCell>
                                <TableCell>Grupa</TableCell>
                                <TableCell align="right">Opcje</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                usersList.map(user => (
                                    <UserSingleItem user={user} key={user.id}/>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        </>
    )
}