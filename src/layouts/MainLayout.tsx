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
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarMobileView />
            <Box
                component="main"
                sx={{
                    backgroundColor: theme.palette.background.default,
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    // Media Queries for iPad Air 11"
                    [theme.breakpoints.down('md')]: {
                        height: 'auto', // Dostosowanie wysokości dla mniejszych ekranów
                        padding: '16px', // Dodanie paddingu
                    },
                    [theme.breakpoints.between(1024, 1366)]: {
                        padding: '24px', // Specjalne ustawienia dla iPada Air 11"
                    },
                }}
            >
                <Toolbar />
                <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={2}>
                        {children}
                    </Grid>
                    <Copyright sx={{ pt: 4 }} />
                </Container>
            </Box>
        </Box>
    </>
);