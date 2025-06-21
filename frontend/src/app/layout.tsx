import "./globals.css";
import BottomNav from "@/components/BottomNav";

export const metadata = {
  title: "Fluent With Me",
  description: "Learn vocabulary with images and SRS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="pb-16"> {/* add padding bottom so content isn't hidden */}
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
