import { Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { Course } from '../data/course';

export class CourseBuildPage {
  
  page: Page;

// Locators for the course creation form

  private institution = '#institution';
  private state = '#state';
  private courseLevel = '#courselevel';
  private courseBookOverview = 'input[type="radio"][name="coursetype"][value="overview"]';
  private projectNameInput = '#projectname';
  private logInRequirementsCheckbox = 'input[type="checkbox"][name="instructor"][value="yes"]';
  private makeMeInstructorCheckbox = 'input[type="checkbox"][name="instructor"][value="yes"]';
  private startDateInput = '#startdate';
  private submitButton = 'input.btn.btn-default';
  private courseTitleHeader = 'h1';

  //admin menu buttons
  classAdministrationButton = ('#v-pills-profile-tab');
  newCourseButton = 'button.list-group-item[type="submit"]';

  // Constructor to initialize the page
  constructor(page: Page) {
    this.page = page;
  }


  async completeBuildCourseForm(course: Course){
    // Completes the signup form with information from the passed user object and clicks Sign Up
    // Does NOT poll to see result, as this will be handled by the test (testing for success or error message)

    await this.page.locator(this.institution).fill(course.institution);
    await this.page.locator(this.state).selectOption(course.state);
    await this.page.locator(this.courseLevel).selectOption(course.courseLevel);
    await this.page.locator(this.courseBookOverview).click();
    await this.page.locator(this.projectNameInput).fill(course.courseName);
    await this.page.locator(this.logInRequirementsCheckbox).click();
    await this.page.locator(this.makeMeInstructorCheckbox).click();
    await this.page.locator(this.startDateInput).fill(course.startDate);
    await this.page.locator(this.submitButton).click();
    }
  }
  
    
  