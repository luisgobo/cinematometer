import { useMovies } from "../../../context/use-movies";
import { StarEvaluation } from "../../atoms/StarEvaluation";
import "../../../styles/movie-info.scss"
import "../../../styles/user-opinion.scss"
import React from "react";
import { UserOpinionForm } from "../UserInteraction/UserOpinionForm";
import { useFierbase } from "../../../context/use-firebase";
import { UserOpinionListByMovie } from "../UserInteraction/UserOpinionListByMovie";
import { StarCheck } from "../../atoms/StarCheck";
import { Link } from "react-router-dom";

export interface MovieInfoModalProps {
    HandleUpdateFavoriteCardStatus: Function | undefined;
}

export const MovieInfoModal: React.FC<MovieInfoModalProps>  = ({
    HandleUpdateFavoriteCardStatus
}) => {

    const[isFavorite, setIsFavorite] = React.useState(false);
    const [roundedRate, setRoundedRate] = React.useState(0);
    const [refreshCommentList, setRefreshCommentList] = React.useState(false);

    
    const {
        selectedMovieRate,
        specificMovie: movie,
        specificMovieStatus,
    } = useMovies();

    const { 
        appUser,
        checkIfExistFavorite,
        insertFavoriteMovieByUser,
        deleteFavoriteMovieByUser
    } = useFierbase();
    
    const handleUpdateComments = ((refreshList: boolean) => {
        console.log("Update list:", refreshList);
        
        setRefreshCommentList(refreshList);
    });

    const handleSelectedRate = ((ratedValue: number) => {
        //console.log("ratedValue:", ratedValue);
    });

    // const handleShowComments = () => {
    //     setExtendCommentPane(true);        
    // }

    // const handleHideComments = () => {
    //     setExtendCommentPane(false);
    // }
    
    const handleFavoriteSelection = async (favoriteOptionSelected: boolean)=>{        
        setIsFavorite(favoriteOptionSelected);
        
        if(appUser?.authenticationId !== undefined && movie?.id){
                if(favoriteOptionSelected){
                    await insertFavoriteMovieByUser("", appUser?.authenticationId, movie?.id);
                    return;
                }
                if(!favoriteOptionSelected){
                    deleteFavoriteMovieByUser(appUser?.authenticationId, movie?.id);                    
                }
            
        }        
    }

    React.useEffect(() => {

        if (appUser && movie) {
            checkIfExistFavorite(appUser.authenticationId, movie.id).then((result) =>{                
                setIsFavorite(result? result: false);
            });
        }
    }, [appUser, movie, checkIfExistFavorite])

    React.useEffect(() => {
        if(HandleUpdateFavoriteCardStatus)
            HandleUpdateFavoriteCardStatus(movie?.id);
    
    }, [isFavorite])
    

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
                    <div className="popup-container">

                        <div className="movie-card popup-child">
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
                        <div className="popup-child">
                            <UserOpinionForm
                                userId={appUser?.authenticationId === undefined ? "" : appUser.authenticationId}
                                movieId={movie?.id} HandleUpdateComments={handleUpdateComments}/>                            
                        </div>
                        <div className="popup-child">                                                        
                            <UserOpinionListByMovie movieId={movie?.id} refreshMovieComments={refreshCommentList} />
                        </div>
                            
                    </div>
                    : null
                }
            </div>

        </>
    );
}
