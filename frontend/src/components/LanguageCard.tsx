// components/LanguageCard.tsx
import Image from "next/image";

interface Props {
  name: string;
  imageUrl: string;
}

export default function LanguageCard({ name, imageUrl }: Props) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl shadow bg-white hover:bg-gray-50 cursor-pointer">
      <Image
        src={imageUrl}
        alt={name}
        width={48}
        height={32}
        className="rounded-md object-cover"
      />
      <span className="text-lg font-medium">{name}</span>
    </div>
  );
}
