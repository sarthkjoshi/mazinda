import Story from "@/components/home_page/Story";
import Subcategories from "@/components/home_page/Subcategories";
import TopCarousel from "@/components/home_page/TopCarousel";
import ProductCollection from "@/components/product-collection/page";
import Link from "next/link";
import Categories from "@/components/home_page/Categories";
import Image from "next/image";

import SellOnMazindaImage from "@/public/sellonmazinda.png";

const Home = () => {
  return (
    <div className="mb-12 md:px-5">
      {/* <div className="my-3">
        <Story />
      </div> */}
      <div className="mt-2 mb-7">
        <TopCarousel />
      </div>

      <div className="my-5 p-3">
        <Subcategories />
      </div>

      <div className="my-6">
        <Link href="/">
          <img
            src={`${process.env.NEXT_PUBLIC_AWS_IMAGE_BUCKET_BASE_URI}/home-page/banner_one.JPG`}
            alt=""
          />
        </Link>
      </div>

      <div>
        <Categories />
      </div>

      <div className="my-5">
        <h1 className="text-lg font-semibold ml-3">Mazinda Top Deals</h1>
        <ProductCollection filter={"top-deal"} />
      </div>

      <div className="my-5">
        <h1 className="text-lg font-semibold ml-3">Trending Products</h1>
        <ProductCollection filter={"trending"} />
      </div>

      <div className="mb-20">
        <Link href="https://store.mazinda.com">
          <img
            className="hidden md:block"
            src={`${process.env.NEXT_PUBLIC_AWS_IMAGE_BUCKET_BASE_URI}/home-page/banner_end.JPG`}
            alt=""
          />
          <Image
            className="w-full md:hidden"
            src={SellOnMazindaImage}
            alt="Sell On Mazinda! Click Here"
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
