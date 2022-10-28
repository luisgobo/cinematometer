import React, { useContext } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { Movie } from '../models/movie';
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../queries/movies';

interface MovieApiContextProps {
    nowPlayingMovies: Movie[];
    nowPlayingMoviesList: Movie[]
    popularMovies: Movie[];
    topRatedMovies: Movie[];
    upComingMovies: Movie[];
    nowPlayingMoviesStatus: any;
    nowPlayingMoviesError: any;
}

const MoviesContext = React.createContext<MovieApiContextProps>({
    nowPlayingMovies: [],
    nowPlayingMoviesList: [],
    popularMovies: [],
    topRatedMovies: [],
    upComingMovies: [],
    nowPlayingMoviesStatus: {},
    nowPlayingMoviesError: {},

});

export const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [moviesPage, setMoviesPage] = React.useState(1);
    const [nowPlayingMoviesList, setNowPlayingMoviesList] = React.useState<Movie[]>([])

    const { data: nowPlayingMovies, status: nowPlayingMoviesStatus, error: nowPlayingMoviesError } = useQuery(
        ["nowPlayingMovies", moviesPage],
        () => getNowPlayingMovies(moviesPage)
    );    

    const { data: popularMovies } = useQuery(
        ["popularMovies", moviesPage],
        () => getPopularMovies(moviesPage)
    );

    const { data: topRatedMovies } = useQuery(
        ["topRatedMovies", moviesPage],
        () => getTopRatedMovies(moviesPage)
    );

    const { data: upComingMovies } = useQuery(
        ["upComingMovies", moviesPage],
        () => getUpcomingMovies(moviesPage)
    );

    const contextValue: MovieApiContextProps = React.useMemo(
        () => ({
            nowPlayingMovies,
            nowPlayingMoviesList,
            popularMovies,
            topRatedMovies,
            upComingMovies,
            nowPlayingMoviesStatus,
            nowPlayingMoviesError,
        }),
        [
            nowPlayingMovies,
            nowPlayingMoviesList,
            popularMovies,
            topRatedMovies,
            upComingMovies,
            nowPlayingMoviesStatus,
            nowPlayingMoviesError,
        ]
    );
    
    React.useEffect(() => {
        if (nowPlayingMovies) {
            const tempList = nowPlayingMovies.results
            setNowPlayingMoviesList(tempList);
        }
    }, [nowPlayingMovies])

    return (
        <MoviesContext.Provider value={contextValue}>
            {children}
        </MoviesContext.Provider>
    );
};

export const useMovies = () => useContext<MovieApiContextProps>(MoviesContext);
