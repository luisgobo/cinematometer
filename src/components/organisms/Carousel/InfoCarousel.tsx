import "react-multi-carousel/lib/styles.css";
import React, { Fragment } from "react";
import { Movie } from "../../../models/movie";
import Section from "../../molecules/Carousel/Section";
import WithScrollbar from "../../molecules/Carousel/WithScrollbar";
import SimpleCarousel from "../../molecules/Carousel/SimpleCarousel";

export interface InfoCarouselProps {
    title: string;
    movieList: Movie[];
    listStatus: string;
    deviceType: string;
}

export const InfoCarousel: React.FC<InfoCarouselProps> = ({
    title,
    movieList,
    listStatus,
    deviceType
}) => {

    console.log(movieList)

    return (
        <Fragment>
            {/* <Section>
                <Simple deviceType={deviceType} />
            </Section> */}
            <Section>
                <h1>{title}</h1>
                <SimpleCarousel movies={movieList} />
            </Section>
        </Fragment>
    );

    /********************************/
    // const responsive = {
    //     superLargeDesktop: {
    //         // the naming can be any, depends on you.
    //         breakpoint: { max: 4000, min: 3000 },
    //         items: 5
    //     },
    //     desktop: {
    //         breakpoint: { max: 3000, min: 1024 },
    //         items: 3
    //     },
    //     tablet: {
    //         breakpoint: { max: 1024, min: 464 },
    //         items: 2
    //     },
    //     mobile: {
    //         breakpoint: { max: 464, min: 0 },
    //         items: 1
    //     }
    // };
    // return (
    //     <Carousel
    //         swipeable={false}
    //         draggable={false}
    //         showDots={true}
    //         responsive={responsive}
    //         ssr={true} // means to render carousel on server-side.
    //         infinite={true}
    //         autoPlay={isMobile}
    //         autoPlaySpeed={1000}
    //         keyBoardControl={true}
    //         customTransition="all .5"
    //         transitionDuration={500}
    //         containerClass="carousel-container"
    //         removeArrowOnDeviceType={["tablet", "mobile"]}
    //         deviceType={isMobile ? "mobile": "web"}
    //         dotListClass="custom-dot-list-style"
    //         itemClass="carousel-item-padding-40-px"
    //     >
    //         <div>Item 1</div>
    //         <div>Item 2</div>
    //         <div>Item 3</div>
    //         <div>Item 4</div>
    //     </Carousel>
    // );

    /********************************/

    // return (
    //     <div>
    //         <h1>{title}</h1>
    //         <div>
    //             {listStatus === "error" && <p>Error fetching data</p>}
    //             {listStatus === "loading" && <p>Fetching data...</p>}
    //             {(listStatus === "success") ?
    //                 <div>                        
    //                     {
    //                         (movieList !== undefined && movieList.length > 0) && movieList.map((movie: Movie) =>
    //                             <table key={movie.id}>
    //                                 <tbody >
    //                                     <tr>
    //                                         <td>***{movie.title}***</td>
    //                                         <td>###{movie.popularity}###</td>
    //                                         <td>{movie.release_date}</td>

    //                                     </tr>
    //                                 </tbody>
    //                             </table>
    //                         )
    //                     }
    //                 </div>
    //                 : null
    //             }
    //         </div>
    //     </div>
    // );
}