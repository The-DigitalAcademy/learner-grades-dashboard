import { extendedUngradedSubmission, UngradedSubmission } from "@/app/lib/definitions";
import TableRow from "./table-row";

type ColDef = {
    field: string
}

const colDefs: ColDef[] = [
    // { field: 'ID' },
    { field: 'Course' },
    { field: 'Activity' },
    { field: 'Type' },
    { field: 'Learner' },
    { field: 'Submitted' },
    { field: 'Blocked' },
    { field: 'Comment' },
    { field: ' ' },
]

export default function ({ submissions }: { submissions: extendedUngradedSubmission[] }) {

    return (
        <>
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white py-6">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="text-left border-b border-gray-300 font-medium uppercase tracking-widest text-gray-700">
                            {colDefs.map(def =>
                                <th key={def.field} scope="col" className="px-5 py-3">{def.field}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {submissions.map(submission => (
                            <TableRow key={submission.id} submission={submission} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
