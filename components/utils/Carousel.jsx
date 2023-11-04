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
      {arr.map((imageName) => {
        return (
          <img
            src={`${process.env.NEXT_PUBLIC_AWS_IMAGE_BUCKET_BASE_URI}/${imageName}`}
            alt=""
            className="object-cover w-full h-full"
          />
        );
      })}
    </Slider>
  );
};

export default Carousel;
