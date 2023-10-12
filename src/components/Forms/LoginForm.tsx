import React, { useEffect, useState } from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {TextField, Button, Box, Grid, Link} from '@mui/material'
import { Copyright } from '../../layouts/MainLayout';
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "../../schemas/schema";
import {useAuth} from "../../hooks/useAuth";
import {Login} from "../../interfaces/auth.interfaces";



export const LoginForm = () => {
    const [login, setLogin] = useState(true);
    const {signIn} = useAuth()
    const [message] = useState('');
  
    const {
        control,
        handleSubmit,
        reset,
        register,
        formState: { isSubmitSuccessful, errors },
      } = useForm<Login>({
        mode: 'onSubmit',
        resolver: yupResolver(loginSchema),
        defaultValues: {
          email: "",
          password: '',
        },
      });

    const onSubmit: SubmitHandler<Login> = async (data) => {
            const credential = { email: data.email, password: data.password };
            await signIn(credential);
        }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ email: "", password: '', });
        }
    }, [isSubmitSuccessful, reset]);


    return(
        <>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: {...field } }) => (
                <TextField
                    {...field}
                    {...register('email')}
                    margin="normal"
                    id="email"
                    label="Adres e-mail"
                    error={!!errors?.email}
                    helperText={errors['email'] ? errors['email'].message : ''}
                    type="text"
                    variant="standard"
                    required
                    fullWidth
                    autoComplete="email"
                    sx={{ mx: 1, my: 1 }}
                />
                )}
            />
            <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field: {...field } }) => (
                <TextField
                    {...field}
                    margin="normal"
                    id="password"
                    label="Hasło"
                    type="password"
                    variant="standard"
                    required
                    fullWidth
                    autoComplete="current-password"
                    {...register('password')}
                    error={!!errors?.password}
                    helperText={errors['password'] ? errors['password'].message : ''}
                    sx={{ mx: 1, my: 1 }}
                />
                )}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Zaloguj
                </Button>
                <p>{message}</p>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Zapomniałeś hasła?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="/register" variant="body2">
                            {"Nie masz konta? Zarejestruj się"}
                        </Link>
                    </Grid>
                </Grid>
                <Box p={10}>
                    <Copyright/>
                </Box>
            </Box>
        </>
    )
}

