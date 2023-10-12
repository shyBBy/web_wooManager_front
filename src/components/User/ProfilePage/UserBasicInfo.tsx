import React from "react";
import {Grid, Icon, Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {grey} from "@mui/material/colors";
import UserProfileIcon from '../../../assets/icons/userProfile/icons8-user-60.png'

export const UserBasicInfo = (props: any) => {
    const {user} = props;


    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7} lg={4}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{bgcolor: grey[600]}}>
                            <Icon><img style={{width: '100%'}} src={UserProfileIcon}/></Icon>
                        </Avatar>
                        <Stack>
                            <Typography variant="subtitle2" color="textSecondary">Imię</Typography>
                            <Typography>{user.name}</Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={7} lg={4}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{bgcolor: grey[600]}}>
                            <Icon><img style={{width: '100%'}} src={UserProfileIcon}/></Icon>
                        </Avatar>
                        <Stack>
                            <Typography variant="subtitle2" color="textSecondary">Nazwisko</Typography>
                            <Typography>{user.surname}</Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={7} lg={4}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{bgcolor: grey[600]}}>
                            <Icon><img style={{width: '100%'}} src={UserProfileIcon}/></Icon>
                        </Avatar>
                        <Stack>
                            <Typography variant="subtitle2" color="textSecondary">E-mail</Typography>
                            <Typography>{user.email}</Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={7} lg={4}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{bgcolor: grey[600]}}>
                            <Icon><img style={{width: '100%'}} src={UserProfileIcon}/></Icon>
                        </Avatar>
                        <Stack>
                            <Typography variant="subtitle2" color="textSecondary">Stanowisko</Typography>
                            <Typography>{user.jobPosition}</Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={7} lg={4}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{bgcolor: grey[600]}}>
                            <Icon><img style={{width: '100%'}} src={UserProfileIcon}/></Icon>
                        </Avatar>
                        <Stack>
                            <Typography variant="subtitle2" color="textSecondary">Rola</Typography>
                            <Typography>{user.role}</Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={7} lg={4}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{bgcolor: grey[600]}}>
                            <Icon><img style={{width: '100%'}} src={UserProfileIcon}/></Icon>
                        </Avatar>
                        <Stack>
                            <Typography variant="subtitle2" color="textSecondary">Oddział</Typography>
                            <Typography>{user.placeName}</Typography>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}