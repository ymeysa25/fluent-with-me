"use client";
import Image from "next/image";
import { useFlashcardStore } from "@/store/useFlashcardStore";

export default function PracticePage() {
    const { cards, currentIndex, nextCard } = useFlashcardStore();
    const card = cards[currentIndex];
  
    return (
      <div className="flex flex-col items-center p-4 text-center space-y-4">
        <Image src={card.imageUrl} alt={card.word} width={240} height={240} className="rounded-xl" />
        <h2 className="text-3xl font-bold">{card.word}</h2>
        <audio controls src={card.audioUrl} className="w-full max-w-xs" />
        <div className="w-full space-y-3 max-w-xs">
          <button onClick={() => nextCard(true)} className="w-full bg-green-500 text-white py-3 rounded-xl">
            I remembered
          </button>
          <button onClick={() => nextCard(false)} className="w-full bg-red-500 text-white py-3 rounded-xl">
            I forgot
          </button>
        </div>
      </div>
    );
  }