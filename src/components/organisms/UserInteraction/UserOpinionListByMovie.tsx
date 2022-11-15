import React from "react";
import { useFierbase } from "../../../context/use-firebase";
import { MovieRate } from "../../../models/MovieRate";
import AuthorizedPage from "../../layouts/AuthorizedPage";

export interface UserOpinionListByMovieProps {
  movieId: number;
  refreshMovieComments: boolean
}

export const UserOpinionListByMovie: React.FC<UserOpinionListByMovieProps> = ({
  movieId,
  refreshMovieComments
}) => {

  const { getMovieRatesByMovieId } = useFierbase();

  const [movieRates, setMovieRates] = React.useState<MovieRate[]>([]);
  const [displayRates, setDisplayRates] = React.useState(false);
  const [refreshRateList, setRefreshRateList] = React.useState(false);


  React.useEffect(() => {  
    setRefreshRateList(true);
  },[]);
  
  React.useEffect(() => {  
    setRefreshRateList(refreshMovieComments);
  },[refreshMovieComments]);
  
  React.useEffect(() => {    
      if(refreshMovieComments){
        getCommentList();
        setRefreshRateList(false);
      }

  }, [refreshRateList])

  const getCommentList= () =>{
    
    const rates: MovieRate[] = []
    getMovieRatesByMovieId(movieId).then(async (movieComments: (MovieRate[] | undefined)) => {      
      movieComments?.forEach((movieRate) => {      
        rates.push(movieRate);
      });      
      setMovieRates(rates);
    })

  }

  React.useEffect(() => {    
    if (movieRates.length > 0)
      setDisplayRates(true);
  }, [movieRates])


  React.useEffect(() => {    

  }, [displayRates])

  return (
    <>
      <AuthorizedPage>
        <main>
          <div className="user-opinion-list-content">
            <h3>What do they think?</h3>
            {
              displayRates && movieRates ? 
                <ul>
                  {movieRates?.map((currentMovieRate: MovieRate) => (
                    <li key={currentMovieRate.movieRateId}>
                      <div>
                        <div>Username: {currentMovieRate.userName}</div>
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
              : <p>theres no comments to show</p>}
          </div>

        </main>
      </AuthorizedPage>
    </>
  );
}
