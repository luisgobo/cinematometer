import { useMovies } from "../../../context/use-movies";
import { StarEvaluation } from "../../atoms/StarEvaluation";
import "../../../styles/movie-info.scss"
import "../../../styles/user-opinion.scss"
import React from "react";
import { UserOpinionForm } from "../UserInteraction/UserOpinionForm";
import { useFierbase } from "../../../context/use-firebase";
import { UserOpinionListByMovie } from "../UserInteraction/UserOpinionListByMovie";
import { StarCheck } from "../../atoms/StarCheck";
import { isValidDateValue } from "@testing-library/user-event/dist/utils";

export const MovieInfoModal = () => {

    const[isFavorite,setIsFavorite] = React.useState(false);

    const handleSelectedRate = ((ratedValue: number) => {
        console.log("ratedValue", ratedValue);
    });

    const {
        selectedMovieRate,
        specificMovie: movie,
        specificMovieStatus,
    } = useMovies();

    const { appUser } = useFierbase();


    const [roundedRate, setRoundedRate] = React.useState(0);

    const handleFavoriteSelection = (isFavoriteSelected: boolean)=>{
        console.log("isSelected:", isFavoriteSelected);
        setIsFavorite(isFavoriteSelected);        
    }

    React.useEffect(() => {

        if (selectedMovieRate > 0) {
            const rounded = Math.round(selectedMovieRate);            
            setRoundedRate(rounded);
        }
    }, [selectedMovieRate])

    return (
        <>
            <div>
                {specificMovieStatus === "error" && <p>Error fetching data</p>}
                {specificMovieStatus === "loading" && <p>Fetching data...</p>}
                {(specificMovieStatus === "success" && movie !== undefined) ?
                    <div>

                        <div className="movie-card">
                                <div className="favorite-selection">
                                    <StarCheck isReadOnly={false} isChecked={isFavorite} HandleFavoriteSelection={handleFavoriteSelection} />
                                </div>                                
                            <div className="movie-info-container">
                                <a href={movie?.homepage}>
                                    <img
                                        alt={movie?.title}
                                        className="cover"
                                        src={`${process.env.REACT_APP_IMAGES_ENDPOINT}/${movie?.poster_path}`}
                                    />
                                </a>
                                <div className="hero" style={{
                                    backgroundImage: movie?.belongs_to_collection ?
                                        `url(${process.env.REACT_APP_IMAGES_ENDPOINT}/${movie?.belongs_to_collection.backdrop_path})` :
                                        `url(${process.env.REACT_APP_IMAGES_ENDPOINT}/${movie?.backdrop_path})`
                                }
                                }>
                                    <div className="details">
                                        <div className="title1">
                                            {movie?.title}
                                            <span className="span">PG-13</span>
                                        </div>
                                        <div className="title2">{movie?.original_title}</div>
                                        <StarEvaluation isReadOnly={true} roundedRate={roundedRate} HandleSelectedRate={handleSelectedRate} />
                                        <span className="likes">{movie?.popularity} likes</span>
                                    </div>
                                </div>
                                <div className="description">
                                    <div className="movie-categories">
                                        <ul className="tag-ul">
                                            {movie.genres.map((genre) => {
                                                return (
                                                    <li className="tag-li" key={genre.id}>
                                                        <span className="tag" key={genre.id}>{genre.name}</span>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>                                    
                                    <div className="movie-overview">
                                        <p className="div-vertical-scroll">
                                            {movie?.overview}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <UserOpinionForm
                                userId={
                                    appUser?.authenticationId === undefined ? "" : appUser.authenticationId}
                                movieId={movie?.id}
                            />
                            <UserOpinionListByMovie movieId={movie?.id} />
                        </div>
                    </div>
                    : null
                }
            </div>

        </>
    );
}
