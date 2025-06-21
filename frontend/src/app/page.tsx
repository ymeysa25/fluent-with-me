import Link from "next/link";
import Header from "@/components/Header";
import LanguageSelector from "@/components/LanguageSelector";
import StatCard from "@/components/StatCard";

export default function Home() {
  return (
    <main className="p-4 min-h-screen bg-gray-50">
      <Header />

      <div className="mt-6 space-y-6">
        <LanguageSelector />

        <div className="flex flex-col sm:flex-row gap-4">
          <StatCard title="Words Learned" value={150} />
          <StatCard title="Reviews Due" value={23} />
        </div>

        <Link href="/practice">
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold shadow hover:bg-blue-700">
            Start Practicing
          </button>
        </Link>
      </div>
    </main>
  );
}
