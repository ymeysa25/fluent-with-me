// components/Header.tsx
"use client";

import LanguageDropdown from "@/components/LanguageDropdown";


export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="text-lg font-semibold">Welcome back, Yogie 👋</div>
      <LanguageDropdown />
    </header>
  );
}
