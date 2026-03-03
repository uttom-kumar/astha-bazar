import React from 'react';
import { jwtDecode } from "jwt-decode";
import { getToken } from "@/helper/utilities.js";
import { Navigate } from "react-router-dom";

const AdminRoutes = ({ children }) => {
    const token = getToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decode = jwtDecode(token);

        if (decode.role !== "admin") {
            return <Navigate to="/" replace />;
        }

        return children;

    } catch (error) {
        return <Navigate to="/login" replace />;
    }
};

export default AdminRoutes;