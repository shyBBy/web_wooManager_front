import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {Copyright} from "../../layouts/MainLayout";
import {StoreCreateForm} from "../Forms/StoreCreateForm";


export const CreateStore = () => {
    return(
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h1" fontSize={'20px'} pb={2}>
                        Aktywacja konta
                    </Typography>
                    <Typography component="p" variant="body2" sx={{fontSize: '12px', textAlign: 'justify'}}>
                        Zanim będziesz mógł/mogła korzystać z naszych usług, wymagana jest aktywacja Twojego konta. W
                        tym celu wysłaliśmy na Twój adres e-mail wiadomość z kodem aktywacyjnym. Prosimy o wprowadzenie
                        otrzymanego kodu w poniższe pole, aby dokończyć proces aktywacji konta. Jeśli nie
                        otrzymałeś/otrzymałaś wiadomości z kodem, upewnij się, że sprawdziłeś/sprawdziłaś swoją skrzynkę
                        odbiorczą oraz folder ze spamem. W razie problemów z aktywacją, skontaktuj się z nami.
                    </Typography>
                    <StoreCreateForm/>
                </Box>
                <Box p={10}><Copyright/></Box>
            </Container>
        </>
    )
}