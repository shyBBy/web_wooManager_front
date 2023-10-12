import React from "react";
import {MainLayout} from "../layouts/MainLayout";
import {Orders} from "../components/Orders/Orders";

export const OrdersPage = () => {
    return (
        <MainLayout>
            <>
                <Orders/>
            </>
        </MainLayout>
    )
}