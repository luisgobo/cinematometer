import { Link } from '@mui/material';
import { useFierbase } from "../../../context/use-firebase";
import "../../../styles/dashboard.scss"
import cinematometer_logo2 from "../../../resources/cinematometer_logo2.png"

export const TitleBar = () => {

    const { appUser } = useFierbase();

    return (
        <>
            <div className="title-bar">
                <div className="app-tittle">
                <img className="img-title" src={cinematometer_logo2} alt="logo" />
                    <h1>Cinematometer</h1>
                </div>
                <div className="search-criteria">
                    <div className="search-criteria-textbox"/>                        
                    <div className="search-criteria-button"/>
                </div>
                <div className="user-info">
                { appUser?.name ? ( <p>Hi! {appUser.name}</p> ) : ( <p>No user logged? Go to <Link href="/login" underline="none">{"here"}</Link> </p> ) }                
                </div>
            </div>
        </>
    );
}