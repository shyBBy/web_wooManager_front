import React, { useState } from "react";
import { Grid, Button, CircularProgress } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import StorefrontIcon from "@mui/icons-material/Storefront";
import RefreshIcon from "@mui/icons-material/Refresh";
import TokenIcon from "@mui/icons-material/VpnKey";
import API from "../../../api/api"; // Import API

export const DashboardActions = () => {
    const [isLoadingStatuses, setIsLoadingStatuses] = useState(false);
    const [isLoadingToken, setIsLoadingToken] = useState(false);

    const refreshStatuses = async () => {
        setIsLoadingStatuses(true);
        try {
            const data = await API.refreshOrderStatus();
            alert(`Statusy zostały odświeżone! W tranzycie: ${data.inTransit.length}, Dostarczone: ${data.delivered.length}`);
        } catch (error) {
            alert("Błąd podczas odświeżania statusów zamówień.");
            console.error(error);
        } finally {
            setIsLoadingStatuses(false);
        }
    };

    const renewFurgonetkaToken = async () => {
        setIsLoadingToken(true);
        try {
            const response = await API.refreshFurgonetkaToken();
            if (response.isSuccess) {
                alert(`Token Furgonetki został odnowiony! Wiadomość: ${response.message}`);
            } else {
                alert(`Nie udało się odnowić tokenu. Kod statusu: ${response.statusCode}`);
            }
        } catch (error) {
            alert("Błąd podczas odnawiania tokenu Furgonetki.");
            console.error(error);
        } finally {
            setIsLoadingToken(false);
        }
    };

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
                    startIcon={isLoadingStatuses ? <CircularProgress size={20} /> : <RefreshIcon />}
                    onClick={refreshStatuses}
                    disabled={isLoadingStatuses}
                >
                    {isLoadingStatuses ? "Odświeżanie..." : "Odśwież statusy"}
                </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Button
                    variant="contained"
                    fullWidth
                    startIcon={isLoadingToken ? <CircularProgress size={20} /> : <TokenIcon />}
                    onClick={renewFurgonetkaToken}
                    disabled={isLoadingToken}
                >
                    {isLoadingToken ? "Odnawianie..." : "Odnów token Furgonetki"}
                </Button>
            </Grid>
        </Grid>
    );
};