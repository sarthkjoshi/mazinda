import Story from "@/components/home_page/Story";
import TopCarousel from "@/components/home_page/TopCarousel";
import ProductCollection from "@/components/product-collection/page";
import Link from "next/link";
import Categories from "@/components/home_page/Categories";
import LookingFor from "@/components/home_page/LookingFor";
import PromotionalBanner from "@/components/home_page/PromotionalBanner";

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
        <h1 className="text-lg font-semibold ml-3">
          What are you looking for?
        </h1>
        <Link
          className="text-md underline mr-2"
          href={"/user/browse-categories"}
        >
          View Details
        </Link>
      </div>
      <div>
        <LookingFor />
      </div>

      <div className="my-6">
        <PromotionalBanner banner_num={1} />
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
        <PromotionalBanner banner_num={2} />
      </div>
    </div>
  );
};

export default Home;
