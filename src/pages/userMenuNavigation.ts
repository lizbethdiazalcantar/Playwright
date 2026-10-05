import { Page, expect } from '@playwright/test';
import { LoginPage } from './loginPage';

export class UserMenuNavigation {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  useLogin(username: string, password: string) {
    const loginPage = new LoginPage(this.page);
    loginPage.login(username, password);
  }

  // Page element locators/Selectors
  private navLogo = "[class='navbar-brand']";
  private profileDropDown = "(//a[@id='navbarDropdown'])[1]";
  private courseHomeLink = "//a[normalize-space(text())='Course Home']";
  private practiceLink = "//a[normalize-space(text())='Practice']";
  private assignmentsLink = "//a[normalize-space(text())='Assignments']";
  private studentPeerInstructionLink = "//a[normalize-space(text())='Peer Instruction (Student)']";
  private progressPageLink = "//a[normalize-space(text())='Progress Page']";
  private changeCourseLink = "//a[normalize-space(text())='Change Course']";
  private editProfileLink = "//a[normalize-space(text())='Edit Profile']";
  private changePasswordLink = "//a[normalize-space(text())='Change Password']";
  private helpDropDown = "(//a[@id='navbarDropdown'])[2]";
  private fAQLink = "//a[normalize-space(text())='FAQ']";
  private instructorsGuideLink = "//a[normalize-space(text())='Instructors Guide']";
  private aboutRunestoneLink = "//a[normalize-space(text())='About Runestone']";
  private reportAProblemLink = "//a[normalize-space(text())='Report a Problem']";
  private backToTextbookLink = "//a[normalize-space(text())='Back to textbook']";
  private createACourseLink = "//a[normalize-space(text())='Create Course']";
  private runestoneNewsLink = "//a[normalize-space(text())='Runestone News']";
  private instructorsPageLink = '//a[contains(normalize-space(text()), "Instructor\'s Page")]'//"//a[normalize-space(text())='Instructor\'s Page']";
  private instructorPeerInstructionLink = "//a[normalize-space(text())='Peer Instruction (Instructor)']";
  private authorToolsLink = "//a[normalize-space(text())='Author Tools']";
  private editorialPageLink = "//a[normalize-space(text())='Editorial Page']";
  private requestInvoiceLink = "//a[normalize-space(text())='Request Invoice']";

  
  // ----- Course Home Student Navigation ----- // 


  // Checks if clicking the logo navigates to the correct page
  async clickLogo() {
    await this.page.click(this.navLogo);
  }
  
  // Checks if clicking Course Home navigates to the correct page
  async clickCourseHome() {
    await this.page.click(this.profileDropDown);
    await this.page.click(this.courseHomeLink);
  }

  // Checks if clicking Assignments navigates to the correct page
  async clickAssignments() {
    await this.page.click(this.profileDropDown);
    await this.page.click(this.assignmentsLink);
  }

  // Checks if clicking Practice navigates to the correct page
  async clickPractice() {
    await this.page.click(this.profileDropDown);
    await this.page.click(this.practiceLink);
  }

  // Checks if clicking Peer Instructor (Student) navigates to the correct page
  async clickPeerInstructionStudent() {
    await this.page.click(this.profileDropDown);
    await this.page.click(this.studentPeerInstructionLink);
  }

  // Checks if clicking Progress Page navigates to the correct page
  async clickProgressPage() {
    await this.page.click(this.profileDropDown);
    await this.page.click(this.progressPageLink);
  }

  // Checks if clicking Change Course navigates to the correct page
  async clickChangeCourse() {
    await this.page.click(this.profileDropDown);
    await this.page.click(this.changeCourseLink);
  }
  
  // Checks if clicking Edit Profile navigates to the correct page
  async clickEditProfile() {
    await this.page.click(this.profileDropDown);
    await this.page.click(this.editProfileLink);
  }

  // Checks if clicking Change Password navigates to the correct page
  async clickChangePassword() {
    //await this.login(username, password);
    await this.page.click(this.profileDropDown);
    await this.page.click(this.changePasswordLink);
  }


  // ----- Additional Course Home Navigation (Instructor) ----- //


  // Checks if clicking Back to Textbook navigates to the correct page
  async clickBackToTextbook() {
    await this.page.click(this.profileDropDown);
    await this.page.click(this.backToTextbookLink);
  }

  // Checks if clicking Create Course navigates to the correct page
  async clickCreateCourse() {
    await this.page.click(this.profileDropDown);
    await this.page.click(this.createACourseLink);
  }

  // Checks if clicking Runestone News navigates to the correct page
  async clickRunestoneNews() {
    await this.page.click(this.profileDropDown);
    await this.page.click(this.runestoneNewsLink);
  }

  // Checks if clicking Instructor's Page navigates to the correct page
  async clickInstructorsPage() {
    await this.page.click(this.profileDropDown);
    await this.page.click(this.instructorsPageLink);
  }

  // Checks if clicking Peer Instruction (Instructor) navigates to the correct page
  async clickPeerInstructionInstructor() {
    await this.page.click(this.profileDropDown);
    await this.page.click(this.instructorPeerInstructionLink);
  }

  // Checks if clicking Author Tools navigates to the correct page
  async clickAuthorTools() {
    await this.page.click(this.profileDropDown);
    await this.page.click(this.authorToolsLink);
  }

  // Checks if clicking Editorial Page navigates to the correct page
  async clickEditorialPage() {
    await this.page.click(this.profileDropDown);
    await this.page.click(this.editorialPageLink);
  }

  // Checks if clicking Request Invoice navigates to the correct page
  async clickRequestInvoice() {
    await this.page.click(this.profileDropDown);
    await this.page.click(this.requestInvoiceLink);
  }
  

  // ----- Help Navigation ----- //


  // Checks if clicking FAQ navigates to the correct page
  async clickFAQ() {
    await this.page.click(this.helpDropDown);
    await this.page.click(this.fAQLink);
  }

  // Checks if clicking Instructors Guide navigates to the correct page
  async clickInstructorsGuide() {
    await this.page.click(this.helpDropDown);
    await this.page.click(this.instructorsGuideLink);
  }

  // Checks if clicking About Runestone navigates to the correct page
  async clickAboutRunestone() {
    await this.page.click(this.helpDropDown);
    await this.page.click(this.aboutRunestoneLink);
  }

  // Checks if clicking Report a Problem navigates to the correct page
  async clickReportAProblem() {
    await this.page.click(this.helpDropDown);
    await this.page.click(this.reportAProblemLink);
  }
}
