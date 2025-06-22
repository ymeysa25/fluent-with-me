// components/LearnCard.tsx
import { ReactNode } from "react";

export default function LearnCard({
  title,
  value,
  icon,
  color = "bg-gray-100",
}: {
  title: string;
  value: number | string;
  icon: ReactNode;
  color?: string;
}) {
  return (
    <div className={`p-4 rounded-xl shadow-sm ${color}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600 text-sm">{title}</span>
        <span className="text-xl">{icon}</span>
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
