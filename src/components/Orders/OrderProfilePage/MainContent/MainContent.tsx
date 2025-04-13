import React, { useState } from "react";
import {
    Box,
    Grid,
    Typography,
    Tabs,
    Tab,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Card,
    CardContent,
    CardHeader,
    Avatar,
    Button,
    Stepper,
    Step,
    StepLabel,
    StepContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InfoIcon from "@mui/icons-material/Info";
import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description"; // Import nowej ikony
import { a11yProps, TabPanel } from "../../../TabPanel";
import { getStatusColor, OrderStatusConverter } from "../../../../helpers/orderStatusConverter";
import theme from "../../../../theme";
import { GetOneOrderResponse } from "../../../../types/order/order";

interface MainContentProps {
    data: GetOneOrderResponse;
}

export const MainContent: React.FC<MainContentProps> = ({ data }) => {
    const { order, shipping, shipping_tracking } = data;

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // Funkcja sprawdzająca, czy zamówienie ma fakturę VAT
    const hasVatInvoice = (): boolean => {
        const vatMeta = order?.meta_data?.find((meta) => meta.key === "billing_vat");
        return vatMeta?.value === "1";
    };

    return (
        <>
            {/* Nagłówek zamówienia */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            background: "linear-gradient(145deg, #1E1E2F, #252537)",
                            borderRadius: "12px",
                            color: "#fff",
                        }}
                    >
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: order ? getStatusColor(order.status) : "grey" }}>
                                    <ShoppingCartIcon />
                                </Avatar>
                            }
                            title={order ? `Zamówienie #${order.id}` : "Zamówienie"}
                            subheader={order ? `Utworzone: ${order.date_created}` : "Utworzone: brak danych"}
                        />
                        <CardContent>
                            <Typography variant="body2" mt={2}>
                                Kwota całkowita: {order ? `${order.total} ${order.currency}` : "Brak danych"}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            background: "linear-gradient(145deg, #1E1E2F, #252537)",
                            borderRadius: "12px",
                            color: "#fff",
                        }}
                    >
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                                    <InfoIcon />
                                </Avatar>
                            }
                            title="Klient"
                            subheader={order ? `${order.billing.first_name} ${order.billing.last_name}` : "Brak danych"}
                        />
                        <CardContent>
                            <Typography variant="body2">Email: {order ? order.billing.email : "Brak danych"}</Typography>
                            <Typography variant="body2">Telefon: {order ? order.billing.phone : "Brak danych"}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Zakładki */}
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="zakładki zamówienia">
                        <Tab icon={<InfoIcon />} label="Szczegóły zamówienia" {...a11yProps(0)} />
                        <Tab icon={<LocalShippingIcon />} label="Informacje o wysyłce" {...a11yProps(1)} />
                        <Tab icon={<ShoppingCartIcon />} label="Produkty w zamówieniu" {...a11yProps(2)} />
                        <Tab icon={<LocalShippingIcon />} label="Historia przesyłki" {...a11yProps(3)} />
                    </Tabs>
                </Box>

                {/* Szczegóły zamówienia */}
                <TabPanel value={value} index={0}>
                    <Grid container spacing={2}>
                        {/* Szczegóły zamówienia */}
                        <Grid item xs={12} md={6}>
                            <Card sx={{ p: 2 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                                            <InfoIcon />
                                        </Avatar>
                                    }
                                    title="Szczegóły zamówienia"
                                />
                                <CardContent>
                                    <Typography variant="body2">
                                        <strong>ID zamówienia:</strong> {order ? order.id : "Brak danych"}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Status:</strong> {order ? OrderStatusConverter(order.status) : "Brak danych"}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Data utworzenia:</strong> {order ? order.date_created : "Brak danych"}
                                    </Typography>
                                    <Typography variant="body2">
                                        <strong>Kwota całkowita:</strong> {order ? `${order.total} ${order.currency}` : "Brak danych"}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Informacje o fakturze VAT */}
                        <Grid item xs={12} md={6}>
                            <Card sx={{ p: 2 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                                            <DescriptionIcon /> {/* Nowa ikona */}
                                        </Avatar>
                                    }
                                    title="Faktura VAT"
                                />
                                <CardContent>
                                    {hasVatInvoice() ? (
                                        <>
                                            <Typography variant="body2">
                                                <strong>Faktura VAT:</strong> Tak
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong>Nazwa firmy:</strong> {order?.billing?.company || "Brak danych"}
                                            </Typography>
                                            <Typography variant="body2">
                                                <strong>NIP:</strong>{" "}
                                                {order?.meta_data?.find((meta) => meta.key === "_billing_tax_no")?.value || "Brak danych"}
                                            </Typography>
                                        </>
                                    ) : (
                                        <Typography variant="body2">
                                            <strong>Faktura VAT:</strong> Nie
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </TabPanel>

                {/* Informacje o wysyłce */}
                <TabPanel value={value} index={1}>
                    {shipping ? (
                        <Card sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Informacje o wysyłce
                            </Typography>
                            <Typography variant="body2">Nadawca: {shipping.sender.name}</Typography>
                            <Typography variant="body2">Odbiorca: {shipping.receiver.name}</Typography>
                            <Typography variant="body2">
                                Adres odbiorcy: {shipping.receiver.street}, {shipping.receiver.city}
                            </Typography>
                            <Typography variant="body2">Kod pocztowy: {shipping.receiver.postcode}</Typography>
                            <Typography variant="body2">Kraj: {shipping.receiver.country_code}</Typography>
                            <Typography variant="body2">Przewoźnik: {shipping.service}</Typography>

                            {/* Pobranie numeru paczki z meta_data */}
                            {order && order.meta_data && (
                                <>
                                    {order.meta_data.map((meta) => {
                                        if (meta.key === "tracking_info" && meta.value) {
                                            const trackingNumber = Object.keys(meta.value)[0];
                                            const trackingUrl = `https://furgonetka.pl/zlokalizuj/${trackingNumber}`;
                                            return (
                                                <Box key={meta.id} sx={{ mt: 2 }}>
                                                    <Typography variant="body2">Numer paczki: {trackingNumber}</Typography>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        href={trackingUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        sx={{ mt: 1 }}
                                                    >
                                                        Śledź przesyłkę
                                                    </Button>
                                                </Box>
                                            );
                                        }
                                        return null;
                                    })}
                                </>
                            )}
                        </Card>
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            Brak informacji o wysyłce.
                        </Typography>
                    )}
                </TabPanel>

                {/* Produkty w zamówieniu */}
                <TabPanel value={value} index={2}>
                    {order && order.line_items && order.line_items.length > 0 ? (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Produkt</TableCell>
                                        <TableCell>Ilość</TableCell>
                                        <TableCell>Cena</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.line_items.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>{item.total} {order.currency}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            Brak produktów w zamówieniu.
                        </Typography>
                    )}
                </TabPanel>

                {/* Historia przesyłki */}
                <TabPanel value={value} index={3}>
                    {shipping_tracking && shipping_tracking.tracking.length > 0 ? (
                        <Box sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Historia przesyłki
                            </Typography>
                            <Stepper orientation="vertical">
                                {shipping_tracking.tracking.map((event, index) => (
                                    <Step key={index} active={true}>
                                        <StepLabel>
                                            <Typography variant="body2" color="textPrimary">
                                                {event.status}
                                            </Typography>
                                        </StepLabel>
                                        <StepContent>
                                            <Typography variant="body2" color="textSecondary">
                                                Data: {new Date(event.datetime).toLocaleString()}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Oddział: {event.branch || "Brak danych"}
                                            </Typography>
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    ) : (
                        <Typography variant="body2" color="textSecondary">
                            Brak historii przesyłki.
                        </Typography>
                    )}
                </TabPanel>
            </Box>
        </>
    );
};