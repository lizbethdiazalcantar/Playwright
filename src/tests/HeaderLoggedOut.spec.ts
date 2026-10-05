import { test, expect } from '@playwright/test';
import { HeaderLoggedOutPage } from '../pages/HeaderLoggedOutPage'; // Adjust the import path as needed
import type { Page } from '@playwright/test'; // Added import for Page type

test.describe('Runestone Academy Navigation Tests (Logged Out)', () => {
  let navigationPage: HeaderLoggedOutPage;

  test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    navigationPage = new HeaderLoggedOutPage(page); // Updated to use the new class
    await navigationPage.navigate();
    console.log('Navigated to the home page');
  });

  test('should stay on the homepage when clicking the logo', async ({ page }) => {
    console.log('Test: should stay on the homepage when clicking the logo');
    await navigationPage.clickLogo();
    console.log('Clicked the logo');
    await expect(navigationPage.pageInstance).toHaveURL('/user/login', { timeout: 10000 });
    console.log('Verified the URL redirects to the login page');
  });

  test('should navigate to the Our Library page', async ({ page }) => {
    console.log('Test: should navigate to the Our Library page');
    await navigationPage.clickLibraryLink();
    console.log('Clicked the Our Library link');
    await expect(navigationPage.pageInstance).toHaveURL('/ns/books/index');
    console.log('Verified the URL is the Our Library page');

    // Add check for the Runestone Academy Library header
    const libraryHeader = page.getByText('Runestone Academy Library of Books');
    await libraryHeader.waitFor(); // Ensure the element is present before interacting
    expect(await libraryHeader.isVisible()).toBe(true); // Check if the element is visible
    console.log('Verified the Runestone Academy Library header is visible');
  });

  /* This test runs into Cloudflare and fails so it is commented out.
  test('should navigate to the Runestone News page', async ({ page }) => { 
    console.log('Test: should navigate to the Runestone News page'); 
    await navigationPage.clickNewsLink(); 
    console.log('Clicked the Runestone News link'); 
    await expect(navigationPage.pageInstance).toHaveURL('https://blog.runestone.academy'); 
    console.log('Verified the URL is the Runestone News page');

    // Add a delay to ensure the page has fully loaded
    await page.waitForTimeout(5000); 

    // Take a screenshot for debugging purposes
    await page.screenshot({ path: 'screenshot.png', fullPage: true });

    // Print the page content for debugging purposes
    console.log(await page.content());

    // Add check for the "Democratizing textbooks for the 21st century" heading 
    const newsHeader = page.locator('h2:has-text("Democratizing textbooks for the 21st century")');
    await newsHeader.waitFor(); // Ensure the element is present before interacting 
    expect(await newsHeader.isVisible()).toBe(true); // Check if the element is visible 
    console.log('Verified the "Democratizing textbooks for the 21st century" heading is visible');
  }); */

  test('should navigate to the Sign Up page', async ({ page }) => {
    console.log('Test: should navigate to the Sign Up page');
    await navigationPage.clickSignupLink();
    console.log('Clicked the Sign Up link');
    await expect(navigationPage.pageInstance).toHaveURL('/runestone/default/user/register');
    console.log('Verified the URL is the Sign Up page');

    // Add check for the "Runestone Registration" heading
    const registrationHeader = page.getByText('Runestone Registration');
    await registrationHeader.waitFor(); // Ensure the element is present before interacting
    expect(await registrationHeader.isVisible()).toBe(true); // Check if the element is visible
    console.log('Verified the "Runestone Registration" heading is visible');
  });

  // Not logged in user icon drop down container must open first
  test('should navigate to the Register page under Not Logged In Icon', async ({ page }) => {
    console.log('Test: should navigate to the Register page under Not Logged In Icon');
    await navigationPage.clickRegisterLink();
    console.log('Verified the URL is the Register page');

    // Add check for the "Runestone Registration" heading
    const registrationHeader = page.getByText('Runestone Registration');
    await registrationHeader.waitFor(); // Ensure the element is present before interacting
    expect(await registrationHeader.isVisible()).toBe(true); // Check if the element is visible
    console.log('Verified the "Runestone Registration" heading is visible');
  });

  test('should verify the "Our Mission" heading and interact with the login form on the login page', async ({ page }) => {
    console.log('Test: should verify the "Our Mission" heading and interact with the login form on the login page');
    await page.goto('/user/login'); 
    console.log('Navigated to the login page');

    // Ensure the URL is correct
    await expect(page).toHaveURL('/user/login');
    console.log('Verified the URL is the login page');

    // Verify the "Our Mission" heading is present and visible
    const missionHeading = page.getByText('Our Mission', { exact: true });
    await missionHeading.waitFor(); // Ensure the element is present before interacting
    expect(await missionHeading.isVisible()).toBe(true); // Check if the element is visible
    console.log('Verified the "Our Mission" heading is visible');

    // Target the correct "Login" button by its ID
    const loginButton = page.locator('button#login_button'); // Using ID for specificity
    await loginButton.waitFor(); // Ensure the element is present before interacting
    expect(await loginButton.isVisible()).toBe(true); // Check if the element is visible
    await loginButton.click(); // Perform the click action
    console.log('Clicked the correct Login button');
  });
   // skipped test,incomplete
  /*test.skip('should verify the "FAQ" link is visible on the FAQ page', async ({ page }) => {

    // Ensure the URL is correct
    await expect(page).toHaveURL('http://ec2-18-209-57-71.compute-1.amazonaws.com/user/login');
    console.log('Verified the URL is the login page');

    // Verify the "Our Mission" heading is present and visible
    const missionHeading = page.getByText('Our Mission', { exact: true });
    await missionHeading.waitFor(); // Ensure the element is present before interacting
    expect(await missionHeading.isVisible()).toBe(true); // Check if the element is visible
    console.log('Verified the "Our Mission" heading is visible');

    // Target the correct "Login" button by its ID
    const loginButton = page.locator('button#login_button'); // Using ID for specificity
    await loginButton.waitFor(); // Ensure the element is present before interacting
    expect(await loginButton.isVisible()).toBe(true); // Check if the element is visible
    await loginButton.click(); // Perform the click action
    console.log('Clicked the correct Login button');
  });*/

  /* This test also fails when it runs into Cloudflare and is commented out.
  test('should verify the "FAQ" link is visible on the FAQ page', async ({ page }) => {
    console.log('Test: should verify the "FAQ" link is visible on the FAQ page');
    await page.goto('https://blog.runestone.academy/pages/faq.html'); 
    console.log('Navigated to the FAQ page');

    // Ensure the URL is correct
    await expect(page).toHaveURL('https://blog.runestone.academy/pages/faq.html');
    console.log('Verified the URL is the FAQ page');

    await page.waitForLoadState('domcontentloaded');
    console.log('DOMContentLoaded is dispatched');

    // Verify the "FAQ" link is present and visible
    const faqLink = page.getByText('FAQ', { exact: true });
    expect(await faqLink.isVisible()).toBe(true); // Check if the element is visible
    console.log('Verified the "FAQ" link is visible');

    // Take a screenshot for debugging purposes
    await page.screenshot({ path: 'faq-page.png', fullPage: true });
    console.log('Screenshot taken and saved as faq-page.png');

  }); */
   // could not get this test to pass
  /*test.skip('should navigate to the Instructors Guide page and take a screenshot', async ({ page }) => {
  });

  /*test('should navigate to the Instructors Guide page and take a screenshot', async ({ page }) => {
    try {
        console.log('Test: should navigate to the Instructors Guide page');

        // Wait for a new page to be opened when the link is clicked (use "page" for new tabs)
        const [newPage] = await Promise.all([
            navigationPage.pageInstance.context().waitForEvent('page'), 
            navigationPage.clickInstructorsGuideLink() 
        ]);

        // Type the newPage variable as a Page object
        const newPageInstance = newPage as Page;

        // Switch to the new page context and wait for a stable state
        await newPageInstance.waitForLoadState('networkidle'); // or 'domcontentloaded'

        // Assert the URL on the new page
        await expect(newPageInstance).toHaveURL('https://guide.runestone.academy/InstructorGuide-3.html', { timeout: 15000 }); 
        console.log('Clicked the Instructors Guide link and verified the redirected URL');

        // Take a screenshot of the new page
        await newPageInstance.screenshot({ path: 'instructors-guide-page.png', fullPage: true });
        console.log('Screenshot taken and saved as instructors-guide-page.png');
        
    } catch (error) {
        console.error('Error during navigation:', error);
        throw error; // Re-throw the error to fail the test
    }
  });*/

  test('should navigate to the Report A Problem page and verify the h1 text', async ({ page }) => {
    console.log('Test: should navigate to the Report A Problem page');
    await navigationPage.clickReportAProblemLink();
    console.log('Clicked the Report A Problem link');

    // Ensure the URL is correct
    await expect(navigationPage.pageInstance).toHaveURL('/runestone/default/reportabug', { timeout: 10000 });
    console.log('Verified the URL is the Report A Problem page');

    // Verify the visible h1 text "Report a Bug" is present and visible
    const visibleText = page.getByText('Report a Bug', { exact: true });
    await visibleText.waitFor({ state: 'visible' }); // Ensure the element is present before interacting
    expect(await visibleText.isVisible()).toBe(true); // Check if the element is visible
    console.log('Verified the visible h1 text "Report a Bug" is correct and visible');
  });

});