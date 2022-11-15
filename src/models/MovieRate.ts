import { Timestamp } from "firebase/firestore";

export interface MovieRate{
    movieRateId: string,
    userId: string,
    userName: string,
    movieId: number,
    comments: string,
    movieRateValue: number,
    created: Timestamp
}