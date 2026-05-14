import { fetchUngradedSubmissions } from "@/app/lib/data"
import { UngradedSubmission } from "@/app/lib/definitions";

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import clsx from "clsx";
import moment from "moment";

type ColDef = {
    field: string
}

const colDefs: ColDef[] = [
    { field: 'ID' },
    { field: 'Course' },
    { field: 'Activity' },
    { field: 'Learner' },
    { field: 'Submitted' },
    { field: 'Blocked' },
    { field: 'Comment' },
    { field: ' ' },
]

export default async function UngradedSubmissionsTable({ submissions }: { submissions: UngradedSubmission[] }) {

    return (
        <div className="w-full">
            <div className="w-full border border border-gray-200 rounded-lg overflow-x-scroll">
                <table className="w-full overflow-scroll text-left h-full">
                    <thead className="text-sm text-gray-700 bg-gray-50 border-b border-gray-200">
                        <tr>
                            {colDefs.map(def =>
                                <th key={def.field} scope="col" className="px-3 py-5">{def.field}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-800 overflow-y-scroll max-h-full">
                        {submissions.map(submission => (
                            <tr
                                key={submission.id}
                                className="border-b capitalize border-gray-200 hover:bg-orange-100 transition"
                            >
                                <td className="px-3 py-3">{submission.id}</td>
                                <td className="px-3 py-3 max-w-55">
                                    <a target="_blank" className="hover:text-orange-500" href={submission.coursepath}>{submission.coursename}</a>
                                </td>
                                <td className="px-3 py-3">
                                    <div className="flex flex-col">
                                        <a target="_blank"
                                            className="hover:text-orange-500 max-w-60 truncate mb-0.5"
                                            href={submission.activitypath}>
                                            {submission.activityname}
                                        </a>
                                        <span
                                            className={clsx(
                                                "inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium inset-ring mr-auto",
                                                { 'inset-ring-orange-600/20 text-orange-700 bg-orange-50': submission.activitytype == 'assign' },
                                                { 'inset-ring-purple-600/20 text-purple-700 bg-purple-50': submission.activitytype == 'quiz' }
                                            )}>
                                            {submission.activitytype}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-3 py-3 max-w-45 truncate">{submission.username}</td>
                                <td className="px-3 py-3">{moment(new Date(submission.timemodified * 1000)).fromNow()}</td>
                                <td className="px-3 py-3"><form action=""><input type="checkbox" /></form></td>
                                <td className="px-3 py-3">Comment here..</td>
                                <td className="px-5 py-3"><a target="_blank" href={submission.gradepath}><ArrowTopRightOnSquareIcon className="w-5 text-blue-400 hover:text-orange-500" /></a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
