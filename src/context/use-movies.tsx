import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Genre } from '../models/Genre';
import { Movie } from '../models/movie';
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../queries/movies';

interface MovieApiContextProps {
    nowPlayingMovies: Movie[] | undefined;
    popularMovies: Movie[] | undefined;
    topRatedMovies: Movie[] | undefined;
    upComingMovies: Movie[] | undefined;
    //genres: Genre[] | undefined;

    nowPlayingMoviesStatus: any,
    popularMoviesStatus: any,
    topRatedMoviesStatus: any,
    upComingMoviesStatus: any,
    //genresStatus: any,

    nowPlayingMoviesError: any,
    popularMoviesError: any,
    topRatedMoviesError: any,
    upComingMoviesError: any,
    //genresError: any

}

const MoviesContext = React.createContext<MovieApiContextProps>({
    nowPlayingMovies: [],
    popularMovies: [],
    topRatedMovies: [],
    upComingMovies: [],
    //genres: [],

    nowPlayingMoviesStatus: {},
    popularMoviesStatus: {},
    topRatedMoviesStatus: {},
    upComingMoviesStatus: {},
    //genresStatus: {},

    nowPlayingMoviesError: {},
    popularMoviesError: {},
    topRatedMoviesError: {},
    upComingMoviesError: {},
    //genresError: {}

});

export const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [moviesPage, setMoviesPage] = React.useState(1);
    //const [genres, setGenres] = React.useState<Genre[] | undefined>([]);

    const { data: nowPlayingMovies, status: nowPlayingMoviesStatus, error: nowPlayingMoviesError } = useQuery<Movie[]>(
        ["nowPlayingData", moviesPage],
        () => getNowPlayingMovies(moviesPage, genres)
        
    );

    const { data: popularMovies, status: popularMoviesStatus, error: popularMoviesError } = useQuery<Movie[]>(
        ["popularData", moviesPage],
        () => getPopularMovies(moviesPage, genres)
    );

    const { data: topRatedMovies, status: topRatedMoviesStatus, error: topRatedMoviesError } = useQuery<Movie[]>(
        ["topRatedData", moviesPage],
        () => getTopRatedMovies(moviesPage, genres)
    );

    const { data: upComingMovies, status: upComingMoviesStatus, error: upComingMoviesError } = useQuery<Movie[]>(
        ["upComingData", moviesPage],
        () => getUpcomingMovies(moviesPage, genres)
    );

    const { data: genres, status: genresStatus, error: genresError } = useQuery<Genre[]>(
        ["genresData", moviesPage],
        () => getUpcomingMovies(moviesPage, genres)
    );


    const contextValue: MovieApiContextProps = React.useMemo(
        () => ({
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upComingMovies,
            //genres,

            nowPlayingMoviesStatus,
            popularMoviesStatus,
            topRatedMoviesStatus,
            upComingMoviesStatus,
            //genresStatus,

            nowPlayingMoviesError,
            popularMoviesError,
            topRatedMoviesError,
            upComingMoviesError,
            //genresError
        }),
        [
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upComingMovies,
            //genres,

            nowPlayingMoviesStatus,
            popularMoviesStatus,
            topRatedMoviesStatus,
            upComingMoviesStatus,
            //genresStatus,

            nowPlayingMoviesError,
            popularMoviesError,
            topRatedMoviesError,
            upComingMoviesError,
            //genresError
        ]
    );

    return (
        <MoviesContext.Provider value={contextValue}>
            {children}
        </MoviesContext.Provider>
    );
};

export const useMovies = () => useContext<MovieApiContextProps>(MoviesContext);