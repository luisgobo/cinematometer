import React, { useCallback, useContext } from 'react';
import { useQuery } from 'react-query';
import { Genre } from '../models/Genre';
import { Movie } from '../models/movie';
import { MovieDetails } from '../models/movieDetails';
import { getGenres, getNowPlayingMovies, getPopularMovies, getSpecificMovie, getSpecificMovieDataCard, getTopRatedMovies, getUpcomingMovies } from '../queries/movies';

interface MovieApiContextProps {
    nowPlayingMovies: Movie[] | undefined;
    popularMovies: Movie[] | undefined;
    topRatedMovies: Movie[] | undefined;
    upComingMovies: Movie[] | undefined;
    pivotMovieList: Movie[] | undefined;
    retrieveFavoriteMoviesInfo: (
        movieIds: number[]| undefined,
    ) => Promise< void | undefined>

    nowPlayingMoviesStatus: any,
    popularMoviesStatus: any,
    topRatedMoviesStatus: any,
    upComingMoviesStatus: any,

    nowPlayingMoviesError: any,
    popularMoviesError: any,
    topRatedMoviesError: any,
    upComingMoviesError: any,

    specificMovie: MovieDetails | undefined,    
    specificMovieStatus: any,
    specificMovieError: any,

    moviesPage: number,
    setMoviesPage: any
    selectedMovieId: number,
    selectedMovieRate: number,
    setSelectedMovieId: any,
    setSelectedMovieRate: any
    toggleModal: any,    
}

const MoviesContext = React.createContext<MovieApiContextProps>({
    nowPlayingMovies: [],
    popularMovies: [],
    topRatedMovies: [],
    upComingMovies: [],
    pivotMovieList: [],
    retrieveFavoriteMoviesInfo: () => Promise.resolve(undefined), 

    nowPlayingMoviesStatus: {},
    popularMoviesStatus: {},
    topRatedMoviesStatus: {},
    upComingMoviesStatus: {},

    nowPlayingMoviesError: {},
    popularMoviesError: {},
    topRatedMoviesError: {},
    upComingMoviesError: {},

    specificMovie: undefined,    
    specificMovieStatus: {},
    specificMovieError: {},

    moviesPage: 0,
    setMoviesPage: {},
    selectedMovieId: 0,
    selectedMovieRate: 0,
    setSelectedMovieId: {},
    setSelectedMovieRate: {},
    toggleModal: {},    

});

export const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [moviesPage, setMoviesPage] = React.useState(1);
    const [selectedMovieId, setSelectedMovieId] = React.useState(0);
    const [selectedMovieRate, setSelectedMovieRate] = React.useState(0);

    const [pivotMovieList, setPivotMovieList] = React.useState<Movie[]>([]);


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

    const { data: specificMovie, status: specificMovieStatus, error: specificMovieError } = useQuery<MovieDetails>(
        ["specificData", selectedMovieId],
        () => getSpecificMovie(selectedMovieId)
    );

    const { data: specificMovieDataCard, status: specificMovieDataCardStatus, error: specificMovieDataCardError } = useQuery<Movie>(
        ["specificData", selectedMovieId],
        () => getSpecificMovieDataCard(selectedMovieId)
    );

    const { data: genres, status: genresStatus, error: genresError } = useQuery<Genre[]>(
        ["genresData", moviesPage],
        () => getGenres(moviesPage)
    );   
    
    const retrieveFavoriteMoviesInfo = React.useCallback( async (movieIds: number[]|undefined)=> {
                
        const movies: Movie[] | undefined= [];                
        movieIds?.map( async movieId => {
            await getSpecificMovie(movieId).then(async (res: Movie)=>{
                movies.push(res);
            });
            
            console.log("movies after push res001: ", movies);
            setPivotMovieList(movies)
            
        });                
    
    },[]);

    const contextValue: MovieApiContextProps = React.useMemo(
        () => ({
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upComingMovies,
            pivotMovieList,
            retrieveFavoriteMoviesInfo,           

            nowPlayingMoviesStatus,
            popularMoviesStatus,
            topRatedMoviesStatus,
            upComingMoviesStatus,

            nowPlayingMoviesError,
            popularMoviesError,
            topRatedMoviesError,
            upComingMoviesError,

            specificMovie,
            specificMovieStatus,
            specificMovieError,

            moviesPage,
            setMoviesPage,
            selectedMovieId,
            selectedMovieRate,
            setSelectedMovieId,
            setSelectedMovieRate,
            toggleModal,            
        }),
        [
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upComingMovies,
            pivotMovieList,
            retrieveFavoriteMoviesInfo,

            nowPlayingMoviesStatus,
            popularMoviesStatus,
            topRatedMoviesStatus,
            upComingMoviesStatus,

            nowPlayingMoviesError,
            popularMoviesError,
            topRatedMoviesError,
            upComingMoviesError,

            specificMovie,
            specificMovieStatus,
            specificMovieError,
            
            moviesPage,
            setMoviesPage,
            selectedMovieId,
            setSelectedMovieId,
            selectedMovieRate,
            setSelectedMovieRate,
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