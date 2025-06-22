import "./globals.css";
import { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Header />

        <div className="flex flex-1">
          <aside className="hidden md:block w-64 p-6 border-r bg-white">
            <Sidebar />
          </aside>

          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>

        <div className="md:hidden fixed bottom-0 left-0 w-full">
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
