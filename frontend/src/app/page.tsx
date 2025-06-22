"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/StatCard";
import { useRouter } from "next/navigation";
import { useSelectionStore } from "@/stores/useSelectionStore";

export default function HomePage() {
  const router = useRouter();
  const languageId = useSelectionStore((s) => s.languageId);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // ⛔ prevent hydration mismatch

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Words Learned" value={150} />
        <StatCard title="Reviews Due" value={23} />
      </div>

      <button
        className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold shadow hover:bg-blue-700 transition"
        onClick={() => router.push("/flashcards")}
        disabled={!languageId}
      >
        {languageId ? "Start Practicing" : "Choose a Language First"}
      </button>
    </section>
  );
}
