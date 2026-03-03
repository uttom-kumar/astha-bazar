import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import HomePage from "@/pages/user-routes/home-page.jsx";
import DashboardPage from "@/pages/admin-routes/dashboard-page.jsx";
import AdminRoutes from "@/protected-routes/admin-routes.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route  path="/" element={<HomePage />} />
                <Route  path="/dashboard" element={
                    // <AdminRoutes>
                    //     <DashboardPage />
                    // </AdminRoutes>
                    <DashboardPage />
                    } />
            </Routes>
        </BrowserRouter>
    );
};

export default App;