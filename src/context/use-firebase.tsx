import React, { useContext, createContext, useCallback } from 'react';
import { initializeApp, FirebaseApp, FirebaseOptions } from 'firebase/app'
import { Firestore, getFirestore, addDoc, collection, Timestamp, getDocs, query, where } from 'firebase/firestore'
import "../styles/dashboard.scss";

import {
    getAuth,
    signInWithEmailAndPassword,
    UserCredential,
    createUserWithEmailAndPassword,
    User,
} from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { AppUser } from '../models/AppUser';
import { MovieRate } from '../models/MovieRate';


export interface FirebaseContextProps {
    app: FirebaseApp | null;
    firebaseUser: User | undefined;
    appUser: AppUser | undefined;
    displayLoading: boolean
    login: (
        email: string,
        password: string
    ) => Promise<UserCredential | undefined>;
    securityRegister: (
        email: string,
        password: string,
        name: string
    ) => Promise<UserCredential | undefined>;

    insertMovieRate: any,
    getMovieRatesByMovieId: any,
}

const firebaseCredentials: FirebaseOptions = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGGINGSENDERID,
    appId: process.env.REACT_APP_APPID
}

const FirebaseContext = createContext<FirebaseContextProps>({
    app: null,
    firebaseUser: undefined,
    appUser: undefined,
    displayLoading: true,
    login: () => Promise.resolve(undefined),
    securityRegister: () => Promise.resolve(undefined),
    insertMovieRate: {},
    getMovieRatesByMovieId: {},
});

export const FirebaseProvider = ({ children }: any) => {
    const [app, setApp] = React.useState<FirebaseApp | null>(null);
    const [db, setDb] = React.useState<Firestore>();
    const [firebaseUser, setFirebaseUser] = React.useState<User | undefined>(undefined);
    const [appUser, setAppUser] = React.useState<AppUser | undefined>(undefined);
    const [displayLoading, setDisplayLoading] = React.useState(true);
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

    const getUserDataByEmail = async (email: string) => {
        try {

            //Get app user

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
    }, [])

    const userRegister = async (id: string, email: (string | null), name: string) => {

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
                    setAppUser({...user, authenticationId: result.id });
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
                //     }
                //     setAppUser(user);
                // });
            }

        } catch (error) {
            console.log(error);
        }


    };

    /**********************/
    //Movies Registry
    const insertMovieRate = useCallback( async (movieRateId: string, userId: string , movieId: number, comments: string , movieRateValue: number) => {

        try {
            if (db) {

                const movieRateReg: MovieRate = {
                    movieRateId: movieRateId,
                    userId: userId,
                    movieId: movieId,
                    comments: comments,
                    movieRateValue: movieRateValue,
                    created: Timestamp.now()
                }

                await addDoc(collection(db, 'movieRate'), {
                    userId: userId,
                    movieId: movieId,
                    comments: comments,
                    movieRateValue: movieRateValue,
                    created: Timestamp.now()
                })
                    .then((result) => {

                        const movieRated= {...movieRateReg, movieRateId: result.id }                        
                        // setAppUser(user);
                    });
            }

        } catch (error) {
            console.log(error);
        }

    },[db]);

    const getMovieRatesByMovieId = React.useCallback( async (movieId: number) => {
        try {

            console.log("getMovieRatesByMovieId...")
            console.log("movieId:", movieId);

            
            if (db) {
                const movieRates: MovieRate[]= [];
                const queryResult = query(collection(db, "movieRate"), where("movieId", "==", movieId));
                const querySnapshot = await getDocs(queryResult);
                
                if(querySnapshot.docs.length > 0 ){
                    console.log("Exist docs...")
                    querySnapshot.forEach((doc) => {
                        console.log("doc.data:", doc.data());
                        
                        const result: MovieRate = {
                            movieRateId: doc.id,
                            userId: doc.data().userId,
                            movieId: doc.data().movieId,
                            comments: doc.data().comments,
                            movieRateValue: doc.data().movieRateValue,
                            created: doc.data().created,
                        };
                        movieRates.push(result);
                    });
                    console.log("movieRates Content after foreach:", movieRates);
                    return movieRates;
                }
                else
                    console.log("no data found");
                    
            }

            return undefined;

        } catch (error) {
            console.log(error);
        }
    },[db]);

    /**********************/
    //Favorite movies by user
    const insertFavoriteMoviebyUser = useCallback( async (movieRateId: string, userId: string , movieId: number, comments: string , movieRate: number) => {

        try {
            if (db) {

                const movieRateReg: MovieRate = {
                    movieRateId: movieRateId,
                    userId: userId,
                    movieId: movieId,
                    comments: comments,
                    movieRateValue: movieRate,
                    created: Timestamp.now()
                }

                await addDoc(collection(db, 'movieRate'), {
                    userId: userId,
                    movieId: movieId,
                    commnets: comments,
                    movieRate: movieRate,
                    created: Timestamp.now()
                })
                    .then((result) => {

                        const movieRated= {...movieRateReg, movieRateId: result.id }                        
                        // setAppUser(user);
                    });
            }

        } catch (error) {
            console.log(error);
        }


    },[]);

    const getFavoriteMoviesbyUser = useCallback( async (movieId: number) => {
        try {

            //Get app user

            const movieRates: MovieRate[]= [];
            if (db) {
                const queryResult = query(collection(db, "users"), where("movieId", "==", movieId));
                const querySnapshot = await getDocs(queryResult);
                if(querySnapshot.docs.length > 0 ){
                    querySnapshot.forEach((doc) => {
                        const result: MovieRate = {
                            movieRateId: doc.data().movieRateId,
                            userId: doc.data().userId,
                            movieId: doc.data().movieId,
                            comments: doc.data().comments,
                            movieRateValue: doc.data().movieRate,
                            created: doc.data().created,
                        };
                        movieRates.push(result);
                    });
                }
            }

            return movieRates;

        } catch (error) {
            console.log(error);
        }
    },[]);
    /**********************/

    const authStateChanged = React.useCallback(
        async (user: User | null) => {

            if (!user) {
                setDisplayLoading(false);
                return;
            }

            setFirebaseUser(user);

            setDisplayLoading(false);
            navigate("/");

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
            securityRegister,

            insertMovieRate,
            getMovieRatesByMovieId,
        }),
        [
            app,
            firebaseUser,
            appUser,
            displayLoading,
            login,
            securityRegister,

            insertMovieRate,
            getMovieRatesByMovieId,
        ]
    );

    return (
        <FirebaseContext.Provider value={contextValue}>
            {children}
        </FirebaseContext.Provider>
    );
};

export const useFierbase = () => useContext<FirebaseContextProps>(FirebaseContext);