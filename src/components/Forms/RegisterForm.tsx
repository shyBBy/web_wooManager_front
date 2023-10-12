import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Box, Button, Grid, Link, TextField} from '@mui/material'
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "../../schemas/schema";
import {config} from '../../config/config'
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const RegisterForm = () => {

    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        reset,
        register,
        formState: {errors, isSubmitSuccessful},
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "",
            password: '',
        },
    });

    const onSubmit = async (data: any) => {
        try {
            const res = await fetch(`${config.API_URL}/user/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                toast.error(`${data.message}`, {
                    position: "bottom-right",
                    theme: "light",
                    autoClose: 2000,
                })
                return
            }
            return res.json().then((data) => {
                toast.success(`Pomyślnie utworzono konto, sprawdź pocztę e-mail.`, {
                    position: "bottom-right",
                    theme: "light",
                    autoClose: 1500,
                })
                navigate('/activation');
                return data;
            });
        } catch (error) {
            toast.error('Coś poszło nie tak, spróbuj raz jeszcze.', {
                position: 'bottom-right',
                theme: 'light',
                autoClose: 1500,
            })
            return

        }
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({email: "", password: '',});
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{required: true}}
                        render={({field: {...field}}) => (
                            <TextField
                                {...field}
                                {...register('email')}
                                error={!!errors?.email}
                                helperText={errors['email'] ? errors['email'].message : ''}
                                id="email"
                                label="Adres e-mail"
                                type="text"
                                variant="standard"
                                required
                                fullWidth
                                autoComplete="off"
                                sx={{mx: 1, my: 1}}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="password"
                        control={control}
                        rules={{required: true}}
                        render={({field: {...field}}) => (
                            <TextField
                                {...field}
                                id="password"
                                label="Hasło"
                                type="password"
                                variant="standard"
                                required
                                fullWidth
                                autoComplete="off"
                                sx={{mx: 1, my: 1}}
                                {...register('password')}
                                error={!!errors?.password}
                                helperText={errors['password'] ? errors['password'].message : ''}
                            />
                        )}
                    />
                </Grid>
            </Grid>

            <Button type="submit" variant="contained" color="primary">
                Zarejestruj się
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="/login" variant="body2">
                        Masz już konto? Zaloguj się
                    </Link>
                </Grid>
            </Grid>

        </Box>
    );
};

