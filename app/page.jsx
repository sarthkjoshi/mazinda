import ProductCollection from "@/components/product-collection/page";
import Link from "next/link";

const Home = () => {
  return (
    <div className="mb-14 md:px-5 py-2">
      <div>
        <img
          src={`${process.env.NEXT_PUBLIC_AWS_IMAGE_BUCKET_BASE_URI}/diwali_banner.JPG`}
          alt=""
        />
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
