import { useFlashcardStore } from "@/store/useFlashcardStore";
import { useLanguageStore } from "@/store/useLanguageStore";

export function useFilteredCards() {
  const cards = useFlashcardStore((s) => s.cards);
  const language = useLanguageStore((s) => s.selected);
  return cards.filter((card) => card.language === language);
}
