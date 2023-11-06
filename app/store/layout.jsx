"use client";

import BottomNavigationBar from "@/components/store/BottomNavigationBar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/store/Navbar";

export default function RootLayout({ children }) {
  let router;
  try {
    router = useRouter();
  } catch (e) {
    console.log(e);
  }
  const pathname = usePathname();

  const store_token = Cookies.get("store_token");

  const [loggedIn, setLoggedIn] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState("pending");

  const fetchApprovalStatus = async () => {
    try {
      const response = await axios.post(`/api/store/fetch-store`, {
        store_token,
      });
      if (response.data.success) {
        const approvedStatus = response.data.store.approvedStatus;
        setApprovalStatus(approvedStatus);
      } else {
        console.error("Error fetching approval status");
      }
    } catch (error) {
      console.error("Error fetching approval status: ", error);
    }
  };

  useEffect(() => {
    const store_token = Cookies.get("store_token");
    if (!store_token && !pathname.includes("store/auth/login")) {
      setLoggedIn(false);
      router.push("/store/auth/register");
    } else {
      setLoggedIn(true);
      fetchApprovalStatus();
    }
  }, [pathname]);

  return (
    <>
      <Navbar />
      {children}
      <div className="px-2">
        {loggedIn && approvalStatus === "approved" && <BottomNavigationBar />}
      </div>
    </>
  );
}
