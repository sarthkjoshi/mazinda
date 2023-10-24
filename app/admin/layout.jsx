import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/store/Navbar";

export default function RootLayout({ children }) {
  return (
    <>
    <Navbar />
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 bg-gray-50">{children}</div>
    </div>
    </>
  );
}
