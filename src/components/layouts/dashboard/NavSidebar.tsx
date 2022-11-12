import { Link } from "react-router-dom";
//import Icon from "awesome-react-icons";
import "../../../styles/dashboard.scss"

export const NavSidebar = () => {

    return (
        <div className="sidebar">
            <Link to="/" className="fa fa-fw fa-home"> Home</Link>
            {/* <Link to="/login" className="fa fa-fw fa-home"> Login</Link>
            <Link to="/register" className="fa fa-fw fa-home"> Register</Link>  */}
            <Link to="/favoriteMovies" className="fa fa-fw fa-home"> Favorite Movies</Link> 
        </div>        
    );
};
