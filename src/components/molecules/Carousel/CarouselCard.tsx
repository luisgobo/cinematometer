import { Movie } from "../../../models/movie"
import { Image } from "semantic-ui-react";
import '../../../styles/carousel-card.scss';

export interface CarouselCardProps {
    movie: Movie;
    toggleModal: Function;
}

export const CarouselCard: React.FC<CarouselCardProps> = ({
    movie,
    toggleModal
}) => {

    const displayModal = () => {    
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
                    <button onClick={displayModal}>More details</button>
                </div>
            </div>
        </>
    );
}
