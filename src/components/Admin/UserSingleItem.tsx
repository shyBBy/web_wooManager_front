import React, {useContext} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Avatar, IconButton, Tooltip} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import {RemoveUserContext} from "../../context/RemoveUserContext";
import {config} from "../../config/config";
import {toast} from "react-toastify";

export const UserSingleItem = (props: any) => {
    const {user} = props

    const {setIsDeleting} = useContext(RemoveUserContext)

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            // setIsUpdated((prevState) => !prevState);
            const response = await fetch(`${config.API_URL}/user/${user.id}`, {
                method: "DELETE",
                credentials: 'include'
            });
            if (response.ok) {
                toast.success(`Pomyślnie usunięto użytkownika: ${user.email}`, {
                    position: "bottom-right",
                    theme: "light",
                    autoClose: 1500,
                });
            } else {
                throw new Error("Wystąpił błąd podczas usuwania użytkownika");
            }
        } catch (err) {
            console.error(err);
            toast.error("Wystąpił błąd podczas usuwania użytkownika", {
                position: "bottom-right",
                theme: "light",
                autoClose: 1500,
            });
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <TableRow>
                <TableCell>
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}} src={user.avatar}/>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isActive ? 'Aktywne' : 'Niekatywne'}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="right">
                    <Tooltip title="Usuń użytkownika">
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                    <Link to={`/user/${user.id}`}>
                        <Tooltip title="Profil użytkownika">
                            <IconButton>
                                <PersonIcon/>
                            </IconButton>
                        </Tooltip>
                    </Link>
                </TableCell>
            </TableRow>
        </>
    )
}