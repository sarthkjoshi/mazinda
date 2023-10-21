"use client";

import Link from "next/link";
import MazindaLogo from "@/public/logo_mini.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 py-2">
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

        <div className="flex mx-1 relative items-center">
          <input
            className="text-sm rounded-full px-6 py-1 w-full"
            type="text"
            placeholder="
          Search Anything ..."
          />
          <svg
            className="w-3 h-3 text-gray-600 dark:text-white absolute left-2"
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

        <div>Deliver to</div>
      </div>
    </nav>
  );
};

export default Navbar;