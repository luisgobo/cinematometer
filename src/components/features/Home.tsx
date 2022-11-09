import React from "react";
import { useFierbase } from "../../context/use-firebase";
import { useMovies } from "../../context/use-movies";
import ProtectedPage from "../layouts/ProtectedPage";
import { InfoCarousel } from "../organisms/Carousel/InfoCarousel";
import { Movie } from "../../models/movie";
import { DashboardLayout } from "../layouts/dashboard/DashboardLayout";

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

  } = useMovies();

  function processMovieList(movies: Movie[] | undefined) {
    return movies === undefined ? [] : movies;
  }

  return (
    <ProtectedPage>     

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