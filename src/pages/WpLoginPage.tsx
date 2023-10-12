import React from "react";
import {Copyright, MainLayout} from "../layouts/MainLayout";
import {Dashboard} from "../components/Dashboard/Dashboard";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {ActivationForm} from "../components/Forms/ActivationForm";
import Container from "@mui/material/Container";
import {WpLoginForm} from "../components/Forms/WpLoginForm";
import {useAuth} from "../hooks/useAuth";

export const WpLoginPage = () => {

    const {user} = useAuth()

    return(
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h1" fontSize={'20px'} pb={2}>
                    Autoryzacja konta
                </Typography>
                <Typography component="p" variant="body2" sx={{fontSize: '12px', textAlign: 'justify'}}>
                    Aby uzyskać pełen dostęp do funkcji naszej aplikacji dla sklepu, konieczna jest autoryzacja Twojego konta jako administratora. Prosimy zalogować się danymi do konta administratora sklepu w poniższym formularzu. Po poprawnej autoryzacji wygenerowany zostanie token, który będzie ważny przez 7 dni, umożliwiając pełne korzystanie z naszych usług.

                    Pamiętaj, aby sprawdzić swoją skrzynkę odbiorczą, w tym folder ze spamem, po ewentualnych komunikatach dotyczących autoryzacji. W razie jakichkolwiek problemów skontaktuj się z nami.
                </Typography>
                <WpLoginForm/>
            </Box>
        </Container>
    )
}