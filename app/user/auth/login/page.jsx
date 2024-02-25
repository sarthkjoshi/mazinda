"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import OvalLoader from "@/components/Loading-Spinners/OvalLoader";
import MazindaLogoFull from "@/public/logo_mazinda.png";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import ThreeDotsLoader from "@/components/Loading-Spinners/ThreeDotsLoader";
import { useSearchParams } from 'next/navigation'
import { Button, Label, TextInput } from 'flowbite-react';
const LoginPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')

  const [canProceedOTP, setCanProceedOTP] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [mobileError, setMobileError] = useState(true);
  const [otpError, setOtpError] = useState(true);
 
  useEffect(() => {
    const loadData = async () => {
      const token = Cookies.get("user_token");
      if (token) {
        router.push("/");
      }  
      setLoading(false);
    };

    loadData();
  }, [session]);

  const [otpSubmitting, setOtpSubmitting] = useState({
    sms: false,
    whatsapp: false,
  });
  const [credentials, setCredentials] = useState({
    phoneNumber: "",
    otp: "",
  });

  const handleInputChange = (e) => {
    setMobileError("");
    setOtpError("");
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setCredentials({ ...credentials, [e.target.name]: value });
  };

  const handleLoginWithOTP = async (platform) => {
     setOtpError("");
      if(credentials.phoneNumber=='' || credentials.phoneNumber.length < 10){
        setMobileError("Please enter a valid mobile number(10 digits)");
        return;
      }

      setOtpSubmitting((prev) => ({
        ...prev,
        [platform]: true,
      }));

      try {
        const otpSent = await sendOTP(credentials.phoneNumber, platform);

        if (otpSent) {
          setCanProceedOTP(true);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setOtpSubmitting((prev) => ({
          ...prev,
          [platform]: false,
        }));
      }
  } 

  const sendOTP = async (phoneNumber, platform) => {
    let data;
   
    try{
      const generatedVerificationCode = Math.floor(
        1000 + Math.random() * 9000
      ).toString();
      setVerificationCode(generatedVerificationCode);
      
      if (platform === "sms") {
        const res1 = await axios.post("/api/sms", {
          phone: phoneNumber,
          otp: generatedVerificationCode,
        });
        data = res1.data;
      } else if (platform === "whatsapp") {
        const res2 = await axios.post(
          "/api/whatsapp/msg-to-phone-no",
          {
            phone_number: phoneNumber,
            message: `${generatedVerificationCode} is the verification code to verify your Mazinda account. DO NOT share this code with anyone. Thanks`,
          }
        );
  
        data = res2.data;
      }
    }catch(error){
      setOtpError("Error while sending OTP! Please try another method.");
    }

    return data.success;
  };

  const verifyOTP = async () => {
      if(credentials.otp=='' || credentials.otp.length < 4){
        setOtpError("Please enter a valid OTP(4 digits)");
        return;
      }

      setOtpSubmitting((prev) => ({
        ...prev,
        ["sms"]: true,
      }));

      if (credentials.otp === verificationCode) {
        try{
          const response = await axios.post(
            "/api/auth/continue-with-otp",
            { phoneNumber:credentials.phoneNumber }
          );
          

          if (response.data.success) {
            const { user_token } = response.data;
            const  userToken  = user_token;
            Cookies.set("user_token", user_token, { expires: 1000 });
            if(redirect=="buynow"){
              const product =  JSON.parse(localStorage.getItem('buynow-product'));
               
              localStorage.setItem('buynow-product',"");
              try {
                await axios.post("/api/user/cart/buy-item", {
                  itemInfo: product,
                  userToken
                });
                router.push("/user/my-cart/checkout");
              } catch (err) {
                console.log(err);
              }
            }else if(redirect=="cart"){
              const product =  JSON.parse(localStorage.getItem('cart-product'));
              localStorage.setItem('cart-product',"");
    
              try {
                const { data } = await axios.post(
                  `/api/user/cart/add-update-item?filter=add`,
                  {
                    itemInfo: {
                      _id: product._id,
                      productName: product.productName,
                      imagePaths: product.imagePaths,
                      storeID: product.storeId,
                      costPrice: product.pricing.costPrice,
                      salesPrice: product.pricing.salesPrice,
                      mrp: product.pricing.mrp,
                    },
                    userToken,
                  }
                );
                if (data.success) {
                  router.push("/user/my-cart");
                }
              } catch (err) {
                console.log("An error occurred", err);
              }
    
               
            }else{
              router.push("/");
            }
          } else {
            toast.warn(response.data.message, { autoClose: 3000 });
          }

        }catch(error){
          console.log("error "+ error)
          setOtpSubmitting((prev) => ({
            ...prev,
            ["sms"]: true,
          }));
        }

        setOtpSubmitting((prev) => ({
          ...prev,
          ["sms"]: false,
        }));
        
      }else{
        setOtpError("Incorrect OTP");
      }
  }

 

  return (
    <div className="lg:flex">
      {loading && (
        <div className="absolute w-full h-full z-50 bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <ThreeDotsLoader />
        </div>
      )}
      <div
        className={`scale-90 flex flex-col items-center pt-2 min-h-screen  lg:w-full ${
          loading ? "pointer-events-none" : null
        }`}
      >
        <Link href="/">
          <Image src={MazindaLogoFull} alt="Mazinda Logo" width={150} />
        </Link>

        {/* login section */}

        {!canProceedOTP && (
          <div className="max-w-md w-full px-10 lg:py-6  rounded-md mt-5 lg:border my-3">
            <h3 className="mb-1 text-center font-bold text-2xl">
              Login <span className="text-sm text-gray-600">or</span> Signup
            </h3>
            <div className="flex items-center justify-center ">
              <div className="w-full bg-white">
                <div className="mb-2 block bg-white">
                  <Label htmlFor="mobile_number" value="Mobile Number" />
                </div>
                <TextInput 
                  id="phoneNumber" 
                  name="phoneNumber"
                  value={credentials.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Mobile Number"
                  addon="+91" 
                  maxLength="10"
                  minLength="10"
                  required />
              </div>
            </div>
            <div className="flex justify-left">
              <p className="text-red-500">{mobileError}</p>
            </div>
            <div className="flex justify-left">
              <p className="text-red-500">{otpError}</p>
            </div>
            <div className="flex items-center justify-center">
                <Button 
                    onClick = {() => {
                      handleLoginWithOTP("sms");
                    }}
                    color="gray" pill className=" font-500 bg-[#0f0a05] mt-3 w-full border-[#0f0a05] text-white px-2 py-1 rounded-md">
                  {otpSubmitting["sms"] ? <OvalLoader /> : "Send OTP via SMS"} 
                </Button>
            </div>
            <div className="text-center mt-5">
              <span className="font-extrabold text-gray-800">or</span>
              <Button 
                onClick = {() => {
                  handleLoginWithOTP("whatsapp");
                }}
              color="gray" pill className="border mt-5 w-full border-[#F17E13] text-[#F17E13] px-2 py-1 rounded-md">
                {otpSubmitting["whatsapp"] ? <OvalLoader /> : "Send OTP via WhatsApp"}  
                </Button>
            </div>
          </div>
        )}
        

        {/* otp section */}
        {canProceedOTP && (
          <div className="max-w-md w-full px-10 lg:py-6  rounded-md mt-5 lg:border my-3">
            <h3 className="mb-1 text-center font-bold text-2xl">
              Verify OTP
            </h3>
            <div className="flex items-center justify-center ">
              <div className="w-full bg-white">
                <div className="mb-2 block bg-white">
                  <Label htmlFor="otp" value="Enter OTP" />
                </div>
                <TextInput 
                  id="otp" 
                  name="otp"
                  value={credentials.otp}
                  onChange={handleInputChange}
                  placeholder="OTP"
                  maxLength="4"
                  minLength="4"
                  required />
              </div>
            </div>
            <div className="flex justify-left">
              <p className="text-red-500">{otpError}</p>
            </div>
            <div className="flex items-center justify-center">
                <Button 
                    onClick = {verifyOTP}
                    color="gray" pill className=" font-500 bg-[#0f0a05] mt-3 w-full border-[#0f0a05] text-white px-2 py-1 rounded-md">
                  {otpSubmitting["sms"] ? <OvalLoader /> : "Verify OTP"} 
                </Button>
            </div>
            

          
          </div>
         )}

        <footer className="text-center text-gray-500">
          &copy; 2023 All Rights Reserved
          <br />
          Mazinda Commerce Private Limited
          <div>
            <Link
              className="font-bold text-black underline"
              href="/privacy-policy"
            >
              privacy
            </Link>{" "}
            and{" "}
            <Link
              className="font-bold text-black underline"
              href="/terms-and-conditions"
            >
              terms
            </Link>
          </div>
        </footer>

      </div>

       
    </div>
  );
};

export default LoginPage;
