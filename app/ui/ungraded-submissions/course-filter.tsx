'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function CourseFilter({ options = [] }: { options: string[] }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleFilter(value: string) {
        const params = new URLSearchParams(searchParams);
        if (value) params.set('course', value)
        else params.delete('course')
        replace(`${pathname}?${params.toString()}`)
    }
    return (
        <div>
            <select
                className="w-full rounded-md border border-gray-200 px-4 py-3"
                onChange={(e) => handleFilter(e.target.value)}>
                <option value="">select course</option>
                {options.map(item => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>
        </div>
    )
}
