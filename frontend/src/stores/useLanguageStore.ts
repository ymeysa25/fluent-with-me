import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LanguageState {
  selected: string;
  setSelected: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selected: "French",
      setSelected: (lang) => set({ selected: lang }),
    }),
    {
      name: "language-storage", // localStorage key
    }
  )
);
