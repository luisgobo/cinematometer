import React from "react";

type DashboardContentProps = {
    children: JSX.Element | JSX.Element[],
};

export const DashboardContent = ({ children }: DashboardContentProps) => {
    return (
        <main className="dashboard-content">
            <section>
                    {children}
            </section>
        </main>
    );
};