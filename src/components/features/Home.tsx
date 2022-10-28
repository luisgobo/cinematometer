import React from "react";
import { useFierbase } from "../../context/use-firebase";
import { useMovies } from "../../context/use-movies";
import { Movie, } from "../../models/movie";
import ProtectedPage from "../layouts/ProtectedPage";

export const Home = () => {

  const { appUser } = useFierbase();
  const { nowPlayingMoviesList, nowPlayingMoviesStatus } = useMovies();

  const [nowPlayingList, setNowPlayingList] = React.useState<Array<Movie>>([])
  const [displayMoviesList, setDisplayMoviesList] = React.useState<boolean>(false)

  React.useEffect(() => {
    setNowPlayingList(nowPlayingMoviesList);
  }, [nowPlayingMoviesList])

  React.useEffect(() => {
    if (nowPlayingList.length > 0)
      setDisplayMoviesList(true);
  }, [nowPlayingList, nowPlayingMoviesStatus])

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
              {(nowPlayingMoviesStatus === "success" && displayMoviesList === true) ?
                <div>
                  <h1>Now in theatres</h1>
                  {
                    nowPlayingList.length > 0 && nowPlayingList.map((movie: Movie) =>
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