import React from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Button, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Api from "../../../api/api";

const iconStyle = {
    fontSize: 60,
};

const cardsData = [
    {
        title: "E-mail",
        description: "Dostęp do skrzynki pocztowej z poziomu przeglądarki.",
        link: "https://dpoczta.pl",
        icon: <MailOutlineIcon style={iconStyle} />,
        button: 'Zaloguj się',
        onClick: null,
    },
    {
        title: "Sklep",
        description: "Odwiedź swój sklep internetowy.",
        link: "https://suoari.fashion",
        icon: <StorefrontIcon style={iconStyle} />,
        button: 'Odwiedź sklep',
        onClick: null,
    },
    {
        title: "Furgonetka",
        description: "Odnów token furgonetki",
        link: null,
        icon: <LocalShippingIcon style={iconStyle} />,
        button: 'Odnów token',
        onClick: async () => {
            try {
                const response = await Api.refreshFurgonetkaToken();
                alert(response.message);
            } catch (error) {
                console.error("Błąd odnawiania tokenu:", error);
                alert("Nie udało się odnowić tokenu.");
            }
        },
    },
    {
        title: "Statusy zamówień",
        description: "Odśwież statusy zamówień",
        link: null,
        icon: <LocalShippingIcon style={iconStyle} />,
        button: 'Odśwież statusy',
        onClick: async () => {
            try {
                const response = await Api.refreshOrderStatus();
                alert(
                    `Statusy zamówień zostały odświeżone.\n` +
                    `Wysłane: ${response.inTransit.length}\n` +
                    `Dostarczone: ${response.delivered.length}`
                );
            } catch (error) {
                console.error("Błąd odświeżania statusów zamówień:", error);
                alert("Nie udało się odświeżyć statusów zamówień.");
            }
        },
    },
];

export const DashboardCards = () => {
    return (
        <Grid
            container
            spacing={3}
            sx={{
                '@media (min-width: 1024px) and (max-width: 1366px) and (orientation: landscape)': {
                    justifyContent: 'center',
                },
                '@media (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait)': {
                    justifyContent: 'flex-start',
                },
            }}
        >
            {cardsData.map((card, index) => (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                    key={index}
                    sx={{
                        '@media (min-width: 1024px) and (max-width: 1366px)': {
                            maxWidth: '300px',
                        },
                    }}
                >
                    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6">{card.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {card.description}
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                            {card.icon}
                        </Box>
                        <Box sx={{ p: 2 }}>
                            {card.onClick ? (
                                <Button onClick={card.onClick} variant="contained" fullWidth>
                                    {card.button}
                                </Button>
                            ) : (
                                <Button
                                    component={Link}
                                    href={card.link}
                                    target="_blank"
                                    rel="noopener"
                                    variant="contained"
                                    fullWidth
                                >
                                    {card.button}
                                </Button>
                            )}
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};