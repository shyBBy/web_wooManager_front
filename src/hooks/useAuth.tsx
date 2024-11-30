import React, {createContext, useContext, useEffect, useState} from "react";
import {config} from "../config/config";
import { setIfErrMsg } from "../helpers/setIfErrMsg";
import {LoggedUserRes, Login} from "../interfaces/auth.interfaces";
import {toast} from "react-toastify";


interface AuthContextType {
    user: LoggedUserRes | null;
    setUser: React.Dispatch<React.SetStateAction<LoggedUserRes | null>>;
    signIn: (data: Login) => Promise<any>;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType>(null!)

export const AuthProvider = ({children}: {children: JSX.Element}) => {
    const [user, setUser] = useState<LoggedUserRes | null>(null);

    const signOut = async () => {
        try {
            const res = await fetch(`${config.API_URL}/api/auth/logout`,
                {
                    method: 'POST',
                    credentials: 'include',
                },
            );
            if (!res.ok) {
                setUser(null);
            }
        } catch (e) {
            setUser(null)
        } finally {
            toast.success(`Pomyślnie wylogowano.`, {
                position: "bottom-right",
                theme: "light",
                autoClose: 1000,
            })
            setUser(null)
        }
    };


    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(
                    `${config.API_URL}/user`,
                    {
                        credentials: 'include',
                    },
                );
                const errMsg = await setIfErrMsg(res);
                if (!errMsg) {
                    const userData = await res.json();
                    setUser(userData);
                } else {
                    setUser(null);
                }
            } catch (err) {

            }
        })();
    }, []);

    const signIn = async (data: Login) => {
        try {
            const res = await fetch(
                `${config.API_URL}/api/auth/login`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                },
            );
            if (!res.ok) {
                const errorData = await res.json()
                toast.error(`${errorData.message}`, {
                    position: "bottom-right",
                    theme: "dark",
                    autoClose: 2000,
                })
                setUser(null);
                return
            }
            const userData = (await res.json()) as LoggedUserRes;
            setUser(userData);
            toast.success(`Pomyślnie zalogowano, witaj ${userData.email}`, {
                position: "bottom-right",
                theme: "dark",
                autoClose: 1500,
            })
        } catch(error) {
            toast.error(`Coś poszło nie tak, spróbuj raz jeszcze.`, {
                position: "bottom-right",
                theme: "dark",
                autoClose: 2000,
            })
            setUser(null);
        }
    };



    return (
        <AuthContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{ user, setUser, signIn, signOut}}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const auth = useContext(AuthContext);

    if(!auth) {
        throw Error('useAuth needs to be used inside AuthContext');
    }
    return auth;
};