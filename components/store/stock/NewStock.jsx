import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { toast } from "react-toastify";

const initialCategories = ["Category 1", "Category 2", "Category 3"];

const AddNewStock = () => {
  const [productData, setProductData] = useState({
    productName: "",
    storeToken: Cookies.get("store_token"),
    category: "",
    pricing: {
      mrp: "",
      costPrice: "",
    },
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/product/add-new-product", {
        productData,
      });

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      setProductData({
        productName: "",
        storeToken: Cookies.get("store_token"),
        category: "",
        pricing: {
          mrp: "",
          costPrice: "",
        },
        description: "",
      });
    } catch (e) {
      toast.error(e.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePricingChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      pricing: {
        ...prevData.pricing,
        [name]: value,
      },
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="text-sm">
        <div className="mb-4">
          <label htmlFor="productName" className="block font-medium">
            Product Name:
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            className="w-full px-2 py-1 border border-gray-300 rounded-full"
            value={productData.productName}
            onChange={handleFieldChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block font-medium">
            Category:
          </label>
          <select
            id="category"
            name="category"
            className="w-full px-2 py-1 border border-gray-300 rounded-full text-gray-600"
            value={productData.category}
            onChange={handleFieldChange}
          >
            <option value="">Select Category</option>
            {initialCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <div className="mb-4 mx-1">
            <label htmlFor="mrp" className="block font-medium">
              MRP:
            </label>
            <input
              type="text"
              id="mrp"
              name="mrp"
              className="w-full px-2 py-1 border border-gray-300 rounded-full"
              value={productData.pricing.mrp}
              onChange={handlePricingChange}
            />
          </div>
          <div className="mb-4 mx-1">
            <label htmlFor="costPrice" className="block font-medium">
              Cost Price:
            </label>
            <input
              type="text"
              id="costPrice"
              name="costPrice"
              className="w-full px-2 py-1 border border-gray-300 rounded-full"
              value={productData.pricing.costPrice}
              onChange={handlePricingChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
            value={productData.description}
            onChange={handleFieldChange}
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="bg-[#f17e13] text-white px-4 py-1 rounded-full hover:opacity-75"
          >
            Add Stock
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewStock;
