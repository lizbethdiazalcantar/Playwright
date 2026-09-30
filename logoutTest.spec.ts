import { LogoutPage } from '../pages/logoutPage';
import { LoginPage } from '../pages/loginPage';
import { testData } from '../utils/testData';
import {test,expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto('/');
});

test.describe('Log out Tests', () => {
//5 finished postive tests / 2 under construction - 12/13/24 finalized CS


  test('should logout and functions work appropriately(high level)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    //Given-I am on the Runestone Academy login page and not logged in
    //When-I type valid Username into the Username text field
    //And-I type a valid Password into the Password text field
    //And-I click the "Remember me" checkbox
    //And-I click the "Login" button
    //And- I am logged into the site
    await expect(loginPage.page).toHaveURL('/ns/course/index');   
    //And- I log out of the site 
    //User Logout
    await loginPage.logout();
  });



  test('Student should be logged out after selecting "Log Out" option in the User dropdown', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    //Given-I am on the Runestone Academy login page and not logged in
    //When-I type valid Username into the Username text field
    //And-I type a valid Password into the Password text field
    //And-I click the "Remember me" checkbox
    //And-I click the "Login" button
    await expect(loginPage.page).toHaveURL('/ns/course/index'); 
    //And-I am logged in to the app
    await loginPage.logout();
    //And-I log out of the app
    //Then-I am logged out of the app
    //await page.pause(100);
    //await expect(loginPage.page).toHaveURL('/ns/course/index');
    const loginButton2 = ('#login_button');
    await expect(loginPage.page.locator(loginButton2)).toBeVisible();
});



  test('should be taken to the login/landing page after loggin out via "Log Out" in User Dropdown', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    //Given-I am on the Runestone Academy login page and not logged in
    //When-I type valid Username into the Username text field
    //And-I type a valid Password into the Password text field
    //And-I click the "Remember me" checkbox
    //And-I click the "Login" button
    await expect(loginPage.page).toHaveURL('/ns/course/index'); 
    //And-I am logged in to the app
    await loginPage.logout();
    //And-I log out of the app
    //Then-I am logged out of the app
    //await page.pause(100);
    //await expect(loginPage.page).toHaveURL('/ns/course/index');
    const loginButton2 = ('#login_button');
    await expect(loginPage.page.locator(loginButton2)).toBeVisible();
});



test('User can log back in immediately after logging out', async ({ page }) => {
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
  await loginPage.login(testData.validUser.username, testData.validUser.password);
  //await page.pause(1000);
  const userIcon = ('div.nav-item:nth-child(2) > a:nth-child(1) > i:nth-child(1)');
  await expect(loginPage.page.locator(userIcon)).toBeVisible();
});



test('log out option available in User Dropdown for Student', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(testData.validUser.username, testData.validUser.password);
  //Given-I am on the Runestone Academy login page and not logged in
  //When-I type valid Username into the Username text field
  //And-I type a valid Password into the Password text field
  //And-I click the "Login" button
  await expect(loginPage.page).toHaveURL('/ns/course/index');  
   //And-I click on User Icon in top right corner to see action dropdown
  //const userIcon2 = ('div.nav-item:nth-child(2) > a:nth-child(1) > i:nth-child(1)');
await page.locator('div.nav-item:nth-child(2) > a:nth-child(1) > i:nth-child(1)').first().click();
//await page.pause(1000);
const logoutButton = ('a.dropdown-item:nth-child(13)');
await expect(loginPage.page.locator(logoutButton)).toBeVisible();
//await page.locator('a.dropdown-item:nth-child(13)').click();
  //User Logout
});


/*

//TEST BELOW IS NOT FINISHED - cannot find locator for OK popup so cannot click it.
test('after deleting Runestone account, account is permanently deleted', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(testData.validUser.username, testData.validUser.password);
  //Given-I am on the Runestone Academy login page and not logged in with valid student account 2 active
  //When-I type valid Username 2 into the Username text field
  //And-I type a valid Password 2 into the Password text field
  //And-I click the "Login" button
  await expect(loginPage.page).toHaveURL('/ns/course/index');  
   //And-I click on User Icon in top right corner to see action dropdown
  //const userIcon2 = ('div.nav-item:nth-child(2) > a:nth-child(1) > i:nth-child(1)');
await page.locator('div.nav-item:nth-child(2) > a:nth-child(1) > i:nth-child(1)').first().click();
//await page.pause(1000);
//And- I click "Edit Profile" in the User Icon dropdown
await page.locator('a.dropdown-item:nth-child(11)').click();
//const editProfile = ('a.dropdown-item:nth-child(11)'); <delete probably
//And- After being brought to Edit Profile page I click on "Delete" button
await page.locator('#delacct').click();
await page.locator('input.btn:nth-child(2)').click();
//And- After deletion verification pop-up appears, I click "Ok"
//WORKS TO ABOUT HERE
page.on('dialog', dialog => dialog.alert()); // DO I REPLACE "dialog" with "Ok"
await page.getByRole('button').click();    //OR DO I REPLACE 'button' with "oK"

//Then-I should not be able to login again with newly deleted Username 2/Password 2
//await loginPage.login(testData.validUser.username, testData.validUser.password);
//const invalidLogin = ('.flash');
//await expect(loginPage.page.locator(invalidLogin)).toBeVisible();
//OR expect(page.getByText("Ok")); <from video not tried yet
});




/*

// Test below is not finished!!! - popup OK has no locator so need to use code from above to fix
test('after deleting Runestone account, user receives "Invalid login" error pop-up', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(testData.validUser3.username, testData.validUser3.password);
  //Given-I am on the Runestone Academy login page and not logged in with valid student account 3 active
  //When-I type valid Username 3 into the Username text field
  //And-I type a valid Password 3 into the Password text field
  //And-I click the "Login" button
  await expect(loginPage.page).toHaveURL('/ns/course/index');  
   //And-I click on User Icon in top right corner to see action dropdown
  //const userIcon2 = ('div.nav-item:nth-child(2) > a:nth-child(1) > i:nth-child(1)');
await page.locator('div.nav-item:nth-child(2) > a:nth-child(1) > i:nth-child(1)').first().click();
//await page.pause(1000);
//And- I click "Edit Profile" in the User Icon dropdown
await page.locator('a.dropdown-item:nth-child(11)').click();
//const editProfile = ('a.dropdown-item:nth-child(11)'); <delete probably
//And- After being brought to Edit Profile page I click on "Delete" button
await page.locator('input.btn:nth-child(2)').click();
//And- After deletion verification pop-up appears, I click "Ok"
//NEED MISSING CODE HERE FOR MISSING OK ICON

//Then-I should receive "Invalid login" pop-up warming when trying to log back in with student account 3
await loginPage.login(testData.validUser3.username, testData.validUser3.password);
const invalidLogin = ('.flash');
await expect(loginPage.page.locator(invalidLogin)).toBeVisible();
});

*/


});

