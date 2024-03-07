import axios from "axios";

export async function fetchBanners(banner_type) {
  let banners = [];
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URI}/api/banner/fetch`,
      {
        banner_type,
      }
    );
    if (data.success) {
      banners = data.banners;
    }
  } catch (err) {
    console.log(err);
  } finally {
    return banners;
  }
}
