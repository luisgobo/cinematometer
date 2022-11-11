import React from "react";
import { useMovies } from "../../context/use-movies";
import ProtectedPage from "../layouts/ProtectedPage";
import { InfoCarousel } from "../organisms/Carousel/InfoCarousel";
import { Movie } from "../../models/movie";
import { DashboardLayout } from "../layouts/dashboard/DashboardLayout";
import "../../styles/popup-modal.scss"
import { MovieInfo } from "../organisms/Movie/MovieInfo";

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

  function processMovieList(movies: Movie[] | undefined) {
    return movies === undefined ? [] : movies;
  }

  return (
    <ProtectedPage>

      <div className="modal-background" onClick={toggleModal}/>
      <div className="modal">
        <span className="close-modal" onClick={toggleModal}>X</span>        
        <MovieInfo/>
      </div>
      <DashboardLayout>
        {
          <div>
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

    </ProtectedPage>
  );
}