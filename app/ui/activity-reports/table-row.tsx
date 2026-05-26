'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function ActivityReportsTableRow({ username, userid, late, missed, strikes, completed, totalDelivarables }: { username: string, userid: number, late: number, missed: number, strikes: number, completed: number, totalDelivarables: number }) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSelect(value: number) {
        const params = new URLSearchParams(searchParams)
        if (value) params.set('userid', `${value}`)
        else params.delete('userid')
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <tr onClick={(e) => handleSelect(userid)} className="border-b cursor-pointer last:border-b-0 border-gray-200 hover:bg-gray-50 transition">
            <td className="px-5 py-3">{username}</td>
            <td className="px-5 py-3">
                {completed} /  {totalDelivarables}
            </td>
            <td className="px-5 py-3">
                {late}
            </td>
            <td className="px-5 py-3">
                {missed}
            </td>
            <td className="px-5 py-3">
                {strikes}
            </td>
        </tr>
    )
}
