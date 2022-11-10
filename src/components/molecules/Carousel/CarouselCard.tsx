import { Movie } from "../../../models/movie"
import { Image } from "semantic-ui-react";
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
                <Image
                    draggable={false}
                    className="image-size"
                    src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                />
                <div className="container">
                    <h4><b>{movie?.title}</b> ({movie?.original_title}) </h4>
                    <p>Vote average: {movie?.vote_average}/10</p>                    
                    <button className="button" onClick={() => displayModal(movie?.id, movie?.vote_average)} >More details</button>
                </div>
            </div>
        </>
    );
}
