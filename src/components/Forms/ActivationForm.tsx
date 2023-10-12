import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {activationSchema} from "../../schemas/schema";
import {config} from "../../config/config";
import {toast} from "react-toastify";
import {Box, Button, Grid, Link, TextField} from "@mui/material";

export const ActivationForm = () => {

    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        reset,
        register,
        formState: {errors, isSubmitSuccessful},
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(activationSchema),
        defaultValues: {
            email: "",
            activationCode: '',
        },
    });

    const onSubmit = async (data: any) => {
        try {
            const res = await fetch(`${config.API_URL}/user/activation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                toast.error(`Konto nie istnieje lub kod aktywacyjny jest niepoprawny.`, {
                    position: "bottom-right",
                    theme: "light",
                    autoClose: 2000,
                })
                return
            }
            return res.json().then((data) => {
                toast.success(`${data.message}`, {
                    position: "bottom-right",
                    theme: "light",
                    autoClose: 1500,
                })
                navigate('/login');
                return
            });
        } catch (error) {
            toast.error(`Coś poszło nie tak, spróbuj raz jeszcze.`, {
                position: 'bottom-right',
                theme: 'light',
                autoClose: 1500,
            })
            return

        }
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({email: "", activationCode: '',});
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <>
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
                            name="activationCode"
                            control={control}
                            rules={{required: true}}
                            render={({field: {...field}}) => (
                                <TextField
                                    {...field}
                                    id="activationCode"
                                    label="Kod aktywacyjny"
                                    type="text"
                                    variant="standard"
                                    required
                                    fullWidth
                                    autoComplete="off"
                                    sx={{mx: 1, my: 1}}
                                    {...register('activationCode')}
                                    error={!!errors?.activationCode}
                                    helperText={errors['activationCode'] ? errors['activationCode'].message : ''}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" sx={{marginTop: '15px'}}>
                    Aktywuj konto
                </Button>
                <Grid container justifyContent="flex-end">
                </Grid>

            </Box>
        </>
    )
}