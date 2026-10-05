import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { OverviewOcataveAndMatlab } from "../../pages/TextbookPages/OverviewOcataveAndMatlab";


//Go to main page, sign up, go to the chapter 1 active code page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`); 
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new OverviewOcataveAndMatlab(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/ActiveCode/octave.html')
});


test.describe('Question 1.17 / octave1', () => {
    test('Clicking the Save & Run button with no change', async ({ page }) => {
        let textbookPage = new OverviewOcataveAndMatlab(page);
        await page.locator(textbookPage.saveAndRunButton).nth(0).click();
        await expect(page.locator(textbookPage.outPutArea)).toBeVisible();
        await expect(page.locator(textbookPage.outPutArea)).toContainText('x = 4');
        await expect(page.locator(textbookPage.outPutArea)).toContainText('4');

});
    test('Save & Run should not show incorrect output', async ({ page }) => {
        let textbookPage = new OverviewOcataveAndMatlab(page);
        await page.locator(textbookPage.saveAndRunButton).first().click();
        let outputLocator = page.locator(textbookPage.outPutArea);
        await expect(outputLocator).toBeVisible({ timeout: 10000 });
        await expect(outputLocator).not.toContainText('x = 5');
        await expect(outputLocator).not.toContainText('5');

    });

});