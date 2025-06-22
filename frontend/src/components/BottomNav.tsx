"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Brain, BarChart } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/flashcards", label: "Flashcards", icon: BarChart },
  { href: "/progress", label: "Progress", icon: Brain },
];


export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow border-t flex justify-around p-2 sm:hidden">
      {navItems.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-col items-center text-xs ${
            pathname === href ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
