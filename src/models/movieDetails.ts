import { Genre } from "./Genre";

export interface belongs_to_collection{
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

export interface MovieDetails{
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: belongs_to_collection;
    budget: number,
    genres: Genre[],
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string
    original_title: string;
    overview: string;
    popularity: number,
    poster_path: string,    
    status: string;
    tagline: string;
    title: string;
    video: boolean,
    vote_average: number;
    vote_count: number;
}