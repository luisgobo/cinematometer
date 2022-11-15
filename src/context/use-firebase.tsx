import React, { useContext, createContext, useCallback } from 'react';
import { initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app'
import {
    addDoc,
    collection,
    clearIndexedDbPersistence,
    deleteDoc,
    Firestore,
    getFirestore,
    getDocs,
    query,
    Timestamp,
    where,
    doc,
} from 'firebase/firestore'
import "../styles/dashboard.scss";

import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    UserCredential,
    createUserWithEmailAndPassword,
    User,
} from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { AppUser } from '../models/AppUser';
import { MovieRate } from '../models/MovieRate';
import { FavoriteMovie } from '../models/FavoriteMovie';
import { Movie } from '../models/movie';
import { useMovies } from './use-movies';

const firebaseCredentials: FirebaseOptions = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGGINGSENDERID,
    appId: process.env.REACT_APP_APPID
}

export interface FirebaseContextProps {
    app: FirebaseApp | null;
    firebaseUser: User | undefined | null;
    appUser: AppUser | undefined;
    displayLoading: boolean
    isLogOut: boolean,
    login: (
        email: string,
        password: string
    ) => Promise<UserCredential | undefined>;
    logout: () => Promise<void | undefined>;
    securityRegister: (
        email: string,
        password: string,
        name: string
    ) => Promise<UserCredential | undefined>;
    checkIfExistFavorite: (
        userId: string | undefined,
        movieId: number | undefined
    ) => Promise<boolean | undefined>
    getFavoriteMovieIds: (
        userId: string | undefined
    ) => Promise<number[] | undefined>
    insertMovieRate: any,
    insertFavoriteMovieByUser: (
        favoriteMovieId: string,
        userId: string,
        movieId: number
    ) => Promise<void>,
    deleteFavoriteMovieByUser: (
        userId: string,
        movieId: number
    ) => Promise<void>,

    getMovieRatesByMovieId: any,
    setIsLogOut: any

}


const FirebaseContext = createContext<FirebaseContextProps>({
    app: null,
    firebaseUser: undefined,
    appUser: undefined,
    displayLoading: true,
    isLogOut: false,
    login: () => Promise.resolve(undefined),
    logout: () => Promise.resolve(undefined),
    securityRegister: () => Promise.resolve(undefined),
    checkIfExistFavorite: () => Promise.resolve(undefined),
    getFavoriteMovieIds: () => Promise.resolve(undefined),
    insertMovieRate: {},
    deleteFavoriteMovieByUser: () => Promise.resolve(),
    insertFavoriteMovieByUser: () => Promise.resolve(),
    getMovieRatesByMovieId: {},
    setIsLogOut: {}
});

export const FirebaseProvider = ({ children }: any) => {
    const [app, setApp] = React.useState<FirebaseApp | null>(null);
    const [db, setDb] = React.useState<Firestore>();
    const [firebaseUser, setFirebaseUser] = React.useState<User | undefined | null>(undefined);
    const [appUser, setAppUser] = React.useState<AppUser | undefined>(undefined);
    const [displayLoading, setDisplayLoading] = React.useState(true);
    const [isLogOut, setIsLogOut] = React.useState(true);
    const navigate = useNavigate();

    const login = useCallback(async (email: string, password: string) => {
        try {
            const auth = getAuth();
            const user = await signInWithEmailAndPassword(auth, email, password);
            setFirebaseUser(user.user);

            //Get app user
            await getUserDataByEmail(email);
            return user;

        } catch (error) {
            console.log(error);
        }
    }, [])

    const logout = useCallback(async () => {
        const auth = getAuth();
        signOut(auth);
        setFirebaseUser(null);
        setIsLogOut(true);
        navigate("/");
    }, [navigate])

    const getUserDataByEmail = async (email: string) => {
        try {

            if (db) {
                const queryResult = query(collection(db, "users"), where("email", "==", email));
                const querySnapshot = await getDocs(queryResult);
                querySnapshot.forEach((doc) => {
                    const result: AppUser = {
                        authenticationId: doc.data().authenticationId,
                        name: doc.data().name,
                        email: doc.data().email,
                        created: doc.data().create,
                    };
                    setAppUser(result);
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const userRegister = useCallback(async (id: string, email: (string | null), name: string) => {

        try {
            if (db) {
                const user: AppUser = {
                    authenticationId: id,
                    name: name,
                    email: email ? email : "email@notfound.com",
                    created: Timestamp.now()
                }
                await addDoc(collection(db, 'users'), user)
                    .then((result) => {
                        setAppUser({ ...user, authenticationId: result.id });
                    });

                // await addDoc(collection(db, 'users'), {
                //     authenticationId: id,
                //     email: email,
                //     name: name,
                //     created: Timestamp.now()
                // })
                // .then((result) => {
                //     const user: AppUser = {
                //         authenticationId: result.id,
                //         name: name,
                //         email: email ? email : "email@notfound.com",
                //         created: Timestamp.now()
                //     }
                //     setAppUser(user);
                // });
            }

        } catch (error) {
            console.log(error);
        }


    }, [db]);

    const securityRegister = useCallback(async (email: string, password: string, name: string) => {
        try {
            //Create SecurityCredentials
            const auth = getAuth();
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            setFirebaseUser(userCredentials.user);

            //create App User
            if (userCredentials) {
                userRegister(userCredentials.user.uid, email, name);
            }
            return userCredentials;
        } catch (error) {
            console.log(error);
        }
    }, [userRegister])



    /**********************/
    //Movies Registry
    const insertMovieRate = useCallback(async (movieRateId: string, userId: string, userName: string, movieId: number, comments: string, movieRateValue: number) => {

        try {
            if (db) {

                const movieRateReg: MovieRate = {
                    movieRateId: movieRateId,
                    userId: userId,
                    userName: userName,
                    movieId: movieId,
                    comments: comments,
                    movieRateValue: movieRateValue,
                    created: Timestamp.now(),
                }

                await addDoc(collection(db, 'movieRate'), movieRateReg)
                .then((result) => {
                    const movieRatedResult = { ...movieRateReg, movieRateId: result.id }                    
                });

                // await addDoc(collection(db, 'movieRate'), {
                //     userId: userId,
                //     userName: userName,
                //     movieId: movieId,
                //     comments: comments,
                //     movieRateValue: movieRateValue,
                //     created: Timestamp.now()
                // })
                // .then((result) => {

                //     const movieRatedResult = { ...movieRateReg, movieRateId: result.id }
                //     // setAppUser(user);
                // });
            }

        } catch (error) {
            console.log(error);
        }

    }, [db]);

    const getMovieRatesByMovieId = React.useCallback(async (movieId: number) => {
        try {
            if (db) {
                const movieRates: MovieRate[] = [];                                
                const queryResult = query(collection(db, "movieRate"), where("movieId", "==", movieId));
                const querySnapshot = await getDocs(queryResult);                
                
                if (querySnapshot.docs.length > 0) {
                    querySnapshot.forEach((doc) => {
                        const result: MovieRate = {
                            movieRateId: doc.id,
                            userId: doc.data().userId,
                            userName: doc.data().userName,
                            movieId: doc.data().movieId,
                            comments: doc.data().comments,
                            movieRateValue: doc.data().movieRateValue,
                            created: doc.data().created,
                        };
                        movieRates.push(result);
                    });
                    return movieRates;
                }
                else
                    console.log("no data found");

            }

            return undefined;

        } catch (error) {
            console.log(error);
        }
    }, [db]);

    /**********************/
    //Favorite movies by user
    const insertFavoriteMovieByUser = useCallback(async (favoriteMovieId: string, userId: string, movieId: number) => {
        try {
            if (db) {
                checkIfExistFavorite(userId, movieId).then(async (existField: boolean | undefined) => {
                    if (!existField) {
                        const favoriteMovioeReg: FavoriteMovie = {
                            favoriteMovieId: favoriteMovieId,
                            userId: userId,
                            movieId: movieId,
                            created: Timestamp.now()
                        }

                        await addDoc(collection(db, 'favoriteMoviesbyUser'), {
                            userId: userId,
                            movieId: movieId,
                            created: Timestamp.now()
                        })
                            .then((result) => {                                
                                const favoriteMovieResult = { ...favoriteMovioeReg, favoriteMovieId: result.id }                                
                            });
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }

    }, [db]);

    const deleteFavoriteMovieByUser = useCallback(async (userId: string, movieId: number) => {

        try {
            if (db) {

                const queryResult = query(collection(db, "favoriteMoviesbyUser"), where("movieId", "==", movieId), where("userId", "==", userId));
                const querySnapshot = await getDocs(queryResult);
                querySnapshot.forEach((element) => {
                    const docRef = doc(db, "favoriteMoviesbyUser", element.id);
                    return deleteDoc(docRef).then((result) => {
                        console.log("document deleted");
                    });
                });
            }
        } catch (error) {
            console.log(error);
        }


    }, [db]);

    const getFavoriteMovieIds = useCallback(async (userId: string | undefined) => {
        try {   
            if (db) {
                const queryResult = query(collection(db, "favoriteMoviesbyUser"), where("userId", "==", userId));
                const querySnapshot = await getDocs(queryResult);                            
                const movieIds: number[] = [];
                if (querySnapshot.docs.length > 0) {                    
                    querySnapshot.forEach((doc) => {
                        movieIds.push(doc.data().movieId);                    
                    });
                }
                return movieIds;                
            }
        } catch (error) {
            console.log(error);
        }
    }, [db]);


    const checkIfExistFavorite = useCallback(async (userId: string | undefined, movieId: number | undefined) => {
        if (db) {
            const queryResult = query(collection(db, "favoriteMoviesbyUser"), where("movieId", "==", movieId), where("userId", "==", userId));
            const querySnapshot = await getDocs(queryResult);
            if (querySnapshot.docs.length > 0) {
                return true;
            }
            else
                return false;
        }

        return undefined;

    }, [db]);

    /**********************/

    const authStateChanged = React.useCallback(
        async (user: User | null) => {
            if (!user) {
                setDisplayLoading(false);
                return;
            }

            setFirebaseUser(user);
            setDisplayLoading(false);
            //Commented because of conflict witn nav bar
            //navigate("/");

        }
        , [navigate]);

    React.useEffect(() => {
        const app = initializeApp(firebaseCredentials);
        const db = getFirestore(app);
        setApp(app);
        setDb(db);
    }, []);

    React.useEffect(() => {
        const unsubscribe = getAuth().onAuthStateChanged(authStateChanged);

        if (firebaseUser?.email) {
            getUserDataByEmail(firebaseUser?.email);
        }

        return () => unsubscribe();

    }, [authStateChanged]);

    const contextValue: FirebaseContextProps = React.useMemo(
        () => ({
            app,
            firebaseUser,
            appUser,
            displayLoading,
            login,
            logout,
            isLogOut,
            securityRegister,
            checkIfExistFavorite,
            getFavoriteMovieIds,

            insertMovieRate,
            insertFavoriteMovieByUser,
            deleteFavoriteMovieByUser,
            getMovieRatesByMovieId,
            setIsLogOut,
        }),
        [
            app,
            firebaseUser,
            appUser,
            displayLoading,
            login,
            logout,
            isLogOut,
            securityRegister,
            checkIfExistFavorite,
            getFavoriteMovieIds,

            insertMovieRate,
            insertFavoriteMovieByUser,
            deleteFavoriteMovieByUser,
            getMovieRatesByMovieId,
            setIsLogOut,
        ]
    );

    return (
        <FirebaseContext.Provider value={contextValue}>
            {children}
        </FirebaseContext.Provider>
    );
};

export const useFierbase = () => useContext<FirebaseContextProps>(FirebaseContext);
