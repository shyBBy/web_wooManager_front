import React from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PaymentIcon from '@mui/icons-material/Payment';
import StorageIcon from '@mui/icons-material/Storage';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Button, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Api from "../../../api/api"; // Import API

const iconStyle = {
    fontSize: 60, // Ustaw rozmiar ikony
};

const cardsData = [
    {
        title: "E-mail",
        description: "Dostęp do skrzynki pocztowej z poziomu przeglądarki.",
        link: "https://dpoczta.pl",
        icon: <MailOutlineIcon style={iconStyle} />,
        button: 'Zaloguj się',
        onClick: null, // Brak akcji
    },
    {
        title: "Sklep",
        description: "Odwiedź swój sklep internetowy.",
        link: "https://suoari.fashion",
        icon: <StorefrontIcon style={iconStyle} />,
        button: 'Odwiedź sklep',
        onClick: null, // Brak akcji
    },
    {
        title: "Furgonetka",
        description: "Odnów token furgonetki",
        link: null, // Brak linku, bo wykonujemy akcję
        icon: <LocalShippingIcon style={iconStyle} />,
        button: 'Odnów token',
        onClick: async () => {
            try {
                const response = await Api.refreshFurgonetkaToken();
                alert(response.message); // Wyświetlenie komunikatu z odpowiedzi
            } catch (error) {
                console.error("Błąd odnawiania tokenu:", error);
                alert("Nie udało się odnowić tokenu.");
            }
        },
    },
    {
        title: "Statusy zamówień",
        description: "Odśwież statusy zamówień",
        link: null, // Brak linku, bo wykonujemy akcję
        icon: <LocalShippingIcon style={iconStyle} />,
        button: 'Odśwież statusy',
        onClick: async () => {
            try {
                const response = await Api.refreshOrderStatus(); // Wywołanie nowego API
                alert(
                    `Statusy zamówień zostały odświeżone.\n` +
                    `Wysłane: ${response.inTransit.length}\n` +
                    `Dostarczone: ${response.delivered.length}`
                ); // Wyświetlenie szczegółów
            } catch (error) {
                console.error("Błąd odświeżania statusów zamówień:", error);
                alert("Nie udało się odświeżyć statusów zamówień.");
            }
        },
    },
    // Dodaj więcej elementów według potrzeb
];

export const DashboardCards = () => {
    return (
        <Grid container spacing={2}>
            {cardsData.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                    <Card sx={{ display: 'flex', justifyContent: "space-around", height: '160px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "space-around" }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    {card.title}
                                </Typography>
                                <Typography variant="subtitle2" color="secondary" component="div">
                                    {card.description}
                                </Typography>
                            </CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                {card.onClick ? (
                                    <Button
                                        onClick={card.onClick} // Obsługa kliknięcia
                                        variant="outlined"
                                        size="small"
                                        sx={{ mt: 3 }}
                                    >
                                        {card.button}
                                    </Button>
                                ) : (
                                    <Button
                                        component={Link}
                                        href={card.link}
                                        target="_blank"
                                        rel="noopener"
                                        variant="outlined"
                                        size="small"
                                        sx={{ mt: 3 }}
                                    >
                                        {card.button}
                                    </Button>
                                )}
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {card.icon}
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};