import React, { useCallback, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Genre } from '../models/Genre';
import { Movie } from '../models/movie';
import { getGenres, getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../queries/movies';

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
    upComingMoviesError: any,

    moviesPage: number,
    setMoviesPage: any
    selectedMovie: number,
    setSelectedMovie: any,
    toggleModal: any,

}

const MoviesContext = React.createContext<MovieApiContextProps>({
    nowPlayingMovies: [],
    popularMovies: [],
    topRatedMovies: [],
    upComingMovies: [],

    nowPlayingMoviesStatus: {},
    popularMoviesStatus: {},
    topRatedMoviesStatus: {},
    upComingMoviesStatus: {},

    nowPlayingMoviesError: {},
    popularMoviesError: {},
    topRatedMoviesError: {},
    upComingMoviesError: {},

    moviesPage: 0,
    setMoviesPage: {},
    selectedMovie: 0,
    setSelectedMovie: {},
    toggleModal: {},

});

export const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [moviesPage, setMoviesPage] = React.useState(1);
    const [selectedMovie, setSelectedMovie] = React.useState(0);

    // const toggleModal = () => {

    //     const bodyClassList = document.body.classList;
    //     if (bodyClassList.contains("open")) {
    //         console.log("is Open")
    //         bodyClassList.remove("open");
    //         bodyClassList.add("closed");
    //     } else {
    //         console.log("is Closed")
    //         console.log(selectedMovie)
    //         bodyClassList.remove("closed");
    //         bodyClassList.add("open");
    //     }

    //     console.log("bodyClassList:", bodyClassList)
    // };

    const toggleModal = useCallback(() => {
        const bodyClassList = document.body.classList;

        if (bodyClassList.contains("open")) {
            bodyClassList.remove("open");
            bodyClassList.add("closed");
        } else {
            bodyClassList.remove("closed");
            bodyClassList.add("open");
        }

    }, [])

    const { data: nowPlayingMovies, status: nowPlayingMoviesStatus, error: nowPlayingMoviesError } = useQuery<Movie[]>(
        ["nowPlayingData", moviesPage],
        () => getNowPlayingMovies(moviesPage)

    );

    const { data: popularMovies, status: popularMoviesStatus, error: popularMoviesError } = useQuery<Movie[]>(
        ["popularData", moviesPage],
        () => getPopularMovies(moviesPage)
    );

    const { data: topRatedMovies, status: topRatedMoviesStatus, error: topRatedMoviesError } = useQuery<Movie[]>(
        ["topRatedData", moviesPage],
        () => getTopRatedMovies(moviesPage)
    );

    const { data: upComingMovies, status: upComingMoviesStatus, error: upComingMoviesError } = useQuery<Movie[]>(
        ["upComingData", moviesPage],
        () => getUpcomingMovies(moviesPage)
    );

    const { data: genres, status: genresStatus, error: genresError } = useQuery<Genre[]>(
        ["genresData", moviesPage],
        () => getGenres(moviesPage)
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
            upComingMoviesError,

            moviesPage,
            setMoviesPage,
            selectedMovie,
            setSelectedMovie,
            toggleModal,
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
            upComingMoviesError,
            
            moviesPage,
            setMoviesPage,
            selectedMovie,
            setSelectedMovie,
            toggleModal,
        ]
    );

    return (
        <MoviesContext.Provider value={contextValue}>
            {children}
        </MoviesContext.Provider>
    );
};

export const useMovies = () => useContext<MovieApiContextProps>(MoviesContext);