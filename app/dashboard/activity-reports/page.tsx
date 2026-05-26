import { fetchActivtyReports } from "@/app/lib/data";
import { filterList, getFilteredListUniqueValues } from "@/app/lib/utils";
import LearnerReport from "@/app/ui/activity-reports/learner-report";
import Table from "@/app/ui/activity-reports/table";
import FilterDropdown from "@/app/ui/ungraded-submissions/filter-dropdown";

type Props = {
    searchParams?: Promise<{
        groupname?: string;
        userid?: number;
    }>
}

export default async function Page(props: Props) {

    const searchParams = await props.searchParams;

    let filterValues = {
        groupname: searchParams?.groupname,
        userid: searchParams?.userid
    }


    const records = await fetchActivtyReports();
    return (
        <div className="w-full">
            <h1 className="text-3xl font-semibold py-2 md:py-3 dark:text-zinc-200 mb-12">Activity Reports</h1>
            <div className="mb-5">
                <FilterDropdown title="Group" keyName="group" options={getFilteredListUniqueValues(records, {}, 'groupname')} />
            </div>
            <div>
                <Table records={filterList(records, { groupname: searchParams?.groupname })} />
                {searchParams?.userid && <LearnerReport
                    activityNames={getFilteredListUniqueValues(records, {}, 'activityname')}
                    learnerRecords={filterList(records, filterValues)} />}
            </div>
        </div>
    )
}