import React from "react";
import {Button, FormControlLabel, Grid, MenuItem, Select, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {UpdateUserDataSchema} from "../../schemas/schema";
import {config} from "../../config/config";
import {toast} from "react-toastify";
import {Box} from "@mui/system";
import {useNavigate} from "react-router-dom";
import {isAdmin} from "../../helpers/isAdmin.helper";
import {ErrorMessage} from '@hookform/error-message';
import {useAuth} from "../../hooks/useAuth";
import {getStatusText} from "../../helpers/userStatusToString";
import Checkbox from '@mui/material/Checkbox';
import {PERMISSIONS} from 'types'

type FormValues = {
    canAddVehicles: boolean;
    canEditVehicles: boolean;
    canDeleteVehicles: boolean;
    canViewAllVehicles: boolean;
    canViewVehiclesByLocation: boolean;
};

type PermissionValues = {
    [key in keyof FormValues]?: string | boolean;
};


export const UpdateUserDataForm = (props: any) => {

    const {user} = useAuth();

    const {userData} = props

    const navigate = useNavigate()

    const {
        control,
        handleSubmit,
        reset,
        register,
        formState: {errors, isSubmitSuccessful},
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(UpdateUserDataSchema),
        // defaultValues: defaultValues,
    });


    const onSubmit = async (data: any) => {

        const permissions: PermissionValues = {};
        Object.keys(data).forEach((key) => {
            const value = data[key as keyof FormValues];
            if (value === true) {
                switch (key) {
                    case 'canAddVehicles':
                        permissions[key] = PERMISSIONS.ADD_VEH;
                        break;
                    case 'canEditVehicles':
                        permissions[key] = PERMISSIONS.EDIT_VEH;
                        break;
                    case 'canDeleteVehicles':
                        permissions[key] = PERMISSIONS.DELETE_VEH;
                        break;
                    case 'canViewAllVehicles':
                        permissions[key] = PERMISSIONS.VIEW_ALL_VEH;
                        break;
                    case 'canViewVehiclesByLocation':
                        permissions[key] = PERMISSIONS.VIEW_VEH_BY_LOCATION;
                        break;
                    default:
                        break;
                }
            } else {
                permissions[key as keyof FormValues] = value;
            }
        });
        console.log(permissions);

        try {
            const res = await fetch(`${config.API_URL}/user/${userData.id}`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            console.log('Data', data)

            if (!res.ok) {
                toast.error(`${data.message}`, {
                    position: "bottom-right",
                    theme: "light",
                    autoClose: 2000,
                })
                return
            }

            const json = await res.json()
            if (!json) {
                throw new Error("Empty response")
            }

            toast.success(`Pomyślnie edytowane dane użytkownika.`, {
                position: "bottom-right",
                theme: "light",
                autoClose: 1500,
            })
            navigate(`/user/${userData.id}`);
            console.log('Json', json)
            return json;
        } catch (error) {
            console.log('Error', error)
            toast.error('Coś poszło nie tak, spróbuj raz jeszcze.', {
                position: 'bottom-right',
                theme: 'light',
                autoClose: 1500,
            })
            return

        }
    };

    // useEffect(() => {
    //     if (isSubmitSuccessful) {
    //         reset(defaultValues);
    //     }
    // }, [isSubmitSuccessful, reset]);

    const AdminUpdateUserDataSection = () => {
        return (
            <>
                <Grid container xs={12} md={7} lg={3}>
                    <Grid item xs={12} md={7} lg={9}>
                        <Controller
                            name="role"
                            control={control}
                            rules={{required: true}}
                            render={({field: {...field}}) => (
                                <Select
                                    {...field}
                                    {...register('role')}
                                    error={!!errors?.role}
                                    id="role"
                                    defaultValue={userData.role}
                                    sx={{mx: 1, my: 1}}
                                    variant={'standard'}
                                >
                                    <MenuItem value="Wybierz grupe" disabled>
                                        Wybierz grupe
                                    </MenuItem>
                                    <MenuItem value={'Administrator'}>Administrator</MenuItem>
                                    <MenuItem value={'Użytkownik'}>Użytkownik</MenuItem>
                                </Select>
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container xs={12} md={7} lg={3}>
                    <Grid item xs={12} md={7} lg={9}>
                        <Controller
                            name="placeName"
                            control={control}
                            rules={{required: true}}
                            render={({field: {...field}}) => (
                                <Select
                                    {...field}
                                    {...register('placeName')}
                                    error={!!errors?.placeName}
                                    id="placeName"
                                    defaultValue={userData.placeName}
                                    sx={{mx: 1, my: 1}}
                                    variant={'standard'}
                                >
                                    <MenuItem value="Wybierz oddział" disabled>
                                        Wybierz oddział
                                    </MenuItem>
                                    <MenuItem value={'Łódź'}>Łódź</MenuItem>
                                    <MenuItem value={'Warszawa'}>Warszawa</MenuItem>
                                    <MenuItem value={'Lipno'}>Lipno</MenuItem>
                                    <MenuItem value={'Leszno'}>Leszno</MenuItem>
                                    <MenuItem value={'Lębork'}>Lębork</MenuItem>
                                    <MenuItem value={'Lublin'}>Lublin</MenuItem>
                                    <MenuItem value={'Kielce'}>Kielce</MenuItem>
                                    <MenuItem value={'Zabrze'}>Zabrze</MenuItem>
                                    <MenuItem value={'Tarnów'}>Tarnów</MenuItem>
                                </Select>
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container xs={12} md={7} lg={3}>
                    <Grid item xs={12} md={7} lg={9}>
                        <Controller
                            name="jobPosition"
                            control={control}
                            rules={{required: true}}
                            render={({field: {...field}}) => (
                                <Select
                                    {...field}
                                    {...register('jobPosition')}
                                    error={!!errors?.jobPosition}
                                    id="jobPosition"
                                    defaultValue={userData.jobPosition}
                                    sx={{mx: 1, my: 1}}
                                    variant={'standard'}
                                >
                                    <MenuItem value="Wybierz stanowisko" disabled>
                                        Wybierz stanowisko
                                    </MenuItem>
                                    <MenuItem value={'Magazynier'}>Magazynier</MenuItem>
                                    <MenuItem value={'Kierowca'}>Kierowca</MenuItem>
                                    <MenuItem value={'Kierownik'}>Kierownik</MenuItem>
                                    <MenuItem value={'Dyrektor'}>Dyrektor</MenuItem>
                                    <MenuItem value={'Szef'}>Szef</MenuItem>
                                    <MenuItem value={'Księgowa'}>Księgowa</MenuItem>
                                </Select>
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container xs={12} md={7} lg={3}>
                    <Grid item xs={12} md={7} lg={9}>
                        <Controller
                            name="isActive"
                            control={control}
                            rules={{required: true}}
                            render={({field: {...field}}) => (
                                <Select
                                    {...field}
                                    {...register('isActive')}
                                    error={!!errors?.isActive}
                                    id="jobPosition"
                                    defaultValue={getStatusText(userData.isActive)}
                                    sx={{mx: 1, my: 1}}
                                    variant={'standard'}
                                >
                                    <MenuItem value="Status konta" disabled>
                                        Wybierz status
                                    </MenuItem>
                                    <MenuItem value={'Aktywny'}>Aktywny</MenuItem>
                                    <MenuItem value={'Nieaktywny'}>Nieaktywny</MenuItem>
                                </Select>
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container xs={12} md={7} lg={3}>
                    <Grid item xs={12} md={7} lg={9}>
                        <Controller
                            name="canAddVehicles"
                            control={control}
                            defaultValue={false}
                            render={({field}) => (
                                <FormControlLabel
                                    control={<Checkbox {...field} />}
                                    label={PERMISSIONS.ADD_VEH}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container xs={12} md={7} lg={3}>
                    <Grid item xs={12} md={7} lg={9}>
                        <Controller
                            name="canEditVehicles"
                            control={control}
                            defaultValue={false}
                            render={({field}) => (
                                <FormControlLabel
                                    control={<Checkbox {...field} />}
                                    label={PERMISSIONS.EDIT_VEH}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container xs={12} md={7} lg={3}>
                    <Grid item xs={12} md={7} lg={9}>
                        <Controller
                            name="canDeleteVehicles"
                            control={control}
                            defaultValue={false}
                            render={({field}) => (
                                <FormControlLabel
                                    control={<Checkbox {...field} />}
                                    label={PERMISSIONS.DELETE_VEH}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container xs={12} md={7} lg={3}>
                    <Grid item xs={12} md={7} lg={9}>
                        <Controller
                            name="canViewAllVehicles"
                            control={control}
                            defaultValue={false}
                            render={({field}) => (
                                <FormControlLabel
                                    control={<Checkbox {...field} />}
                                    label={PERMISSIONS.VIEW_ALL_VEH}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <Grid container xs={12} md={7} lg={3}>
                    <Grid item xs={12} md={7} lg={9}>
                        <Controller
                            name="canViewVehiclesByLocation"
                            control={control}
                            defaultValue={false}
                            render={({field}) => (
                                <FormControlLabel
                                    control={<Checkbox {...field} />}
                                    label={PERMISSIONS.VIEW_VEH_BY_LOCATION}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </>
        )
    }

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid container xs={12} md={7} lg={4}>
                        <Grid item xs={12} md={7} lg={9}>
                            <Controller
                                name="name"
                                control={control}
                                rules={{required: true}}
                                render={({field: {...field}}) => (
                                    <TextField
                                        {...field}
                                        id="name"
                                        label="Imię"
                                        type="text"
                                        variant="standard"
                                        required
                                        fullWidth
                                        autoComplete="off"
                                        defaultValue={userData.name}
                                        sx={{mx: 1, my: 1}}
                                        {...register('name')}
                                        error={!!errors?.name}
                                        helperText={<ErrorMessage errors={errors} name='name'/>}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid container xs={12} md={7} lg={4}>
                        <Grid item xs={12} md={7} lg={9}>
                            <Controller
                                name="surname"
                                control={control}
                                rules={{required: true}}
                                render={({field: {...field}}) => (
                                    <TextField
                                        {...field}
                                        id="surname"
                                        label="Nazwisko"
                                        type="text"
                                        variant="standard"
                                        required
                                        fullWidth
                                        autoComplete="off"
                                        sx={{mx: 1, my: 1}}
                                        {...register('surname')}
                                        error={!!errors?.surname}
                                        helperText={<ErrorMessage errors={errors} name='surname'/>}
                                        defaultValue={userData.surname}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid container xs={12} md={7} lg={4}>
                        <Grid item xs={12} md={7} lg={9}>
                            <Controller
                                name="email"
                                control={control}
                                rules={{required: true}}
                                render={({field: {...field}}) => (
                                    <TextField
                                        {...field}
                                        id="email"
                                        label="E-mail"
                                        type="text"
                                        variant="standard"
                                        required
                                        fullWidth
                                        autoComplete="off"
                                        sx={{mx: 1, my: 1}}
                                        {...register('email')}
                                        error={!!errors?.email}
                                        helperText={<ErrorMessage errors={errors} name='email'/>}
                                        defaultValue={userData.email}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Grid item md={8} sx={{display: {sm: 'none', md: 'block', lg: 'none'}}}/>
                    {isAdmin(user?.role) ? <AdminUpdateUserDataSection/> : null}
                </Grid>
                <Button type="submit" variant="contained" color="primary" sx={{mt: 2}}>
                    Zapisz
                </Button>
            </Box>
        </>
    )
}