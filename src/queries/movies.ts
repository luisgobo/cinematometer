import axios from "axios";
import { Movie } from "../models/movie";

/**
 * It's an async function that takes a page number as an argument and returns a list of movies.
 * @param {number} page - The page number of the results to fetch.
 */
export async function getNowPlayingMovies(page: number) {
    const { data } = await axios.get(
        `${process.env.REACT_APP_MOVIES_API_ENDPOINT}/movie/now_playing?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US&page=${page}`
    );    
    return processDataList(data.results);
};

/**
 * It's an async function that takes a page number as an argument and returns a list of movies.
 * @param {number} page - The page number of the results to fetch.
 */
export async function getPopularMovies(page: number) {
    const { data } = await axios.get(
        `${process.env.REACT_APP_MOVIES_API_ENDPOINT}/movie/popular?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US&page=${page}`
    );
    return processDataList(data.results);
};

/**
 * It returns a promise that resolves to an array of movies.
 * @param {number} page - The page number of the results to fetch.
 */
export async function getTopRatedMovies(page: number) {
    const { data } = await axios.get(
        `${process.env.REACT_APP_MOVIES_API_ENDPOINT}/movie/top_rated?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US&page=${page}`
    );
    return processDataList(data.results);
};

/**
 * It's an async function that takes a page number as an argument and returns a list of upcoming
 * movies.
 * @param {number} page - The page number of the results to fetch.
 */
export async function getUpcomingMovies(page: number) {
    const { data } = await axios.get(
        `${process.env.REACT_APP_MOVIES_API_ENDPOINT}/movie/upcoming?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US&page=${page}`
    );
    return processDataList(data.results);
};


/**
 * It takes an array of objects, and returns an array of objects with the same properties, but with the
 * properties renamed to match the interface.
 * @param {any[]} nonProcessedMovies - any[]
 * @returns An array of Movie objects.
 */
function processDataList(nonProcessedMovies: any[]) {
        const processedMoviesList: Movie[] = [];
    
        nonProcessedMovies.forEach((item: Movie) => {
            const movie: Movie = {
                poster_path: item.poster_path,
                adult: item.adult,
                overview: item.overview,
                release_date: item.release_date,
                genre_ids: item.genre_ids,
                id: item.id,
                original_title: item.original_title,
                original_language: item.original_language,
                title: item.title,
                backdrop_path: item.backdrop_path,
                popularity: item.popularity,
                vote_count: item.vote_count,
                video: item.video,
                vote_average: item.vote_average
            }
            processedMoviesList.push(movie); 
        });
    
        return processedMoviesList;
    
}