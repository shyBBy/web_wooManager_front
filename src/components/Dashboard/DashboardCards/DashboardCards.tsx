import React from "react";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Grid } from "@mui/material";
import { MainCard } from "../../MainCard";
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
        <Grid container spacing={3}>
            {cardsData.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <MainCard
                        title={card.title}
                        description={card.description}
                        count={card.button}
                        icon={card.icon}
                        onClick={card.onClick || undefined} // Obsługa null
                        link={card.link || undefined}       // Obsługa null
                    />
                </Grid>
            ))}
        </Grid>
    );
};