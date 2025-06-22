import { create } from "zustand";
import { useLanguageStore } from "./useLanguageStore";

interface Flashcard {
  id: number;
  word: string;
  imageUrl: string;
  audioUrl: string;
  language: string;
  nextReviewTime: number; // ⏰ timestamp (in milliseconds)
  interval: number;        // 🔁 how long until next review (in ms)
}


interface FlashcardState {
  cards: Flashcard[];
  currentIndex: number;
  remembered: number[];
  forgot: number[];
  nextCard: (remembered: boolean) => void;
  reset: () => void;
}

export const useFlashcardStore = create<FlashcardState>((set, get) => ({
  cards: [
    {
      id: 1,
      word: "chien",
      language: "French",
      imageUrl: "https://res.cloudinary.com/drqlfxd3z/image/upload/v1750375798/w5b9ukq8lukheouciogh.jpg", // dog
      audioUrl: "/audio/chien.mp3",
      nextReviewTime: Date.now(),
      interval: 86400000,
    },
    {
      id: 2,
      word: "chat",
      language: "French",
      imageUrl: "https://res.cloudinary.com/drqlfxd3z/image/upload/v1750375798/w5b9ukq8lukheouciogh.jpg", // cat
      audioUrl: "/audio/chat.mp3",
      nextReviewTime: Date.now(),
      interval: 86400000,
    },
    {
      id: 3,
      word: "perro",
      language: "Spanish",
      imageUrl: "https://res.cloudinary.com/drqlfxd3z/image/upload/v1750375798/w5b9ukq8lukheouciogh.jpg", // same dog
      audioUrl: "/audio/perro.mp3",
      nextReviewTime: Date.now(),
      interval: 86400000,
    },
    {
      id: 4,
      word: "gato",
      language: "Spanish",
      imageUrl: "https://res.cloudinary.com/drqlfxd3z/image/upload/v1750375798/w5b9ukq8lukheouciogh.jpg", // same cat
      audioUrl: "/audio/gato.mp3",
      nextReviewTime: Date.now(),
      interval: 86400000,
    },
  ],  
  currentIndex: 0,
  remembered: [],
  forgot: [],
  nextCard: (remembered) => {
    const language = useLanguageStore.getState().selected;
    const cards = get().cards;
    const now = Date.now();
  
    // Get only due cards for this language
    const filtered = cards.filter(
      (card) =>
        card.language === language && card.nextReviewTime <= now
    );
  
    if (filtered.length === 0) {
      console.warn("No cards due for review");
      return;
    }
  
    const currentIndex = get().currentIndex % filtered.length;
    const current = filtered[currentIndex];
  
    if (!current) {
      console.warn("Current card is undefined");
      return;
    }
  
    const newInterval = remembered
      ? (current.interval || 60000) * 2
      : 60000;
  
    const updatedCard = {
      ...current,
      interval: newInterval,
      nextReviewTime: now + newInterval,
    };
  
    const updatedCards = cards.map((c) =>
      c.id === current.id ? updatedCard : c
    );
  
    const nextIndex = (currentIndex + 1) % filtered.length;
  
    set((state) => ({
      cards: updatedCards,
      currentIndex: nextIndex,
      remembered: remembered ? [...state.remembered, current.id] : state.remembered,
      forgot: !remembered ? [...state.forgot, current.id] : state.forgot,
    }));
  },  
  reset: () => set({ currentIndex: 0, remembered: [], forgot: [] }),
  // filteredCards: () => {
  //   const lang = useLanguageStore.getState().selected;
  //   return get().cards.filter((card) => card.language === lang);
  // },
}));
