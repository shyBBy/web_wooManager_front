import React from "react";
import {useAuth} from "../hooks/useAuth";
import {Outlet} from "@mui/icons-material";
import {Navigate} from "react-router-dom";

export const PrivateRoutes = () => {

    const {user} = useAuth()

    return(
       user ? <Outlet/> : <Navigate to='/login'/>
    )
}