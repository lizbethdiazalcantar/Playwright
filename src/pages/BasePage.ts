import { expect, Page } from '@playwright/test';


// The idea of this page is to capture elements and operations common to Runestone Academy
// Suce as logging in, navigating via the header (both when logged in and when not logged in)
// and the user menu (also when both logged in and not logged in).
//
// As the first cohort of engineers who built this suite built selectors for navigational elements
// in the header and footer into separate Page Object Model files, this base page object model
// will initially copy the selectors and methods from that file into this file; after then updating
// the related test spec files and then removing the (original) redundant page object files.
// These will include loginPage, logOutPage, FooterLoggedOut, HeaderLoggedOut, and userMenuNavigation.

export class BasePage { 
  page: Page;

  constructor(page: Page) {
    this.page = page;
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
  private instructorsPageLink = "//a[normalize-space(text())='Instructor\'s Page']";
  private instructorPeerInstructionLink = "//a[normalize-space(text())='Peer Instruction (Instructor)']";
  private authorToolsLink = "//a[normalize-space(text())='Author Tools']";
  private editorialPageLink = "//a[normalize-space(text())='Editorial Page']";
  private requestInvoiceLink = "//a[normalize-space(text())='Request Invoice']";

  
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


  ////////////////////////////////////////////////////////////////////
  //
  // Methods for interacting with JavaScript dialog boxes

  // This was the original name for the method; however, when
  // adding additonal dialog methods, we changed so the word
  // dialog was first, so we're keeping this method in for
  // backward compatibility and are calling the new method below.
  async clickOKOnDialog(){
    this.dialogClickOK();
  }

  // Clicks OK on an alert or confirmation dialog box.
  async dialogClickOK(){
      console.log('Clicking OK on expected confirmation dialog');
      this.page.once('dialog', async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept(); // Clicks OK on the confirmation dialog
      });
  }

  // This method clicks Cancel on a confirmation dialog box.
  async dialogClickCancel(){
    console.log('Clicking Cancel on expected confirmation dialog');
    this.page.once('dialog', async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.dismiss(); 
    });
  }

  // This method enters the value on a Prompt dialog box and clicks OK.
  async dialogEnterValueAndClickOK(value: string){
    console.log(`Entering ${value} and clicking OK on expected prompt dialog`);
    this.page.once('dialog', async (dialog) => {
        //console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept(value); 
    });
  }

  // This method tests the message on a dialog box but does not dismiss the dialog
  // UNTESTED; written for 3.2 which has a dialog following a dialog which
  // is handled in another method below.
  
  async dialogTestMessageText(expectedMessage: string){
    this.page.once('dialog', async (dialog) => {
        let actualMessage = '';
        actualMessage = dialog.message();
        console.log(`Actual dialog message: ${dialog.message()}`);
        await expect (actualMessage).toContain(expectedMessage);
    });
  }

  // This method tests the message on a Prompt dialog box and then enters
  // the passed value and clicks OK.
  // UNTESTED; written for 3.2 which has a dialog following a dialog which
  // is handled in another method below.
  async dialogTestMessageEnterValueAndClickOK(expectedMessage: string, input:string): Promise<void> {
    console.log(`\nPrompt dialog:\nExpected Message: ${expectedMessage}\nValue to enter: ${input}`);
    this.page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe(expectedMessage);
      await dialog.accept(input);
    });
  }

  async dialogTestMessageTextAndClickOK(expectedMessage: string): Promise<void> {
    console.log(`\nDialog expected message: ${expectedMessage}`);
    this.page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe(expectedMessage);
      //console.log(`\nDialog success`);
      await dialog.accept();
    });
  }

  // This method handles instances where a prompt dialog triggers another dialog with
  // feedback for the value that the user enters.  For example, in 3.2, the first question
  // prompts the user after step 3 to enter an expected value in a prompt dialog box
  // which then immediately triggers another dialog box with a response message.
  // This method clicks Accept on the second dialog box, so the method
  // should work with both Alert and Confirmation dialogs.

  async handlePromptAndFollowup(
    promptMessage: string,
    inputValue: string,
    followupMessage: string
  ): Promise<void> {

    this.page.once('dialog', async (promptDialog) => {
      console.log(`Prompt dialog\nExpect message: ${promptMessage}`);
      expect(promptDialog.message()).toContain(promptMessage);

      this.page.once('dialog', async (followupDialog) => {
        console.log(`\nResponse dialog.  Expected message: ${followupMessage}`);
        expect(followupDialog.message()).toContain(followupMessage);
        await followupDialog.accept(); // or dismiss if needed
         
      });
      console.log(`\nEntering this in prompt dialog: ${inputValue}`);
      await promptDialog.accept(inputValue); // This triggers the next dialog
    });
  }
}