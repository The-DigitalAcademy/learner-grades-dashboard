import { fetchAutograderLogs } from "@/app/lib/data";
import Table from "@/app/ui/autograder-logs/table";
import { Suspense } from "react";

export default async function Page() {

    const logs = await fetchAutograderLogs()
    return (
        <div className="w-full">
            <h1 className="text-3xl font-semibold py-2 md:py-3 dark:text-zinc-200 mb-12">Autograder Logs</h1>
            <Suspense>
                <Table logs={logs} />
            </Suspense>
        </div>
    )
}
