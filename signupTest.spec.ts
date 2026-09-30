import { SignUpPage } from '../pages/signupPage';
import {test,expect } from '@playwright/test';
import { User } from '../data/user';

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  const signUpPage = new SignUpPage(page);
  await signUpPage.navigateToSignupPage();


});


test.describe('Signup Tests', () => {

test('Student account should be created if all valid information input on "Runestone Registration" page', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  let user = new User;
  user = user.getRandomUserWithName("David", "Saul");
  await signUpPage.completeSignUpForm(user);
  await page.locator('a.btn').click();
  await expect(page).toHaveURL('/ns/course/index'); 
});

//MUST RESET INPUT BEFORE EACH TESTING
test('User should be taken to the "Create a Course" page aafter the donations page', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  let user = new User;
  user = user.getRandomUserWithName("Gavin", "Lansing");
  user.createCourseOnSignup = true;
  await signUpPage.completeSignUpForm(user);
  await page.getByText('Sorry, not Today').click();
  await expect(page).toHaveURL('/designer');
});

/* Test needs to account for dialog box
test('Student Account should not created and user receives error message if correct info. input but "Accept" box not selected', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  //Given-I am on the Runestone Academy login page and not logged in
  //When-I click on the "Runestone Registration" button
  //And- I should be taken to the "Runestone Registration" page
  await page.locator('a.btn-primary:nth-child(3)').first().click();
  //And - I put valid information into the "Username" text entry field
  await page.locator('#auth_user_username').fill('Student15');
  //And - put valid information into the "First Name" text entry field
  await page.locator('#auth_user_first_name').fill('Student15');
  //And - I put valid information into the "Last Name" text entry field
  await page.locator('#auth_user_last_name').fill('Student15');
  //And - I put valid information into the "Email" text entry field
  await page.locator('#auth_user_email').fill('Student15@gmail.com');
  //And - I put valid information into the "Password" text entry field
  await page.locator('#auth_user_password').fill('Student15');
  //And - I put valid information into the "Confirm Password" text entry field
  await page.locator('#auth_user_password_two').fill('Student15');
  //And - I put valid information into the "Course Name" text entry field
  await page.locator('#auth_user_course_id').fill('overview');
  //But - I DO NOT click the "I agree" policy checkbox
  //And - I click the "Sign Up" button
  await page.locator('.btn').click();
  //Then - I should receive and error message stating "You must accept our privacy policy to register."
  await expect(page.getByText("OK"));
});*/

test('Account should not be created if User enters existing username', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  let user = new User;
  user = user.getRandomUserWithName("Gavin", "Lansing");
  user.username = 'Student6'
  await signUpPage.completeSignUpForm(user);
  await page.getByText('username:  Value already in database or empty').scrollIntoViewIfNeeded();
  await expect(page.getByText('username:  Value already in database or empty')).toBeVisible();

});

test('Account should not be created if User enters existing email address', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  let user = new User;
  user = user.getRandomUserWithName("Gavin", "Lansing");
  user.email = 'gavinlansing@tripleten.com'
  await signUpPage.completeSignUpForm(user);
  await page.getByText('email: Value already in database or empty').scrollIntoViewIfNeeded();
  await expect(page.getByText('email: Value already in database or empty')).toBeVisible();

});

test('Account is not created and user receives error message if username is empty', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  let user = new User;
  user = user.getRandomUserWithName("Gavin", "Lansing");
  user.username = ''
  await signUpPage.completeSignUpForm(user);
  await page.getByText('username:  Value already in database or empty').scrollIntoViewIfNeeded();
  await expect(page.getByText('username:  Value already in database or empty')).toBeVisible();
});


test('Account is not created and user receives error message if First Name is empty', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  let user = new User;
  user = user.getRandomUserWithName("Dietrich", "Schulz");
  user.firstName = ''
  await signUpPage.completeSignUpForm(user);  
  await page.getByText('first_name: Cannot be empty').scrollIntoViewIfNeeded();
  await expect(page.getByText('first_name: Cannot be empty')).toBeVisible();
});


test('Account is not created and user receives error message if Last Name is empty', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  let user = new User;
  user = user.getRandomUserWithName("Dietrich", "Schulz");
  user.lastName = ''  
  await signUpPage.completeSignUpForm(user);  
  await page.getByText('last_name: Cannot be empty').scrollIntoViewIfNeeded();
  await expect(page.getByText('last_name: Cannot be empty')).toBeVisible();
});


test('Account is not created and user receives error message if Email is only @tripleten.com', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  let user = new User;
  user = user.getRandomUserWithName("Dietrich", "Schulz");
  user.email = '@tripleten.com'  
  await signUpPage.completeSignUpForm(user);  
  await page.getByText('email: Invalid email').scrollIntoViewIfNeeded();
  await expect(page.getByText('email: Invalid email')).toBeVisible();
});


test('Account is not created and user receives error message if Password is empty', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  let user = new User;
  user = user.getRandomUserWithName("Jaden", "Croft");
  user.password = ''
  await signUpPage.completeSignUpForm(user);  
  await page.getByText('password: Too short').scrollIntoViewIfNeeded();
  await expect(page.getByText('password: Too short')).toBeVisible();
});


test('Account is not created and user receives error message if "Password" and "Confirm Password" do not match', async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  let user = new User;
  user = user.getRandomUserWithName("Jaden", "Croft");
  user.password = 'password321'
  await signUpPage.completeSignUpForm(user);  
  await page.getByText('password_two: Password fields don\'t match').scrollIntoViewIfNeeded();
  await expect(page.getByText('password_two: Password fields don\'t match')).toBeVisible();
});


test('Account is not created and user receives error message if Confirm Password is empty',  async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  let user = new User;
  user = user.getRandomUserWithName("Louis", "Haymaker");
  user.confirmPassword = ''
  await signUpPage.completeSignUpForm(user);
  await page.getByText('password_two: Password fields don\'t match').scrollIntoViewIfNeeded();
  await expect(page.getByText('password_two: Password fields don\'t match')).toBeVisible();
});

});