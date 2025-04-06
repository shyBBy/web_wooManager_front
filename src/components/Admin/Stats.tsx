import React from "react";
import { MainCard } from "../MainCard";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Grid } from "@mui/material";

export const Stats = () => {
    return (
        <Grid container spacing={3}> {/* Dodano kontener Grid */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
                <MainCard
                    title="Użytkownicy"
                    count={2} // Typ string | number
                    description="Wszystkich użytkowników"
                    icon={<DirectionsCarIcon style={{ color: "black" }} />}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
                <MainCard
                    title="Pojazdy"
                    count={2} // Typ string | number
                    description="Wszystkie pojazdy w firmie."
                    icon={<DirectionsCarIcon style={{ color: "black" }} />}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
                <MainCard
                    title="Zamówienia"
                    count={5} // Typ string | number
                    description="Wszystkie zamówienia w systemie."
                    icon={<DirectionsCarIcon style={{ color: "black" }} />}
                />
            </Grid>
        </Grid>
    );
};