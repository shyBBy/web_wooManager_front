import {Box, Container, CssBaseline, Grid, Link,Toolbar, Typography} from "@mui/material";
import React, {FC} from "react";
import {AppBarMobileView} from "../components/AppBarMobileView/AppBarMobileView";
import theme from "../theme";

export const  Copyright = (props: any) => {
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
}


interface Props {
    children: JSX.Element;
}

export const MainLayout: FC<Props> = ({ children }) => (

    <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBarMobileView/>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: theme.palette.background.default,
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
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
)