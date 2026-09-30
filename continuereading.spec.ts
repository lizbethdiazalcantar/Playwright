import { Page } from '@playwright/test';
import { Locator, expect } from '@playwright/test';
import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { testData } from '../utils/testData';


test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await page.goto('http://ec2-18-209-57-71.compute-1.amazonaws.com');

});

test.describe('Continue Reading', () => {
    test('Continue Reading should validate last page viewed ', async ({ page }) => {
 


        // Login
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
        await loginPage.login(testData.studentRickybobby24.username, testData.studentRickybobby24.password);

        // Navigate to Course Home
        await page.goto('/ns/course/index');
       
       // Select a chapter 1.1 ActiveCode Examples in Python
        await page.getByText('Runestone Interactive Overview').click();
        await page.waitForLoadState('domcontentloaded');
        await page.getByText('1.1. ActiveCode Examples in Python').click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL('/ns/books/published/overview/ActiveCode/python.html');
        
      
        // Select User dropdown and click course home
        await page.locator('#navbar > div > div.navbar-collapse.collapse.navbar-ex1-collapse > ul.nav.navbar-nav.navbar-right > li:nth-child(7) > a').click();
        await page.locator('#navbar > div > div.navbar-collapse.collapse.navbar-ex1-collapse > ul.nav.navbar-nav.navbar-right > li.dropdown.open > ul > li:nth-child(3) > a').click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL('/ns/course/index');

        // When on the course home page click Runestone Interactive Overview Textbook
        await page.getByText('Runestone Interactive Overview').click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL('/ns/books/published/overview/index.html');

        // Popup continue reading with the Text with of last page viewed should be displayed
        const popup = page.locator('#continue-reading'); // Replace with the actual popup selector
        await popup.waitFor({ state: 'visible' });

        // Validate the text in the popup
        const popupText = popup.locator('#jump-to-chapter'); 
        await expect(popupText).toHaveText('You were Last Reading: 1. ActiveCode Languages > 1.1 ActiveCode Examples in Python Continue Reading');

        // Click the "Continue Reading" button
        await page.locator('#jump-to-chapter > a').click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL('/ns/books/published/overview/ActiveCode/python.html?lastPosition=0');




    });
});