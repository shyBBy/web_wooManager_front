import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {DashboardPage} from "../pages/DashboardPage";
import {NotFound404} from "./NotFound404";
import {UserProfilePage} from "../pages/User/UserProfilePage";
import {AdminPage} from "../pages/AdminPage";
import {UsersPage} from "../pages/User/UsersPage";
import {TutorialsPage} from "../pages/TutorialsPage";
import {OrdersPage} from "../pages/OrdersPage";
import { CreateStorePage } from "../pages/CreateStorePage"

export const AuthenticatedApp = () => {

    const {user} = useAuth();


    return (
        <>
            <Routes>
                <Route path="/dashboard" element={<DashboardPage/>}/>
                <Route path="/users" element={<UsersPage/>}/>
                <Route path="/user/:id" element={<UserProfilePage/>}/>
                <Route path='/admin' element={<AdminPage/>}/>
                <Route path='/orders' element={<OrdersPage/>}/>
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