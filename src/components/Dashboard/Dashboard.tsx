import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

import { StoreReportsBasicData } from "./StoreReportsBasicData/StoreReportsBasicData";
import { DashboardCards } from "./DashboardCards/DashboardCards";
import { CreateStorePage } from "../../pages/CreateStorePage";

export const DashboardContent = () => {
    return (
        <Grid container spacing={3} sx={{ padding: 2 }}>
            {/* Sekcja raportów */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                    <StoreReportsBasicData />
                </Paper>
            </Grid>

            {/* Karty dashboardu */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" gutterBottom>
                        Dashboard
                    </Typography>
                    <DashboardCards />
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