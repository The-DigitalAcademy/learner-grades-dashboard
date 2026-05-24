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

export type AutograderLog = {
    id: number;
    created_at: string;
    submission_id: number;
    user_id: number;
    submission_status: string;
    assignment_id: number;
    assignment_name: string;
    assignment_intro: string;
    assignment_activity: string;
    submission_content: string;
    submitted_at: string | null;
    autograde_status: string;
    autograde_status_details: string;
    cmid: number;
    status: string;
    details: string;
    attempt: number;
    data: any;
}