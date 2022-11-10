import { Movie } from "../../../models/movie"
import { Image } from "semantic-ui-react";
import '../../../styles/carousel-card.scss';
import { useMovies } from "../../../context/use-movies";

export interface CarouselCardProps {
    movie: Movie;
}

export const CarouselCard: React.FC<CarouselCardProps> = ({
    movie,    
}) => {

    const{
        setSelectedMovie,
        toggleModal
    } = useMovies();

    const displayModal = (movieId: number) => {
        setSelectedMovie(movieId);
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
                    <button className="button" onClick={() => displayModal(movie?.id)} >More details</button>
                </div>
            </div>
        </>
    );
}
