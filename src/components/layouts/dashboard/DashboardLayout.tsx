import React from "react";

import { NavSidebar } from "./NavSidebar";
import { TitleBar } from "./TitleBar";
import { DashboardContent } from "./DashboardContent";
import "../../../styles/dashboard.scss"

type DashboardLayoutProps = {
    children: JSX.Element | JSX.Element[]
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
    children 
}) => {
    return (
        <main>
            <TitleBar />
            <div className="flex">
                <NavSidebar />
                <DashboardContent children={children} />
            </div>
        </main>
    );
};