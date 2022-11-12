import { Timestamp } from "firebase/firestore";

export interface AppUser{
    authenticationId: string,
    name: string,
    email: string,
    created: Timestamp,
}