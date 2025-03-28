import React, {useEffect, useState} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {DashboardPage} from "../pages/DashboardPage";
import {NotFound404} from "./NotFound404";
import {AdminPage} from "../pages/AdminPage";
import {TutorialsPage} from "../pages/TutorialsPage";
import {OrdersPage} from "../pages/OrdersPage";
import { CreateStorePage } from "../pages/CreateStorePage"
import { OrderProfilePage } from "../pages/Order/OrderProfilePage";


export const AuthenticatedApp = () => {

    const {user} = useAuth();

    return (
        <>
            <Routes>
                <Route path="/dashboard" element={<DashboardPage/>}/>
                <Route path='/admin' element={<AdminPage/>}/>
                <Route path='/orders' element={<OrdersPage/>}/>
                <Route path='/order/:id' element={<OrderProfilePage/>}/>
                <Route path='/tutorials' element={<TutorialsPage/>}/>
                <Route path="/store/create" element={<CreateStorePage/>}/>
                <Route
                    path="/"
                    element={user ? <Navigate to="/dashboard" replace/> : <Navigate to="/dashboard" replace/>}
                />
                <Route
                    path="/login"
                    element={user ? <Navigate to="/dashboard" replace/> : <Navigate to="/dashboard" replace/>}
                />
                <Route
                    path="/register"
                    element={user ? <Navigate to="/dashboard" replace/> : <Navigate to="/dashboard" replace/>}
                />
                <Route path='*' element={<NotFound404/>}/>
            </Routes>
        </>
    )
}