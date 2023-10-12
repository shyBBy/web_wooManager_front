import React, {createContext, useContext, useEffect, useState} from "react";
import {config} from "../config/config";
import { setIfErrMsg } from "../helpers/setIfErrMsg";
import {LoggedUserRes, Login, TokenResponse, WpLogin} from "../interfaces/auth.interfaces";
import {toast} from "react-toastify";


interface AuthContextType {
    user: LoggedUserRes | null;
    setUser: React.Dispatch<React.SetStateAction<LoggedUserRes | null>>;
    signIn: (data: Login) => Promise<any>;
    wpLogin: (data: WpLogin) => Promise<any>;
    wpToken: string | null;
    signOut: () => void;
    checkWpToken: () => void;
}

const AuthContext = createContext<AuthContextType>(null!)

export const AuthProvider = ({children}: {children: JSX.Element}) => {
    const [user, setUser] = useState<LoggedUserRes | null>(null);
    const [wpToken, setWpToken] = useState<string | null>(null);

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

     const checkWpToken = async () => {
         try {
             // Sprawdź, czy wpToken istnieje
             const storedWpToken = localStorage.getItem('wpToken');
             if (!storedWpToken) {
                 toast.error(`Brak tokenu. Zaloguj się ponownie.`, {
                     position: "bottom-right",
                     theme: "dark",
                     autoClose: 2000,
                 });
                 return;
             }

             // Zweryfikuj wpToken na backendzie lub zewnętrznym API
             // Załóżmy, że istnieje endpoint API do walidacji
             const tokenValidationRes = await fetch(
                 `${config.API_URL}/api/auth/wp-login/token`,
                 {
                     method: 'GET',
                     credentials: 'include',
                     headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json',
                     },
                 },
             );

             const tokenValidationData = await tokenValidationRes.json();

             if (!tokenValidationData.isSuccess) {
                 // Obsłuż nieprawidłowy token
                 toast.error(`Token jest nieprawidłowy. Zaloguj się ponownie.`, {
                     position: "bottom-right",
                     theme: "dark",
                     autoClose: 2000,
                 });
                 localStorage.removeItem('wpToken'); // Usuń nieprawidłowy token
                 setWpToken(null);
                 return;
             }

             // Jeśli token jest poprawny, ustaw go w stanie
             setWpToken(storedWpToken);

             // ... reszta kodu
         } catch (error) {
             // Obsłuż inne błędy
             // ...
             toast.error(`Catch error`, {
                 position: "bottom-right",
                 theme: "dark",
                 autoClose: 2000,
             });
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

                    // Odczytaj token z localStorage i ustaw go
                    const storedWpToken = localStorage.getItem('wpToken');
                    if (storedWpToken) {
                        setWpToken(storedWpToken);
                    }

                    await checkWpToken();
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

    const wpLogin = async (data: WpLogin) => {
        try {
            const loginRes = await fetch(
                `${config.API_URL}/api/auth/wp-login`,
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

            if (!loginRes.ok) {
                // Obsłuż błędy logowania wp-login
                // ...
                return null;
            }

            const tokenData = (await loginRes.json()) as TokenResponse;

            // Zaktualizuj token w localStorage
            localStorage.setItem('wpToken', tokenData.token);
            setWpToken(tokenData.token);

            // ... reszta kodu
        } catch (error) {
            // Obsłuż inne błędy
            // ...
            return null;
        }
    };

    return (
        <AuthContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{ user, setUser, signIn, signOut, wpLogin, wpToken, checkWpToken}}
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