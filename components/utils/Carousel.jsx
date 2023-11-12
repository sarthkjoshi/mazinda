import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ arr }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {arr.map((path) => {
        return (
          <img
            src={path}
            alt=""
            className="object-cover w-full h-full"
          />
        );
      })}
    </Slider>
  );
};

export default Carousel;
