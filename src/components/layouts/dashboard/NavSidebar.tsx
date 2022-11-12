import { Link} from "react-router-dom";
import "../../../styles/dashboard.scss"
import { useFierbase } from "../../../context/use-firebase";

export const NavSidebar = () => {
    const {logout}= useFierbase();    

    const handleLogout= ()=>{
        logout();        
    }       

    return (
        <div className="sidebar">
            <Link to="/" className="fa fa-fw fa-home"> Home</Link>            
            <Link to="/favoriteMovies" className="fa fa-fw fa-home"> Favorite Movies</Link> 
            <Link onClick={handleLogout} className="fa fa-fw fa-home" to={"/login"}> Logout</Link> 
        </div>        
    );
};
