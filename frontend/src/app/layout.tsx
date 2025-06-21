import "./globals.css";
import { ReactNode } from "react";
import BottomNav from "@/components/BottomNav";
import Sidebar from "@/components/Sidebar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col md:flex-row">
        {/* ✅ Sidebar: only on md+ screens */}
        <aside className="hidden md:block w-64 bg-white border-r p-6">
          <Sidebar />
        </aside>

        {/* ✅ Main content always shown */}
        <main className="flex-grow p-4 md:p-8">{children}</main>

        {/* ✅ Bottom nav: only on small screens */}
        <div className="md:hidden">
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
