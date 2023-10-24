"use client";

import Link from "next/link";
import MazindaLogo from "@/public/logo_mini.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async (searchQuery) => {
    const response = await axios.post(
      "/api/product/fetch-search-products-name",
      {
        searchQuery,
      }
    );
    setProducts(response.data.products);
  };

  return (
    <>
      {!pathname.includes("/store") &&
        !pathname.includes("auth") &&
        !pathname.includes("admin") && (
          <nav className="bg-white border-gray-200 dark:bg-gray-900 py-2">
            {showSearchBox && (
              <div
                className={`absolute top-20 border rounded-md w-full bg-white z-10 ${
                  searchQuery.length === 0 ? "hidden" : ""
                }`}
              >
                <div
                  className="border rounded-md px-3 py-2 flex items-center text-sm font-semibold cursor-pointer"
                  onClick={() => {
                    router.push(`/user/search/${searchQuery}`);
                    setShowSearchBox(false)
                    setSearchQuery(searchQuery)
                  }}
                >
                  <svg
                    width="18"
                    height="16"
                    viewBox="0 0 18 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <path
                      d="M16.1698 16.146L10.0331 10.4949C9.54605 10.8537 8.98595 11.1378 8.35279 11.3471C7.71964 11.5564 7.04589 11.661 6.33156 11.661C4.56197 11.661 3.06448 11.0968 1.83908 9.96837C0.613025 8.83934 0 7.46005 0 5.8305C0 4.20095 0.613025 2.82166 1.83908 1.69264C3.06448 0.564213 4.56197 0 6.33156 0C8.10115 0 9.59897 0.564213 10.825 1.69264C12.0504 2.82166 12.6631 4.20095 12.6631 5.8305C12.6631 6.4883 12.5495 7.10873 12.3222 7.69178C12.0949 8.27483 11.7864 8.7906 11.3968 9.2391L17.5336 14.8902L16.1698 16.146ZM6.33156 9.867C7.54917 9.867 8.5843 9.47472 9.43695 8.69014C10.2889 7.90497 10.715 6.95175 10.715 5.8305C10.715 4.70925 10.2889 3.75604 9.43695 2.97087C8.5843 2.18629 7.54917 1.794 6.33156 1.794C5.11395 1.794 4.07882 2.18629 3.22617 2.97087C2.37417 3.75604 1.94817 4.70925 1.94817 5.8305C1.94817 6.95175 2.37417 7.90497 3.22617 8.69014C4.07882 9.47472 5.11395 9.867 6.33156 9.867Z"
                      fill="#868484"
                    />
                  </svg>

                  {searchQuery}
                </div>

                {products.length > 0 &&
                  products.map((product, index) => {
                    return (
                      <div
                        key={index}
                        className="border rounded-md px-3 py-2 flex items-center text-sm font-semibold cursor-pointer"
                        onClick={() => {
                          router.push(`/user/search/${product.productName}`);
                          setSearchQuery(product.productName)
                          setShowSearchBox(false)
                        }}
                      >
                        <svg
                          width="18"
                          height="16"
                          viewBox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2"
                        >
                          <path
                            d="M16.1698 16.146L10.0331 10.4949C9.54605 10.8537 8.98595 11.1378 8.35279 11.3471C7.71964 11.5564 7.04589 11.661 6.33156 11.661C4.56197 11.661 3.06448 11.0968 1.83908 9.96837C0.613025 8.83934 0 7.46005 0 5.8305C0 4.20095 0.613025 2.82166 1.83908 1.69264C3.06448 0.564213 4.56197 0 6.33156 0C8.10115 0 9.59897 0.564213 10.825 1.69264C12.0504 2.82166 12.6631 4.20095 12.6631 5.8305C12.6631 6.4883 12.5495 7.10873 12.3222 7.69178C12.0949 8.27483 11.7864 8.7906 11.3968 9.2391L17.5336 14.8902L16.1698 16.146ZM6.33156 9.867C7.54917 9.867 8.5843 9.47472 9.43695 8.69014C10.2889 7.90497 10.715 6.95175 10.715 5.8305C10.715 4.70925 10.2889 3.75604 9.43695 2.97087C8.5843 2.18629 7.54917 1.794 6.33156 1.794C5.11395 1.794 4.07882 2.18629 3.22617 2.97087C2.37417 3.75604 1.94817 4.70925 1.94817 5.8305C1.94817 6.95175 2.37417 7.90497 3.22617 8.69014C4.07882 9.47472 5.11395 9.867 6.33156 9.867Z"
                            fill="#868484"
                          />
                        </svg>
                        {product.productName}
                      </div>
                    );
                  })}
              </div>
            )}

            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
              <Link href="/store">
                <Image
                  width={50}
                  height={60}
                  src={MazindaLogo}
                  className="h-8 mr-3"
                  alt="Mazinda Logo"
                />
              </Link>

              <div className="flex mx-1 relative items-center flex-col">
                <input
                  className="text-[13px] rounded-full px-3 pr-6 py-[0.2em] w-full"
                  type="text"
                  placeholder="Search Anything ..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchBox(true);

                    if (e.target.value.length === 0) {
                      setProducts([]);
                      setShowSearchBox(false);
                    } else if (e.target.value.length > 1) {
                      fetchProducts(e.target.value);
                    }
                  }}
                />
                <svg
                  className="w-3 h-3 text-gray-600 dark:text-white absolute right-2 top-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>

              <div className="flex">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.05197 8.50033C9.46685 8.50033 9.82214 8.36149 10.1178 8.08383C10.413 7.80663 10.5606 7.47324 10.5606 7.08366C10.5606 6.69408 10.413 6.36045 10.1178 6.08278C9.82214 5.80559 9.46685 5.66699 9.05197 5.66699C8.63709 5.66699 8.28205 5.80559 7.98685 6.08278C7.69116 6.36045 7.54331 6.69408 7.54331 7.08366C7.54331 7.47324 7.69116 7.80663 7.98685 8.08383C8.28205 8.36149 8.63709 8.50033 9.05197 8.50033ZM9.05197 13.7066C10.5858 12.3844 11.7235 11.183 12.4653 10.1026C13.2071 9.0226 13.5779 8.06352 13.5779 7.22533C13.5779 5.93852 13.1409 4.88476 12.2669 4.06403C11.3934 3.24378 10.3218 2.83366 9.05197 2.83366C7.78218 2.83366 6.71028 3.24378 5.83626 4.06403C4.96275 4.88476 4.52599 5.93852 4.52599 7.22533C4.52599 8.06352 4.89687 9.0226 5.63863 10.1026C6.38038 11.183 7.51816 12.3844 9.05197 13.7066ZM9.05197 15.5837C7.02785 13.9663 5.51617 12.4639 4.51694 11.0765C3.5172 9.68962 3.01733 8.40588 3.01733 7.22533C3.01733 5.45449 3.62407 4.04373 4.83753 2.99303C6.05049 1.94234 7.4553 1.41699 9.05197 1.41699C10.6486 1.41699 12.0534 1.94234 13.2664 2.99303C14.4799 4.04373 15.0866 5.45449 15.0866 7.22533C15.0866 8.40588 14.587 9.68962 13.5877 11.0765C12.588 12.4639 11.0761 13.9663 9.05197 15.5837Z"
                    fill="#F17E13"
                  />
                </svg>

                <div className="flex flex-col">
                  <span className="text-gray-600 text-[9px]">Deliver to</span>
                  <span className="text-gray-600 text-sm">Chandigarh</span>
                </div>
              </div>
            </div>
          </nav>
        )}

      <button
        id="backBtn"
        type="button"
        className="text-gray-600 rounded-md ml-2 hover:text-gray-700 focus:outline-none absolute"
        onClick={() => window.history.back()}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 16L13.4 14.6L11.8 13H16V11H11.8L13.4 9.4L12 8L8 12L12 16ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6873 5.825 19.975 4.925 19.075C4.025 18.175 3.31267 17.1167 2.788 15.9C2.26267 14.6833 2 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31267 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.31233 8.1 2.787C9.31667 2.26233 10.6167 2 12 2C13.3833 2 14.6833 2.26233 15.9 2.787C17.1167 3.31233 18.175 4.025 19.075 4.925C19.975 5.825 20.6873 6.88333 21.212 8.1C21.7373 9.31667 22 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6873 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6873 15.9 21.212C14.6833 21.7373 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
            fill="black"
          />
        </svg>
      </button>
    </>
  );
};

export default Navbar;
