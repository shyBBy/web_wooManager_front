import React from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PaymentIcon from '@mui/icons-material/Payment';
import StorageIcon from '@mui/icons-material/Storage';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {Button, Card, CardContent, CardMedia, Grid, Icon, Link, Typography} from "@mui/material";

import {Box} from "@mui/system";


const imageStyle = {
    width: "70%", // Ustaw szerokość obrazka na 100%
    height: "auto", // Ustaw wysokość proporcjonalnie
    marginLeft: `15%`,
    padding: 10,
};

const iconStyle = {
    fontSize: 60, // Ustaw rozmiar ikony na 40
};

const cardsData = [
    {
        title: "E-mail",
        description: "Dostęp do skrzynki pocztowej z poziomu przeglądarki.",
        link: "https://dpoczta.pl",
        icon: <MailOutlineIcon style={iconStyle}/>,
        button: 'Zaloguj się'
    },
    {
        title: "Sklep",
        description: "Odwiedź swój sklep internetowy.",
        link: "https://suoari.fashion",
        icon: <StorefrontIcon style={iconStyle}/>,
        button: 'Odwiedź sklep'
    },
    {
        title: "Płatności",
        description: "Zaloguj się do systemu płatności PayU.",
        link: "https://secure.payu.com/pl/standard/user/login",
        icon: <PaymentIcon style={iconStyle}/>,
        button: 'Zaloguj się'
    },
    {
        title: "Hosting",
        description: "Panel do zarządzania hostingiem sklepu.",
        link: "https://dpanel.pl",
        icon: <StorageIcon style={iconStyle}/>,
        button: 'Zaloguj się'
    },
    {
        title: "Furgonetka",
        description: "Wszystkie informacje dotyczące wysyłek.",
        link: "https://furgonetka.pl/wejdz",
        icon: <LocalShippingIcon style={iconStyle}/>,
        button: 'Zaloguj się'
    },
    {
        title: "Panel admina",
        description: "Panel administratora sklepu WooCommerce.",
        link: "https://suoari.fashion/wp-admin/",
        icon: <AdminPanelSettingsIcon style={iconStyle}/>,
        button: 'Zaloguj się'
    },
    // Dodaj więcej elementów według potrzeb
];

export const DashboardCards = () => {
    return (
        <Grid container spacing={2}>
            {cardsData.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Card sx={{display: 'flex', justifyContent: "space-around", height: '160px'}}>
                        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: "space-around"}}>
                            <CardContent sx={{flex: '1 0 auto'}}>
                                <Typography component="div" variant="h5">
                                    {card.title}
                                </Typography>
                                <Typography variant="subtitle2" color="secondary" component="div">
                                    {card.description}
                                </Typography>
                            </CardContent>
                            <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
                                <Button component={Link} href={card.link} target="_blank" rel="noopener"
                                        variant="outlined" size="small" sx={{mt: 3}}>
                                    {card.button}
                                </Button>
                            </Box>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            {card.icon}
                        </Box>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}