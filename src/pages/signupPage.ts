import { Page, expect } from '@playwright/test';
import {generateUniqueUsername} from '../utils/testRandom';
import { User } from '../data/user';

export class SignUpPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Page element locators/Selectors  - deleted private in front
  // Look to be copied from login -- probably can delete here
  /*usernameInput = "//input[@id='auth_user_username']";
  passwordInput = "//input[@id='auth_user_password']";
  loginButton = "//button[@id='login_button']";
  errorMessage = "//div[normalize-space(text())='Invalid login']";
  profileDropDown = "(//a[@id='navbarDropdown'])[1]";
  logoutLink = "//a[normalize-space(text())='Log Out']";*/

  // Page selectors
  registrationHeading = '//h2[text()="Runestone Registration"]';

  // Additional element locators/Selectors - Registration Page - necessary for teacher tests on Logout
  //signUpButton = "a.btn-primary:nth-child(3)";
  userNameBox = "#auth_user_username";
  firstNameBox = "#auth_user_first_name";
  lastNameBox = "#auth_user_last_name";
  emailBox = "#auth_user_email";
  passwordBox = "#auth_user_password";
  confirmPassword = "#auth_user_password_two";
  courseNameBox = "#auth_user_course_id";
  iAgreeCheckbox = "#auth_user_accept_tcp";
  createCourseCheckbox = "#ccn_checkbox";
  signUpButton = 'text="Sign Up"';
  sorryNotTodayButton = 'text="Sorry, not Today"';
  //signUpBox = ".btn";
  // Spare some change? Page
  sorryImBrokeAsHell = "a.btn";
  
  async navigateToSignupPage() {
      await this.page.goto('/runestone/default/user/register');
      await expect(this.page.locator(this.registrationHeading)).toBeVisible();
      await expect(this.page.locator(this.userNameBox)).toBeVisible();
      await expect(this.page.locator(this.firstNameBox)).toBeVisible();
      await expect(this.page.locator(this.lastNameBox)).toBeVisible();
      await expect(this.page.locator(this.emailBox)).toBeVisible();
      await expect(this.page.locator(this.passwordBox)).toBeVisible();
      await expect(this.page.locator(this.confirmPassword)).toBeVisible();
      await expect(this.page.locator(this.courseNameBox)).toBeVisible();
      await expect(this.page.locator(this.iAgreeCheckbox)).toBeVisible();
      await expect(this.page.locator(this.createCourseCheckbox)).toBeVisible();
      await expect(this.page.locator(this.signUpButton)).toBeVisible();
    }

  async signUpRandomUserForOverview(){
    
    var userName = generateUniqueUsername('Howard');
    var userEmail = `${userName}@mailinator.com`;
    console.log(`Signing up Random User ${userName} / ${userEmail}`);
    await this.navigateToSignupPage();
    await this.page.locator(this.userNameBox).fill(userName);
    await this.page.locator(this.firstNameBox).fill(userName);
    await this.page.locator(this.lastNameBox).fill('Testworthy');
    await this.page.locator(this.emailBox).fill(userEmail);
    await this.page.locator(this.passwordBox).fill('password123');
    await this.page.locator(this.confirmPassword).fill('password123');
    await this.page.locator(this.courseNameBox).fill('overview');
    await this.page.locator(this.iAgreeCheckbox).click();
    await this.page.locator(this.signUpButton).click();
    await expect(this.page.locator('h1')).toContainText('Support Runestone Academy');

  }

  async signUpRandomInstructorForOverview(){
    // This creates an instructor user; the only difference is that the
    // Create Course checkbox is clicked.
    // The signUpRandomUserForOverview and signUpRandomInstructorForOverview methods
    // could be abstracted to a single method to make it easier to update changes to the form,
    // perhaps using by creating a User object in each and using the completeSignUpForm method below.
    
    var userName = generateUniqueUsername('Howard');
    var userEmail = `${userName}@mailinator.com`;
    console.log(`Signing up Random User ${userName} / ${userEmail}`);
    await this.navigateToSignupPage();
    await this.page.locator(this.userNameBox).fill(userName);
    await this.page.locator(this.firstNameBox).fill(userName);
    await this.page.locator(this.lastNameBox).fill('Testworthy');
    await this.page.locator(this.emailBox).fill(userEmail);
    await this.page.locator(this.passwordBox).fill('password123');
    await this.page.locator(this.confirmPassword).fill('password123');
    await this.page.locator(this.courseNameBox).fill('overview');
    await this.page.locator(this.iAgreeCheckbox).click();
    await this.page.locator(this.createCourseCheckbox).click();
    await this.page.locator(this.signUpButton).click();
    
    await expect(this.page.locator('h1')).toContainText('Support Runestone Academy');

  }

  async completeSignUpForm(user: User){
    // Completes the signup form with information from the passed user object and clicks Sign Up
    // Does NOT poll to see result, as this will be handled by the test (testing for success or error message)

    await this.page.locator(this.userNameBox).fill(user.username);
    await this.page.locator(this.firstNameBox).fill(user.firstName);
    await this.page.locator(this.lastNameBox).fill(user.lastName);
    await this.page.locator(this.emailBox).fill(user.email);
    await this.page.locator(this.passwordBox).fill(user.password);
    await this.page.locator(this.confirmPassword).fill(user.confirmPassword);
    await this.page.locator(this.courseNameBox).fill(user.initialCourseName);
    if (user.iAgreeTOC == true){
      
      await this.page.locator(this.iAgreeCheckbox).click();
    }
    if (user.createCourseOnSignup == true){
      await this.page.locator(this.createCourseCheckbox).click();
    }
    await this.page.locator(this.signUpButton).click();
    


  }

  async verifySuccessfulSignUp(username: string) {

  }

}
