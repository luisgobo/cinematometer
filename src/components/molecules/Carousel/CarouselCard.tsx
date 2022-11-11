import { Movie } from "../../../models/movie"
import '../../../styles/carousel-card.scss';
import { useMovies } from "../../../context/use-movies";
import { StarEvaluation } from "../../atoms/StarEvaluation";

export interface CarouselCardProps {
    movie: Movie;
}

export const CarouselCard: React.FC<CarouselCardProps> = ({
    movie,    
}) => {

    const{
        setSelectedMovieId,
        setSelectedMovieRate,
        toggleModal
    } = useMovies();

    const displayModal = (movieId: number, movieRate: number) => {
        setSelectedMovieId(movieId);
        setSelectedMovieRate(movieRate)
        return toggleModal();
    }

    return (
        <>                    
            <div className="card" key={movie?.id}>            
                <img
                    alt={movie?.title}
                    className="image-size"
                    src={`${process.env.REACT_APP_IMAGES_ENDPOINT}/${movie?.poster_path}`}
                />
                <div className="container">
                    <h4  className="card-movie-title1"><b>{movie?.title}</b></h4>
                    <h5 className="card-movie-title2">{movie?.original_title} </h5>
                    <p className="vote-average">Vote average: {movie?.vote_average}/10</p>
                    {/* <p>Vote average: {Math.round(movie?.vote_average)}</p>
                    <StarEvaluation isReadOnly={true} roundedRate={Math.round(movie?.vote_average)} HandleSelectedRate={undefined} /> */}
                    <button className="button" onClick={() => displayModal(movie?.id, movie?.vote_average)} >More details</button>
                </div>
            </div>
        </>
    );
}
