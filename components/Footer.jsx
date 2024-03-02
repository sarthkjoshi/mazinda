"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname === "/" && (
        <footer className="bg-white rounded-lg m-4 dark:bg-gray-800 hidden md:block">
          <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <Link
                href="https://mazinda.com"
                target="_blank"
                className="hover:underline"
              >
                Mazinda Commerce Private Limited
              </Link>
              . All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
              <Link
                href="/terms-and-conditions"
                className="hover:underline me-4 md:me-6"
              >
                Terms and Conditions
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:underline me-4 md:me-6"
              >
                Privacy Policy
              </Link>
              <Link
                href="/shipping-policy"
                className="hover:underline me-4 md:me-6"
              >
                Shipping Policy
              </Link>
              <Link
                href="/return-policy"
                className="hover:underline me-4 md:me-6"
              >
                Return Policy
              </Link>
            </ul>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
