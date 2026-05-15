import { UngradedSubmission } from "./definitions";

export type SubmissionfilterProps = {
    coursename?: string;
    activitytype?: string;
    activityname?: string;
    username?: string;
}
type listKeys = "coursename" | "activitytype" | "activityname" | "username";

export function generateSubmissionFilterList(data: UngradedSubmission[], filterValues: SubmissionfilterProps, finalListKey: listKeys) {
    let filtered = data;
    for (const [key, value] of Object.entries(filterValues)) {
        if (!value) continue;
        filtered = filtered.filter(item => (item[key as keyof typeof filtered[0]] == value))
    }
    let finalFilteredList = filtered.map(i => i[finalListKey as keyof typeof filtered[0]])

    return [...new Set(finalFilteredList.sort())]
}

export function filterSubmissions(data: UngradedSubmission[], filterValues: SubmissionfilterProps) {
    let filtered = data;
    for (const [key, value] of Object.entries(filterValues)) {
        if (!value) continue;
        filtered = filtered.filter(item => (item[key as keyof typeof filtered[0]] == value))
    }
    return filtered;
}