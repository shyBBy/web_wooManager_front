import {List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Stack, Typography} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import FiberNewIcon from '@mui/icons-material/FiberNew';
import {useNavigate} from "react-router-dom";
import {config} from "../../../config/config";
import {GetListOfLastChangesResponse} from 'types'
import {isAdmin} from "../../../helpers/isAdmin.helper";
import {useAuth} from "../../../hooks/useAuth";

// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};

export const DashboardLastChanges = () => {

    const [changelogList, setChangelog] = useState<GetListOfLastChangesResponse>([])
    //@TODO: Do utworzenia typ dla order
    const [order, setOrder] = useState<any>('asc');
    const [sort, setSort] = useState('')
    const [sortValue, setSortValue] = useState('')
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [maxPage, setMaxPage] = useState(0)
    const [count, setCount] = useState(0);

    const navigate = useNavigate()
    useEffect(() => {
        (async () => {

            const res = await fetch(`${config.API_URL}/admin/changelog/list?page=${page}&count=${rowsPerPage}&order=${order}`, {
                credentials: 'include',
            })
            const data = await res.json()
            console.log(data)
            setMaxPage(data.pagesCount)
            setChangelog(data.lastChanges)
            setCount(data.resultsCount)

        })();
    }, [rowsPerPage, page]);

    const handleChange = (e: any, p: any) => {
        setPage(p)
    }

    const {user} = useAuth()

    if (changelogList === null) {
        return <p>Wczytywanie...</p>
    }
    return (
        <>
            <List
                component="nav"
                sx={{
                    px: 0,
                    py: 0,
                    '& .MuiListItemButton-root': {
                        py: 1.5,
                        '& .MuiAvatar-root': avatarSX,
                        '& .MuiListItemSecondaryAction-root': {...actionSX, position: 'relative'}
                    }
                }}
            >
                {changelogList.map((item) => (
                    <ListItem divider key={item.id}>
                        <ListItemAvatar>
                            <FiberNewIcon sx={{fontSize: 40, color: `grey`}}/>
                        </ListItemAvatar>
                        <ListItemText sx={{paddingRight: `10%`}} primary={<Typography variant="overline">{item.title}</Typography>}
                                      secondary={item.description}/>
                        <ListItemSecondaryAction>
                            <Stack alignItems="flex-end">
                                <Typography variant="overline" noWrap>
                                    Data:
                                </Typography>
                                <Typography variant="overline" color="secondary" noWrap>
                                    {item.addedDate}
                                </Typography>
                                <Typography variant="overline" noWrap>
                                    {isAdmin(user?.role)? 'Usuń' : null}
                                </Typography>
                            </Stack>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </>
    )
}