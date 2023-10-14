import React, { useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Box, Button, Grid, Link, TextField} from '@mui/material'
import {yupResolver} from "@hookform/resolvers/yup";
import {createStoreSchema} from "../../schemas/schema"
import {config} from '../../config/config'
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const StoreCreateForm = () => {
    const navigate = useNavigate()


    const {
        control,
        handleSubmit,
        reset,
        register,
        formState: {errors, isSubmitSuccessful},
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(createStoreSchema),
        defaultValues: {
            name: "",
            url: '',
            consumer_key: '',
            consumer_secret: '',
        },
    });

    const onSubmit = async (data: any) => {
        try {
            const res = await fetch(`${config.API_URL}/store/create`, {
                method: "POST",
                credentials: 'include',
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
                toast.success(`Pomyślnie dodano sklep: ${data.name}`, {
                    position: "bottom-right",
                    theme: "light",
                    autoClose: 1500,
                })
                navigate('/dashboard');
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
            reset({name: "", url: '', consumer_key: '', consumer_secret: ''});
        }
    }, [isSubmitSuccessful, reset]);

    return(
        <>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{mt: 3}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{required: true}}
                        render={({field: {...field}}) => (
                            <TextField
                                {...field}
                                {...register('name')}
                                error={!!errors?.name}
                                helperText={errors['name'] ? errors['name'].message : ''}
                                id="name"
                                label="Nazwa sklepu"
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
                        name="url"
                        control={control}
                        rules={{required: true}}
                        render={({field: {...field}}) => (
                            <TextField
                                {...field}
                                id="purl"
                                label="Adres url"
                                type="text"
                                variant="standard"
                                required
                                fullWidth
                                autoComplete="off"
                                sx={{mx: 1, my: 1}}
                                {...register('url')}
                                error={!!errors?.url}
                                helperText={errors['url'] ? errors['url'].message : ''}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="consumer_key"
                        control={control}
                        rules={{required: true}}
                        render={({field: {...field}}) => (
                            <TextField
                                {...field}
                                {...register('consumer_key')}
                                error={!!errors?.consumer_key}
                                helperText={errors['consumer_key'] ? errors['consumer_key'].message : ''}
                                id="consumer_key"
                                label="Klucz klienta"
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
                        name="consumer_secret"
                        control={control}
                        rules={{required: true}}
                        render={({field: {...field}}) => (
                            <TextField
                                {...field}
                                {...register('consumer_secret')}
                                error={!!errors?.consumer_secret}
                                helperText={errors['consumer_secret'] ? errors['consumer_secret'].message : ''}
                                id="consumer_secret"
                                label="Klucz prywatny"
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
        </>
    )
}