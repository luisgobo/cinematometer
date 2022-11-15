import React from "react";
import { useFierbase } from "../../context/use-firebase";
import { useMovies } from "../../context/use-movies";
import { Movie } from "../../models/movie";
import { DashboardLayout } from "../layouts/dashboard/DashboardLayout"
import ProtectedPage from "../layouts/ProtectedPage"
import { InfoCarousel } from "../organisms/Carousel/InfoCarousel";
import { MovieInfoModal } from "../organisms/Movie/MovieInfoModal"

export const FavoriteMovies = () => {

    const {
        retrieveFavoriteMoviesInfo,
        pivotMovieList,
        toggleModal,
    } = useMovies();

    const {
        appUser,
        getFavoriteMovieIds
    } = useFierbase();

    const [listStatus, setListStatus] = React.useState("")
    const [moviesList, setMoviesList] = React.useState<Movie[]>([])
    const [displayFavoritesCarousel, setDisplayFavoritesCarousel] = React.useState(false)

    function processMovieList(movies: Movie[] | undefined) {
        return movies === undefined ? [] : movies;
    }

    React.useEffect(() => {
        getFavoriteMovieIds(appUser?.authenticationId)
            .then(async (movieIdList) => {
                await retrieveFavoriteMoviesInfo(movieIdList)
            })
    }, [appUser?.authenticationId, getFavoriteMovieIds])


    React.useEffect(() => {        
        if (pivotMovieList && pivotMovieList?.length >0 ){
            setMoviesList(pivotMovieList)
            setListStatus("success")
        }
                
    }, [pivotMovieList])

    React.useEffect(() => {
        if (listStatus === "success" && moviesList?.length >0 ){
            setDisplayFavoritesCarousel(true);            
        }
                
    }, [listStatus, moviesList])


    return (
        <ProtectedPage>
            <DashboardLayout>
                {
                    displayFavoritesCarousel ? 
                        <div>
                            <div className="modal-background" onClick={toggleModal} />
                            <div className="modal">
                                <span className="close-modal" onClick={toggleModal}>X</span>
                                <MovieInfoModal HandleUpdateFavoriteCardStatus={undefined} />
                            </div>
                            <InfoCarousel
                                title={"Favorites"}
                                movieList={moviesList}
                                listStatus={listStatus}
                            />
                        </div>
                        :<></>
                }
            </DashboardLayout>

        </ProtectedPage>
    )
}
