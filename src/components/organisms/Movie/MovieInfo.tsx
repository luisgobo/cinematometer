import { useMovies } from "../../../context/use-movies";
import { StarEvaluation } from "../../atoms/StarEvaluation";
import "../../../styles/movie-info.scss"
import React from "react";

export const MovieInfo = () => {

    const handleSelectedRate = ((ratedValue: number) => {
        console.log("ratedValue", ratedValue);
    });

    const {
        selectedMovieRate,
        specificMovie: movie,
        specificMovieStatus,

    } = useMovies();


    const [roundedRate, setRoundedRate] = React.useState(0);
    console.log("specificMovie: ", movie);

    React.useEffect(() => {

        if (selectedMovieRate > 0) {
            const rounded = Math.round(selectedMovieRate);
            console.log("rounded:", rounded);
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
                                        <div className="title1"> {movie?.title} <span>PG-13</span></div>
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
                                                    <li className="tag-li">
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
                    </div>
                    : null
                }
            </div>            
            <p>Rate and Comments</p>

        </>
    );
}
