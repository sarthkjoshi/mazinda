import Sidebar from "@/components/admin/Sidebar";

export default function RootLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4 bg-gray-50">{children}</div>
    </div>
  );
}
