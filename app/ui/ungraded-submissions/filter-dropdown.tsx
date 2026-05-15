'use client';

import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterDropdown({ options, title, keyName, resetParamsOnChange = false }: { options: string[], title: string, keyName: string, resetParamsOnChange: boolean }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>('select');

    const handleSelect = (value: string) => {
        setSelectedOption(value);
        setIsOpen(false);
        const params = new URLSearchParams(resetParamsOnChange ? '' : searchParams);
        if (value !== 'select') params.set(keyName, value)
        else params.delete(keyName)
        replace(`${pathname}?${params.toString()}`)
    };

    return (
        <div className="flex flex-col w-64 text-sm relative">
            <p className="font-medium text-gray-800 pb-2">{title}</p>
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="group flex items-center justify-between w-full text-left px-2 py-1.5 border rounded-xl bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:outline-none">
                <div className="flex items-center gap-2">
                    <span>{selectedOption}</span>
                </div>
                <ChevronUpDownIcon className="w-7 text-gray-400" />
            </button>

            {isOpen && (
                <ul className="w-64 bg-white border border-gray-300 rounded-lg shadow-md mt-1 py-2 right-0 absolute top-20 max-h-100 overflow-y-scroll">
                    {Array.isArray(options) && ["select", ...options].map((option) => (
                        <li key={option} className={`px-2 py-2 flex items-center gap-2 cursor-pointer ${option === selectedOption ? "bg-gray-100" : "hover:bg-gray-100"}`} onClick={() => handleSelect(option)} >
                            <span>{option}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}