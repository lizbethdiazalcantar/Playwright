import { Page } from '@playwright/test';
import { Locator, expect } from '@playwright/test';
import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { testData } from '../utils/testData';


test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await page.goto('http://ec2-18-209-57-71.compute-1.amazonaws.com');
    //await page.goto('http://ec2-18-209-57-71.compute-1.amazonaws.com/user/login');
});

test.describe('Previous and Next buttons', () => {
    test('should navigate to previous and next pages', async ({ page }) => {
 

        // Login
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLogin();
        await loginPage.login(testData.studentRickybobby24.username, testData.studentRickybobby24.password);


       
       // Select Active Calculus Course and validate next button
        await page.getByText('Runestone Interactive Overview').click();
        await page.waitForLoadState('domcontentloaded');

        await page.getByText('1.1. ActiveCode Examples in Python').click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL('/ns/books/published/overview/ActiveCode/python.html');
        await page.locator('ul.nextprev-list > li:nth-child(2)').click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page.getByText('1.9. Audio Tours')).toBeVisible();
        await expect(page).toHaveURL('/ns/books/published/overview/ActiveCode/audiotours.html');

         // validate previous button
        await page.locator('ul.nextprev-list > li:nth-child(1)').click();
        await page.waitForLoadState('domcontentloaded');
        await expect(page.getByText('1.1. ActiveCode Examples in Python')).toBeVisible();
        await expect(page).toHaveURL('/ns/books/published/overview/ActiveCode/python.html');


        


    });
});
