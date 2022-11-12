import { FirebaseProvider } from "../context/use-firebase";
import {
    BrowserRouter as Router,
    Routes as RouterRoutes,
    Route
} from "react-router-dom";

import ErrorPage from "../components/features/NotFound";
import { Home } from "../components/features/Home";
import { Login } from "../components/features/Login";
import { Register } from "../components/features/Register";
import { QueryClient, QueryClientProvider } from "react-query";
import { MoviesContextProvider } from "../context/use-movies";

const queryClient = new QueryClient();

const AppRoutes = () => {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <FirebaseProvider>
                        <MoviesContextProvider>
                            <RouterRoutes>
                                <Route path='/' element={<Home />}></Route>
                                <Route path='/login' element={<Login />}></Route>
                                <Route path='/register' element={<Register />}></Route>
                                <Route path='/favoriteMovies' element={<Home />}></Route>
                                <Route path='*' element={<ErrorPage />}></Route>
                            </RouterRoutes>
                        </MoviesContextProvider>
                    </FirebaseProvider>
                </Router>
            </QueryClientProvider>
        </div>
    );

}

export default AppRoutes;