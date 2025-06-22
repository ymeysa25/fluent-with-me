// stores/useSelectionStore.ts
import { create } from "zustand";

interface SelectionState {
  languageId: number | undefined;
  categoryId: number | undefined;
  setLanguage: (id: number) => void;
  setCategory: (id: number) => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  languageId: typeof window !== "undefined" ? Number(localStorage.getItem("languageId")) || undefined : undefined,
  categoryId: undefined,
  setLanguage: (id) => {
    localStorage.setItem("languageId", id.toString());
    set({ languageId: id, categoryId: undefined }); // Reset category when changing language
  },
  setCategory: (id) => set({ categoryId: id }),
}));
