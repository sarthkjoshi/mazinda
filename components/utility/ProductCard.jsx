import Link from "next/link";
import { AspectRatio } from "../ui/aspect-ratio";
import Timer from "@/public/svg/Timer";

const ProductCard = ({ product }) => {
  const discount = String(
    ((product.pricing.mrp - product.pricing.salesPrice) / product.pricing.mrp) *
      100
  ).slice(0, 4);

  return (
    <Link
      key={product._id}
      href={`/product/view-product?id=${product._id}`}
      // href={`/product/${product._id}`}
      target="_blank"
      className="m-2 rounded-md border shadow w-[42vw] md:w-[200px] bg-white"
    >
      <div className="relative">
        {!(product.pricing.mrp === product.pricing.salesPrice) ? (
          <div className="absolute top-0 left-0 z-10 bg-[#F17E1395] p-1 text-[12px] font-bold rounded-br-2xl text-white">
            {discount}% <br />
            off
          </div>
        ) : null}
        <AspectRatio className="flex justify-center items-center" ratio={1 / 1}>
          <img
            className="rounded-lg h-[120px] md:h-[182px]"
            src={product.imagePaths[0]}
            alt="product"
          />
        </AspectRatio>
      </div>

      <div className="flex justify-between px-1">
        <div className="flex items-center gap-1 text-sm bg-gray-200 px-2 rounded-xl">
          <Timer />
          <span className="text-[11px]"> 30 MINS</span>
        </div>
      </div>

      <div className="mt-1 mx-2 overflow-hidden">
        <span className="cursor-pointer text-sm whitespace-nowrap">
          {product.productName}
        </span>
      </div>

      <div className="flex justify-between items-center p-1">
        <div className="flex mt-1 gap-1 items-center px-1">
          <span className="font-bold text-md">
            ₹{product.pricing.salesPrice}
          </span>
          {!(product.pricing.mrp === product.pricing.salesPrice) ? (
            <span className="text-[11px] line-through text-gray-500">
              ₹{product.pricing.mrp}
            </span>
          ) : null}
        </div>

        <div
          className={`${
            product.pricing.mrp.length > 3 ? "text-[7px]" : "text-[10px]"
          } rounded-md border border-[#F17E13] p-1 mt-2 bg-[#fce5d0] whitespace-nowrap`}
        >
          Add To Cart
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
