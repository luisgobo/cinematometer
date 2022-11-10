import React from "react";
import { Value } from "sass";
import "./styles/stars-evaluation.scss"

export interface StarEvaluationProps {
    isReadOnly: boolean;
    ratingValue: number;
    HandleSelectedRate: any;
}

export const StarEvaluation: React.FC<StarEvaluationProps> = ({
    isReadOnly,
    ratingValue,
    HandleSelectedRate

}) => {

    const handleRate = (event: { persist: () => void; target: { value: any; type: any; }; }) => {
        event.persist()
        const { value, type } = event.target

        if (type === 'radio') {
            HandleSelectedRate(value);
        }
    }

    const [roundedRate, setRoundedRate] = React.useState(0);
    const [defaultChecked, setDefaultChecked] = React.useState(false);

    React.useEffect(() => {

        if (ratingValue > 0 && isReadOnly) {
            console.log("ratingValue", ratingValue);
            console.log("isReadOnly", isReadOnly);
            const roundedVal = Math.round(ratingValue);
            console.log("roundedVal:", roundedVal);
            setRoundedRate(roundedVal)
        }



    }, [isReadOnly, ratingValue])

    function verifyIsChecked(radioValue: number): boolean {
        console.log("verifyIsChecked:",roundedRate, radioValue);
        if (roundedRate > 0 && radioValue === roundedRate && defaultChecked === false){
            setDefaultChecked(true);
            return true;
        }

        return false;
    }

    return (                
        <fieldset className="rate">
            <input type="radio" id="rating10"name="rating" value="10"readOnly={isReadOnly} onChange={handleRate} /><label htmlFor="rating10" title="5 stars"></label>
            <input type="radio" id="rating9" name="rating" value="9" readOnly={isReadOnly} onChange={handleRate} /> <label className="half" htmlFor="rating9" title="4 1/2 stars"></label>
            <input type="radio" id="rating8" name="rating" value="8" readOnly={isReadOnly} onChange={handleRate} /> <label htmlFor="rating8" title="4 stars"></label>
            <input type="radio" id="rating7" name="rating" value="7" readOnly={isReadOnly} onChange={handleRate} /> <label className="half" htmlFor="rating7" title="3 1/2 stars"></label>
            <input type="radio" id="rating6" name="rating" value="6" readOnly={isReadOnly} onChange={handleRate} /> <label htmlFor="rating6" title="3 stars"></label>
            <input type="radio" id="rating5" name="rating" value="5" readOnly={isReadOnly} onChange={handleRate} /> <label className="half" htmlFor="rating5" title="2 1/2 stars"></label>
            <input type="radio" id="rating4" name="rating" value="4" readOnly={isReadOnly} onChange={handleRate} /> <label htmlFor="rating4" title="2 stars"></label>
            <input type="radio" id="rating3" name="rating" value="3" readOnly={isReadOnly} onChange={handleRate} /> <label className="half" htmlFor="rating3" title="1 1/2 stars"></label>
            <input type="radio" id="rating2" name="rating" value="2" readOnly={isReadOnly} onChange={handleRate} /> <label htmlFor="rating2" title="1 star"></label>
            <input type="radio" id="rating1" name="rating" value="1" readOnly={isReadOnly} onChange={handleRate} /> <label className="half" htmlFor="rating1" title="1/2 star"></label>
        </fieldset>

    );
}
