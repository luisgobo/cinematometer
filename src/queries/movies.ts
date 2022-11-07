import { map } from "@firebase/util";
import axios from "axios";
import { Genre } from "../models/Genre";
import { Movie } from "../models/movie";

export const getNowPlayingMovies = async (page: number, genres: Genre[] | undefined) => {
    const { data } = await axios.get(
        `${process.env.REACT_APP_MOVIES_API_ENDPOINT}/movie/now_playing?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US&page=${page}`
    );
    return data?.results;
};

export const getPopularMovies = async (page: number, genres: Genre[] | undefined) => {
    const { data } = await axios.get(
        `${process.env.REACT_APP_MOVIES_API_ENDPOINT}/movie/popular?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US&page=${page}`
    );
    return data?.results;
};

export const getTopRatedMovies = async (page: number, genres: Genre[] | undefined) => {
    const { data } = await axios.get(
        `${process.env.REACT_APP_MOVIES_API_ENDPOINT}/movie/top_rated?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US&page=${page}`
    );
    return data?.results;
};

export const getUpcomingMovies = async (page: number, genres: Genre[] | undefined) => {
    const { data } = await axios.get(
        `${process.env.REACT_APP_MOVIES_API_ENDPOINT}/movie/upcoming?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US&page=${page}`
    );
    return data?.results;
};

export const getGenres = async (page: number) => {
    const { data } = await axios.get(
        `${process.env.REACT_APP_MOVIES_API_ENDPOINT}/genre/movie/list?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US`
    );
    return data?.results;
};

export const combined = async (page: number) => {

    // Make first two requests
    const [movies, genres] = await Promise.all([
        axios.get(`${process.env.REACT_APP_MOVIES_API_ENDPOINT}/movie/now_playing?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US&page=${page}`),
        axios.get(`${process.env.REACT_APP_MOVIES_API_ENDPOINT}/genre/movie/list?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US`)
    ]);

    return [movies.data, genres.data];

    // Make third request using responses from the first two
    

    // const { data } = await axios.get(
    //     `${process.env.REACT_APP_MOVIES_API_ENDPOINT}/genre/movie/list?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US`        
    // );
    // return data?.results;
};
