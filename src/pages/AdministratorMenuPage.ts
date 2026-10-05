import { expect, Page } from '@playwright/test';


export class AdministratorMenuPage { 
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Page element locators/Selectors
  private usernameInput = "//input[@id='auth_user_username']";
  private passwordInput = "//input[@id='auth_user_password']";
  private loginButton = "//button[@id='login_button']";
  private errorMessage = "//div[normalize-space(text())='Invalid login']";
  private profileDropDown = "(//a[@id='navbarDropdown'])[1]";
  private logoutLink = "//a[normalize-space(text())='Log Out']";

  //Admin Menu Buttons
  classAdministrationButton = ('#v-pills-profile-tab');
  gradebookButton = ('#gradebookLink');
  chapterActivityButton = ('#chapoverviewLink');
  courseSettingsButton = ('#courseTab');
  manageStudentsButton = ('#studentsTab');
  addTaButton = ('#AddInstructorTab');
  downloadCourseDataButton = ('#courselog');
  studentsOnlineButton = ('#activeLink');
  resetStudentExamButton=('#aresetTab');
  copyAssignmentsButton=('#CopyAssignmentsTab');
  ltiIntegrationButton=('#LTITab');
  gBookButton=('#gradebookNew');
  deleteButton=('#DeleteTab');

  // Action Methods
  async navigateToLogin() {
    await this.page.goto('/user/login');
  }
  //Menu action click URL's 
  async click(){
    await this.page.goto('/runestone/dashboard/grades');
    await this.page.goto('/runestone/dashboard/subchapoverview');
    await this.page.goto('/author.runestone.academy/author/anonymize_data/overview');
    await this.page.goto('/runestone/dashboard/active');
    await this.page.goto('/assignment/instructor/gradebook');
  }

  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }

  async logout(){
    await this.page.click(this.profileDropDown);
    await this.page.click(this.logoutLink);
  }

}