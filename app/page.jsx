import Topdeal from "@/components/user/home/Topdeal"
import TrendingPage from "@/components/user/home/TrendingPage"

const Home = () => {
  return (
    <div className="mb-14 md:px-5 py-2">
      <div>
        <img src={`${process.env.NEXT_PUBLIC_AWS_IMAGE_BUCKET_BASE_URI}/diwali_banner.JPG`} alt="" />
      </div>
      <div className="my-5">
        <Topdeal />
      </div>
      <div>
        <img src={`${process.env.NEXT_PUBLIC_AWS_IMAGE_BUCKET_BASE_URI}/banner_mid.JPG`} alt="" />
      </div>
      <div className="my-5">
        <TrendingPage />
      </div>
      <div>
        <img src={`${process.env.NEXT_PUBLIC_AWS_IMAGE_BUCKET_BASE_URI}/banner_end.JPG`} alt="" />
      </div>
    </div>
  )
}

export default Home