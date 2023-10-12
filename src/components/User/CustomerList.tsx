import React from "react";
import {Grid} from "@mui/material";
import {RemoveUserProvider} from "../../context/RemoveUserContext";
import {CustomerTable} from "./CustomerTable";


export const CustomerList = () => {
    return (
        <>
            <Grid item xs={12}>
                <RemoveUserProvider>
                    <CustomerTable/>
                </RemoveUserProvider>
            </Grid>
        </>
    )
}