import './globals.css'
import Head from 'next/head'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from '@/components/user/Navbar'
import BottomNavigationBar from '@/components/user/BottomNavigationBar'
import NextTopLoader from 'nextjs-toploader';
import { Slide } from 'react-toastify';

export const metadata = {
  title: 'Mazinda - Ab Maze Mein India !',
  description: 'Mazinda - Ab Maze Mein India !',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
        <Navbar />
        <NextTopLoader color="#F17E13" showSpinner={false} />
        {children}
        <BottomNavigationBar />
      </body>
    </html>
  )
}
