import React, { useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import { Grid, Paper, Box, Tabs, Tab } from "@mui/material";
import { OrderList } from "../components/Orders/OrderList";
import { OrdersSidebar } from "../components/Orders/OrdersSidebar";
import { a11yProps, TabPanel } from "../components/TabPanel";

export const OrdersPage = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <MainLayout>
            <Grid container spacing={2} sx={{ padding: 2 }}>
                {/* Boczny panel */}
                <Grid item xs={12} md={3} order={{ xs: 1, md: 2 }}>
                    <OrdersSidebar />
                </Grid>

                {/* Tabela zamówień */}
                <Grid item xs={12} md={9} order={{ xs: 2, md: 1 }}>
                    <Paper sx={{ p: 2 }}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Zamówienia" {...a11yProps(0)} />
                                <Tab label="Przesyłki" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <OrderList />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            DODAWANIE
                        </TabPanel>
                    </Paper>
                </Grid>
            </Grid>
        </MainLayout>
    );
};