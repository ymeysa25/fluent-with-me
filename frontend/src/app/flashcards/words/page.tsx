"use client";

import { useEffect, useState } from "react";
import { useSelectionStore } from "@/stores/useSelectionStore";
import { RotateCw, Check, X } from "lucide-react";
import classNames from "classnames";
import Image from "next/image";

// Make sure you’ve added custom utilities in your Tailwind config or CSS
// See styles below

interface Word {
  id: number;
  word: string;
  image_url: string;
  translation_id: string;
  translation_en: string;
}

export default function FlashcardPage() {
  const languageId = useSelectionStore((s) => s.languageId);
  const categoryId = useSelectionStore((s) => s.categoryId);
  const [words, setWords] = useState<Word[]>([]);
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [isImageError, setIsImageError] = useState(false);

  useEffect(() => {
    const fetchWords = async () => {
      if (!languageId || !categoryId) return;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/word`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language_id: languageId, category_id: categoryId }),
      });

      const data = await res.json();
      setWords(data);
    };

    fetchWords();
  }, [languageId, categoryId]);

  const currentWord = words[index];

  const handleNext = () => {
    setShowBack(false);
    setIndex((prev) => Math.min(prev + 1, words.length - 1));
  };

  if (!currentWord) {
    return (
      <div className="p-8 text-center">
        <RotateCw className="animate-spin mx-auto text-gray-400" />
        <p className="mt-4 text-gray-600">Loading words...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* Flashcard */}
      <div
        className="relative w-full max-w-md h-72 perspective cursor-pointer"
        onClick={() => setShowBack((prev) => !prev)}
      >
        <div
          className={classNames(
            "w-full h-full transition-transform duration-700 preserve-3d",
            { "rotate-y-180": showBack }
          )}
        >
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg flex flex-col items-center justify-center p-6">
            {!isImageError ? (
              <Image
                src={currentWord.image_url}
                alt={currentWord.word}
                width={200}
                height={150}
                className="w-full h-40 object-cover rounded mb-4"
                unoptimized
                onError={() => setIsImageError(true)}
              />
            ) : null}

            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              {currentWord.word}
            </h2>
          </div>


          {/* Back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-xl shadow-lg flex items-center justify-center p-6">
            <h2 className="text-2xl font-bold text-gray-700">
              {currentWord.translation_id}
            </h2>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
        >
          <X size={20} /> Not Yet
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50"
        >
          <Check size={20} /> Remembered
        </button>
      </div>

      {/* Progress */}
      <div className="mt-4 text-gray-500 text-sm">
        Card {index + 1} of {words.length}
      </div>
    </div>
  );
}
