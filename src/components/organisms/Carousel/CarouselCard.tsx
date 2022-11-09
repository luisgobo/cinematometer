import { Movie } from "../../../models/movie"
import { Image } from "semantic-ui-react";
import '../../../styles/carousel-card.scss';

export interface CarouselCardProps {
    movie: Movie
}

export const CarouselCard: React.FC<CarouselCardProps> = ({
    movie
}) => {
    return (

        <div className="card" key={movie?.id}>
            <Image
                draggable={false}
                className="image-size"
                src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            />
            <div className="container">
                <h4><b>{movie?.title}</b> ({movie?.original_title}) </h4>
                
                <p>Vote average: { movie?.vote_average }/10</p>
            </div>
        </div>
    );
}
