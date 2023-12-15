"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

import FirstImage from "@/public/top-slider-images/1.jpeg";
import SecondImage from "@/public/top-slider-images/2.jpeg";
import ThirdImage from "@/public/top-slider-images/3.jpeg";
import FourthImage from "@/public/top-slider-images/4.jpeg";

const TopCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const img_path_arr = [FirstImage, SecondImage, ThirdImage, FourthImage];

  return (
    <Slider {...settings}>
      {img_path_arr.map((path, index) => {
        return <Image key={index} src={path} alt="image" />;
      })}
    </Slider>
  );
};

export default TopCarousel;
