import React from "react";
import {MainCard} from "../MainCard";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import {Grid} from "@mui/material";

export const Stats = () => {
    return(
        <>
            <Grid item xs={12} sm={6} md={4} lg={4}>
                <MainCard title={'Użytkownicy'} count={2} description={'Wszystkich użytkowników'}
                          icon={<DirectionsCarIcon style={{color: 'black'}}/>}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
                <MainCard title={'Pojazdy'} count={2} description={'Wszystkie pojazdy w firmie.'}
                          icon={<DirectionsCarIcon style={{color: 'black'}}/>}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
                <MainCard title={'Pojazdy'} count={2} description={'Wszystkie pojazdy w firmie.'}
                          icon={<DirectionsCarIcon style={{color: 'black'}}/>}/>
            </Grid>
        </>
    )
}