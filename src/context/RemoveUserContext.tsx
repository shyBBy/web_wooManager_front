import {createContext, useState} from "react";

export const RemoveUserContext = createContext({
    isDeleting: false,
    setIsDeleting: (value: boolean) => {}
})


export const RemoveUserProvider = ({children}: {children: JSX.Element}) => {
    const [isDeleting, setIsDeleting] = useState(false)

    return (
        <RemoveUserContext.Provider value={{ isDeleting, setIsDeleting }}>
            {children}
        </RemoveUserContext.Provider>
    )
}