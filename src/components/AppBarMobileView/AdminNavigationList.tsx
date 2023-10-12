import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const AdminNavigationList = () => {

    const location = useLocation()
    const navigation = useNavigate()
    return(
        <>
            <ListItemButton>
                <Link key='AdminPanel'
                      to='/admin'
                >
                    <ListItemIcon>
                        <AdminPanelSettingsIcon className={
                            location.pathname.includes('/admin') ? "active" : "inactive"
                        } />
                    </ListItemIcon>
                </Link>
                <Link key='AdminPanel'
                      to='/admin'
                      style={{textDecoration: 'none'}}
                      className={
                          location.pathname.includes('/admin') ? "active" : "inactive"
                      }>
                    <ListItemText primary="Panel Admina" />
                </Link>
            </ListItemButton>
        </>
    )
}