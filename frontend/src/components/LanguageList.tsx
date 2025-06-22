// components/LanguageList.tsx
"use client";

import { useEffect, useState } from "react";
import LanguageCard from "./LanguageCard";

interface Language {
  id: number;
  code: string;
  name: string;
  image_url: string;
}

export default function LanguageList() {
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      const res = await fetch("http://localhost:3001/language"); // Replace with your backend base URL
      const data = await res.json();
      setLanguages(data);
    };

    fetchLanguages();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {languages.map((lang) => (
        <LanguageCard
          key={lang.id}
          name={lang.name}
          imageUrl={lang.image_url}
        />
      ))}
    </div>
  );
}
