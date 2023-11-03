'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import CartSVG from "@/public/svg/Cart";
import ProfileSVG from "@/public/svg/Profile";

function BottomMenu() {
  const pathname = usePathname();

  return (
    <>
      {!pathname.includes("/store") &&
        !pathname.includes("auth") &&
        !pathname.includes("admin") && (
          <div className="fixed bottom-2 z-50 w-full h-14 border-t border-gray-200 bg-[#fbe4d0] md:hidden rounded-3xl">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium scale-90">
              <Link
                href="/"
                type="button"
                className="inline-flex flex-col items-center justify-center px-5 hover:scale-110 transition-all ease-in"
              >
                <svg
                  width="25"
                  height="26"
                  viewBox="0 0 25 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.22197 20.0501H9.33299V13.8281H15.555V20.0501H18.6661V10.7171L12.444 6.05056L6.22197 10.7171V20.0501ZM6.22197 22.1241C5.65161 22.1241 5.16353 21.9212 4.75771 21.5153C4.3512 21.1088 4.14795 20.6204 4.14795 20.0501V10.7171C4.14795 10.3887 4.22158 10.0776 4.36883 9.78376C4.5154 9.48995 4.7183 9.24798 4.97756 9.05786L11.1996 4.39136C11.3897 4.2531 11.5885 4.1494 11.7959 4.08026C12.0033 4.01113 12.2193 3.97656 12.444 3.97656C12.6687 3.97656 12.8847 4.01113 13.0921 4.08026C13.2995 4.1494 13.4983 4.2531 13.6884 4.39136L19.9105 9.05786C20.1697 9.24798 20.373 9.48995 20.5202 9.78376C20.6668 10.0776 20.7401 10.3887 20.7401 10.7171V20.0501C20.7401 20.6204 20.5372 21.1088 20.1314 21.5153C19.7249 21.9212 19.2364 22.1241 18.6661 22.1241H13.481V15.9021H11.407V22.1241H6.22197Z"
                    fill="#676161"
                  />
                </svg>
                <span className="text-sm text-gray-500 dark:text-gray-400  ">
                  Home
                </span>
              </Link>

              <Link
                href="/user/my-cart"
                className="inline-flex flex-col items-center justify-center px-5 hover:scale-110 transition-all ease-in"
              >
                <CartSVG />

                <span className="text-sm text-gray-500 dark:text-gray-400  ">
                  Cart
                </span>
              </Link>

              <Link
                className="inline-flex flex-col items-center justify-center px-5 hover:scale-110 transition-all ease-in pt-[2px]"
                href="/user/browse-categories"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.662354"
                    y="0.939453"
                    width="8.65017"
                    height="8.6501"
                    rx="1.92223"
                    fill="#676161"
                  />
                  <rect
                    x="11.7153"
                    y="0.939453"
                    width="8.65017"
                    height="8.6501"
                    rx="1.92223"
                    fill="#676161"
                  />
                  <rect
                    x="11.7153"
                    y="11.9922"
                    width="8.65017"
                    height="8.6501"
                    rx="1.92223"
                    fill="#676161"
                  />
                  <rect
                    x="0.662354"
                    y="11.9922"
                    width="8.65017"
                    height="8.6501"
                    rx="1.92223"
                    fill="#676161"
                  />
                </svg>
                <span className="text-sm mt-1 text-gray-500 dark:text-gray-400  ">
                  Categories
                </span>
              </Link>

              {/* <Link
                href='#'
                className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group cursor-pointer"
              >
                <svg
                  width="25"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.9109 19.5843L12.8072 19.688L12.6931 19.5843C7.76736 15.1149 4.51115 12.1594 4.51115 9.16248C4.51115 7.08848 6.06666 5.53298 8.14068 5.53298C9.73767 5.53298 11.2932 6.56998 11.8428 7.9803H13.7716C14.3213 6.56998 15.8768 5.53298 17.4738 5.53298C19.5478 5.53298 21.1033 7.08848 21.1033 9.16248C21.1033 12.1594 17.8471 15.1149 12.9109 19.5843ZM17.4738 3.45898C15.6694 3.45898 13.9376 4.29895 12.8072 5.61594C11.6769 4.29895 9.94508 3.45898 8.14068 3.45898C4.94669 3.45898 2.43713 5.95815 2.43713 9.16248C2.43713 13.072 5.96296 16.2763 11.3036 21.1191L12.8072 22.4879L14.3109 21.1191C19.6515 16.2763 23.1773 13.072 23.1773 9.16248C23.1773 5.95815 20.6677 3.45898 17.4738 3.45898Z"
                    fill="#676161"
                  />
                </svg>
                <span className="text-sm text-gray-500 dark:text-gray-400  ">
                  Wishlist
                </span>
              </Link> */}

              <Link
                href='/user/my-account'
                className="inline-flex flex-col items-center justify-center px-5 hover:scale-110 transition-all ease-in"
              >
                <ProfileSVG />
                <span className="text-sm text-gray-500 dark:text-gray-400  ">
                  Account
                </span>
              </Link>
            </div>
          </div>
        )}
    </>
  );
}

export default BottomMenu;
