import React from "react";
import {MainLayout} from "../layouts/MainLayout";
import {UsersTable} from "../components/Admin/UsersTable";
import {Stats} from "../components/Admin/Stats";
import {Grid, Paper, Typography} from "@mui/material";
import {AdminAddLastChange} from "../components/Admin/AdminAddLastChange";
import {AdminBasicSettings} from "../components/Admin/AdminBasicSettings";
import {RemoveUserProvider} from "../context/RemoveUserContext";

export const AdminPage = () => {
    return (
        <MainLayout>
            <RemoveUserProvider>
                <>
                    {/*<Stats/>*/}
                    <Grid item md={8} sx={{display: {sm: 'none', md: 'block', lg: 'none'}}}/>
                    <Grid item xs={12} md={7} lg={6}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="overline">Lista użytkowników</Typography>
                            </Grid>
                        </Grid>
                        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                            <UsersTable/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={7} lg={3}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="overline">Dodaj ostatnią zmianę</Typography>
                            </Grid>
                        </Grid>
                        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                            <AdminAddLastChange/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={7} lg={3}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="overline">Podstawowe ustawienia</Typography>
                            </Grid>
                        </Grid>
                        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                            <AdminBasicSettings/>
                        </Paper>
                    </Grid>
                </>
            </RemoveUserProvider>
        </MainLayout>
    )
}