import axios from "axios";

export const getNowPlayingMovies = async (page: number) => {
    const { data } = await axios.get(
        `${process.env.REACT_APP_MOVIES_API_ENDPOINT}/movie/now_playing?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US&page=${page}`
    );
    return data?.results;
};

export const getPopularMovies = async (page: number) => {
    const { data } = await axios.get(
        `${process.env.REACT_APP_MOVIES_API_ENDPOINT}/movie/popular?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US&page=${page}`
    );
    return data?.results;
};

export const getTopRatedMovies = async (page: number) => {
    const { data } = await axios.get(
        `${process.env.REACT_APP_MOVIES_API_ENDPOINT}/movie/top_rated?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US&page=${page}`
    );
    return data?.results;
};

export const getUpcomingMovies = async (page: number) => {
    const { data } = await axios.get(
        `${process.env.REACT_APP_MOVIES_API_ENDPOINT}/movie/upcoming?api_key=${process.env.REACT_APP_MOVIES_API_KEY}&language=en-US&page=${page}`
    );
    return data?.results;
};