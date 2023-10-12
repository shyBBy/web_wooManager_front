import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";

export const NotLogin = () => {
    return(
        <>
            <Routes>
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>
        </>
    )
}