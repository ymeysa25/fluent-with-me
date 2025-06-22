import { useSelectionStore } from "@/stores/useSelectionStore";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  name: string;
}

export default function CategoryCard({ id, name }: Props) {
  const setCategory = useSelectionStore((state) => state.setCategory);
  const languageId = useSelectionStore((state) => state.languageId);
  const router = useRouter();

  const handleClick = () => {
    if (!languageId) return; // prevent if no language
    setCategory(id);
    router.push("/practice");
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 rounded-xl text-center cursor-pointer transition-all ${
        !languageId
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-blue-100 shadow text-gray-800"
      }`}
    >
      <span className="text-lg font-semibold">{name}</span>
    </div>
  );
}
