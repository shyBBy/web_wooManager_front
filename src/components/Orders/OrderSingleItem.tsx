import React, {useEffect, useState} from "react";
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
import { GetOneOrderResponse, OrderProfileInterface } from "../../interfaces/order.interfaces";
import { formatDateToPolish } from "../../utils/time.utils";

// Typowanie propsów komponentu
interface OrderSingleItemProps {
    order: OrderProfileInterface;
}


export const OrderSingleItem: React.FC<OrderSingleItemProps> = ({ order }) => {
   
    
    return(
        <>
            <TableRow>
                <TableCell>
                    #{order.id} {order.billing.first_name} {order.billing.last_name}
                </TableCell>
                <TableCell>{formatDateToPolish(order.date_created)}</TableCell>
                <TableCell>{order.status}</TableCell>
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
            
                    <Link to={`/order/${order.id}`}>
                        <Tooltip title="Szczegóły">
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