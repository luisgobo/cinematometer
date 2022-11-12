import { DashboardLayout } from "../layouts/dashboard/DashboardLayout"
import ProtectedPage from "../layouts/ProtectedPage"

export const FavoriteMovies = () => {
    return (
        <ProtectedPage>
            <DashboardLayout>
                <p>FAVORITE MOVIES</p>
            </DashboardLayout>
        </ProtectedPage>
    )
}
