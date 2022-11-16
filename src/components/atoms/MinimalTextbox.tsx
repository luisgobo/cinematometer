import React from "react"
import "./styles/minimal-textbox.scss";

export interface MinimalTextboxProps {
    inputId: string
    inputLabel: string,
    handleChange: any,
    handleBlur: any,
}

export const MinimalTextbox: React.FC<MinimalTextboxProps> = ({
    inputId,
    inputLabel,
    handleChange,
    handleBlur
}) => {
    const [value, setValue] = React.useState("")

    const handleOnChange = (e: { target: { value: any } }) => {
        handleChange(e.target.value);
    }

    const handleOnBlur = (e: { target: { value: any } }) => {
        handleBlur(e);
    }

    return(
        <div>
            <input
                id={inputId}
                spellCheck= "false"
                className={`${value? "has-value": ""}`}
                onChange= {handleOnChange}
                onBlur= {handleOnBlur}
                type= "text"                
                
            />
            <label className="mtbx-label" htmlFor={inputId}>{inputLabel}</label>
        </div>
    );

}
