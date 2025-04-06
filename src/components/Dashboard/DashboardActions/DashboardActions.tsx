import React from "react";
import { Grid, Button } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export const DashboardActions = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={<MailOutlineIcon />}
                    onClick={() => window.open("https://dpoczta.pl", "_blank")}
                >
                    Otwórz e-mail
                </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={<StorefrontIcon />}
                    onClick={() => window.open("https://suoari.fashion", "_blank")}
                >
                    Odwiedź sklep
                </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={<LocalShippingIcon />}
                    onClick={() => alert("Token został odnowiony!")}
                >
                    Odnów token
                </Button>
            </Grid>
        </Grid>
    );
};