import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { OverviewJavaScript } from "../../pages/OverviewJavaScript";


//Go to main page, sign up, go to the chapter 1 active code page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`); 
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new OverviewJavaScript(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/ActiveCode/javascript.html')
});


test.describe('Question 1.10 / jstest1', () => {
    test('Clicking the Save & Run button with no change', async ({ page }) => {
        let textbookPage = new OverviewJavaScript(page);
        await page.locator(textbookPage.saveAndRun).nth(0).click();
        await expect(page.locator(textbookPage.outPutArea)).toBeVisible();
        await expect(page.locator(textbookPage.outPutArea)).toContainText('hello world');

      });

    test('should show error or incorrect output when invalid JavaScript is submitted', async ({ page }) => {
        let textbookPage = new OverviewJavaScript(page);
        await page.locator(textbookPage.codeMirrorFirstLine).first().click();
        await page.keyboard.press('Control+A');
        await page.keyboard.press('Backspace');
        await page.keyboard.type('console.log("hello world"');
        await page.locator(textbookPage.saveAndRun).first().click();
        await expect(page.locator(textbookPage.errorAlert)).toBeVisible({ timeout: 10000 });
        await expect(page.locator(textbookPage.errorAlert)).toContainText("Error");
    
    });

     test('Clicking Reformat button', async ({ page }) => {
            let textbookPage = new OverviewJavaScript(page);
            await page.locator(textbookPage.reformatButton).first().click();

           });


     test('Clicking show and hide Source', async ({ page }) => {
            let textbookPage = new OverviewJavaScript(page);
            await page.locator(textbookPage.showSource).nth(0).click();
            await expect(page.locator(textbookPage.sourceBox)).toBeVisible();;
            await page.locator(textbookPage.hideSource).nth(0).click();
            await expect(page.locator(textbookPage.sourceBox)).not.toBeVisible();
    
    
        });

});