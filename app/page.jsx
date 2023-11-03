import Topdeal from "@/components/user/home/Topdeal"
import TrendingPage from "@/components/user/home/TrendingPage"

import Image from "next/image"
import banner from "@/public/banner.JPG"

const Home = () => {
  return (
    <div className="mb-20 md:px-5 py-2">
      <div className="mb-5">
        <Topdeal />
      </div>
      <div>
        <Image src={banner} />
      </div>
      <div className="my-5">
        <TrendingPage />
      </div>
    </div>
  )
}

export default Home