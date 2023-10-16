import BottomNavigationBar from "@/components/store/BottomNavigationBar";
import Navbar from "@/components/store/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <div className="px-2">
          <BottomNavigationBar />
        </div>
      </body>
    </html>
  );
}
