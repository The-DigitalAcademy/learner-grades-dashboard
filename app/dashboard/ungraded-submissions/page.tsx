import { fetchUngradedSubmissions } from "@/app/lib/data";
import { filterList, getFilteredListUniqueValues } from "@/app/lib/utils";
import FilterDropdown from "@/app/ui/ungraded-submissions/filter-dropdown";
import Table from "@/app/ui/ungraded-submissions/table";
import { Suspense } from "react"

type Props = {
    searchParams?: Promise<{
        course?: string;
        type?: string;
        activity?: string;
        user?: string;
    }>
}

export default async function Page(props: Props) {

    const submissions = await fetchUngradedSubmissions();
    const searchParams = await props.searchParams;
    const course = searchParams?.course || '';

    let filterValues = {
        coursename: searchParams?.course,
        activitytype: searchParams?.type,
        activityname: searchParams?.activity,
        username: searchParams?.user
    }

    return (
        <div className="w-full">
            <h1 className="text-3xl font-semibold py-2 md:py-3 dark:text-zinc-200 mb-12">Ungraded Submissions</h1>
            <div className="flex items-center gap-5 mb-8">
                <Suspense>
                    <FilterDropdown
                        resetParamsOnChange
                        title="Course" keyName='course'
                        options={getFilteredListUniqueValues(submissions, {}, 'coursename')} />
                    <FilterDropdown
                        title="Activity" keyName={'activity'}
                        options={getFilteredListUniqueValues(submissions, { coursename: searchParams?.course }, 'activityname')} />
                    <FilterDropdown
                        title="Type" keyName='type'
                        options={getFilteredListUniqueValues(submissions, {}, 'activitytype')} />
                    <FilterDropdown title="Learner" keyName='user'
                        options={getFilteredListUniqueValues(submissions, { coursename: searchParams?.course }, 'username')} />
                </Suspense>
            </div>
            <Suspense>
                <Table submissions={filterList(submissions, filterValues)} />
            </Suspense>
        </div>
    )
}