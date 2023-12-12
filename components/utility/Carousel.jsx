import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Carousel = ({ arr }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} className="p-4 border rounded-md">
      {arr.map((path, index) => {
        return (
          <AspectRatio className="mx-2" ratio={1 / 1}>
            <img
              key={index}
              src={path}
              alt=""
              className="mx-auto my-auto"
            />
          </AspectRatio>
        );
      })}
    </Slider>
  );
};

export default Carousel;
