import { Timestamp } from "firebase/firestore";

export interface FavoriteMovie{
    favoriteMovieId: string,
    userId: string,
    movieId: number,
    created: Timestamp
}