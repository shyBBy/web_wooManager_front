import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Login, WpLogin} from "../../interfaces/auth.interfaces";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {wpLoginSchema} from "../../schemas/schema";
import {Box, Button, Grid, Link, TextField} from "@mui/material";
import {Copyright} from "../../layouts/MainLayout";

export const WpLoginForm = () => {
    const [login, setLogin] = useState(true);
    const {wpLogin} = useAuth()
    const [message] = useState('');


    const {
        control,
        handleSubmit,
        reset,
        register,
        formState: { isSubmitSuccessful, errors },
    } = useForm<WpLogin>({
        mode: 'onSubmit',
        resolver: yupResolver(wpLoginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<WpLogin> = async (data) => {
        const credential = { username: data.username, password: data.password };
        await wpLogin(credential);
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ username: "", password: '', });
        }
    }, [isSubmitSuccessful, reset]);


    return(
        <>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                <Controller
                    name="username"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: {...field } }) => (
                        <TextField
                            {...field}
                            {...register('username')}
                            margin="normal"
                            id="username"
                            label="Nazwa użytkownika Wordpress"
                            error={!!errors?.username}
                            helperText={errors['username'] ? errors['username'].message : ''}
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
                    Autoryzuj się
                </Button>
                <p>{message}</p>
            </Box>
        </>
    )
}