"use client";

import BottomNavigationBar from "@/components/store/BottomNavigationBar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const pathname = usePathname()

  useEffect(() => {
    const store_token = Cookies.get("store_token");
    if (!store_token) {
      setLoggedIn(false);
      router.push("/store/auth/register");
    } else {
      setLoggedIn(true);
    }
  }, [pathname]);

  return (
    <>
      {children}
      <div className="px-2">
        {loggedIn ? <BottomNavigationBar /> : null}
      </div>
    </>
  );
}