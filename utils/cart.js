import axios from "axios";

export const fetchUserCart = async (userToken) => {
  try {
    const { data } = await axios.post("/api/user/fetch-user", { userToken });
    return data.user.cart;
  } catch (err) {
    console.log(err);
  }
};

export const removeItemFromCart = async (userToken, productID) => {
  try {
    const response = await axios.post("/api/user/cart/remove-product", {
      productID,
      userToken,
    });
    console.log(response.data);
    if (response.data.success) {
      return response.data.newCart;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

export const clearUserCart = async (userToken) => {
  try {
    const response = await axios.post("/api/user/cart/clear-cart", {
      userToken,
    });
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};
