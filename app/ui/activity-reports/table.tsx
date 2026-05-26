import TableRow from './table-row'
import { ActivityReport } from '@/app/lib/definitions'
import { getFilteredListUniqueValues } from '@/app/lib/utils';

export default function ActivityReportsTable({ records }: { records: ActivityReport[] }) {

    const users = [...new Map(records.map(u => [u.userid, { id: u.userid, name: `${u.firstname} ${u.lastname}` }])).values()];
    const deliverables = getFilteredListUniqueValues(records, {}, 'activityname')

    function getSubmissionStatusMetrics(userid: number): { ontime: number, late: number, missed: number } {
        const learnerRecords = records.filter(r => r.userid == userid);
        const metrics = {
            ontime: 0,
            late: 0,
            missed: 0
        }
        deliverables.forEach(deliverable => {
            const activityRecord = learnerRecords.find(lr => lr.activityname == deliverable)
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
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white py-6">
            <table className="min-w-full text-sm">
                <thead>
                    <tr className="text-left border-b border-gray-300 font-medium uppercase tracking-widest text-gray-700">
                        <th scope="col" className="px-5 py-3">Learner</th>
                        <th scope="col" className="px-5 py-3">Deliverables Done</th>
                        <th scope="col" className="px-5 py-3">Late Count</th>
                        <th scope="col" className="px-5 py-3">Missed Count</th>
                        <th scope="col" className="px-5 py-3">Total Strikes</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600">
                    {users.map(u =>
                        <TableRow
                            key={u.id}
                            userid={u.id}
                            username={u.name}
                            completed={getSubmissionStatusMetrics(u.id).late + getSubmissionStatusMetrics(u.id).ontime}
                            totalDelivarables={deliverables.length}
                            late={getSubmissionStatusMetrics(u.id).late}
                            missed={getSubmissionStatusMetrics(u.id).missed}
                            strikes={getSubmissionStatusMetrics(u.id).late + getSubmissionStatusMetrics(u.id).missed} />
                    )}
                </tbody>
            </table>
        </div>
    )
}
