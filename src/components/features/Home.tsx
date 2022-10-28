import React from "react";
import { useFierbase } from "../../context/use-firebase";
import { useMovies } from "../../context/use-movies";
import { Movie, } from "../../models/movie";
import ProtectedPage from "../layouts/ProtectedPage";

export const Home = () => {

  const { appUser } = useFierbase();
  const { nowPlayingMovies, 
          nowPlayingMoviesStatus,
          popularMoviesStatus,
          popularMovies
        } = useMovies();

  return (
    <ProtectedPage>
      <h1>Home Page</h1>
      <p>hola {appUser?.name}</p>
      {
        <div>
          {
            <div>
              {nowPlayingMoviesStatus === "error" && <p>Error fetching data</p>}
              {nowPlayingMoviesStatus === "loading" && <p>Fetching data...</p>}              
              {(nowPlayingMoviesStatus === "success") ?
                <div>
                  <h1>Now in theatres</h1>
                  {
                    (nowPlayingMovies !== undefined && nowPlayingMovies.length > 0) && nowPlayingMovies.map((movie: Movie) =>
                      <table key={movie.id}>
                        <tbody >
                          <tr>
                            <td>{movie.original_title}</td>
                            <td>{movie.popularity}</td>
                            <td>{movie.release_date}</td>
                          </tr>
                        </tbody>
                      </table>
                    )
                  }
                </div>
                : null
              }
            </div>
          }

          {
            <div>
              {popularMoviesStatus === "error" && <p>Error fetching data</p>}
              {popularMoviesStatus === "loading" && <p>Fetching data...</p>}              
              {(popularMoviesStatus === "success") ?
                <div>
                  <h1>Popular movies</h1>
                  {
                    (popularMovies !== undefined && popularMovies.length > 0) && popularMovies.map((movie: Movie) =>
                      <table key={movie.id}>
                        <tbody >
                          <tr>
                            <td>{movie.original_title}</td>
                            <td>{movie.popularity}</td>
                            <td>{movie.release_date}</td>
                          </tr>
                        </tbody>
                      </table>
                    )
                  }
                </div>
                : null
              }
            </div>
          }

        </div>
      }
    </ProtectedPage>
  );
}