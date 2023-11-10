import { Movie } from "../../../models/movie"
import '../../../styles/carousel-card.scss';
import { useMovies } from "../../../context/use-movies";
import React from "react";
import { useFierbase } from "../../../context/use-firebase";

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

    const {        
        checkIfExistFavorite,
        appUser
    } = useFierbase();

    const displayModal = (movieId: number, movieRate: number) => {
        setSelectedMovieId(movieId);
        setSelectedMovieRate(movieRate)
        return toggleModal();
    }

    const [isFavorite, setIsFavorite]= React.useState(false);

    React.useEffect(() => {
        
        console.log(`appUser: ${appUser}`);
            
        checkIfExistFavorite(appUser?.authenticationId,movie.id)
        .then(async (isFavoriteResult) =>{
            console.log(`isFavoriteRes: ${isFavoriteResult}`);
            setIsFavorite(isFavoriteResult? true : false );
        });
    }, [movie, appUser, checkIfExistFavorite])
    

    return (
        <>                    
            <div className="card" key={movie?.id}>
                <div className="favorite-card">
                    <div className={isFavorite ? "star": ""}></div>
                </div>         
                <div className="img-card">
                    <img
                        alt={movie?.title}
                        className="image-size"
                        src={`${process.env.REACT_APP_IMAGES_ENDPOINT}/${movie?.poster_path}`}
                    />
                </div>
                <div className="container">
                    <h4  className="card-movie-title1"><b>{movie?.title}</b></h4>
                    <h5 className="card-movie-title2">{movie?.original_title} </h5>
                    <p className="vote-average">Vote average: {movie?.vote_average}/10</p>                    
                    <button className="button" onClick={() => displayModal(movie?.id, movie?.vote_average)} >More details</button>
                </div>
            </div>
        </>
    );
}
