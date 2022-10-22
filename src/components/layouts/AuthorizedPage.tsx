import React, { PropsWithChildren } from 'react';
import { useFierbase } from '../../context/use-firebase';
import { useNavigate } from "react-router-dom";

const AuthorizedPage: React.FC<PropsWithChildren> = ({children}) => {

    const { firebaseUser, hasAuthLoaded } = useFierbase();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (firebaseUser){
            console.log('firebase user found')
            navigate("/");      
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

export default AuthorizedPage
