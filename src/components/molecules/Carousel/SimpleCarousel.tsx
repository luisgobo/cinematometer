import React from "react";
import { deviceType } from "react-device-detect";
import Carousel from "react-multi-carousel";
import { Movie } from "../../../models/movie";
import { CarouselCard } from "./CarouselCard";

export interface SimpleCarouselProps {
    movies: Movie[];
}

export const SimpleCarousel: React.FC<SimpleCarouselProps> = ({
    movies,    
}) => {

    const responsive = {
        browser: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            paritialVisibilityGutter: 60
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            paritialVisibilityGutter: 60
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            paritialVisibilityGutter: 50
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            paritialVisibilityGutter: 30
        }
    };

    return (
        <Carousel
            ssr
            partialVisbile
            deviceType={deviceType}
            itemClass="image-item"
            responsive={responsive}
            autoPlay={true}
            infinite={true}
            focusOnSelect={false}
        >
            {
                movies.slice(0, 19)
                    .map(
                        movieInfo => <CarouselCard movie={movieInfo} key={movieInfo.id} />
                    )
            }
        </Carousel>
    );
}

export default SimpleCarousel;