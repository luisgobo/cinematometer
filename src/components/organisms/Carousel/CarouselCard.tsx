import { Movie } from "../../../models/movie"
import { Image } from "semantic-ui-react";

export interface CarouselCardProps {
    movie: Movie
}

export const CarouselCard: React.FC<CarouselCardProps> = ({
    movie
}) => {

    const movieInfo = movie ?? {};
    console.log("movieInfo", movieInfo)
    console.log("movie", movie)

    return (
        <div>
            <Image
                draggable={false}
                style={{ width: "50%", height: "80%", }}
                src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            />
        </div>
    );
}
