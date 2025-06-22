// src/app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useSelectionStore } from "@/stores/useSelectionStore";
import StatCard from "@/components/StatCard";
import LearnCard from "@/components/LearnCard";
import { Flame, Star, Book, Repeat } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const languageId = useSelectionStore((s) => s.languageId);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <section className="space-y-6 px-4 pt-6">
      {/* Welcome and Stats */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-semibold">Welcome back!</h2>
        {/* Could add profile/avatar here */}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Words Learned" value={150} icon={<Book className="text-blue-600" />} />
        <StatCard title="Reviews Due" value={23} icon={<Repeat className="text-red-500" />} />
      </div>

      {/* Learning Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <LearnCard title="Words in Progress" value={13} icon={<Book />} color="bg-yellow-100" />
        <LearnCard title="Mastered" value={85} icon={<Star />} color="bg-green-100" />
        <LearnCard title="XP Earned" value={350} icon={<Star />} color="bg-purple-100" />
        <LearnCard title="Streak" value={4} icon={<Flame />} color="bg-orange-100" />
      </div>

      {/* Call to action */}
      <button
        className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50"
        onClick={() => router.push("/flashcards")}
        disabled={!languageId}
      >
        {languageId ? "Start Practicing" : "Choose a Language First"}
      </button>
    </section>
  );
}
