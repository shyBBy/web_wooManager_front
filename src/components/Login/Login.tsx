import React from "react";
import {Box, CssBaseline, Grid, Paper} from "@mui/material";

import logo from '../../assets/img/logo3.png'
import bg from '../../assets/bg/loginBG.svg'
import {LoginForm} from "../Forms/LoginForm";
import {useAuth} from "../../hooks/useAuth";

export const Login = () => {

    const {user} = useAuth()

    if (!user) {

    }
    return (
        <>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img src={logo} style={{maxWidth: '40%'}}/>
                        <LoginForm/>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}