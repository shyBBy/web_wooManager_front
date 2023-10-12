import React, {useState} from "react";
import {grey} from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";

export const AvatarFromImageFile = (props: any) => {
    const {file} = props
    const [avatarUrl, setAvatarUrl] = useState('');

    const handleFileRead = (event: any) => {
        const content = event.target.result;
        setAvatarUrl(content);
    };

    const handleFileChosen = (file: any) => {
        const reader = new FileReader();
        reader.onloadend = handleFileRead;
        reader.readAsDataURL(file);
    };

    if (file) {
        handleFileChosen(file);
    }

    return(
        <>
            <Avatar
                src={avatarUrl}
                sx={{
                    width: 200,
                    height: 200,
                    border: `solid 4px`,
                    borderColor: grey[300],
                    borderRadius: "50%"
                }}
                variant="rounded"
            />
        </>
    )
}