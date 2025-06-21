"use client";

import { useFlashcardStore } from "@/store/useFlashcardStore";
import { useLanguageStore } from "@/store/useLanguageStore";
import { useEffect, useState } from "react";

export default function PracticePage() {
  const { cards, currentIndex, nextCard } = useFlashcardStore();
  const selectedLanguage = useLanguageStore((s) => s.selected);

  const [dueCards, setDueCards] = useState(() =>
    cards.filter(
      (card) =>
        card.language === selectedLanguage &&
        card.nextReviewTime <= Date.now()
    )
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const filtered = cards.filter(
        (card) =>
          card.language === selectedLanguage &&
          card.nextReviewTime <= now
      );
      setDueCards(filtered);
    }, 1000); // refresh every second

    return () => clearInterval(interval);
  }, [cards, selectedLanguage]);

  if (dueCards.length === 0) {
    return (
      <div className="p-6 text-center text-xl font-medium">
        🎉 You’re all caught up for today!<br />
        Come back later for more reviews.
      </div>
    );
  }

  const card = dueCards[currentIndex % dueCards.length];

  return (
    <div className="flex flex-col items-center p-4 text-center space-y-4">
      <div className="w-full max-w-xs">
        <img
          src={card.imageUrl}
          alt={card.word}
          className="rounded-xl object-cover w-full h-64 mb-4"
        />
      </div>

      <h2 className="text-3xl font-bold">{card.word}</h2>

      <audio controls src={card.audioUrl} className="w-full max-w-xs" />

      <div className="w-full space-y-3 max-w-xs">
        <button
          onClick={() => nextCard(true)}
          className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700"
        >
          I remembered
        </button>
        <button
          onClick={() => nextCard(false)}
          className="w-full bg-red-500 text-white py-3 rounded-xl text-lg font-semibold hover:bg-red-600"
        >
          I forgot
        </button>
      </div>
    </div>
  );
}
