import Carousel, { CarouselProps } from "react-multi-carousel";

export interface SimpleProps {
    carouselProps: CarouselProps
}

export const CustomSlider: React.FC<CarouselProps> = (
    carouselProps
) => {

    console.log("carouselProps-ts: ", carouselProps)    
    //console.log("this.Carousel: ", this.Carousel)

    let value = 0;
    let carouselItemWidth = 0;
        
    const car = new Carousel(carouselProps.children);
    
    
    console.log("car:", car);
    console.log("car.state:", car.state);
    
    // if (this.Carousel) {
    //     //carouselItemWidth = this.Carousel.state.itemWidth;
    //     carouselItemWidth = itemWidth;
    //     const maxTranslateX = Math.round(
    //         // so that we don't over-slide
    //         carouselItemWidth * (totalItems - slidesToShow) + 150
    //         //carouselItemWidth * (this.Carousel.state.totalItems - this.Carousel.state.slidesToShow) + 150
    //     );
    //     value = maxTranslateX / 100; // calculate the unit of transform for the slider
    // }
    //const { transform } = carouselProps;

    // console.log("transform:", transform)

    // return (
    //     <div className="custom-slider">
    //         <input
    //             type="range"
    //             value={Math.round(Math.abs(transform) / value)}
    //             // defaultValue={0}
    //             max={
    //                 (carouselItemWidth *
    //                     (carouselState.totalItems - carouselState.slidesToShow) +
    //                     (this.state.additionalTransfrom === 150 ? 0 : 150)) /
    //                 value
    //             }
    //             onChange={e => {
    //                 if (this.Carousel.isAnimationAllowed) {
    //                     this.Carousel.isAnimationAllowed = false;
    //                 }
    //                 const nextTransform = e.target.value * value;
    //                 const nextSlide = Math.round(nextTransform / carouselItemWidth);
    //                 if (
    //                     e.target.value === 0 &&
    //                     this.state.additionalTransfrom === 150
    //                 ) {
    //                     this.Carousel.isAnimationAllowed = true;
    //                     this.setState({ additionalTransfrom: 0 });
    //                 }
    //                 this.Carousel.setState({
    //                     transform: -nextTransform, // padding 20px and 5 items.
    //                     currentSlide: nextSlide
    //                 });
    //             }}
    //             className="custom-slider__input"
    //         />
    //     </div>
    // );

    return <></>

}
