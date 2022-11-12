import React from "react";
import { useFierbase } from "../../../context/use-firebase";
import { MovieRate } from "../../../models/MovieRate";
import AuthorizedPage from "../../layouts/AuthorizedPage";

export interface UserOpinionListByMovieProps {
  movieId: number;
}

export const UserOpinionListByMovie: React.FC<UserOpinionListByMovieProps> = ({
  movieId
}) => {

  const { getMovieRatesByMovieId } = useFierbase();

  const [movieRates, setMovieRates] = React.useState<MovieRate[]>([]);
  const [displayRates, setDisplayRates] = React.useState(false);

  React.useEffect(() => {
    console.log("charge comments")
    const rates: MovieRate[] = []
    getMovieRatesByMovieId(movieId).then(async (movieRates: (MovieRate[] | undefined)) => {
      console.log("movieRateobtained from getMoviesRatesByMovieId: ", movieRates);
      movieRates?.forEach((movieRate) => {
        console.log("movieRateItem:", movieRate);
        rates.push(movieRate);
      });
      console.log("rates: ", rates)
      setMovieRates(rates);
    })

  }, [])

  React.useEffect(() => {
    console.log("movieRates UOLByMov:", movieRates)
    if (movieRates.length > 0)
      setDisplayRates(true);

  }, [movieRates])


  React.useEffect(() => {

    console.log("displayRates status:", displayRates);

  }, [displayRates])

  return (
    <>
      <AuthorizedPage>
        <main>
          <div className="user-opinion-list-content">
            <ul>
              {displayRates && movieRates?.map((currentMovieRate: MovieRate) => (
                <li key={currentMovieRate.movieRateId}>
                  <div>
                    <div>Username: {currentMovieRate.userId}</div>
                    <div>
                      <div>rate:{currentMovieRate.movieRateValue}/10</div>
                      <div>opinion: {currentMovieRate.comments}</div>
                      <div>Date: {currentMovieRate.created.toDate().toDateString()}</div>
                    </div>
                    <button type="button">Allow Edit</button>
                  </div>

                </li>
              ))}
            </ul>
          </div>

        </main>
      </AuthorizedPage>
    </>
  );
}
