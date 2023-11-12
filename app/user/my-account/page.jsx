"use client";

import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OvalLoader from "@/components/utility/OvalLoader";
import OrdersList from "@/components/user/OrdersList";
import { signOut } from "next-auth/react";

const RightArrorSvg = () => {
  return (
    <svg
      className="w-3 h-3 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 8 14"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
      />
    </svg>
  );
};

const DownArrorSvg = () => {
  return (
    <svg
      className="w-3 h-3 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 8"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
      />
    </svg>
  );
};

const MyAccount = () => {
  const router = useRouter();

  const [userLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState({});
  const [userToken, setUserToken] = useState({});
  const [currentOpenBox, setCurrentOpenBox] = useState("");

  const fetchData = async (userToken) => {
    try {
      const response = await axios.post("/api/user/fetch-user", { userToken });
      if (response.data.success) {
        setUser(response.data.user);
        setUserLoading(false);
      } else {
        toast.error("An unexpected error occurred");
      }
    } catch (err) {
      console.log("An error occurred ", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/' });
      Cookies.remove("user_token");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const userToken = Cookies.get("user_token");
    if (!userToken) {
      router.push("/user/auth/login");
      return;
    }
    setUserToken(userToken);
    fetchData(userToken);
  }, []);

  return (
    <div className="md:w-1/2 lg:w-1/3 md:mx-auto">
      <h1 className="text-center text-2xl md:mb-7">My Account</h1>

      <div
        onClick={() =>
          setCurrentOpenBox(currentOpenBox === "userinfo" ? null : "userinfo")
        }
      >
        <div className="flex items-center justify-between p-5">
          {userLoading ? (
            <div className="w-full flex items-center justify-center">
              <OvalLoader />
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div>
                <span className="font-bold text-lg">{user.name}</span>
                {user.phoneNumber && (
                  <span className="text-gray-500 text-sm flex">
                    <svg
                      className="mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      height="18"
                      viewBox="0 -960 960 960"
                      width="18"
                    >
                      <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                    </svg>
                    {user.phoneNumber}
                  </span>
                )}
                <span className="text-gray-500 text-sm flex">
                  <svg
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    height="18"
                    viewBox="0 -960 960 960"
                    width="18"
                  >
                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                  </svg>
                  {user.email}
                </span>
              </div>
              {currentOpenBox === "userinfo" ? (
                <DownArrorSvg />
              ) : (
                <RightArrorSvg />
              )}
            </div>
          )}
        </div>
        {currentOpenBox === "userinfo" ? (
          <Link
            href="/"
            className="text-gray-600 ml-5 flex items-center border w-fit px-2 py-1 rounded-md my-3"
            onClick={() => {
              handleLogout();
            }}
          >
            <svg
              className="w-5 h-5 text-gray-600 dark:text-white mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z" />
            </svg>
            Logout
          </Link>
        ) : null}
        <hr />
      </div>

      <div
        onClick={() =>
          setCurrentOpenBox(currentOpenBox === "gethelp" ? null : "gethelp")
        }
      >
        <div className="flex items-center justify-between p-5">
          <div className="flex flex-col">
            <span className="text-lg">Get Help</span>
            <span className="text-gray-500 text-sm">
              Queries, Feedback and Bug Reports
            </span>
          </div>
          {currentOpenBox === "gethelp" ? <DownArrorSvg /> : <RightArrorSvg />}
        </div>
        {currentOpenBox === "gethelp" ? (
          <div
            className="flex justify-center flex-col items-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <textarea
              className="rounded-md mx-4 w-full"
              name="gethelpinput"
              id=""
              cols="30"
              rows="5"
            ></textarea>
            <button className="bg-[#F17E13] px-5 py-1 w-fit my-1 rounded-full font-bold text-white md:rounded-lg">
              Submit
            </button>
          </div>
        ) : null}
        <hr />
      </div>

      <div
        onClick={() =>
          setCurrentOpenBox(
            currentOpenBox === "currentorders" ? null : "currentorders"
          )
        }
      >
        <div className="flex items-center justify-between p-5">
          <div className="flex flex-col">
            <span className="text-lg">Current Orders</span>
            <span className="text-gray-500 text-sm">
              View Your Current Orders
            </span>
          </div>
          {currentOpenBox === "currentorders" ? (
            <DownArrorSvg />
          ) : (
            <RightArrorSvg />
          )}
        </div>

        {currentOpenBox === "currentorders" ? (
          <OrdersList filter="active" />
        ) : null}

        <hr />
      </div>
      <div
        onClick={() =>
          setCurrentOpenBox(
            currentOpenBox === "orderhistory" ? null : "orderhistory"
          )
        }
      >
        <div className="flex items-center justify-between p-5">
          <div className="flex flex-col">
            <span className="text-lg">Order History</span>
            <span className="text-gray-500 text-sm">
              Browse Your Order History
            </span>
          </div>
          {currentOpenBox === "orderhistory" ? (
            <DownArrorSvg />
          ) : (
            <RightArrorSvg />
          )}
        </div>
        {currentOpenBox === "orderhistory" ? (
          <OrdersList filter="delivered" />
        ) : null}
        <hr />
      </div>
    </div>
  );
};

export default MyAccount;
