// app/flashcard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSelectionStore } from "@/stores/useSelectionStore";
import { useRouter } from "next/navigation";
import CategoryCard from "@/components/CategoryCard";

export default function FlashcardPage() {
  const [categories, setCategories] = useState([]);
  const languageId = useSelectionStore((state) => state.languageId);
  const setCategory = useSelectionStore((state) => state.setCategory);
  const router = useRouter();

  useEffect(() => {
    if (!languageId) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/word_categories`)
      .then((res) => res.json())
      .then(setCategories);
  }, [languageId]);

  const handleSelect = (catId: number) => {
    setCategory(catId);
    router.push("/flashcards/words");
  };

  if (!languageId) {
    return <p className="p-4 text-gray-500">Please select a language first.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Select a Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat: any) => (
          <div key={cat.id} onClick={() => handleSelect(cat.id)}>
            <CategoryCard id={cat.id} name={cat.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
