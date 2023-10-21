"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import OvalLoader from "@/components/admin/utility/OvalLoader";
import MazindaLogoFull from "@/public/logo_mazinda.png";
import Image from "next/image";

const RegisterPage = () => {
  const router = useRouter();

  //   const store_token = Cookies.get("store_token");
  //   if (store_token) {
  //     router.push('/store')
  //   }

  const [submitting, setSubmitting] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
    phoneNumber: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const response = await axios.post("/api/store/auth/login-store", {
      credentials,
    });

    console.log(response.data);
    if (response.data.success) {
      const { store_token } = response.data;
      Cookies.set("store_token", store_token, { expires: 1000 });
      router.push(`/store`);
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
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col items-center pt-6 min-h-screen">
      <Image className="" src={MazindaLogoFull} alt="Mazinda Logo" />
      <div className="max-w-md w-full px-10 py-6 bg-white rounded-lg">
        <h1 className="mb-1 text-center font-extrabold text-4xl">Sign Up</h1>
        <div className="flex items-center justify-center">
          <p className="inline text-center text-gray-600">
            or{" "}
            <Link href="/store/register" className="text-gray-600 underline">
              log into account
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-5 py-2 border rounded-full text-sm"
              placeholder="Enter your name"
              value={credentials.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-bold mb-1"
            >
              Phone
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="w-full px-5 py-2 border rounded-full text-sm"
              placeholder="Enter your phone number"
              value={credentials.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-5 py-2 border rounded-full text-sm"
              placeholder="Enter your Email"
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-5 py-2 border rounded-full text-sm"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-black text-white font-bold py-1 px-4 rounded-full hover:opacity-70"
            >
              {submitting ? <OvalLoader /> : "Log In"}
            </button>
            <div className="text-center mt-1">
              <a href="#" className="underline font-semibold text-sm">
                Forgot Password?
              </a>
            </div>
          </div>
        </form>

        <div className="text-center">
          <span className="font-extrabold text-gray-800">or</span>

          <div>
            <button
              className="mt-2 w-full justify-center px-4 py-2 border flex gap-2 border-slate-200 rounded-full text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
              onClick={() => signIn("google")}
            >
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span>Continue with Google</span>
            </button>

            <button
              className="mt-2 w-full bg-[#fe6321] text-white justify-center px-4 py-2 flex gap-2 border-slate-200 rounded-full text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
              onClick={() => {}}
            >
              <svg
                class="w-6 h-6 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
              <span>Continue as Guest</span>
            </button>
          </div>
        </div>
      </div>
      <footer className="text-center text-gray-500">
        &copy; 20xx-20xx All Rights Reserved 
        <div><Link className="font-bold text-black underline" href="#">privacy</Link> and <Link className="font-bold text-black underline" href="#">terms</Link></div>
      </footer>
    </div>
  );
};

export default RegisterPage;