import Image from "next/image";
import LoadingItemImage from "@/public/LoadingItem.png";

const ProductsLoading = () => {
  return (
    <div className="flex flex-wrap justify-between p-2 mb-20">
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