"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "./ui/aspect-ratio";

const CarouselShadcn = ({ images }) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem>
            <AspectRatio
              className="mx-2 flex justify-center items-center"
              ratio={1 / 1}
              key={index}
            >
              <img
                key={index}
                src={image}
                alt="PRODUCT"
                className="h-full mx-auto my-auto"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CarouselShadcn;
