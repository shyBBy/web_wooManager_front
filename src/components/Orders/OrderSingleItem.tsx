import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { formatDateToPolish } from "../../utils/time.utils";
import theme from "../../theme";
import { WooCommerceOrderResponse } from "../../types/order/WooCommerceOrder";
import { OrderStatusConverter } from "../../helpers/orderStatusConverter";

// Typowanie propsów komponentu
interface OrderSingleItemProps {
    order: WooCommerceOrderResponse;
}

export const OrderSingleItem: React.FC<OrderSingleItemProps> = ({ order }) => {


    // Funkcja sprawdzająca, czy zamówienie ma fakturę VAT
    const hasVatInvoice = (): boolean => {
        const vatMeta = order?.meta_data?.find((meta) => meta.key === "billing_vat");
        return vatMeta?.value === "1";
    };

    return (
        <TableRow>
            <TableCell>
                {order ? `#${order.id} ${order.billing.first_name} ${order.billing.last_name}` : "Brak danych"}
            </TableCell>
            <TableCell>{order ? formatDateToPolish(order.date_created) : "Brak danych"}</TableCell>
            <TableCell>{order ? OrderStatusConverter(order.status) : "Brak danych"}</TableCell>
            <TableCell>{hasVatInvoice() ? "TAK" : "NIE"}</TableCell> {/* Wyświetlanie TAK/NIE */}
            <TableCell align="right">
                <Link to={order ? `/order/${order.id}` : "#"}>
                    <Tooltip title="Szczegóły">
                        <IconButton sx={{ color: theme.palette.text.primary }}>
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>
                </Link>
            </TableCell>
        </TableRow>
    );
};