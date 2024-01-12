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

      <div className="flex justify-between items-center px-3">
        <h1 className="text-lg font-semibold ml-3">What are you looking for?</h1>
          <Link
            className="text-md underline mr-2"
            href={"/user/browse-categories"}
          >View Details</Link>
      </div>
      <div>
        <Subcategories />
      </div>

      <div className="my-6">
        <Link href="/">
          <img
            src={`${process.env.NEXT_PUBLIC_AWS_IMAGE_BUCKET_BASE_URI}/home-page/banner_one.JPG`}
            alt=""
            className="w-full"
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
        <Link href="https://play.google.com/store/apps/details?id=com.abhey_gupta.MazindaApp">
          <img
            className="hidden md:block w-full"
            src={`${process.env.NEXT_PUBLIC_AWS_IMAGE_BUCKET_BASE_URI}/home-page/banner_end.JPG`}
            alt=""
          />
          <img
            className="w-full md:hidden"
            src={`${process.env.NEXT_PUBLIC_AWS_IMAGE_BUCKET_BASE_URI}/home-page/banner_end.JPG`}
           
            alt="Sell On Mazinda! Click Here"
          />
        </Link>
      </div>
    </div>
  );
};

export default Home;
