export type UngradedSubmission = {
    id: string;
    coursename: string;
    activitytype: string;
    activityname: string;
    username: string;
    timemodified: number;
    coursepath: string;
    activitypath: string;
    gradepath: string;
}

export type extendedUngradedSubmission = UngradedSubmission & {
    blocked: boolean, comment: string
}

export type SubmissionData = {
    id: number,
    submission_id: string,
    blocked: boolean,
    comment: string | null,
    created_at: string,
    updated_at: string
}

export type ActivityReport = {
    id: string;
    coursename: string;
    groupname: string;
    userid: number;
    firstname: string;
    lastname: string;
    activitytype: string;
    activityname: string;
    grade: number | null;
    duedate: number | null;
    submissiondate: number | null;
    submissionstatus: 'ontime' | 'pending' | 'missed' | 'late';
}