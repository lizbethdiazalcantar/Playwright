import { generateUniqueCourseName } from "../utils/testRandom";

export class Course{

    institution = "";
    state = "";
    courseLevel = "";
    courseBookType = "overview";
    courseName = "";
    startDate = "";

 getRandomCourseName(): Course { 
    let newCourse = new Course();
    let randomCourse = generateUniqueCourseName('RunestoneAcademyTesting101')
    newCourse.institution = "TripleTen";
    newCourse.state = "CA";
    newCourse.courseLevel = "Graduate";
    newCourse.courseBookType = "overview";
    newCourse.courseName = `${randomCourse}`;
    newCourse.startDate = ""
    return newCourse;
}
}