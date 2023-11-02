import Topdeal from "@/components/user/home/Topdeal"
import TrendingPage from "@/components/user/home/TrendingPage"

import Image from "next/image"
import banner from "@/public/banner.jpg"

const Home = () => {
  return (
    <div className="mb-20">
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