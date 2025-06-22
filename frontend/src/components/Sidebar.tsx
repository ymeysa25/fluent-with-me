// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; 

const menuItems = [
  { name: "Home", href: "/" },
  { name: "Flashcards", href: "/flashcards" },
  { name: "Progress", href: "/progress" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Fluent With Me</h1>
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "px-3 py-2 rounded-lg transition-all font-medium",
            pathname === item.href
              ? "bg-blue-50 text-blue-600"
              : "hover:bg-gray-100 text-gray-700"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
