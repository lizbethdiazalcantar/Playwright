import { beforeEach } from "node:test";
import { LoginPage } from "../pages/loginPage";
import { testData } from "../utils/testData";
import { test, expect } from "@playwright/test";
import { AdministratorMenuPage } from "../pages/AdministratorMenuPage";

//Given-user is logged in and in the admin navigation menu
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(
    testData.professorTorres.username,
    testData.professorTorres.password);
    await expect(loginPage.page).toHaveURL("/ns/course/index");
    await page.click('#v-pills-profile-tab');

  });
  test.describe('Signup Tests', () => {
    test("gradebook button works as expected", async ({ page }) => { 
      //When user clicks on the “Gradebook” button 
      await page.click('#gradebookLink');
      
      //Then: The user should be taken to the Gradebook for the course 
      await expect(page).toHaveURL("/runestone/dashboard/grades");
      await expect(page.locator('h2', { hasText: 'Gradebook' })).toBeVisible(); 
    });

    test("chapter activity button works as expected", async ({ page }) => {
      //When user clicks on the “Chapter Activity” button 
      await page.click('#chapoverviewLink');
    
      //Then user should be taken to the Chapter Activity for the course
      await expect(page).toHaveURL("/dashboard");
      await expect(page.locator('span',{hasText: '1. ActiveCode Languages'})).toBeVisible();
    });

    test("course settings button works as expected", async ({ page }) => {
      //When user clicks on the “Course Settings” button
      await page.click('#courseTab');
      //Then user should be taken to the Course Settings for the course
      await expect(page.locator('h3', { hasText: 'Course Settings' })).toBeVisible(); 
    });

    test("manage students button works as expected", async ({ page }) => {
      //When user clicks on the “Manage Students” button 
      await page.click('#studentsTab');
      //Then user should be taken to a page where they can see their students 
      await expect(page.locator("#studentuploads")).toBeVisible();
    });

    test("add TA button works as expected", async ({ page }) => {
      //When user clicks on the “Add TA” button
      await page.click('#AddInstructorTab');
      //Then user should be taken to the page to add a TA
      await expect(page.locator('h3', { hasText: 'Add a New Instructor' })).toBeVisible();
    });

  /* 
  BELOW is commented because it is a valid test that results in a fail, will be added back to set when bug is fixed
  test("download course data button works as expected", async ({ page }) => {
      await page.click('#courselog');
      await expect(page).toHaveURL("/author.runestone.academy/author/anonymize_data/overview");
      await page.waitForTimeout(2000);
      await page.waitForLoadState('domcontentloaded');
    });
  */


    test("students online button works as expected", async ({ page }) => {
      // When user clicks the “Students Online” button  
      await page.click('#activeLink')
      // Then user should be taken to a page where they can see students online 
      await expect(page).toHaveURL("/runestone/dashboard/active");
    });
  
    test("reset student exam button works as expected", async ({ page }) => {
      //When user clicks on the “Reset Student Exam” button
      await page.click('#aresetTab');
      //Then user should be taken to a page where they can reset student exams
      await expect(page.locator('h3', { hasText: 'Reset an Exam' })).toBeVisible();
    });

    test("copy assignments button works as expected", async ({ page }) => {
      //When user clicks on the “Copy Assignments” button 
      await page.click('#CopyAssignmentsTab');
      //Then user should be taken to a page where they can copy assignments 
      await expect(page.locator('h2', { hasText: 'Copy Assignments' })).toBeVisible();
    });

    test("LTI integration button works as expected", async ({ page }) => {
      //When user clicks on the “LTI Integration” button
      await page.click('#LTITab');
      //Then user should be taken to a page for LTI integration
      await expect(page.locator('h2', { hasText: 'LTI Configuration' })).toBeVisible();
    });

    test("gradebook alpha button works as expected", async ({ page }) => {
      //When user clicks on the “Gradebook Alpha” button
      await page.click('#gradebookNew');
      //Then user should be taken to the a page to see the Alpha Gradebook
      await expect(page).toHaveURL("/assignment/instructor/gradebook");
    });

    test("delete button works as expected", async ({ page }) => {
      //When user clicks on the “Delete” button
      await page.click('#DeleteTab');
      //Then user should be taken to a page to delete the course
      await expect(page.locator('h3', { hasText: 'This action CANNOT BE UNDONE' })).toBeVisible();
    });
  })