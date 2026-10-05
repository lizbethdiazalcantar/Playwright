import { generateRandomString } from "../utils/testRandom";

export class Assignment{

    //These options are in the old assignment builder (/runestone/admin/assignments)
    name = "";
    duplicateFrom = "";
    due = "";
    visibleToStudents = true;
    allowLateSubmissions = true;
    showAsTimedAssessment = false;
    timeLimit = "";
    noFeedback = true;
    noPause = false;
    peerInstructionActivity = false;
    showAsync = false;
    description = "";

    //These options are in the new assignment builder (assignment/instructor/builder)
    totalPoints = "1";
    kindOfAssignment = "";
    sectionsToRead = [];
    readings = [];
    exercises = [];

 generateRandomAssignmentForOldForm(): Assignment { 
    let newRandomAssignment = new Assignment();
    newRandomAssignment.name = generateRandomString('Assignment');

    
    return newRandomAssignment;
}
}