import React, {useState} from "react";
import {MainLayout} from "../../layouts/MainLayout";
import {Box, Grid, Paper} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {a11yProps, TabPanel} from "../../components/TabPanel";
import {CustomerList} from "../../components/User/CustomerList";

export const UsersPage = () => {

    const [value, setValue] = React.useState(0);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <MainLayout>
            <>
                <Grid item xs={12}>
                    <Paper sx={{p: {xs: 0, md: 3, lg: 3, xl: 3}, display: 'flex', flexDirection: 'column'}}>
                        <Box sx={{width: '100%'}}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label="Oczekujący" {...a11yProps(0)} />
                                    <Tab label="Zaakceptowani" {...a11yProps(1)} />
                                    <Tab label="Odrzuceni" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <CustomerList/>
                            </TabPanel>
                            <TabPanel value={value} index={1}>

                            </TabPanel>
                            <TabPanel value={value} index={2}>

                            </TabPanel>
                        </Box>
                    </Paper>
                </Grid>
            </>
        </MainLayout>
    )
}