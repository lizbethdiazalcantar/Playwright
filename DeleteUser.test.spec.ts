import { SignUpPage } from '../pages/signupPage';
import { LoginPage } from '../pages/loginPage';
import { UserProfilePage } from '../pages/UserProfilePage';
import {test,expect } from '@playwright/test';
import { User } from '../data/user';

test.describe('Delete User Test', () => {

    test('Clicking the delete button should delete the user account', async ({ page }) => {
      // Step 1: Gerate a random user
      let user = new User;
      user = user.getRandomUserWithName("July", "Summer");
      
      // Step 2: Go to the sign up page
      const signupPage = new SignUpPage(page);
      await signupPage.navigateToSignupPage();
      
      // Step 3: Fill out the sign up form and click the sign up button
      await signupPage.completeSignUpForm(user);
      
      // Step 4: Go to the user profile page
      await page.goto('/runestone/default/user/profile'); // the profile form is prepopulated

      // Step 5: Delete the user
      const userProfilePage = new UserProfilePage(page);
      await userProfilePage.deleteUser(); // click the delete user button

      // Step 6: Confirm the user is deleted and the invalid login message is shown
      const loginPage = new LoginPage(page);
      await loginPage.performLogin(user.username, user.password); // login as the deleted user
      const invalidLoginText = await loginPage.getErrorMessage(); // confirm the message matches 'Invalid login'
      console.log(invalidLoginText);
      expect(invalidLoginText).toContain('Invalid login');
    });

});