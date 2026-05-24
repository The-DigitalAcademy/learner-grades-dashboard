import { AutograderLog, extendedUngradedSubmission, UngradedSubmission } from "@/app/lib/definitions";
import TableRow from "./table-row";

type ColDef = {
    field: string
}

const colDefs: ColDef[] = [
    { field: 'Timestamp' },
    { field: 'Submitted' },
    { field: 'Assignment' },
    { field: 'Status' },
    { field: 'Attempts' },
    { field: 'Details' },
    { field: ' ' },
]

export default function AutograderLogsTable({ logs }: { logs: AutograderLog[] }) {

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
                        {logs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                            .map(log => (
                                <TableRow key={log.id} log={log} />
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
