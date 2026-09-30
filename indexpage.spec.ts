import { Page } from '@playwright/test';
import { Locator, expect } from '@playwright/test';
import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { testData } from '../utils/testData';


test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await page.goto('http://ec2-18-209-57-71.compute-1.amazonaws.com');

});

test.describe('Index Page', () => {
    test('Validate Book Index Page navigates to correct page that is selected', async ({ page }) => {
 


        // Login
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
        await loginPage.login(testData.studentRickybobby24.username, testData.studentRickybobby24.password);

        // Navigate to Course Home
        await page.goto('/ns/course/index');

        // Select Runestone Interactive Overview Course
        await page.getByText('Runestone Interactive Overview').click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL('/ns/books/published/overview/index.html');

        // Navigate to the index page by clicking the Search tab and selecting "Book Index"
        await page.locator('#navbar > div > div.navbar-collapse.collapse.navbar-ex1-collapse > ul.nav.navbar-nav.navbar-right > li:nth-child(5) > a').click();
        await page.locator('#navbar > div > div.navbar-collapse.collapse.navbar-ex1-collapse > ul.nav.navbar-nav.navbar-right > li.dropdown.open > ul > li:nth-child(2) > a').click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL('/ns/books/published/overview/genindex.html');
        
        // Once on the Index page, select a topic/reference and navigate to that page
        // await page.locator('#main-content > table:nth-child(11) > tbody > tr > td > ul > li > a').click();
        await page.getByText('GeolocationSensor (class in cellbotics)').click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL('/ns/books/published/overview/CellBotics/reference_manual.html#cellbotics.GeolocationSensor');
       
        
    });
});