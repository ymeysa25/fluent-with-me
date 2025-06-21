"use client";
import { useLanguageStore } from "@/store/useLanguageStore";

export default function LanguageSelector() {
  const { selected, setSelected } = useLanguageStore();

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Current Language</label>
      <select
        className="w-full p-2 rounded-lg border"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option>French</option>
        <option>Spanish</option>
        <option>Arabic</option>
      </select>
    </div>
  );
}
