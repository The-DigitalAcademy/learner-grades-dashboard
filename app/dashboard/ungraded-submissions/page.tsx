import { fetchUngradedSubmissions } from "@/app/lib/data";
import { filterSubmissions, generateSubmissionFilterList, SubmissionfilterProps } from "@/app/lib/utils";
import FilterDropdown from "@/app/ui/ungraded-submissions/filter-dropdown";
import Table from "@/app/ui/ungraded-submissions/table";
import { Suspense } from "react"

type Props = {}

export default async function Page(props: {
    searchParams?: Promise<{
        course?: string;
        type?: string;
        activity?: string;
        user?: string;
    }>
}) {

    const submissions = await fetchUngradedSubmissions();
    const searchParams = await props.searchParams;
    const course = searchParams?.course || '';

    let filterValues: SubmissionfilterProps = {
        coursename: searchParams?.course,
        activitytype: searchParams?.type,
        activityname: searchParams?.activity,
        username: searchParams?.user
    }

    return (
        <div className="w-full">
            <h1 className="text-3xl font-semibold py-2 md:py-3 dark:text-zinc-200 mb-12">Ungraded Submissions</h1>
            <div className="flex items-center gap-5 mb-8">
                <FilterDropdown
                    resetParamsOnChange
                    title="Course" keyName={'course'}
                    options={generateSubmissionFilterList(submissions, {}, 'coursename')} />
                <FilterDropdown
                    title="Activity" keyName={'activity'}
                    options={generateSubmissionFilterList(submissions, { coursename: searchParams?.course }, 'activityname')} />
                <FilterDropdown
                    title="Type" keyName={'type'}
                    options={generateSubmissionFilterList(submissions, {}, 'activitytype')} />
                <FilterDropdown title="Learner" keyName={'user'}
                    options={generateSubmissionFilterList(submissions, { coursename: searchParams?.course }, 'username')} />
            </div>
            <Suspense>
                <Table submissions={filterSubmissions(submissions, filterValues)} />
            </Suspense>
        </div>
    )
}