import React from "react";

type DashboardContentProps = {
    children: JSX.Element | JSX.Element[],
};

export const DashboardContent: React.FC<DashboardContentProps> = ({ 
    children 
}) => {
    return (
        <main className="dashboard-content div-vertical-scroll">
            <section>
                    {children}
            </section>
        </main>
    );
};