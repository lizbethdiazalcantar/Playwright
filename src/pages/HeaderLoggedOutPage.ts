import { Page, Locator } from '@playwright/test';

export class HeaderLoggedOutPage {
  private page: Page;
  public logo: Locator;
  public ourlibraryLink: Locator;
  public runestonenewsLink: Locator;
  public signupLink: Locator;
  public registerLink: Locator;
  public loginLink: Locator;
  public faqLink: Locator;
  public instructorsguideLink: Locator;
  public aboutrunestoneLink: Locator;
  public reportaproblemLink: Locator;
  private userDropdown: Locator;
  private questionMarkDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('a.brand-logo');
    this.ourlibraryLink = page.locator('a[href="/ns/books/index"]');
    this.runestonenewsLink = page.locator('a[href="https://blog.runestone.academy"]');
    this.signupLink = page.locator('a[href="/runestone/default/user/register"]');
    this.registerLink = page.locator('a[href="/user/register"]');
    this.loginLink = page.locator('a[href="/user/login"]:has-text("Login")'); // Updated selector
    this.faqLink = page.locator('a[href="https://blog.runestone.academy/pages/faq.html"]');
    this.instructorsguideLink = page.locator('a:has-text("Instructors Guide")');
    this.aboutrunestoneLink = page.locator('a[href="https://blog.runestone.academy/pages/about.html"]');
    this.reportaproblemLink = page.locator('a[href="/runestone/default/reportabug"]');
    this.userDropdown = page.locator('li.dropdown').first();
    this.questionMarkDropdown = page.locator('li.dropdown:has(i.glyphicon.glyphicon-question-sign)');
  }

  // Getter for the page property
  public get pageInstance(): Page {
    return this.page;
  }

  // Action Methods
  public async navigate() {
    console.log('Navigating to the home page');
    await this.page.goto('/');
    console.log('Navigated to the home page');
  }

  public async clickLogo() {
    console.log('About to click the logo');
    await this.logo.click();
    console.log('Clicked the logo');
  }

  public async clickLibraryLink() {
    console.log('About to click the Our Library link');
    await this.ourlibraryLink.waitFor(); // Ensure the element is ready
    await this.ourlibraryLink.click();
    console.log('Clicked the Our Library link');
  }

  public async clickNewsLink() {
    console.log('About to click the Runestone News link');
    await this.ourlibraryLink.waitFor(); // Ensure the element is ready
    await this.runestonenewsLink.click();
    console.log('Clicked the Runestone News link');
  }

  public async clickSignupLink() {
    console.log('About to click the Sign Up link');
    await this.signupLink.click();
    console.log('Clicked the Sign Up link');
  }

  // Drop down container for UserLogin Icon
  public async openDropdown() { 
    console.log('Opening the dropdown menu'); 
    const dropdownTrigger = this.userDropdown.locator('a.dropdown-toggle'); 
    await dropdownTrigger.click(); 
    console.log('Opened the dropdown menu');
  } 

  public async clickRegisterLink() {   
    console.log('About to click the Register link'); 
    await this.openDropdown(); 
    await this.page.waitForSelector('li.dropdown.open'); 
    await this.registerLink.click(); 
    console.log('Clicked the Register link');
  } 

  public async clickLoginLink() { 
    console.log('About to click the Login link');
    await this.openDropdown(); // Ensure the dropdown is opened first 
    await this.page.waitForSelector('li.dropdown.open'); // Ensure the dropdown is open 
    await this.loginLink.click(); 
    console.log('Clicked the Login link'); 
  }

  // Drop down container for Question Mark Icon
  public async openQuestionMarkDropdown() { 
    console.log('Opening the question mark dropdown menu'); 
    const dropdownTrigger = this.questionMarkDropdown.locator('a.dropdown-toggle'); 
    await dropdownTrigger.click(); 
    console.log('Opened the question mark dropdown menu'); 
  }

  public async clickFaqLink() {
    console.log('About to click the FAQ link');
    await this.openQuestionMarkDropdown(); // Ensure the question mark dropdown is opened first
    await this.page.waitForSelector('li.dropdown.open'); // Ensure the dropdown is open
    await this.faqLink.click();
    console.log('Clicked the FAQ link');
  }
 
  public async clickInstructorsGuideLink() {
    console.log('About to click the Instructors Guide link');
    await this.openQuestionMarkDropdown(); // Ensure the question mark dropdown is opened first
    await this.page.waitForSelector('li.dropdown.open'); // Ensure the dropdown is open

    // Click the link and wait for navigation to complete 
    await this.instructorsguideLink.click(); 
    await this.page.waitForNavigation({ timeout: 15000 }); 
    await this.page.waitForURL('https://guide.runestone.academy/InstructorGuide-3.html', { timeout: 15000 });
    console.log('Clicked the Instructors Guide link and verified the redirected URL');

    // Navigate back to the main website
    await this.page.goto('http://ec2-18-209-57-71.compute-1.amazonaws.com');
    await this.page.waitForLoadState();
    console.log('Navigated back to the main website');
  }

  public async clickAboutRunestoneLink() {
    console.log('About to click the About Runestone link');
    await this.openQuestionMarkDropdown(); // Ensure the question mark dropdown is opened first
    await this.page.waitForSelector('li.dropdown.open'); // Ensure the dropdown is open
    await this.aboutrunestoneLink.click();
    console.log('Clicked the About Runestone link');
  }

  public async clickReportAProblemLink() {
    console.log('About to click the Report A Problem link');
    await this.openQuestionMarkDropdown(); // Ensure the question mark dropdown is opened first
    await this.page.waitForSelector('li.dropdown.open'); // Ensure the dropdown is open
    await this.reportaproblemLink.click();
    console.log('Clicked the Report A Problem link');
  }
}
