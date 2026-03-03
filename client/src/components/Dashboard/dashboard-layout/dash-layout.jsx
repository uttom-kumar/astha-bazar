import React, { useState, useEffect } from "react";
import DashSideNavbar from "@/components/Dashboard/dashboard-layout/dash-side-navbar.jsx";
import DashNavbar from "@/components/Dashboard/dashboard-layout/dash-navbar.jsx";

const DashLayout = ({ children }) => {
    const [open, setOpen] = useState(() => {
        const saved = localStorage.getItem("sidebar");
        return saved ? JSON.parse(saved) : true;
    });

    useEffect(() => {
        localStorage.setItem("sidebar", JSON.stringify(open));
    }, [open]);

    return (
        <div className="h-screen flex bg-muted/40 overflow-hidden">

            {/* Navbar */}
            <div className="fixed top-0 w-full z-10">
                <DashNavbar toggle={() => setOpen(prev => !prev)} />
            </div>

            {/* Sidebar + Content */}
            <div className={`flex flex-1 w-full pt-14`}>
                {/* Sidebar */}
                <DashSideNavbar open={open} />

                {/* Main Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>

        </div>
    );
};

export default DashLayout;