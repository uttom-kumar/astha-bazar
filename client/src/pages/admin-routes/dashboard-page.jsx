import React from 'react';
import DashLayout from "@/components/Dashboard/dashboard-layout/dash-layout.jsx";
import MainDashboardComponent from "@/components/Dashboard/dashboard-component/main-dashboard-component.jsx";

const DashboardPage = () => {
    return (
        <DashLayout>
            <MainDashboardComponent />
        </DashLayout>
    );
};

export default DashboardPage;