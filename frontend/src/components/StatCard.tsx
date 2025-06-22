// components/StatCard.tsx
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon?: ReactNode; // ✅ Add this line
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="p-4 rounded-xl shadow flex items-center justify-between bg-white ">
      <div>
        <div className="text-sm text-gray-500 dark:text-black ">{title}</div>
        <div className="text-2xl font-bold text-gray-900 dark:text-black ">{value}</div>
      </div>
      <div className="text-3xl text-gray-400 dark:text-white">{icon}</div>
    </div>
  )
}
