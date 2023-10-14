import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
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
                        Dodawanie sklepu online
                    </Typography>
                    <Typography component="p" variant="body2" sx={{fontSize: '12px', textAlign: 'justify'}}>
                        Twoje konto nie ma przypisanego żadnego sklepu - musisz to zrobić aby korzystać z wszystkich usług aplikacji. Zaloguj się do panelu administracyjnego woocommerce i wygeneruj klucze REST API.
                    </Typography>
                    <StoreCreateForm/>
                </Box>
            </Container>
        </>
    )
}