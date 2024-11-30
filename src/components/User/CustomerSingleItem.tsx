import React, {useContext, useState} from "react";
import {config} from "../../config/config";
import {toast} from "react-toastify";
import TableCell from "@mui/material/TableCell";
import {Avatar, Button, IconButton, Tooltip, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import TableRow from "@mui/material/TableRow";
import theme from "../../theme";
import {CustomerProfileInterface} from 'types'
import {CustomerStatusConverter} from "../../helpers/customerStatusConverter";
import {Box} from "@mui/system";

export const CustomerSingleItem = (props: { customer: CustomerProfileInterface }) => {
    const {customer} = props
    const [isUpdating, setIsUpdating] = useState(false);


    // const handleDelete = async () => {
    //     try {
    //         setIsDeleting(true);
    //         // setIsUpdated((prevState) => !prevState);
    //         const response = await fetch(`${config.API_URL}/vehicle/${vehicle.id}`, {
    //             method: "DELETE",
    //             credentials: 'include'
    //         });
    //         if (response.ok) {
    //             toast.success(`Pomyślnie usunięto pojazd: ${vehicle.registerNumber}`, {
    //                 position: "bottom-right",
    //                 theme: "light",
    //                 autoClose: 1500,
    //             });
    //         } else {
    //             throw new Error("Wystąpił błąd podczas usuwania pojazdu");
    //         }
    //     } catch (err) {
    //         console.error(err);
    //         toast.error("Wystąpił błąd podczas usuwania pojazdu", {
    //             position: "bottom-right",
    //             theme: "light",
    //             autoClose: 1500,
    //         });
    //     } finally {
    //         setIsDeleting(false);
    //     }
    // };

    const handleUpdateStatus = async (status: string) => {
        try {
            setIsUpdating(true);

            const response = await fetch(`${config.API_URL}/customer/update/${customer.id}/${status}`, {
                method: "GET",
                credentials: 'include'
            });

            if (response.ok) {
                toast.success(`Pomyślnie zaktualizowano status`, {
                    position: "bottom-right",
                    theme: "light",
                    autoClose: 1500,
                });
                // Trigger a re-render or any other logic to update the component
            } else {
                const data = await response.json();
                throw new Error(data.message || "Wystąpił błąd podczas aktualizacji statusu");
            }
        } catch (err: any) {
            console.error(err);
            toast.error((err && err.message) || "Wystąpił błąd podczas aktualizacji statusu", {
                position: "bottom-right",
                theme: "light",
                autoClose: 1500,
            });
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <>
            <TableRow>
                <TableCell>
                    {customer.meta.billing_company}
                </TableCell>
                <TableCell>{customer.meta.billing_wooccm11}</TableCell>
                <TableCell>{customer.meta.billing_address_1}</TableCell>
                <TableCell>{customer.meta.billing_email}</TableCell>
                <TableCell><Button variant='outlined' color='success' sx={{pointerEvents: 'none', cursor: 'not-allowed'}}>{CustomerStatusConverter(customer.meta.pw_user_status)}</Button></TableCell>
                <TableCell align="right">
                    <Tooltip title="Akceptuj">
                        <IconButton
                            sx={{ color: theme.palette.text.primary }}
                            onClick={() => handleUpdateStatus('pending')}
                            disabled={isUpdating}
                        >
                            <CheckIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Odrzuc">
                        <IconButton
                            sx={{ color: theme.palette.text.primary }}
                            onClick={() => handleUpdateStatus('denied')}
                            disabled={isUpdating}
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