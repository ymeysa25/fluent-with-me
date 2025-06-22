// components/WordList.tsx
"use client";

import { useEffect, useState } from "react";
import { useSelectionStore } from "@/stores/useSelectionStore";
import Image from "next/image";

interface Word {
  id: number;
  word: string;
  image_url: string;
  translation_id: string;
  translation_en: string;
}

export default function WordList() {
  const languageId = useSelectionStore((s) => s.languageId);
  const categoryId = useSelectionStore((s) => s.categoryId);
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    if (!languageId || !categoryId) return;

    const fetchWords = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/word`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language_id: languageId, category_id: categoryId }), // ✅ FIXED
      });

      console.log("res", res)
      const data = await res.json();
      setWords(data);
    };

    fetchWords();
  }, [languageId, categoryId]);

  if (!languageId || !categoryId) return <p>Please select language and category.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {words.map((word) => (
        <div
          key={word.id}
          className="bg-white shadow p-4 rounded-xl text-center"
        >
          <Image
            src={word.image_url}
            alt={word.word}
            width={200}
            height={150}
            className="w-full h-24 object-cover rounded mb-2"
            // unoptimized // or remove if you're okay with optimization
          />
          <div className="text-xl font-bold">{word.word}</div>
          <div className="text-sm text-gray-500">{word.translation_id}</div>
        </div>
      ))}
    </div>
  );
}
