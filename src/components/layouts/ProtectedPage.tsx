import React, { PropsWithChildren } from 'react';
import { useFierbase } from '../../context/use-firebase';
import { useNavigate } from "react-router-dom";

const ProtectedPage: React.FC<PropsWithChildren> = ({children}) => {

    const { firebaseUser, hasAuthLoaded } = useFierbase();
    const navigate = useNavigate();


    React.useEffect(() => {

        if (!firebaseUser){            
            navigate("/login");
        }
    }, [firebaseUser]);

    if (hasAuthLoaded) {
        return(
            <h1>Charging, please wait...</h1>
        );
    }

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedPage
