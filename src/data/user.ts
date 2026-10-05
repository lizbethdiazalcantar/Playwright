import {generateRandomNumber} from '../utils/testRandom';

export class User {

    username = "";
    firstName = "";
    lastName = "";
    email = "";
    password ="password123";
    confirmPassword = "password123";
    initialCourseName = "overview";
    iAgreeTOC = true;
    createCourseOnSignup = false;
    courses = ["overview"];

    getRandomUser() : User{
        let returnUser = new User();
        
        let randomNumber = generateRandomNumber();

        returnUser.username = `HowardTestworthy${randomNumber}`;
        returnUser.firstName = 'Howard';
        returnUser.lastName = `Testworthy${randomNumber}`;
        returnUser.email = `HowardTestworthy${randomNumber}@mailinator.com`;
        return returnUser;
    }

    getRandomUserWithName(firstNameString: string, lastNameString: string): User{
        let returnUser = new User();
        let randomNumber = generateRandomNumber();

        returnUser.username = `${firstNameString}${lastNameString}${randomNumber}`;
        returnUser.firstName = firstNameString;
        returnUser.lastName = `${lastNameString}${randomNumber}`;
        returnUser.email = `${returnUser.username}@mailinator.com`;

        return returnUser;
    }

 
}