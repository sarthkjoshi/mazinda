import Link from "next/link";
import { AspectRatio } from "./ui/aspect-ratio";

const ProductCard = ({ product }) => {
  return (
    <Link
      key={product._id}
      href={`/product/view-product?id=${product._id}`}
      className="p-2 m-2 rounded-md border shadow w-40 md:w-[200px] bg-white"
    >
      <AspectRatio className="flex justify-center items-center" ratio={1 / 1}>
        <img className="rounded-lg h-[142px] md:h-[182px]" src={product.imagePaths[0]} alt="product" />
      </AspectRatio>

      <div className="flex mt-2 justify-between items-center">
        <span className="cursor-pointer text-sm mx-1">
          {product.productName.slice(0, 20)}...
        </span>

        <div className="flex flex-col ml-2">
          <span className="font-bold self-end text-[15px]">
            ₹{product.pricing.salesPrice}
          </span>
          <span className="text-[10px] line-through text-gray-500 self-end">
            ₹{product.pricing.mrp}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
