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

                                <div className="hero" style={ {
                                        backgroundImage: movie?.belongs_to_collection ? 
                                            `url(${process.env.REACT_APP_IMAGES_ENDPOINT}/${movie?.belongs_to_collection.backdrop_path})`: 
                                            `url(${process.env.REACT_APP_IMAGES_ENDPOINT}/${movie?.backdrop_path})`
                                    }
                                }>
                                    <div className="details">
                                        <div className="title1"> {movie?.title} <span>PG-13</span></div>
                                        <div className="title2">{movie?.original_title}</div>
                                        
                                        <fieldset className="rating read-only" >
                                            <input type="radio" id="star5" name="rating" value="5" defaultChecked={roundedRate !== 0 && roundedRate === 10}/><label className="full" htmlFor="star5"
                                                title="Awesome - 5 stars"></label>
                                            <input type="radio" id="star4half" name="rating" value="4 and a half" defaultChecked={roundedRate !== 0 && roundedRate === 9} /><label className="half"
                                                htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
                                            <input type="radio" id="star4" name="rating" value="4" defaultChecked={roundedRate !== 0 && roundedRate === 8}/><label className="full" htmlFor="star4"
                                                title="Pretty good - 4 stars"></label>
                                            <input type="radio" id="star3half" name="rating" value="3 and a half" defaultChecked={roundedRate !== 0 && roundedRate === 7}/><label className="half"
                                                htmlFor="star3half" title="Meh - 3.5 stars"></label>
                                            <input type="radio" id="star3" name="rating" value="3" defaultChecked={roundedRate !== 0 && roundedRate === 6}/><label className="full" htmlFor="star3"
                                                title="Meh - 3 stars"></label>
                                            <input type="radio" id="star2half" name="rating" value="2 and a half" defaultChecked={roundedRate !== 0 && roundedRate === 5}/><label className="half"
                                                htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
                                            <input type="radio" id="star2" name="rating" value="2" defaultChecked={roundedRate !== 0 && roundedRate === 4}/><label className="full" htmlFor="star2"
                                                title="Kinda bad - 2 stars"></label>
                                            <input type="radio" id="star1half" name="rating" value="1 and a half" defaultChecked={roundedRate !== 0 && roundedRate === 3}/><label className="half"
                                                htmlFor="star1half" title="Meh - 1.5 stars"></label>
                                            <input type="radio" id="star1" name="rating" value="1" defaultChecked={roundedRate !== 0 && roundedRate === 2}/><label className="full" htmlFor="star1"
                                                title="Sucks big time - 1 star"></label>
                                            <input type="radio" id="starhalf" name="rating" value="half" defaultChecked={roundedRate !== 0 && roundedRate === 1}/><label className="half" htmlFor="starhalf"
                                                title="Sucks big time - 0.5 stars"></label>
                                        </fieldset>

                                        <span className="likes">{movie?.popularity} likes</span>

                                    </div>                                    

                                </div>                                

                                <div className="description">

                                    <div className="movie-categories">
                                        <ul className="tag-ul">
                                            {movie.genres.map((genre) => {
                                                return(
                                                    <li className="tag-li">
                                                        <span className="tag" key={genre.id}>{genre.name}</span>        
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>                                    

                                    <div className="movie-overview">
                                        <p>
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
            {/* Rate and comments */}

        </>
    );
}
