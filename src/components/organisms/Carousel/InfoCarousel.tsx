import "react-multi-carousel/lib/styles.css";
import React, { Fragment } from "react";
import { Movie } from "../../../models/movie";
import Section from "../../molecules/Carousel/Section";
import SimpleCarousel from "../../molecules/Carousel/SimpleCarousel";

export interface InfoCarouselProps {
    title: string;
    movieList: Movie[];
    listStatus: string;    
}

export const InfoCarousel: React.FC<InfoCarouselProps> = ({
    title,
    movieList,
    listStatus,
    //toggleModal
}) => {    

    return (
        <>
            <div>
                <div>
                    {listStatus === "error" && <p>Error fetching data</p>}
                    {listStatus === "loading" && <p>Fetching data...</p>}
                    {(listStatus === "success") ?
                        <div>
                            <Fragment>
                                <Section>
                                    <h1>{title}</h1>
                                    {/* <SimpleCarousel movies={movieList} toggleModal={toggleModal} /> */}
                                    <SimpleCarousel movies={movieList}/>
                                </Section>
                            </Fragment>
                        </div>
                        : null}
                </div>
            </div>
        </>
    );
}