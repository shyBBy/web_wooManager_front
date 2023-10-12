import React, {useEffect, useState} from "react";
import {Grid, Paper, Typography} from "@mui/material";
import {MainCard} from "../MainCard";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupIcon from '@mui/icons-material/Group';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import theme from "../../theme";
import {useAuth} from "../../hooks/useAuth";
import {WpLoginPage} from "../../pages/WpLoginPage";
import {DashboardLastChanges} from "./DashboardLastChanges/DashboardLastChanges";
import {StoreReportsBasicData} from "./StoreReportsBasicData/StoreReportsBasicData";
import {DashboardCards} from "./DashboardCards/DashboardCards";


// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};


export const Dashboard = () => {
    const { user} = useAuth();
    const wpToken = localStorage.getItem('wpToken');


    const [vehiclesWithoutInspection, setVehicleWithoutInspection] = useState(0)
    const [vehiclesDueForInspection, setVehiclesDueForInspection] = useState(0)

    //
    // useEffect(() => {
    //     (async () => {
    //         const res = await fetch(`${config.API_URL}/vehicle/list?page=1`, {
    //             credentials: 'include',
    //         })
    //         const data = await res.json()
    //         setVehiclesList(data.vehicles)
    //     })();
    // }, []);
    //
    // useEffect(() => {
    //     (() => {
    //         const countVehicleWithoutInspection = VehicleInspection.checkAllCars(vehiclesList)
    //         setVehicleWithoutInspection(countVehicleWithoutInspection)
    //
    //         const countVehiclesDueForInspection = VehicleInspection.countVehiclesDueForInspection(vehiclesList)
    //         setVehicleWithoutInspection(countVehiclesDueForInspection)
    //
    //
    //     })();
    // }, [vehiclesList]);


    return (
        <>
            <StoreReportsBasicData/>

            <Grid item md={8} sx={{display: {sm: 'none', md: 'block', lg: 'none'}}}/>

            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="overline" color="primary">DASHBOARD</Typography>
                    </Grid>
                </Grid>
                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                    <DashboardCards/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                {wpToken && (
                    <>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="overline" color="primary">Ostatnie zmiany w aplikacji</Typography>
                            </Grid>
                        </Grid>
                        <Paper>
                            <DashboardLastChanges/>
                        </Paper>
                    </>
                )}
                {!wpToken && (
                    <>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="overline" color="primary">Autoryzacja</Typography>
                            </Grid>
                        </Grid>
                        <Paper>
                            <WpLoginPage/>
                        </Paper>
                    </>
                )}

            </Grid>


        </>
    )
}