import { Page } from '@playwright/test';

export class LogoutPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Page element locators/Selectors  - deleted private in front
  usernameInput = "//input[@id='auth_user_username']";
  passwordInput = "//input[@id='auth_user_password']";
  loginButton = "//button[@id='login_button']";
  errorMessage = "//div[normalize-space(text())='Invalid login']";
  profileDropDown = "(//a[@id='navbarDropdown'])[1]";
  logoutLink = "//a[normalize-space(text())='Log Out']";

  // Additional element locators/Selectors - Registration Page - necessary for teacher tests on Logout
  
  signUpButton = "a.btn-primary:nth-child(3)";
  userNameBox = "#auth_user_username";
  firstNameBox = "#auth_user_first_name";
  lastNameBox = "#auth_user_last_name";
  emailBox = "#auth_user_email";
  passwordBox = "#auth_user_password";
  confirmPassword = "#auth_user_password_two";
  // May have to delete nonsense pre-filled in box below
  courseNameBox = "#auth_user_course_id";
  iAgreeCheckbox = "#auth_user_accept_tcp";
  createCourseCheckbox = "#ccn_checkbox";
  signUpBox = ".btn";
  // Spare some change? Page
  sorryImBrokeAsHell = "a.btn";
  // Build a Custom Course page
  institutionBox = "//*[@id='institution']";    // required - School of Hard Knocks
  stateDropDown = "//*[@id='state']";   //required  - New Jersey
  // may need help with selecting a state
  courseLevel = "//*[@id='courselevel']";   //required - Graduate
  miscBook = "/html/body/div[2]/div[2]/form/div[2]/div[2]/label/input";
  courseName = "//*[@id='projectname']";   
  makeMeInstructorBox = "/html/body/div[2]/div[2]/form/div[4]/div[3]/label/input"; //autoselected wont need
  termStartDate = "//*[@id='startdate']";
  submitButton = "/html/body/div[2]/div[2]/form/input";
// Congratulation Page
congratsUserIcon = "/html/body/div[1]/div/div[2]/ul[1]/li[4]/a/i";
congratsLogOut = "/html/body/div[1]/div[2]/div[2]/ul[1]/li[4]/ul/li[17]/a";
  

  // Action Methods
  async navigateToLogin() {
    await this.page.goto('/user/login');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
// new code for signoutTest, below delete if fubar
  async login2(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
//ATTEMPT AT TEACHER LOGIN NIGHTMARE
  async login3(username: string, password: string) {
    await this.page.click(this.signUpButton);
    await this.page.fill(this.userNameBox, 'The Teacher');
    await this.page.fill(this.firstNameBox, 'Han');
    await this.page.fill(this.lastNameBox, 'Solo');
    await this.page.fill(this.emailBox, 'Hansolo@gmail.com');
    await this.page.fill(this.passwordBox, 'Han');
    await this.page.fill(this.confirmPassword, 'Han');
    await this.page.fill(this.courseName, 'Overview');
    await this.page.click(this.iAgreeCheckbox);
    await this.page.click(this.createCourseCheckbox);
    await this.page.click(this.sorryImBrokeAsHell);
    await this.page.fill(this.institutionBox, 'Corellia');
    await this.page.fill(this.stateDropDown, 'New Jersey');
    


   // await this.page.fill(this.usernameInput, username);
  //  await this.page.fill(this.passwordInput, password);
    //await this.page.click(this.loginButton);




  }



  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }

  async logout(){
    await this.page.click(this.profileDropDown);
    await this.page.click(this.logoutLink);
  }

}
