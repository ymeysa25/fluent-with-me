"use client";
import { useSelectionStore } from "@/stores/useSelectionStore";
import WordList from "@/components/WordList"; // or PracticeCardList

export default function PracticePage() {
  const languageId = useSelectionStore((s) => s.languageId);
  const categoryId = useSelectionStore((s) => s.categoryId);

  console.log("languageId",languageId)
  console.log("categoryId",categoryId)

  if (!languageId || !categoryId) return <p>Please select language and category first.</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Practice</h1>
      <WordList />
    </main>
  );
}
