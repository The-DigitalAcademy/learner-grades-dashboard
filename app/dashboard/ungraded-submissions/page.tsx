import { fetchCourses, fetchUngradedSubmissions } from "@/app/lib/data";
import CourseFilter from "@/app/ui/ungraded-submissions/course-filter";
import Table from "@/app/ui/ungraded-submissions/table"
import { Suspense } from "react"

type Props = {}

export default async function Page(props: {
    searchParams?: Promise<{
        course?: string;
        page?: string;
    }>
}) {

    const submissions = await fetchUngradedSubmissions();
    const courses = await fetchCourses() || [];
    const searchParams = await props.searchParams;
    const course = searchParams?.course || '';

    return (
        <div className="w-full">
            <h1 className="text-3xl font-semibold py-2 md:py-3 dark:text-zinc-200 mb-12">Ungraded Submissions</h1>
            <div className="flex items-center justify-between mb-8">
                <CourseFilter options={[...new Set(submissions.map(i => i.coursename).sort())]} />
            </div>
            <Suspense>
                <Table submissions={submissions.filter(i => {
                    if (!course) return true
                    else return i.coursename == course;
                })} />
            </Suspense>
        </div>
    )
}