import TopCarousel from "@/components/home_page/top-carousel/TopCarousel";
import ProductCollection from "@/components/product-collection/page";
import Link from "next/link";

const Home = () => {
  return (
    <div className="mb-12 md:px-5">
      <div className="md:mb-10">
        <TopCarousel />
      </div>

      <div className="my-5">
        <ProductCollection filter={"top-deal"} />
      </div>
      <Link href="/">
        <img
          src={`${process.env.NEXT_PUBLIC_AWS_IMAGE_BUCKET_BASE_URI}/banner_mid.JPG`}
          alt=""
        />
      </Link>
      <div className="my-5">
        <ProductCollection filter={"trending"} />
      </div>
      <Link href="https://store.mazinda.com">
        <img
          src={`${process.env.NEXT_PUBLIC_AWS_IMAGE_BUCKET_BASE_URI}/banner_end.JPG`}
          alt=""
        />
      </Link>
    </div>
  );
};

export default Home;
