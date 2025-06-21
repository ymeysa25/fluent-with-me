"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/practice", label: "Practice" },
    { href: "/progress", label: "Progress" },
  ];

  return (
    <nav className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Fluent With Me</h2>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`block text-lg ${
            pathname === link.href ? "text-blue-600 font-semibold" : "text-gray-600"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
