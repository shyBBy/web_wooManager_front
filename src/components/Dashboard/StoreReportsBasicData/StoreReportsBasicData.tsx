import React, {useEffect, useState} from "react";
import {Box, CircularProgress, Grid} from "@mui/material";
import {MainCard} from "../../MainCard";
import GroupIcon from "@mui/icons-material/Group";
import theme from "../../../theme";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {useAuth} from "../../../hooks/useAuth";
import {GetOneSalesReportResponse} from "../../../interfaces/reports.interfaces";
import Api from '../../../api/api'

export const StoreReportsBasicData = () => {

    const {user} = useAuth();
    const [store, setStore] = useState<any>(null);
    const [salesReport, setSalesReport] = useState<GetOneSalesReportResponse | null>()
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        (async () => {
            await fetchData();
        })();
    }, []);


    const fetchData = async () => {
        try {
            setLoading(true);
            const reportSalesRes = await Api.getSalesReport();
            setSalesReport(reportSalesRes);
        } catch (error) {
            console.error("Error fetching refunds", error);
        } finally {
            setLoading(false);
        }
    };

    return(
        <>
            {/* row 1 */}
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MainCard title={'Klienci'} count={loading? <CircularProgress /> : salesReport?.total_customers} description={'Wszyscy zarejestrowani klienci.'}
                          icon={<GroupIcon style={{color: theme.palette.text.primary}}/>}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MainCard title={'Zamówienia'} count={loading? <CircularProgress /> : salesReport?.total_orders}
                          description={'Liczba wszystkich zamówień.'}
                          icon={<ShoppingCartIcon style={{color: theme.palette.text.primary}}/>}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MainCard title={'Produkty'} count={loading? <CircularProgress /> : salesReport?.total_items}
                          description={'Ilość wszystkich produktów w sklepie.'}
                          icon={<InventoryIcon style={{color: theme.palette.text.primary}}/>}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <MainCard title={'Wartość zamówień'} count={loading? <CircularProgress /> : salesReport?.total_sales}
                          description={'Łączna wartość zrealizowanych zamówień.'}
                          icon={<AttachMoneyIcon style={{color: theme.palette.text.primary}}/>}/>
            </Grid>
        </>
    )
}
