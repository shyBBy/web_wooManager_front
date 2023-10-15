import React, {useContext, useState, SyntheticEvent} from 'react';
import {Pagination} from "@mui/material";
import {Box} from "@mui/system";

export const CustomerTableOptions = (props: any) => {
    const {maxPage, handleChangePage} = props;

    return(
        <>
            <Box>
                <Pagination count={maxPage} onChange={handleChangePage} />
            </Box>
        </>
    )
}