"use client";
import { ActivityReport } from "@/app/lib/definitions"
import { XMarkIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import moment from "moment"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function LearnerReport({ learnerRecords, activityNames }: { learnerRecords: ActivityReport[], activityNames: string[] }) {
    const name = `${learnerRecords[0].firstname} ${learnerRecords[0].lastname}`
    const groupname = learnerRecords[0].groupname
    const activities = activityNames.map(activity => {
        const activityData = learnerRecords.find(record => record.activityname == activity)
        return {
            name: activityData?.activityname,
            type: activityData?.activitytype,
            status: activityData?.submissionstatus,
            submissionDate: activityData?.submissiondate ? new Date(activityData?.submissiondate * 1000) : null,
            dueDate: activityData?.duedate ? new Date(activityData?.duedate * 1000) : null,
            grade: activityData?.grade
        }
    })

    function getMetrics(): { ontime: number, late: number, missed: number } {
        const metrics = {
            ontime: 0,
            late: 0,
            missed: 0
        }
        activityNames.forEach(activityName => {
            const activityRecord = learnerRecords.find(lr => lr.activityname == activityName)
            switch (activityRecord?.submissionstatus) {
                case 'missed':
                    metrics.missed++
                    break;
                case 'late':
                    metrics.late++
                    break;
                case 'ontime':
                    metrics.ontime++
                default:
                    break;
            }
        })
        return metrics
    }

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function onClose() {
        const params = new URLSearchParams(searchParams)
        params.delete('userid')
        replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="w-screen h-screen fixed top-0 left-0 grid place-items-center bg-black/60 z-50">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-[90vw] max-h-[90vh] overflow-y-auto relative">
                <button
                    className="absolute cursor-pointer top-4 right-4 font-bold text-gray-500 hover:text-gray-700"
                    onClick={() => onClose()}
                >
                    <XMarkIcon className="w-8" />
                </button>

                <h2 className="text-xl font-bold mb-1">{name}</h2>
                <p className="text-sm text-gray-600 mb-4">{groupname}</p>

                <div className="flex gap-4 text-sm mb-4 border-b pb-3">
                    <span>
                        Completed:{" "}
                        <strong>
                            {getMetrics().ontime + getMetrics().late}
                        </strong>
                    </span>
                    <span>
                        Late: <strong>{getMetrics().late}</strong>
                    </span>
                    <span>
                        Missed: <strong>
                            {getMetrics().missed}
                        </strong>
                    </span>
                    <span>
                        Strikes: <strong>{getMetrics().missed + getMetrics().late}</strong>
                    </span>
                </div>

                <div className="mb-4">
                    <strong>Status:</strong>
                    <span className="text-red-600 font-semibold">
                        {(getMetrics().missed + getMetrics().late) >= 3 && ' At Risk'}
                    </span>
                    <span className="text-amber-600 font-semibold">
                        {((getMetrics().missed + getMetrics().late) > 0 && (getMetrics().missed + getMetrics().late) < 3) && ' Monitor'}
                    </span>
                    <span className="text-green-600 font-semibold">{(getMetrics().missed + getMetrics().late) == 0 && ' Good Standing'}</span>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-5">
                    {activities
                        .sort((a, b) => {
                            const nextYear = new Date()
                            nextYear.setFullYear(nextYear.getFullYear() + 1)
                            return new Date(a.dueDate || nextYear).getTime() - new Date(b.dueDate || nextYear)?.getTime()
                        })
                        .map((d, index) => (
                            <div key={index} className="relative border border-gray-200 bg-gray-50/50 rounded py-2 px-3 flex flex-col justify-between">
                                <span className='absolute start-[-10px] top-[-10px] text-xs border border-gray-200 rounded-2xl w-6 h-6 flex items-center justify-center bg-gray-100 text-gray-700'>{index + 1}</span>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold mb-2">{d.name}</h3>
                                    <span
                                        className={clsx(
                                            "items-center uppercase rounded-md px-1.5 py-0.5 text-xs",
                                            { 'text-orange-700 bg-orange-200': d.type == 'assignment' },
                                            { 'text-purple-700 bg-purple-200': d.type == 'quiz' },
                                            { 'text-emerald-700 bg-emerald-200': d.type == 'forum' }
                                        )}>
                                        {d.type?.substring(0, 1)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className='flex gap-2 items-center jsutify-start'>
                                        <span className={clsx('inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium inset-ring mr-auto',
                                            { 'inset-ring-red-600/20 text-red-700 bg-red-50': d.status == 'missed' },
                                            { 'inset-ring-green-600/20 text-green-700 bg-green-50': d.status == 'ontime' },
                                            { 'inset-ring-gray-600/20 text-gray-700 bg-gray-50': d.status == 'pending' },
                                            { 'inset-ring-yellow-600/20 text-yellow-700 bg-yellow-50': d.status == 'late' },
                                        )}>{d.status}</span>
                                        <p className="text-sm text-gray-500 text-xs">
                                            {(d.submissionDate && d.status == 'ontime') && <span>{`submitted ${moment(d.submissionDate).fromNow()}`}</span>}
                                            {(d.status == 'missed' && d.dueDate) && <span>{`due ${moment(d.dueDate).fromNow()}`}</span>}
                                            {(d.status == 'pending' && d.dueDate) && <span>{`due ${moment(d.dueDate).fromNow()}`}</span>}
                                            {(d.status == 'late' && d.dueDate && d.submissionDate) && <span>{`${moment(d.submissionDate).diff(moment(d.dueDate), 'days')} days late`}</span>}
                                        </p>
                                    </div>
                                    {d.grade ? (
                                        <p className="text-sm text-gray-700 mt-1">Grade: {d.grade}%</p>
                                    ) : ''}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>)
}
