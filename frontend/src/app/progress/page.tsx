"use client";
import { useFlashcardStore } from "@/stores/useFlashcardStore";

export default function ProgressPage() {
  const remembered = useFlashcardStore((s) => s.remembered);
  const forgot = useFlashcardStore((s) => s.forgot);
  const total = remembered.length + forgot.length;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">📈 Your Progress</h1>
      <div className="bg-white p-4 rounded-xl shadow space-y-2">
        <p>Total Reviewed: <strong>{total}</strong></p>
        <p>Remembered: <strong>{remembered.length}</strong></p>
        <p>Forgot: <strong>{forgot.length}</strong></p>
        <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-green-500 h-4"
            style={{ width: `${(remembered.length / (total || 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
