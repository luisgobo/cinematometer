import React from "react";
import "./styles/star-check.scss"

export interface StarCheckProps {
    isReadOnly: boolean;
    isChecked: boolean;
    HandleFavoriteSelection: any;
}

export const StarCheck: React.FC<StarCheckProps> = ({
    isReadOnly,
    isChecked,
    HandleFavoriteSelection

}) => {

    //const [checkedValue, setCheckedValue] = React.useState(false)
    
    const handleFavorite = (event: { persist: () => void; target: { value: any; type: any; }; }) => {
        event.persist()
        const { type } = event.target

        console.log("type: ",type);
        if (type === 'checkbox') {
            console.log("isChecked: ",isChecked);
            HandleFavoriteSelection(!isChecked);
            //setCheckedValue(!isChecked);
        }
    }

    // React.useEffect(() => {
    //     console.log("handle is chacked first time:", checkedValue );
    //     setCheckedValue(isChecked);
        
    // }, [])

    // React.useEffect(() => {
    //     console.log("handle is chacked:", checkedValue );        
    //     HandleFavoriteSelection(checkedValue);
    // }, [checkedValue])
    

    return (
        <div>            
            <label className="toggler-wrapper style-23">
                {/* <input type="checkbox" onChange={handleFavorite}  checked={checkedValue}/> */}
                <input type="checkbox" onChange={handleFavorite}  checked={isChecked}/>
                <div className="toggler-slider">
                    <div className="toggler-knob"></div>
                </div>
            </label>            
            <div className="badge">Add it to your favorites</div>
        </div>

    );
}
