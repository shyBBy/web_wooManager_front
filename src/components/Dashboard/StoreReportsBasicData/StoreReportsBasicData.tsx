import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { MainCard } from "../../MainCard";
import Api from "../../../api/api";
import { useAuth } from "../../../hooks/useAuth";

export const StoreReportsBasicData = () => {
    const { user } = useAuth();
    const [salesReport, setSalesReport] = useState({
        total_customers: 0,
        total_orders: 0,
        total_items: 0,
        total_sales: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const report = await Api.getSalesReport();
                setSalesReport(report);
            } catch (error) {
                console.error("Error fetching sales report:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <Grid container spacing={1.5}> {/* Zmniejszone odstępy */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MainCard
                    title="Klienci"
                    count={loading ? "..." : salesReport.total_customers} // Typ string | number
                    description="Wszyscy zarejestrowani klienci."
                    icon={<GroupIcon style={{ fontSize: 24, color: "#FFFFFF" }} />}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MainCard
                    title="Zamówienia"
                    count={loading ? "..." : salesReport.total_orders} // Typ string | number
                    description="Liczba wszystkich zamówień."
                    icon={<ShoppingCartIcon style={{ fontSize: 24, color: "#FFFFFF" }} />}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MainCard
                    title="Produkty"
                    count={loading ? "..." : salesReport.total_items} // Typ string | number
                    description="Ilość wszystkich produktów w sklepie."
                    icon={<InventoryIcon style={{ fontSize: 24, color: "#FFFFFF" }} />}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MainCard
                    title="Wartość zamówień"
                    count={loading ? "..." : `$${salesReport.total_sales}`}
                    description="Łączna wartość zrealizowanych zamówień."
                    icon={<AttachMoneyIcon style={{ fontSize: 24, color: "#FFFFFF" }} />}
                />
            </Grid>
        </Grid>
    );
};
