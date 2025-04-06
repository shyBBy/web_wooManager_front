import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Paper } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

import { StoreReportsBasicData } from "./StoreReportsBasicData/StoreReportsBasicData";
import { CreateStorePage } from "../../pages/CreateStorePage";
import { DashboardCharts } from "./DashboardCharts/DashboardCharts";
import { DashboardActions } from "./DashboardActions/DashboardActions";

export const DashboardContent = () => {
    return (
        <Grid container spacing={{ xs: 1.5, sm: 3 }} sx={{ padding: { xs: 1, sm: 2 } }}>
            {/* Sekcja raportów */}
            <Grid item xs={12}>
                <Box sx={{ p: { xs: 1, sm: 2 } }}> {/* Zmieniono Paper na Box */}
                    <StoreReportsBasicData />
                </Box>
            </Grid>

            {/* Sekcja wykresów */}
            <Grid item xs={12}>
                <Paper sx={{ p: { xs: 1, sm: 2 } }}>
                    <Typography variant="h6" gutterBottom>
                        Statystyki sprzedaży
                    </Typography>
                    {/* <DashboardCharts /> */}
                </Paper>
            </Grid>

            {/* Sekcja akcji */}
            <Grid item xs={12}>
                <Paper sx={{ p: { xs: 1, sm: 2 } }}>
                    <Typography variant="h6" gutterBottom>
                        Zarządzanie
                    </Typography>
                    <DashboardActions />
                </Paper>
            </Grid>
        </Grid>
    );
};

export const Dashboard = () => {
    const { user } = useAuth();
    const [userStore, setUserStore] = useState(user?.store);

    useEffect(() => {
        setUserStore(user?.store);
    }, [user]);

    return userStore ? <DashboardContent /> : <CreateStorePage />;
};