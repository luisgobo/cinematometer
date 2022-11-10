import { StarEvaluation } from "../../atoms/StarEvaluation";

export const MovieInfo = () => {

    const handleSelectedRate = (( ratedValue: number )=>{
        console.log("ratedValue", ratedValue);
    });

    return (
    <>
        <div>
            <StarEvaluation isReadOnly={false} ratingValue={0} HandleSelectedRate={handleSelectedRate}/>
        </div>
        {/* Rate and comments */}

    </>
    );
}
