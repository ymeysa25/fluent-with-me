import { useFlashcardStore } from "@/stores/useFlashcardStore";
import { useLanguageStore } from "@/stores/useLanguageStore";

export function useFilteredCards() {
  const cards = useFlashcardStore((s) => s.cards);
  const language = useLanguageStore((s) => s.selected);
  return cards.filter((card) => card.language === language);
}
