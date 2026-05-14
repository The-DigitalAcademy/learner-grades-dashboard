import { Course, UngradedSubmission } from "./definitions";

export async function fetchUngradedSubmissions(course?: string): Promise<UngradedSubmission[]> {
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

    result.forEach(item => {
        item.coursepath = process.env.MOODLE_URL + item.coursepath;
        item.activitypath = process.env.MOODLE_URL + item.activitypath;
        item.gradepath = process.env.MOODLE_URL + item.gradepath;
    })

    return result.filter((item) => {
        if (course && typeof course == 'string') return item.coursename == course;
        else return item;
    }).sort((a, b) => a.timemodified - b.timemodified);
}

export async function fetchCourses(): Promise<Course[]> {
    let response;
    try {
        const webServiceFunction = 'core_course_get_courses';
        response = await fetch(`${process.env.MOODLE_URL}/webservice/rest/server.php?wstoken=${process.env.MOODLE_TOKEN}&wsfunction=${webServiceFunction}&moodlewsrestformat=json`)

        if (!response.ok) {
            throw new Error(`Moodle Http Error: ${response.status} ${response.json()}`);
        }
    } catch (error) {
        console.error('Moodle Error:', error);
        throw new Error('Failed to fetch courses data.');
    }

    const result: { id: number, shortname: string }[] = await response.json();
    if (!Array.isArray(result)) {
        console.error('Moodle Error:', response);
        throw new Error('Failed to fetch courses data.');
    }

    return result.map(item => ({
        id: item.id,
        name: item.shortname,
    }));
}