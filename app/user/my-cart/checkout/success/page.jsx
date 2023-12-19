import Image from "next/image";

import success_tick from "@/public/Success_tick.png";
import Link from "next/link";
import ProductCollection from "@/components/product-collection/page";

const SuccessPage = () => {
  return (
    <div className="mb-20 mt-2">
      <h1 className="text-center text-2xl mb-2">Success</h1>
      <div className="w-full flex flex-col justify-center items-center mt-3">
        <span className="text-xl my-3">Your Order is Placed Successfully</span>
        <Image src={success_tick} alt="success" />

        <span className="text-md text-gray-600 mt-3">
          Thanks for purchasing with Mazinda!
        </span>
        <span className="text-md text-gray-600">
          Your order will reach you very soon
        </span>
      </div>

      <div className="my-6">
        <h1 className="px-3 text-lg font-bold">Also Explore</h1>
        <ProductCollection filter={"top-deal"} />
      </div>

      <div className="w-full flex justify-center">
        <Link
          className="my-5 bg-[#FE6321] rounded-full px-5 py-2 text-white font-bold"
          href="/"
        >
          Explore More Products
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
