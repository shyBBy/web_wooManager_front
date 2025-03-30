import React, {useState} from "react";
import {Button, Grid, Modal, Paper, Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {Box} from "@mui/system";
import {grey} from "@mui/material/colors";
import {Changelog} from "../../../Dashboard/Changelog/Changelog";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {a11yProps, TabPanel} from "../../../TabPanel";
import {config} from "../../../../config/config";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

export const MainContent = (props: any) => {
    const { order } = props;
    const orderData = order.order; // Przypisanie order.order do zmiennej lokalnej

    const [value, setValue] = React.useState(0);

    console.log(order);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Grid item xs={12} md={7} lg={2.5}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="overline">Zdjęcie</Typography>
                    </Grid>
                </Grid>
                <Paper sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '10%'
                }}>
                    <Box p={1}>
                        <Stack direction={'row'}>
                            <Typography variant="body2" color="textSecondary" mr={1}>Oddział: </Typography>
                            <Typography variant="body2">{orderData.id}</Typography> {/* Użycie orderData.id */}
                        </Stack>
                        <a href={'https://historiapojazdu.gov.pl'}>
                            <Typography variant="body2" color="textSecondary" mr={1}>
                                Sprawdź pojazd w CEPIKU
                            </Typography>
                        </a>
                        PRZYCISK
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12} md={7} lg={9} mt={5}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="overline">
                            Podstawowe infmormacje o zamówieniu nr: {orderData.id} {/* Użycie orderData.id */}
                        </Typography>
                    </Grid>
                </Grid>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    JAKIES INFO
                </Paper>
            </Grid>
            <Grid item xs={12} md={7} lg={7}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Box sx={{width: '100%'}}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label={<Typography variant="overline" noWrap>
                                        Dane techniczne
                                    </Typography>}  {...a11yProps(0)} />
                                    <Tab label={<Typography variant="overline" noWrap>
                                        Edytuj dane techniczne
                                    </Typography>} {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                                    dsadsa
                                </Paper>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                                    fdsfds
                                </Paper>
                            </TabPanel>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={5} lg={5} mt={8}>
                <Grid item xs={12} md={5} lg={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="overline">Informacje dotyczące przeglądu pojazdu</Typography>
                        </Grid>
                    </Grid>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        312312312
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5} lg={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="overline">Wymiary pojazdu</Typography>
                        </Grid>
                    </Grid>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        dsfdsfds
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5} lg={12}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="overline">Wymiary kipy ładunkowej</Typography>
                        </Grid>
                    </Grid>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        fdsfdsfd
                    </Paper>
                </Grid>

            </Grid>
            <Grid item xs={12} md={5} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="overline">Historia serwisowa</Typography>
                    </Grid>
                </Grid>
                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <Typography variant="overline">Usługa jeszcze niedostępna.</Typography>
                </Paper>
            </Grid>
        </>
    );
};