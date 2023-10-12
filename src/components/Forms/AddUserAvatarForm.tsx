import React, {FC, useState} from "react";
import {Box} from "@mui/system";
import {config} from "../../config/config";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {UploadUserAvatarSchema} from "../../schemas/schema";
import {Button, TextField} from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {ErrorMessage} from "@hookform/error-message";


interface AddUserAvatarFormProps {
    closeModal: () => void;
}


export const AddUserAvatarForm: FC<AddUserAvatarFormProps> = (props: any) => {

    const {closeModal} = props
    const {id} = useParams<{ id?: string }>()
    const navigate = useNavigate()


    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);


    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(UploadUserAvatarSchema),
    });

    const onSubmit = async () => {

        if (!file) {
            return;
        }

        const formData = new FormData()
        formData.append('avatar', file);
        try {
            setUploading(true)
            const res = await fetch(`${config.API_URL}/user/${id}/avatar`, {
                credentials: 'include',
                method: 'POST',
                body: formData,
            });
            console.log('formdata', formData)

            if (!res.ok) {
                const errorData = await res.json();
                toast.error(`${errorData.message}`, {
                    position: "bottom-right",
                    theme: "light",
                    autoClose: 2000,
                })
                return
            }
            toast.success(`Pomyślnie ustawiono avatar.`, {
                position: "bottom-right",
                theme: "light",
                autoClose: 1500,
            })
            setUploading(false)
            closeModal();
            navigate(`/user/${id}`);
            return
        } catch (error) {
            console.log('Error', error)
            toast.error('Coś poszło nie tak, spróbuj raz jeszcze.', {
                position: 'bottom-right',
                theme: 'light',
                autoClose: 1500,
            })
            setUploading(false)
            return
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        setFile(file);
    };

    return (
        <>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
                <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{display: 'none'}}
                        id="avatar-upload-input"
                    />
                    <label htmlFor="avatar-upload-input">
                        <Button
                            variant="contained"
                            component="span"
                            color="primary"
                            startIcon={<AddPhotoAlternateIcon/>}
                            disabled={uploading}
                            sx={{mr: 2}}
                        >
                            Wybierz plik
                        </Button>
                    </label>
                    <TextField
                        variant="outlined"
                        size="small"
                        disabled
                        value={file?.name ?? ''}
                        sx={{flexGrow: 1}}
                        error={!!errors?.avatar}
                        helperText={<ErrorMessage errors={errors} name='avatar'/>}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{mt: 2}}>
                        Wyślij
                    </Button>
                </Box>
            </Box>
        </>
    )
}