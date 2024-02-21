import React from "react";
import Slider from "react-slick";

import homeImage from '../assets/images/home.jpg';
import bookImage from '../assets/images/books.jpg';
import fashionImage from '../assets/images/fashion.jpg';

function Carousel({ image }) {
  const images = [image, homeImage, bookImage, fashionImage];

  const settings = {
    customPaging: function(i) {
      return (
        <a>
          <img src={images[i]} alt={`Thumbnail ${i}`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;




