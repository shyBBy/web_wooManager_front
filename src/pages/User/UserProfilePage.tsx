import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {MainLayout} from "../../layouts/MainLayout";
import {UserRes} from 'types'
import {config} from "../../config/config";
import {Grid, Paper, Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {grey} from "@mui/material/colors";
import {Box} from "@mui/system";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {a11yProps, TabPanel} from "../../components/TabPanel";
import {UserAvatar} from "../../components/User/ProfilePage/UserAvatar";
import {UserBasicInfo} from "../../components/User/ProfilePage/UserBasicInfo";
import {UpdateUserDataForm} from "../../components/Forms/UpdateUserDataForm";

interface RouteParams {
    id: string;
}

export const UserProfilePage = () => {

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [user, setUser] = useState<UserRes | null>(null);
    const {id} = useParams<{ id?: string }>()

    useEffect(() => {
        fetch(`${config.API_URL}/user/${id}`, {
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error(error));
    }, []);

    if (!user) {
        return <div>Ładowanie...</div>;
    }

    return (
        <>
            <MainLayout>
                <>
                    <UserAvatar user={user}/>
                    <Grid item xs={12} md={7} lg={9} mt={5}>
                        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column',}}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab label={<Typography variant="overline" noWrap>
                                        Profil użytkownika
                                    </Typography>}  {...a11yProps(0)} />
                                    <Tab label={<Typography variant="overline" noWrap>
                                        edytuj
                                    </Typography>} {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                    <UserBasicInfo user={user}/>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                    <UpdateUserDataForm userData={user} />
                            </TabPanel>
                        </Paper>
                    </Grid>
                </>
            </MainLayout>
        </>
    )
}