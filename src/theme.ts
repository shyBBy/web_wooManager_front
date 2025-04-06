import { createTheme } from "@mui/material/styles";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/asap';
import "@fontsource/bebas-neue";
import '@fontsource/inter'; // Nowoczesna czcionka
import '@fontsource/roboto-flex';

const theme = createTheme({
    palette: {
        primary: {
            main: "#6C63FF",
        },
        secondary: {
            main: "#5A54E6",
        },
        background: {
            default: "#1E1E2F",
            paper: "#252537",
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#B0B0B0",
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Arial', sans-serif",
        h1: {
            fontSize: '2rem',
            fontWeight: 700,
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 600,
        },
        h6: {
            fontSize: "1rem", // Domyślny rozmiar
            fontWeight: 600,
            [`@media (max-width:600px)`]: {
                fontSize: "0.9rem", // Mniejszy rozmiar na małych ekranach
            },
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 400,
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 300,
        },
        body1: {
            fontSize: "0.875rem", // Domyślny rozmiar
            [`@media (max-width:600px)`]: {
                fontSize: "0.8rem", // Mniejszy rozmiar na małych ekranach
            },
        },
        body2: {
            fontSize: "0.75rem", // Domyślny rozmiar
            [`@media (max-width:600px)`]: {
                fontSize: "0.7rem", // Mniejszy rozmiar na małych ekranach
            },
        },
        button: {
            textTransform: 'none', // Brak kapitalizacji w przyciskach
        },
    },
    shape: {
        borderRadius: 16, // Zaokrąglone rogi
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    lineHeight: 1.5, // Ustawienie linii tekstu
                },
            },
        },
    },
});

export default theme;