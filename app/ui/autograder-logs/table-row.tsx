'use client'
import { AutograderLog } from '@/app/lib/definitions'
import clsx from 'clsx'
import moment from 'moment'
import { ArrowTopRightOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function AutograderLogsTableRow({ log }: { log: AutograderLog }) {

    const [showDetails, setShowDetails] = useState(false)
    const [status] = useState(log.status || log.autograde_status)

    function getSubmitTime(datetime: number) {
        const time = new Date(Number(datetime) * 1000);
        return moment(time).fromNow()
    }

    return (
        <tr
            className={clsx("border-b last:border-b-0 border-gray-200 hover:bg-gray-50 transition", { 'border-indigo-500': showDetails })}
        >
            <td className="px-5 py-3 whitespace-nowrap">{moment(log.created_at).format("YYYY-MM-DD HH:mm")}</td>
            <td className="px-5 py-3">{getSubmitTime(log?.data?.timecreated || log.submitted_at)}</td>
            <td className="px-5 py-3 max-w-60 truncate"> {log.data?.assignmentname || log.assignment_name}</td>
            <td className="px-5 py-3">
                <span
                    className={clsx(
                        "inline-flex items-center rounded-md px-1.5 py-0.5 text-sm font-medium inset-ring mr-auto",
                        { 'inset-ring-red-600/20 text-red-700 bg-red-50': status == 'fail' },
                        { 'inset-ring-green-600/20 text-green-700 bg-green-50': status == 'success' }
                    )}>
                    {status}
                </span>
            </td>
            <td className="px-5 py-3">{log.attempt}</td>
            <td className="px-5 py-3 relative">
                <div
                    className={clsx('max-w-35  w-35 truncate underline hover:text-blue-500 cursor-pointer')}
                    onClick={() => setShowDetails(true)}
                >
                    {log.details || log.autograde_status_details || <span className='text-transparent'>empty</span>}
                </div>
                <div className={clsx('absolute right-10 border border-gray-200 px-3 py-2 rounded bg-white shadow-xs z-10', { 'invisible': !showDetails })}>
                    <div className='flex justify-between gap-5'>
                        <label className="text-md font-semibold whitespace-nowrap">Status Details</label>
                        <button onClick={() => setShowDetails(false)} className='cursor-pointer'><XMarkIcon className='w-5' /></button>
                    </div>
                    <p className="w-full mt-1.5 mb-2 rounded">{log.details || log.autograde_status_details}</p>
                </div>
            </td>
            <td className="px-5 py-3">
                <a target="_blank" href={`https://moodle.shaper.co.za/mod/assign/view.php?id=${log?.data?.cmid || log.cmid}&action=grader&userid=${log?.data?.userid || log.user_id}`}>
                    <ArrowTopRightOnSquareIcon className="w-5 text-blue-400 hover:text-blue-500" />
                </a>
            </td>
        </tr >
    )
}
