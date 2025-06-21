import { create } from "zustand";

interface Flashcard {
  id: number;
  word: string;
  imageUrl: string;
  audioUrl: string;
}

interface FlashcardState {
  cards: Flashcard[];
  currentIndex: number;
  remembered: number[];
  forgot: number[];
  nextCard: (remembered: boolean) => void;
}

export const useFlashcardStore = create<FlashcardState>((set) => ({
  cards: [
    { id: 1, word: "chien", imageUrl: "/app/images/cat.jpg", audioUrl: "/audio/chien.mp3" },
    { id: 2, word: "chat", imageUrl: "/app/images/cat.jpg", audioUrl: "/audio/chat.mp3" },
  ],
  currentIndex: 0,
  remembered: [],
  forgot: [],
  nextCard: (remembered) =>
    set((state) => {
      const id = state.cards[state.currentIndex].id;
      return {
        currentIndex: (state.currentIndex + 1) % state.cards.length,
        remembered: remembered ? [...state.remembered, id] : state.remembered,
        forgot: !remembered ? [...state.forgot, id] : state.forgot,
      };
    }),
}));
