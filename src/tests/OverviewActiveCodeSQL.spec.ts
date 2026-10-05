import { test, expect } from "@playwright/test";
import { SignUpPage } from "../pages/signupPage";
import { OverviewActiveCodeSQL } from "../pages/OverviewActiveCodeSQL";


//Go to main page, sign up, go to the chapter 1 active code page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`); 
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new OverviewActiveCodeSQL(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/ActiveCode/sql.html')
});

// The timeouts in the steps which wait for the "Loading DB...." message to disappear are set
// high as on some slower connections, this can take a long time indeed.  And these tests
// can still be flaky or fail sometimes due to the wait still not being long enough.

test.describe('Question 1.12 / sql1', () => {
    test('Clicking the Save & Run button with no change', async ({ page }) => {
        let textbookPage = new OverviewActiveCodeSQL(page);
        await page.locator(textbookPage.saveAndRun).nth(0).waitFor({ state: 'hidden' });
        await page.getByText(textbookPage.loadingDBText).waitFor({ state: 'visible', timeout:180000 });
        await page.getByText(textbookPage.loadingDBText).waitFor({ state: 'detached',timeout:180000 });
        await page.locator(textbookPage.saveAndRun).nth(0).waitFor({ state: 'visible' });
        await page.locator(textbookPage.saveAndRun).nth(0).click();
        let outputLocator = page.locator(textbookPage.outPutArea);
        await expect(outputLocator).toBeVisible();
        let output = await outputLocator.textContent();
        expect(output).toContain('Pass: W00554 == W00554');
        expect(output).toContain('You passed 3 out of 3 tests for 100%');
        await expect(page.locator(textbookPage.sqlResultOut)).toContainText('4 rows returned.');

      });


    test('should show failed test results when invalid SQL logic is submitted', async ({ page }) => {
        let textbookPage = new OverviewActiveCodeSQL(page);
        await page.locator(textbookPage.saveAndRun).nth(0).waitFor({ state: 'hidden' });
        await page.getByText(textbookPage.loadingDBText).waitFor({ state: 'visible', timeout: 180000 });
        await page.getByText(textbookPage.loadingDBText).waitFor({ state: 'detached', timeout: 180000 });
        await page.locator(textbookPage.saveAndRun).nth(0).waitFor({ state: 'visible' });
        await page.locator(textbookPage.codeMirrorFirstLine).first().click();
        await page.keyboard.press('Control+A');
        await page.keyboard.press('Backspace');
        await page.keyboard.type('SELECT id FROM bikes WHERE duration > 1000000;');
        await page.locator(textbookPage.saveAndRun).nth(0).click();
        let outputLocator = page.locator(textbookPage.outPutArea);
        await expect(outputLocator).toBeVisible({ timeout: 10000 });
        let output = await outputLocator.textContent();
        expect(output).toContain('You passed 0 out of 3 tests for 0%');
        expect(output).toContain('Failed Not enough data to check');
        expect(output).not.toContain('You passed 3 out of 3 tests for 100%');
        expect(output).not.toContain('Pass: W00554 == W00554');
        await expect(page.locator(textbookPage.sqlResultOut)).not.toContainText('4 rows returned.');
        

    });

    test('Clicking show and hide Source', async ({ page }) => {
            let textbookPage = new OverviewActiveCodeSQL(page);
            await page.locator(textbookPage.showSource).nth(0).click();
            await expect(page.locator(textbookPage.sourceBox)).toBeVisible();;
            await page.locator(textbookPage.hideSource).nth(0).click();
            await expect(page.locator(textbookPage.sourceBox)).not.toBeVisible();
    
    
        });


});