"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import OvalLoader from "@/components/utility/OvalLoader";
import MazindaLogoFull from "@/public/logo_mazinda.png";
import Image from "next/image";
import AuthScreenPNG from "@/public/auth_screen.png";
import { signIn, useSession } from "next-auth/react";

const LoginPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const token = Cookies.get("user_token");

    if (token) {
      router.push("/");
    } else if (session?.status === "authenticated" && !token) {
      const handleContinueWithGoogle = async () => {
        try {
          const response = await axios.post("/api/auth/continue-with-google", {
            name: session.user.name,
            email: session.user.email,
          });

          const { success, token: userToken, message } = response.data;

          if (success) {
            Cookies.set("user_token", userToken, { expires: 1000 });
            router.push("/");
          } else {
            toast.warn(message, { autoClose: 3000 });
          }
        } catch (error) {
          console.error("An error occurred during Continue with Google:", error);
        }
      };

      handleContinueWithGoogle();
    }
  }, [session]);

  const [submitting, setSubmitting] = useState(false);
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
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

    try {
      const response = await axios.post("/api/user/auth/login", { credentials });

      if (response.data.success) {
        const { user_token } = response.data;
        Cookies.set("user_token", user_token, { expires: 1000 });
        router.push("/");
      } else {
        toast.warn(response.data.message, { autoClose: 3000 });
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }

    setSubmitting(false);
  };


  return (
    <div className="lg:flex">
      <div className="flex flex-col items-center pt-6 min-h-screen lg:justify-center border lg:w-full">
        <Image
          className="lg:hidden"
          src={MazindaLogoFull}
          alt="Mazinda Logo"
          width={150}
        />

        <div className="max-w-md w-full px-10 py-6 bg-white rounded-lg mt-5">
          <h1 className="mb-1 text-center font-extrabold text-4xl">Log In</h1>
          <div className="flex items-center justify-center">
            <p className="inline text-center text-gray-600">
              or{" "}
              <Link
                href="/user/auth/register"
                className="text-gray-600 underline"
              >
                create account
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="mb-4">
              <label
                htmlFor="identifier"
                className="block text-gray-700 font-bold mb-1"
              >
                Phone/Email
              </label>
              <input
                type="text"
                id="identifier"
                name="identifier"
                className="w-full px-5 py-2 border rounded-full"
                placeholder="Enter your email or phone"
                value={credentials.identifier}
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
                className="w-full px-5 py-2 border rounded-full"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-black text-white font-bold py-2 px-4 rounded-full hover:opacity-70"
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

              <Link
                href="/"
                className="mt-2 w-full bg-[#fe6321] text-white justify-center px-4 py-2 flex gap-2 border-slate-200 rounded-full text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
                onClick={() => {}}
              >
                <svg
                  className="w-6 h-6 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span>Continue as Guest</span>
              </Link>
            </div>
          </div>
        </div>
        <footer className="text-center text-gray-500">
          &copy; 20xx-20xx All Rights Reserved
          <div>
            <Link className="font-bold text-black underline" href="#">
              privacy
            </Link>{" "}
            and{" "}
            <Link className="font-bold text-black underline" href="#">
              terms
            </Link>
          </div>
        </footer>
      </div>

      <div className="w-full hidden lg:block">
        <Image src={AuthScreenPNG} className="h-screen w-full" alt="mazinda" />
      </div>
    </div>
  );
};

export default LoginPage;
