import React from "react";
import "./styles/stars-evaluation.scss"

export interface StarEvaluationProps {
    isReadOnly: boolean;
    roundedRate: number;
    HandleSelectedRate: any;
}

export const StarEvaluation: React.FC<StarEvaluationProps> = ({
    isReadOnly,
    roundedRate,
    HandleSelectedRate

}) => {

    const handleRate = (event: { persist: () => void; target: { value: any; type: any; }; }) => {
        event.persist()
        const { value, type } = event.target

        if (type === 'radio') {
            HandleSelectedRate(value);
        }
    }

    return (                        
        <fieldset className={isReadOnly ? "rate read-only" : "rate" } >
            <input type="radio" id="rating10"name="rating" value="10"defaultChecked={roundedRate !== 0 && roundedRate === 10} onChange={handleRate} /><label htmlFor="rating10" title="5 stars"></label>
            <input type="radio" id="rating9" name="rating" value="9" defaultChecked={roundedRate !== 0 && roundedRate === 9} onChange={handleRate} /> <label className="half" htmlFor="rating9" title="4 1/2 stars"></label>
            <input type="radio" id="rating8" name="rating" value="8" defaultChecked={roundedRate !== 0 && roundedRate === 8} onChange={handleRate} /> <label htmlFor="rating8" title="4 stars"></label>
            <input type="radio" id="rating7" name="rating" value="7" defaultChecked={roundedRate !== 0 && roundedRate === 7} onChange={handleRate} /> <label className="half" htmlFor="rating7" title="3 1/2 stars"></label>
            <input type="radio" id="rating6" name="rating" value="6" defaultChecked={roundedRate !== 0 && roundedRate === 6} onChange={handleRate} /> <label htmlFor="rating6" title="3 stars"></label>
            <input type="radio" id="rating5" name="rating" value="5" defaultChecked={roundedRate !== 0 && roundedRate === 5} onChange={handleRate} /> <label className="half" htmlFor="rating5" title="2 1/2 stars"></label>
            <input type="radio" id="rating4" name="rating" value="4" defaultChecked={roundedRate !== 0 && roundedRate === 4} onChange={handleRate} /> <label htmlFor="rating4" title="2 stars"></label>
            <input type="radio" id="rating3" name="rating" value="3" defaultChecked={roundedRate !== 0 && roundedRate === 3} onChange={handleRate} /> <label className="half" htmlFor="rating3" title="1 1/2 stars"></label>
            <input type="radio" id="rating2" name="rating" value="2" defaultChecked={roundedRate !== 0 && roundedRate === 2} onChange={handleRate} /> <label htmlFor="rating2" title="1 star"></label>
            <input type="radio" id="rating1" name="rating" value="1" defaultChecked={roundedRate !== 0 && roundedRate === 1} onChange={handleRate} /> <label className="half" htmlFor="rating1" title="1/2 star"></label>
        </fieldset>
    );
}
