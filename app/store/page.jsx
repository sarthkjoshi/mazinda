"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import OvalLoader from "@/components/admin/utility/OvalLoader";
import MazindaLogoFull from "@/public/logo_mazinda.png";
import Image from "next/image";
import Dashboard from "@/components/store/Dashboard";
import { useRouter } from "next/navigation";

const StoreDashboard = () => {
  const router = useRouter();

  const [approvalStatus, setApprovalStatus] = useState("");
  const store_token = Cookies.get("store_token");
  if (!store_token) {
    router.push('/store/auth/register');
    return;
  }

  const fetchApprovalStatus = async () => {
    try {
      const response = await axios.post(`/api/store/fetch-store`, {
        store_token,
      });
      console.log(response.data);
      if (response.data.success) {
        setApprovalStatus(response.data.store.approvedStatus);
      } else {
        console.error("Error fetching approval status");
      }
    } catch (error) {
      console.error("Error fetching approval status: ", error);
    }
  };

  useEffect(() => {
    fetchApprovalStatus();
  }, []);

  return (
    <div>
      {approvalStatus === "approved" ? (
        <div>
          <Dashboard />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center flex-col">
            <Image
              className="my-4 mt-12"
              src={MazindaLogoFull}
              alt="Mazinda Logo"
            />
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h1 className="text-3xl font-semibold text-center mb-6">
                Approval Request Status
              </h1>

              <div className="text-center">
                {approvalStatus === "pending" ? (
                  <div className="text-yellow-400 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 inline-block mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 21a9 9 0 01-9-9h2a7 7 0 007 7 7 7 0 007-7h2a9 9 0 01-9 9z"
                      />
                    </svg>
                    Your request for store approval is currently pending. You
                    will be notified once it is approved.
                  </div>
                ) : approvalStatus === "rejected" ? (
                  <div className="text-red-600 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 inline-block mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Unfortunately, your store request has been rejected. You can
                    reach out at contact@mazinda.com for more information
                  </div>
                ) : (
                  <div className="text-indigo-700 mb-4">
                    <OvalLoader />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StoreDashboard;
