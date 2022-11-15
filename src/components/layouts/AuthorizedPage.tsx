import React, { PropsWithChildren } from 'react';
import { useFierbase } from '../../context/use-firebase';
import { useNavigate } from "react-router-dom";

const AuthorizedPage: React.FC<PropsWithChildren> = ({children}) => {

    const { firebaseUser, displayLoading } = useFierbase();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (firebaseUser){
            console.log('firebase user found in AuthorizedPage')
            //Commented because of conflict witn nav bar
            navigate("/");
        }
    }, [firebaseUser]);    

    if (displayLoading) {
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
