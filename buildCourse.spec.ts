import { test, expect } from '@playwright/test';
import { testData } from '../utils/testData';
import { LoginPage } from '../pages/loginPage';
import { CourseBuildPage } from '../pages/courseBuild';
import { generateUniqueCourseName } from '../utils/testRandom';
import { Course } from '../data/course';

// Given - The User-instructor is on the Admin Dashboard Navigation page
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(
    testData.professorTorres.username,
    testData.professorTorres.password);
    await expect(loginPage.page).toHaveURL("/ns/course/index");
    await page.click('#v-pills-profile-tab');
    await page.waitForTimeout(2000);
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('button.list-group-item[type="submit"]');
    const newCourseButton = page.locator('button.list-group-item[type="submit"]');
    await expect(newCourseButton).toHaveText('New Course');
    await page.click('button.list-group-item[type="submit"]');
   

  });

 //When - The user/instructor clicks on the “New Course” button
 

test('should create a new course with a random name', async ({ page }) => {
    const courseBuildPage = new CourseBuildPage(page);
    let newCourse = new Course();
    newCourse = newCourse.getRandomCourseName(); 

    await courseBuildPage.completeBuildCourseForm(newCourse);
    await expect(page.getByText("Congratulations")).toBeVisible();
//User should successfully create a random course once all the parameters for 'Build A Custom Course' form are filled out. 

});