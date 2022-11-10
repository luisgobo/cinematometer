import { useMovies } from "../../../context/use-movies";
import { StarEvaluation } from "../../atoms/StarEvaluation";

export const MovieInfo = () => {

    const handleSelectedRate = ((ratedValue: number) => {
        console.log("ratedValue", ratedValue);
    });

    const {
        selectedMovieId,
        selectedMovieRate
    } = useMovies();


    return (
        <>
            <h2>Modal Window</h2>
            <p>
                You have opened the modal, they are great for confirming actions or
                displaying critical information.
            </p>
            <div>
                <p>Movie ID: {selectedMovieId}</p>
                <StarEvaluation isReadOnly={false} ratingValue={selectedMovieRate} HandleSelectedRate={handleSelectedRate} />
            </div>
            {/* Rate and comments */}

        </>
    );
}
