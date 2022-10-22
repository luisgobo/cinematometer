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


const AppRoutes = () => {
    return (
        <div>
            <Router>
                <FirebaseProvider>
                    <RouterRoutes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/register' element={<Register />}></Route>
                        <Route path='*' element={<ErrorPage />}></Route>
                    </RouterRoutes>
                </FirebaseProvider>
            </Router>

        </div>
    );

}

export default AppRoutes;