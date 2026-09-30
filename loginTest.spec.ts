//import { beforeEach } from 'node:test';
import { LoginPage } from '../pages/loginPage';
import { testData } from '../utils/testData';
import {test,expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto('/');

});


test.describe('Login and Login Page Tests', () => {
// 16 finished passing tests / 1 possible bug - finalized 12/13/24 CS
  

  test('should login successfully with valid credentials(high level)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    //Given-I am on the Runestone Academy login page and not logged in
    //When-I type valid Username into the Username text field
    //And-I type a valid Password into the Password text field
    //And-I click the "Remember me" checkbox
    //And-I click the "Login" button
    //Then-I should be logged in and taken to "Overview" page
    await expect(loginPage.page).toHaveURL('/ns/course/index');    
    //User Logout
    await loginPage.logout();
});

  test('should show an error for invalid credentials(high level)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);
    //Given-I am on the Runestone Academy login page and not logged in
    //When-I type invalid Username into the Username text field
    //And-I type a invalid Password into the Password text field
    //And-I click the "Remember me" checkbox
    //And-I click the "Login" button
    //Then-I should be receive and error message and not logged in
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid login');
  });

  test('should show an error for invalid credentials with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.validUser.username, testData.invalidUser.password);
    //Given-I am on the Runestone Academy login page and not logged in
    //When-I type valid Username into the Username text field
    //But-I type a invalid Password into the Password text field
    //And-I click the "Remember me" checkbox
    //And-I click the "Login" button
    //Then-I should be receive and error message and not logged in
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid login');
  });

  test('should show an error for invalid credentials with invalid Username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.invalidUser.username, testData.validUser.password);
    //Given-I am on the Runestone Academy login page and not logged in
    //When-I type invalid Username into the Username text field
    //But-I type a valid Password into the Password text field
    //And-I click the "Remember me" checkbox
    //And-I click the "Login" button
    //Then-I should be receive and error message and not logged in
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid login');
  });

  test('User is brought to "Request reset password" screen after clicking "Lost Password" button', async ({ page }) => {
    const loginPage = new LoginPage(page); //changed during
    //Given-I am on the Runestone Academy login page and not logged in
    //When-I click on the "Lost Password" button
    await page.locator('a.btn-xs:nth-child(3)').first().click();
    //Then-I should be brought to the "Request reset password" screen for Username retrieval
    await expect(page).toHaveURL('/user/request_reset_password'); //<left is new code
  });

  test('should be brought to the "Email" request page after clicking "Forgot Username" button', async ({ page }) => {
    const loginPage = new LoginPage(page); //changed during
    //Given-I am on the Runestone Academy login page and not logged in
    //When-I click on the "Forgot Username" button
    await page.locator('#web2py_user_form > form > div:nth-child(4) > div > a:nth-child(4)').first().click();
    //Then-I should be brought to the Username retrieval page and Email text box for Username retrieval
    await expect(page).toHaveURL('/user/retrieve_username');
  });

  test('should be brought to the "Runestone Academy Library of Books" page after clicking the "Our Library" button', async ({ page }) => {
    const loginPage = new LoginPage(page); //changed during
    //Given-I am on the Runestone Academy login page and not logged in
    //When-I click on the "Our Library" button
    await page.locator('//*[@id="navbar"]/div/div[2]/ul[2]/li[2]/a').first().click();
    //Then-I should be brought to the "Runestone Academy of Books" screen
    await expect(page).toHaveURL('/ns/books/index');
  });
  
  test('should be brought to the "Runestone News" page after clicking the "Runestone News" button', async ({ page }) => {
    const loginPage = new LoginPage(page); //changed during
    //Given-I am on the Runestone Academy login page and not logged in
    //When-I click on the "Runestone News" button
    await page.locator('//*[@id="navbar"]/div/div[2]/ul[2]/li[3]/a').first().click();
    //Then-I should be brought to the "Runestone News" screen
    await expect(page).toHaveURL('https://blog.runestone.academy/');
  });
  
  test('should see FAQ dropdown icon in top right corner with FAQ/Instructors Guide/About Runestone/Report a Problem', async ({ page }) => {
    const loginPage = new LoginPage(page); //changed during
    //Given-I am on the Runestone Academy login page and not logged in
    //When-I click on the ? dropdown icon in top right corner
    await page.locator('.glyphicon-question-sign').first().click();
    //Then-I should see a dropdown with [FAQ/Instructors Guide/About Runestone/Report a Problem] options
    const userFaq = ('li.dropdown:nth-child(4) > ul:nth-child(2) > li:nth-child(1) > a:nth-child(1)');
    await expect(loginPage.page.locator(userFaq)).toBeVisible();
  });

  test('should see the Runestone Academy "Our Mission" statement', async ({ page }) => {
    const loginPage = new LoginPage(page); //changed during
    //Given-I am on the Runestone Academy login page and not logged in
    //Then-I should see the Runestone Academy Mission statement
    const ourMission = ('div.mission:nth-child(1) > h2:nth-child(1)');
    await expect(loginPage.page.locator(ourMission)).toBeVisible();
  });

  test('should be taken to the "Get Started" information page when clicking on the "Get Started" button', async ({ page }) => {
    const loginPage = new LoginPage(page); //changed during
    //Given-I am on the Runestone Academy login page and not logged in
    //And- I click on the blue "Get Started" button
    await page.locator('a.btn:nth-child(1)').first().click();
    //Then- I should be taken to the page with the information for the website
    await expect(page).toHaveURL('/runestone/default/start');
  });

  test('should be taken to the "Terms of Service" page if User clicks the "Terms of Service hyperlink', async ({ page }) => {
    const loginPage = new LoginPage(page); //changed during
    //Given-I am on the Runestone Academy login page and not logged in
    //And- I click on the "Terms of Service" hyperlink
    await page.locator('div.col-md-8:nth-child(2) > p:nth-child(2) > a:nth-child(2)').first().click();
    //Then- I should be taken to the "Terms of Service" page
    await expect(page).toHaveURL('/runestone/default/terms');
  });

  test('should be taken to the "Privacy Policy" page if User clicks the "Privacy Policy" hyperlink', async ({ page }) => {
    const loginPage = new LoginPage(page); //changed during
    //Given-I am on the Runestone Academy login page and not logged in
    //And- I click on the "Privacy Policy" hyperlink
    await page.locator('div.col-md-8:nth-child(2) > p:nth-child(2) > a:nth-child(1)').first().click();
    //Then- I should be taken to the page with the "Privacy Policy"
    await expect(page).toHaveURL('http://ec2-18-209-57-71.compute-1.amazonaws.com/runestone/default/privacy');
  });

  test('should be taken to the "GitHub" page if User clicks the "Github" hyperlink', async ({ page }) => {
    const loginPage = new LoginPage(page); //changed during
    //Given-I am on the Runestone Academy login page and not logged in
    //And- I click on the "Github" hyperlink
    await page.locator('div.col-md-8:nth-child(3) > p:nth-child(2) > a:nth-child(1)').first().click();
    //Then- I should be taken to Github
    await expect(page).toHaveURL('https://github.com/RunestoneInteractive');
  });

  test('should be taken to the "Discord" page if User clicks the "Discord" hyperlink', async ({ page }) => {
    const loginPage = new LoginPage(page); //changed during
    //Given-I am on the Runestone Academy login page and not logged in
    //And- I click on the "Discord Server" hyperlink
    await page.locator('div.col-md-8:nth-child(3) > p:nth-child(2) > a:nth-child(2)').first().click();
    //Then- I should be taken to Discord
    await expect(page).toHaveURL('https://discord.com/invite/f3Qmbk9P3U');
  });

  test('should be taken to the "Donate to Runestone Academy" page if User clicks "Donate" hyperlink', async ({ page }) => {
    const loginPage = new LoginPage(page); //changed during
    //Given-I am on the Runestone Academy login page and not logged in
    //And- I click on the "Donate" hyperlink
    await page.locator('div.col-md-8:nth-child(3) > p:nth-child(3) > a:nth-child(1) > img:nth-child(1)').first().click();
    //Then- I should be taken to the "Donate to Runestone Academy"
    await expect(page).toHaveURL('/donate');
  });


   /*

//BUG!!! EXCLUDE - BELOW TEST SHOULD RECEIVE ERROR MESSAGE BUT USER RECEIVES NOTHING - EXCLUDE - BUG!!!
  test('should show an error for invalid credentials when leaving Username/Password text fields blank', async ({ page }) => {
    const loginPage = new LoginPage(page);
    //Given-I am on the Runestone Academy login page and not logged in
    //When-I type nothing into the Username text field
    await page.locator('#auth_user_username').fill('');
    //And-I type nothing into the Password text field
    await page.locator('#auth_user_password').fill('');
    //And-I click the "Remember me" checkbox
    await page.locator('#auth_user_remember_me').check();
    //And-I click the "Login" button
    await page.locator('#login_button').check();
    //Then-I should be receive and error message and be not logged in
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid login');
  });

*/


   //test.afterEach(async ({ page }) => {
     // Perform logout
    // await page.goto('/logout');
  // });
});
