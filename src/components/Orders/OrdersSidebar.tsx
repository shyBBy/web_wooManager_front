import React from "react";
import { Paper, Box, Typography, Button } from "@mui/material";

export const OrdersSidebar = () => {
    return (
        <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
                Statystyki
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Typography variant="body1">W trakcie realizacji: 5</Typography>
                <Typography variant="body1">Zakończone: 10</Typography>
                <Typography variant="body1">Anulowane: 2</Typography>
            </Box>
            <Button
                variant="contained"
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => alert("Dodaj nowe zamówienie")}
            >
                Dodaj zamówienie
            </Button>
            <Button
                variant="outlined"
                fullWidth
                onClick={() => alert("Eksportuj zamówienia")}
            >
                Eksportuj zamówienia
            </Button>
        </Paper>
    );
};