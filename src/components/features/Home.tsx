import React from "react";
import { useMovies } from "../../context/use-movies";
import ProtectedPage from "../layouts/ProtectedPage";
import { InfoCarousel } from "../organisms/Carousel/InfoCarousel";
import { Movie } from "../../models/movie";
import { DashboardLayout } from "../layouts/dashboard/DashboardLayout";
import "../../styles/popup-modal.scss"
import { MovieInfoModal } from "../organisms/Movie/MovieInfoModal";

export const Home = () => {

  const {
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    upComingMovies,

    nowPlayingMoviesStatus,
    popularMoviesStatus,
    topRatedMoviesStatus,
    upComingMoviesStatus,    
    toggleModal

  } = useMovies();
  
    const [updateFavoriteCard, setUpdateFavoriteCard] = React.useState(false);
    const [newUpdateFavoriteCard, setNewUpdateFavoriteCard] = React.useState(0);

  function processMovieList(movies: Movie[] | undefined) {
    return movies === undefined ? [] : movies;
  }

  const handleUpdateFavoriteCardStatus= (movieId: number) =>{
      setNewUpdateFavoriteCard(movieId);
      setUpdateFavoriteCard(true);
  }

  return (
    //<ProtectedPage>

      <DashboardLayout>
        {
          <div>
            <div className="modal-background" onClick={toggleModal}/>
            <div className="modal">
              <span className="close-modal" onClick={toggleModal}>X</span>        
              <MovieInfoModal HandleUpdateFavoriteCardStatus={handleUpdateFavoriteCardStatus}/>
            </div>
            <InfoCarousel
              title={"Now in theatres"}
              movieList={processMovieList(nowPlayingMovies)}
              listStatus={nowPlayingMoviesStatus}              
            />
            <InfoCarousel
              title={"Popular movies"}
              movieList={processMovieList(popularMovies)}
              listStatus={popularMoviesStatus}              
            />
            <InfoCarousel
              title={"Top Rated movies"}
              movieList={processMovieList(topRatedMovies)}
              listStatus={topRatedMoviesStatus}              
            />
            <InfoCarousel
              title={"Upcoming movies"}
              movieList={processMovieList(upComingMovies)}
              listStatus={upComingMoviesStatus}              
            />
          </div>
        }
      </DashboardLayout>

    //</ProtectedPage>
  );
}