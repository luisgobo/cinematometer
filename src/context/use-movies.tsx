import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Movie } from '../models/movie';
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../queries/movies';

interface MovieApiContextProps {
    nowPlayingMovies: Movie[] | undefined;
    popularMovies: Movie[] | undefined;
    topRatedMovies: Movie[] | undefined;
    upComingMovies: Movie[] | undefined;
    
    nowPlayingMoviesStatus: any,
    popularMoviesStatus: any,
    topRatedMoviesStatus: any,
    upComingMoviesStatus: any,

    nowPlayingMoviesError: any,
    popularMoviesError: any,
    topRatedMoviesError: any,
    upComingMoviesError: any

}

const MoviesContext = React.createContext<MovieApiContextProps>({
    nowPlayingMovies: [],
    popularMovies: [],
    topRatedMovies: [],
    upComingMovies: [],
    
    nowPlayingMoviesStatus: {},
    popularMoviesStatus: {},
    topRatedMoviesStatus:{},
    upComingMoviesStatus:{},

    nowPlayingMoviesError: {},
    popularMoviesError: {},
    topRatedMoviesError:{},
    upComingMoviesError:{}

});

export const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [moviesPage, setMoviesPage] = React.useState(1);

    const { data: nowPlayingMovies, status: nowPlayingMoviesStatus, error: nowPlayingMoviesError } = useQuery(
        ["nowPlayingData", moviesPage],
        () => getNowPlayingMovies(moviesPage)
    );

    const { data: popularMovies, status: popularMoviesStatus, error: popularMoviesError } = useQuery(
        ["popularData", moviesPage],
        () => getPopularMovies(moviesPage)
    );

    const { data: topRatedMovies, status: topRatedMoviesStatus, error: topRatedMoviesError } = useQuery(
        ["topRatedData", moviesPage],
        () => getTopRatedMovies(moviesPage)
    );

    const { data: upComingMovies, status: upComingMoviesStatus, error: upComingMoviesError } = useQuery(
        ["upComingData", moviesPage],
        () => getUpcomingMovies(moviesPage)
    );

    const contextValue: MovieApiContextProps = React.useMemo(
        () => ({
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upComingMovies,

            nowPlayingMoviesStatus,
            popularMoviesStatus,
            topRatedMoviesStatus,
            upComingMoviesStatus,
            
            nowPlayingMoviesError,
            popularMoviesError,
            topRatedMoviesError,
            upComingMoviesError
        }),
        [
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upComingMovies,

            nowPlayingMoviesStatus,
            popularMoviesStatus,
            topRatedMoviesStatus,
            upComingMoviesStatus,
            
            nowPlayingMoviesError,
            popularMoviesError,
            topRatedMoviesError,
            upComingMoviesError
        ]
    );

    return (
        <MoviesContext.Provider value={contextValue}>
            {children}
        </MoviesContext.Provider>
    );
};

export const useMovies = () => useContext<MovieApiContextProps>(MoviesContext);
