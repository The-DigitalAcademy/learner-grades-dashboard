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

export type Course = {
    id: number,
    name: string
}