"use client";

import { useEffect, useState } from "react";
import { useSelectionStore } from "@/stores/useSelectionStore";
import { Listbox } from "@headlessui/react";
import Image from "next/image";
import { ChevronDownIcon } from "lucide-react";

interface Language {
    id: number;
    name: string;
    image_url: string;
}

export default function LanguageDropdown() {
    const [languages, setLanguages] = useState<Language[]>([]);
    const languageId = useSelectionStore((s) => s.languageId);
    const setLanguage = useSelectionStore((s) => s.setLanguage);

    useEffect(() => {
        const fetchLanguages = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/languages`);
            const data = await res.json();
            setLanguages(data);

            const storedLangId = localStorage.getItem("languageId");

            if (!storedLangId && data.length > 0) {
                const defaultLang = data[0];
                setLanguage(defaultLang.id);
                localStorage.setItem("languageId", defaultLang.id.toString());
            }
        };

        fetchLanguages();
    }, [setLanguage]);

    const selectedLanguage = languages.find((lang) => lang.id === languageId) || null;

    return (
        <div className="relative w-48 text-sm">
            <Listbox value={languageId ?? 0} onChange={(id) => setLanguage(id)}>
                <Listbox.Button className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white">
                    <div className="flex items-center gap-2">
                        {selectedLanguage?.image_url && (
                            <Image
                                src={selectedLanguage.image_url}
                                alt={selectedLanguage.name}
                                width={20}
                                height={14}
                                className="rounded-sm object-cover"
                            />
                        )}
                        <span>{selectedLanguage?.name ?? "Select Language"}</span>
                    </div>
                    <ChevronDownIcon className="w-4 h-4" />
                </Listbox.Button>

                <Listbox.Options className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow max-h-60 overflow-y-auto">
                    {languages.map((lang) => (
                        <Listbox.Option
                            key={lang.id}
                            value={lang.id}
                            className={({ active }) =>
                                `px-3 py-2 flex items-center gap-2 cursor-pointer ${active ? "bg-blue-100" : ""
                                }`
                            }
                        >
                            <Image
                                src={lang.image_url}
                                alt={lang.name}
                                width={20}
                                height={14}
                                className="rounded-sm object-cover"
                            />
                            {lang.name}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    );
}
