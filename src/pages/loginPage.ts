import { Page } from '@playwright/test';

export class LoginPage {
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

  

  // Action Methods
  async navigateToLogin() {
    await this.page.goto('/user/login');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
  async performLogin(username: string, password: string) {
    await this.navigateToLogin();   
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


  
/*//ATTEMPT AT TEACHER LOGIN NIGHTMARE
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




  } */



  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }

  async logout(){
    await this.page.click(this.profileDropDown);
    await this.page.click(this.logoutLink);
  }

}
