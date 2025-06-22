// components/CategoryList.tsx
"use client";

import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

interface WordCategory {
  id: number;
  name: string;
}

export default function CategoryList() {
  const [categories, setCategories] = useState<WordCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:3001/word_categories"); // adjust URL if needed
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((cat) => (
        <CategoryCard key={cat.id} id={cat.id} name={cat.name} />
      ))}
    </div>
  );
}
