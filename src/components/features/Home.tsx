import React from "react";
import { useFierbase } from "../../context/use-firebase";
import { useMovies } from "../../context/use-movies";
import ProtectedPage from "../layouts/ProtectedPage";
import { InfoCarousel } from "../organisms/Carousel/InfoCarousel";
//import {isMobile} from 'react-device-detect';
import UAParser from "ua-parser-js";
import { Movie } from "../../models/movie";

declare module 'http' {
    interface IncomingHttpHeaders {
        "XYZ-Token"?: string
    }
}

export const Home = () => {

  const [deviceType, setDeviceType] = React.useState("");
  const { appUser } = useFierbase();
  const { nowPlayingMovies, 
          nowPlayingMoviesStatus,
          popularMoviesStatus,
          popularMovies
        } = useMovies();



  React.useEffect(() => {

    const userAgent = navigator.userAgent;
    const parser = new UAParser();
    parser.setUA(userAgent);
    const result = parser.getResult();
    const deviceType = (result.device && result.device.type) || "desktop";    
    setDeviceType(deviceType);

  }, [])


function processMovieList(movies: Movie[] | undefined ){
  return movies === undefined ? [] : movies;
}

  return (
    <ProtectedPage>
      <h1>Home Page</h1>
      <p>hola {appUser?.name}</p>
      {
        <div>
            <InfoCarousel 
              title={"Now in theatres"} 
              movieList={processMovieList(nowPlayingMovies)} 
              listStatus={nowPlayingMoviesStatus} 
              deviceType={deviceType} 
            />            
          {/* <InfoCarousel 
            title={"Popular movies"} 
            movieList={popularMovies} 
            listStatus={popularMoviesStatus} 
            deviceType={deviceType}
          /> */}
          
        </div>
      }
    </ProtectedPage>
  );
}