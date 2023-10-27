import axios from "axios";

export const fetchUserCart = async (userToken) => {
    try {
        const response = await axios.post("/api/user/fetch-user", { userToken });
        return response.data.user.cart;
    } catch (err) {
        console.log(err)
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