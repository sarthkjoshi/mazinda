import axios from "axios";

export async function fetchCategories() {
  let categories = [];
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URI}/api/category/fetch-categories`
    );

    if (data.success) {
      categories = data.categories;
    }
  } catch (err) {
    console.log(err);
  } finally {
    return categories;
  }
}
