import React, { PropsWithChildren } from "react";

const Section: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <section style={{ margin: "20px 0 20px 0" }}>
            {children}
        </section>
    );
};

export default Section;