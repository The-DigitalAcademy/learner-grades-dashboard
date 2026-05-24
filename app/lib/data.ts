import { ActivityReport, extendedUngradedSubmission, SubmissionData, UngradedSubmission } from "./definitions";

export async function fetchUngradedSubmissions(): Promise<extendedUngradedSubmission[]> {
    let response;
    try {
        const webServiceFunction = 'local_grades_get_ungraded_submissions';
        response = await fetch(`${process.env.MOODLE_URL}/webservice/rest/server.php?wstoken=${process.env.MOODLE_TOKEN}&wsfunction=${webServiceFunction}&moodlewsrestformat=json`)

        if (!response.ok) {
            throw new Error(`Moodle Http Error: ${response.status} ${response.json()}`);
        }
    } catch (error) {
        console.error('Moodle Error:', error);
        throw new Error('Failed to fetch ungraded submissions data.');
    }

    const result: UngradedSubmission[] = await response.json();
    if (!Array.isArray(result)) {
        console.error('Moodle Error:', response);
        throw new Error('Failed to fetch ungraded submissions data.');
    }

    let submissionDataMap: Map<string, SubmissionData> = new Map();
    try {
        const submissionsData = await fetchSubmissionsData()
        submissionDataMap = new Map(submissionsData.map(s => [s.submission_id, s]))
    } catch (error) {
        console.error('Failed to fetch submission data:', response);
    }

    return result.map(item => {
        const data = submissionDataMap.get(`${item.id}`)
        return {
            ...item,
            coursepath: process.env.MOODLE_URL + item.coursepath,
            activitypath: process.env.MOODLE_URL + item.activitypath,
            gradepath: process.env.MOODLE_URL + item.gradepath,
            blocked: typeof data?.blocked == 'boolean' ? data.blocked : false,
            comment: data?.comment || ''
        }
    }).sort((a, b) => a.timemodified - b.timemodified)

}

export async function fetchActivtyReports(): Promise<ActivityReport[]> {
    let response;
    try {
        const webServiceFunction = 'local_grades_get_activity_reports';
        response = await fetch(`${process.env.MOODLE_URL}/webservice/rest/server.php?wstoken=${process.env.MOODLE_TOKEN}&wsfunction=${webServiceFunction}&moodlewsrestformat=json`)

        if (!response.ok) {
            throw new Error(`Moodle Http Error: ${response.status} ${response.json()}`);
        }
    } catch (error) {
        console.error('Moodle Error:', error);
        throw new Error('Failed to fetch activity reports data.');
    }

    const result: ActivityReport[] = await response.json();
    if (!Array.isArray(result)) {
        console.error('Moodle Error:', response);
        throw new Error('Failed to fetch activity reports data.');
    }

    return result;
}

export async function fetchSubmissionsData(): Promise<SubmissionData[]> {
    let response;
    try {
        response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/submissions`, {
            headers: { 'apiKey': process.env.SUPABASE_ANON_KEY || '' }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} ${await response.text()}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Moodle Error:', response);
        throw new Error('Failed to fetch activity reports data.');
    }
}

export async function getSubmission(submissionId: string): Promise<SubmissionData | null> {
    try {
        const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/submissions?submission_id=eq.${submissionId}&limit=1`, {
            headers: { 'apiKey': process.env.SUPABASE_ANON_KEY || '' }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} ${await response.text()}`);
        };
        const data = await response.json();
        return data.length > 0 ? data[0] : null;
    } catch (error) {
        return null;
    }
}