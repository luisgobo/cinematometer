import React, { PropsWithChildren } from 'react';
import { useFierbase } from '../../context/use-firebase';
import { useNavigate } from "react-router-dom";

const AuthorizedPage: React.FC<PropsWithChildren> = ({children}) => {

    const { firebaseUser, displayLoading, isLogOut, setIsLogOut } = useFierbase();
    const navigate = useNavigate();

    React.useEffect(() => {
        
        try {
            if (firebaseUser){
            console.log('firebase user found in AuthorizedPage')
            //Commented because of conflict witn nav bar
            console.log("Checking user information and firebase credentials" );            
            if(!isLogOut && firebaseUser){
                console.log("sadasdasd564a6sda")
                navigate("/");            

            }                
            else{                
                navigate("/login");
                setIsLogOut(false);

            }
        }
        } catch (error) {
          console.log(`Something went wrong: ${error}`);
        }
        
            
    }, [firebaseUser, setIsLogOut]);

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
