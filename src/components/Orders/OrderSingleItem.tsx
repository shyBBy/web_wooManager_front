import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Button, IconButton, Tooltip} from "@mui/material";
import {CustomerStatusConverter} from "../../helpers/customerStatusConverter";
import theme from "../../theme";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {Link} from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

export const OrderSingleItem = (props: any) => {
    const {order} = props


    return(
        <>
            <TableRow>
                <TableCell>
                    ORDER 1
                </TableCell>
                <TableCell>ORDER 2</TableCell>
                <TableCell>ORDER 3</TableCell>
                <TableCell>ORDER 4</TableCell>
                <TableCell>ORDER 5</TableCell>
                <TableCell align="right">
                    <Tooltip title="Akceptuj">
                        <IconButton
                            sx={{ color: theme.palette.text.primary }}

                        >
                            <CheckIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Odrzuc">
                        <IconButton
                            sx={{ color: theme.palette.text.primary }}

                        >
                            <CloseIcon />
                        </IconButton>
                    </Tooltip>
                    <Link to={`https://wyszukiwarkaregon.stat.gov.pl/appBIR/index.aspx`}>
                        <Tooltip title="Sprawdź NIP">
                            <IconButton sx={{color: theme.palette.text.primary}}>
                                <SearchIcon/>
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <Tooltip title="Usuń">
                        <IconButton sx={{color: theme.palette.text.primary}}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </TableCell>
            </TableRow>
        </>
    )
}