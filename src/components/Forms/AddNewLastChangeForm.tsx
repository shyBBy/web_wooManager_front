import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {addLastChangesSchema} from "../../schemas/schema";
import {config} from "../../config/config";
import {toast} from "react-toastify";
import {Box, Button, Grid, MenuItem, Select, TextField} from "@mui/material";


const defaultValues = {
    title: "",
    description: '',
}

export const AddNewLastChangeForm = () => {
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        reset,
        register,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(addLastChangesSchema),
        defaultValues: defaultValues,
    });

    const onSubmit = async (data: any) => {
        try {
            const res = await fetch(`${config.API_URL}/admin/changelog/add`, {
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
                setMessage(data.message);
                toast.success(`Pomyślnie dodano nową zmianę`, {
                    position: "bottom-right",
                    theme: "light",
                    autoClose: 1500,
                })
                navigate('/admin')
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
            reset(defaultValues);
        }
    }, [isSubmitSuccessful, reset]);

    return(
        <>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8} lg={12}>
                        <Controller
                            name="title"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: {...field } }) => (
                                <TextField
                                    {...field}
                                    id="title"
                                    label="Tytuł"
                                    type="text"
                                    variant="standard"
                                    required
                                    fullWidth
                                    autoComplete="off"
                                    sx={{ mx: 1, my: 1 }}
                                    {...register('title')}
                                    error={!!errors?.title}
                                    helperText={errors['title'] ? errors['title'].message : ''}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} md={8} lg={12}>
                        <Controller
                            name="description"
                            control={control}
                            rules={{ required: true }}
                            render={({ field: {...field } }) => (
                                <TextField
                                    {...field}
                                    id="description"
                                    label="Opis"
                                    type="text"
                                    variant="standard"
                                    required
                                    multiline
                                    fullWidth
                                    autoComplete="off"
                                    rows={4}
                                    maxRows={10}
                                    sx={{ mx: 1, my: 1 }}
                                    {...register('description')}
                                    error={!!errors?.description}
                                    helperText={errors['description'] ? errors['description'].message : ''}
                                />
                            )}
                        />
                    </Grid>
                </Grid>

                <Button type="submit" variant="contained" color="primary" sx={{mt: '10%'}}>
                    Dodaj zmianę
                </Button>


            </Box>
        </>
    )
}