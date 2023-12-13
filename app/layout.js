import './globals.css'
import Head from 'next/head'
import { Quicksand } from 'next/font/google'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from 'react-toastify';
import Navbar from '@/components/Navbar'
import BottomNavigationBar from '@/components/BottomNavigationBar'
import NextTopLoader from 'nextjs-toploader';
import Authprovider from '@/components/Authprovider/Authprovider';
import LocationProvider from '@/contexts/LocationContext';
import { Toaster } from "@/components/ui/toaster"
import Footer from '@/components/Footer';

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


        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />


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
