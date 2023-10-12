import React from 'react'
import {Divider, ListItemButton, ListItemIcon, ListItemText, Tooltip} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {useAuth} from "../../hooks/useAuth";
import {isAdmin} from "../../helpers/isAdmin.helper";
import {AdminNavigationList} from "./AdminNavigationList";


export const AppBarMobileViewNavigationList = () => {

    const {user} = useAuth()


    const location = useLocation()
    const navigation = useNavigate()
    return (
        <React.Fragment>
            <ListItemButton>
                <Link key='Dashboard'
                      to='/dashboard'
                >
                    <Tooltip title="Dashboard">
                        <ListItemIcon>
                            <DashboardIcon className={
                                location.pathname.includes('/dashboard') ? "active" : "inactive"
                            }/>
                        </ListItemIcon>
                    </Tooltip>
                </Link>
                <Link key='dashboard'
                      to='/dashboard'
                      className={
                          location.pathname.includes('/dashboard') ? "active" : "inactive"
                      }
                >
                    <ListItemText primary="Dashboard"/>
                </Link>
            </ListItemButton>

            <ListItemButton>
                <Link key='Users'
                      to='/users'
                >
                    <Tooltip title="Klienci">
                        <ListItemIcon>
                            <PeopleIcon className={
                                location.pathname.includes('/users') ? "active" : "inactive"
                            } />
                        </ListItemIcon>
                    </Tooltip>
                </Link>
                <Link key='users'
                      to='/users'
                      style={{textDecoration: 'none'}}
                      className={
                          location.pathname.includes('/users') ? "active" : "inactive"
                      }>
                    <ListItemText primary="Klienci" />
                </Link>
            </ListItemButton>

            <ListItemButton>
                <Link key='Orders'
                      to='/orders'
                >
                    <Tooltip title="Zamówienia">
                        <ListItemIcon>
                            <ShoppingCartIcon className={
                                location.pathname.includes('/orders') ? "active" : "inactive"
                            } />
                        </ListItemIcon>
                    </Tooltip>
                </Link>
                <Link key='orders'
                      to='/orders'
                      style={{textDecoration: 'none'}}
                      className={
                          location.pathname.includes('/orders') ? "active" : "inactive"
                      }>
                    <ListItemText primary="Zamówienia" />
                </Link>
            </ListItemButton>



            <ListItemButton>
                <Link key='Tutorials'
                      to='/tutorials'
                >
                    <Tooltip title="Poradniki">
                        <ListItemIcon>
                            <HelpOutlineIcon className={
                                location.pathname.includes('/tutorials') ? "active" : "inactive"
                            }/>
                        </ListItemIcon>
                    </Tooltip>
                </Link>
                <Link key='tutorials'
                      to='/tutorials'
                      style={{textDecoration: 'none'}}
                      className={
                          location.pathname.includes('/tutorials') ? "active" : "inactive"
                      }>
                    <ListItemText primary="Poradniki"/>
                </Link>
            </ListItemButton>

            {/*<ListItemButton>*/}
            {/*    <Link key='Places'*/}
            {/*          to='/places'*/}
            {/*    >*/}
            {/*        <ListItemIcon>*/}
            {/*            <BusinessIcon className={*/}
            {/*                location.pathname.includes('/places') ? "active" : "inactive"*/}
            {/*            } />*/}
            {/*        </ListItemIcon>*/}
            {/*    </Link>*/}
            {/*    <Link key='places'*/}
            {/*          to='/places'*/}
            {/*          style={{textDecoration: 'none'}}*/}
            {/*          className={*/}
            {/*              location.pathname.includes('/places') ? "active" : "inactive"*/}
            {/*          }>*/}
            {/*        <ListItemText primary="Oddziały" />*/}
            {/*    </Link>*/}
            {/*</ListItemButton>*/}

            {/*<ListItemButton>*/}
            {/*    <Link key='Settings'*/}
            {/*          to='/settings'*/}
            {/*    >*/}
            {/*        <ListItemIcon>*/}
            {/*            <SettingsIcon className={*/}
            {/*                location.pathname.includes('/settings') ? "active" : "inactive"*/}
            {/*            } />*/}
            {/*        </ListItemIcon>*/}
            {/*    </Link>*/}
            {/*    <Link key='settings'*/}
            {/*          to='/settings'*/}
            {/*          style={{textDecoration: 'none'}}*/}
            {/*          className={*/}
            {/*              location.pathname.includes('/settings') ? "active" : "inactive"*/}
            {/*          }>*/}
            {/*        <ListItemText primary="Ustawienia" />*/}
            {/*    </Link>*/}
            {/*</ListItemButton>*/}
            <Divider sx={{my: 1}}/>
            {isAdmin(user?.role) ? <AdminNavigationList/> : null}
        </React.Fragment>
    )
}