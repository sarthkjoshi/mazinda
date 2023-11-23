import './globals.css'
import Head from 'next/head'
import { Quicksand } from 'next/font/google'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from 'react-toastify';
import Navbar from '@/components/user/Navbar'
import BottomNavigationBar from '@/components/user/BottomNavigationBar'
import NextTopLoader from 'nextjs-toploader';
import Authprovider from '@/components/Authprovider/Authprovider';
import LocationProvider from '@/contexts/LocationContext';
import { Toaster } from "@/components/ui/toaster"
import Footer from '@/components/user/Footer';

const quicksand = Quicksand({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Mazinda - Ab Maze Mein India !',
  description: 'Mazinda - Ab Maze Mein India !',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={quicksand.className}>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </Head>
      <body>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Slide}
          theme="light"
        />

        <LocationProvider>

          <Authprovider>

            <Navbar />
            <NextTopLoader color="#F17E13" showSpinner={false} />
            {children}

            <BottomNavigationBar />
            
          </Authprovider>

        </LocationProvider>

        <Toaster />

        <Footer />
      </body>
    </html>
  )
}
