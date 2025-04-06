import { Box, Container, CssBaseline, Grid, Link, Toolbar, Typography } from "@mui/material";
import React, { FC } from "react";
import { AppBarMobileView } from "../components/AppBarMobileView/AppBarMobileView";
import theme from "../theme";

export const Copyright = (props: any) => {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/shyBBy">
                Dawid 'shyBBy' Olczak
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
};

interface Props {
    children: JSX.Element;
}

export const MainLayout: FC<Props> = ({ children }) => (
    <>
        <Box
            sx={{
                display: 'flex',
                backgroundColor: theme.palette.background.default, // Tło dla całego layoutu
                minHeight: '100vh', // Wypełnienie całej wysokości ekranu
            }}
        >
            <CssBaseline />
            <AppBarMobileView />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                    padding: '16px', // Padding dla zawartości
                    [theme.breakpoints.down('md')]: {
                        padding: '16px', // Dostosowanie paddingu dla mniejszych ekranów
                    },
                    [theme.breakpoints.between(1024, 1366)]: {
                        padding: '24px', // Specjalne ustawienia dla iPada Air 11"
                    },
                }}
            >
                <Toolbar />
                <Container
                    maxWidth={false} // Pełna szerokość kontenera
                    sx={{
                        mt: 4,
                        mb: 4,
                        padding: 0, // Usuń padding wewnętrzny kontenera
                    }}
                >
                    <Grid container spacing={2}>
                        {children}
                    </Grid>
                    <Copyright sx={{ pt: 4 }} />
                </Container>
            </Box>
        </Box>
    </>
);