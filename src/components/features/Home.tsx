import React from "react";
import { useMovies } from "../../context/use-movies";
import ProtectedPage from "../layouts/ProtectedPage";
import { InfoCarousel } from "../organisms/Carousel/InfoCarousel";
import { Movie } from "../../models/movie";
import { DashboardLayout } from "../layouts/dashboard/DashboardLayout";
import "../../styles/popupModal.scss"

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

    selectedMovie,
    toggleModal

  } = useMovies();

  function processMovieList(movies: Movie[] | undefined) {
    return movies === undefined ? [] : movies;
  }

  return (
    <ProtectedPage>

      <div className="modal-background" onClick={toggleModal}></div>
      <div className="modal">
        <h2>Modal Window</h2>
        <p>
          You have opened the modal, they are great for confirming actions or
          displaying critical information.
        </p>
        <p>
          Selected Movie ID: {selectedMovie}
        </p>
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