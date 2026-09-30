import { test, expect } from '@playwright/test';
import { testData } from '../utils/testData';
import { SignUpPage } from '../pages/signupPage';
import { CourseBuildPage } from '../pages/courseBuild';
import { Course } from '../data/course';
import { Assignment } from '../data/assignment';
import { CreateAssignmentOldPage } from '../pages/CreateAssignmentOldPage';
import { UserMenuNavigation } from '../pages/userMenuNavigation';


//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let courseBuildPage = new CourseBuildPage(page);
  let createCoursePage = new CreateAssignmentOldPage(page);
  let userMenu = new UserMenuNavigation(page);
  
  await signUpPage.signUpRandomInstructorForOverview();
  await page.locator(signUpPage.sorryNotTodayButton).click();
  
  let newCourse = new Course();
  newCourse = newCourse.getRandomCourseName(); 
  await courseBuildPage.completeBuildCourseForm(newCourse);
  await expect(page.getByText("Congratulations")).toBeVisible();
  await createCoursePage.goToOldAssignmentForm();
    
});

test.describe('Add Assignment', () => {

    test('Add Assignment using Old form', async ({ page }) => {
        let assignmentPage = await new CreateAssignmentOldPage(page);
        let assignment = new Assignment();
        assignment = assignment.generateRandomAssignmentForOldForm();

        //await assignmentPage.goToOldAssignmentForm();
        await expect(page.locator(assignmentPage.addButton)).toBeVisible();

        console.log('Ready to click the button.');
        await page.locator(assignmentPage.addButton).click();
        await expect(page.locator(assignmentPage.addAssignmentModal)).toBeVisible();

        await assignmentPage.completeAddAssignmentModal(assignment);
        await expect(page.locator(assignmentPage.addAssignmentModal)).toBeHidden();

        await page.locator(assignmentPage.saveButton).click();
        //await assignmentPage.clickOKOnDialog();
        await expect(page.locator('#assignlist')).toContainText(assignment.name);
    });

    test('Duplicate Assignment using Old form', async ({ page }) => {
          let assignmentPage = await new CreateAssignmentOldPage(page);
          let assignment = new Assignment();
          assignment = assignment.generateRandomAssignmentForOldForm();
          let duplicateAssignment = new Assignment();
          duplicateAssignment = duplicateAssignment.generateRandomAssignmentForOldForm();
  
          //await assignmentPage.goToOldAssignmentForm();

          // Add first assignment to course
          await expect(page.locator(assignmentPage.addButton)).toBeVisible();
  
          console.log('Ready to click the button.');
          await page.locator(assignmentPage.addButton).click();
          await expect(page.locator(assignmentPage.addAssignmentModal)).toBeVisible();
  
          await assignmentPage.completeAddAssignmentModal(assignment);
          await expect(page.locator(assignmentPage.addAssignmentModal)).toBeHidden();
  
          await page.locator(assignmentPage.saveButton).click();
          //await assignmentPage.clickOKOnDialog();
          await expect(page.locator('#assignlist')).toContainText(assignment.name);
  
          // Add duplicate assignment to course
          await expect(page.locator(assignmentPage.addButton)).toBeVisible();

          console.log('Ready to click the button.');
          await page.locator(assignmentPage.addButton).click();
          await expect(page.locator(assignmentPage.addAssignmentModal)).toBeVisible();
  
          await assignmentPage.completeAddAssignmentModal(duplicateAssignment, assignment.name);
          await expect(page.locator(assignmentPage.addAssignmentModal)).toBeHidden();
  
          await page.locator(assignmentPage.saveButton).click();
          //await assignmentPage.clickOKOnDialog();
          await expect(page.locator('#assignlist')).toContainText(duplicateAssignment.name);
          
  
  
      });    
});