import Image from "next/image";
import LoadingItemImage from "@/public/LoadingItem.png";

const ProductsLoading = () => {
  return (
    <div className="flex flex-wrap justify-evenly mb-20 mt-4">
      <Image className="my-2" src={LoadingItemImage} alt="Loading" />
      <Image className="my-2" src={LoadingItemImage} alt="Loading" />
      <Image className="my-2" src={LoadingItemImage} alt="Loading" />
      <Image className="my-2" src={LoadingItemImage} alt="Loading" />
      <Image className="my-2" src={LoadingItemImage} alt="Loading" />
      <Image className="my-2" src={LoadingItemImage} alt="Loading" />
    </div>
  );
};

export default ProductsLoading;