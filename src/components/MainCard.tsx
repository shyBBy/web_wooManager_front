import React from "react";
import { Paper, CardContent, Stack, Typography, Box } from "@mui/material";
import { MainCardPropInterface } from "../interfaces/components.interfaces";
import theme from "../theme";

export const MainCard = (props: MainCardPropInterface) => {
    const { title, count, description, icon } = props;

    return (
        <Paper
            sx={{
                width: '100%', // Pełna szerokość w siatce
                height: '140px', // Domyślna wysokość
                background: 'linear-gradient(145deg, #1E1E2F, #252537)', // Gradientowe tło
                borderRadius: '12px', // Zaokrąglone rogi
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // Subtelny cień
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-5px)', // Efekt hover
                    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.3)',
                },
                [theme.breakpoints.down('sm')]: {
                    height: '110px', // Zmniejszona wysokość na małych ekranach
                    padding: '10px', // Mniejszy padding
                },
            }}
        >
            <CardContent sx={{ padding: 0 }}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }} // Ikona nad tekstem na małych ekranach
                    alignItems="center"
                    spacing={1} // Mniejsze odstępy między elementami
                >
                    {/* Ikona */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '40px', // Mniejsza ikona
                            height: '40px',
                            borderRadius: '50%',
                            background: 'linear-gradient(145deg, #6C63FF, #5A54E6)', // Gradient dla ikony
                        }}
                    >
                        {icon}
                    </Box>
                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.text.primary,
                            fontWeight: 600,
                            fontSize: { xs: '0.9rem', sm: '1rem' }, // Mniejsza czcionka na małych ekranach
                            textAlign: { xs: 'center', sm: 'left' }, // Wyśrodkowanie na małych ekranach
                        }}
                    >
                        {title}
                    </Typography>
                </Stack>
                <Typography
                    variant="body2"
                    sx={{
                        color: theme.palette.text.secondary,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' }, // Mniejszy opis na małych ekranach
                        marginTop: '4px',
                        textAlign: { xs: 'center', sm: 'left' }, // Wyśrodkowanie na małych ekranach
                    }}
                >
                    {description}
                </Typography>
            </CardContent>
        </Paper>
    );
};