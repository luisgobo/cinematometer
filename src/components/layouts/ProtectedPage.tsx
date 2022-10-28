import React, { PropsWithChildren } from 'react';
import { useFierbase } from '../../context/use-firebase';
import { useNavigate } from "react-router-dom";

const ProtectedPage: React.FC<PropsWithChildren> = ({children}) => {

    const { firebaseUser, displayLoading } = useFierbase();
    const navigate = useNavigate();

    const loadingScreen = () => {
        return(
            <h1>Charging, please wait...</h1>
        );
    }


    React.useEffect(() => {

        if (!firebaseUser){  
                navigate("/login");           
        }
    }, [firebaseUser]);

    if (displayLoading) {
        loadingScreen();
    }

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedPage
