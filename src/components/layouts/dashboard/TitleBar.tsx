import { useFierbase } from "../../../context/use-firebase";
// import { LoaderButton } from "../../atoms/LoaderButton";
// import { Textbox } from "../../atoms/TextBox";
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
                    <div className="search-criteria-textbox">
                        {/* <Textbox textboxTag="mail" htmlFor="Email Address"/> */}
                    </div>
                    <div className="search-criteria-button">
                        {/* <LoaderButton buttonText="Search"/> */}
                    </div>
                </div>
                <div className="user-info">
                    <p>Hi {appUser?.name}!</p>
                </div>
            </div>
        </>
    );
}