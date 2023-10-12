import React from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Avatar, TableContainer} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {data} from "../../../assets/data/changelog_data";



function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

export const Changelog = () => {


    return (
        <>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tytuł</TableCell>
                            <TableCell>Powód</TableCell>
                            <TableCell>Użytkownik</TableCell>
                            <TableCell align="right">Data</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell><Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                                    <LocalShippingIcon/>
                                </Avatar></TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.reason}</TableCell>
                                <TableCell>{row.editedByUser}</TableCell>
                                <TableCell align="right">{`${row.editedDate}`}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}