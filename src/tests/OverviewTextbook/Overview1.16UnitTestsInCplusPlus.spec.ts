import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { OverviewUnitTestsInCplusPlus } from "../../pages/TextbookPages/OverviewUnitTestsInCplusPlus";

//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new OverviewUnitTestsInCplusPlus(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/ActiveCode/clangs.html?lastPosition=0')
});

test.describe('Question 1.16: cpp_units', () => {

    test('Clicking the Save & Run button with no change', async ({ page }) => {
        let textbookPage = await new OverviewUnitTestsInCplusPlus(page);
        await page.locator(textbookPage.saveAndRunButton).nth(2).click();
        await page.locator('text=Compiling and Running your Code Now...').waitFor({ state: 'detached', timeout: 180000 });
        await expect(page.locator(textbookPage.outPutArea)).toBeVisible();
        await expect(page.locator(textbookPage.outPutArea)).toContainText("test.cpp.exe is a Catch v2.13.8 host application.");
        await expect(page.locator(textbookPage.outPutArea)).toContainText("0 == 1");
        await expect(page.locator(textbookPage.outPutArea)).toContainText("1 failed");

    });

    test('Negative: Should display error message when incorrect code is submitted', async ({ page }) => {
        let textbookPage = new OverviewUnitTestsInCplusPlus(page);
        await page.locator(textbookPage.codeMirrorFirstLine).nth(2).click();
        await page.keyboard.press('Control+A');
        await page.keyboard.press('Backspace');
        await page.keyboard.type('print(Hello');
        await page.locator(textbookPage.saveAndRunButton).nth(2).click();
        await page.locator('text=Compiling and Running your Code Now...').waitFor({ state: 'detached', timeout: 180000 });
        let outputLocator = page.locator(textbookPage.outPutArea);
        await expect(outputLocator).toBeVisible({ timeout: 10000 });
        let count = await page.locator(textbookPage.errorAlert).count();
        console.log("Error alert found:", count > 0);
        
        

        

    });

    /* This test commented out as the Code Lens visualizer fails to load for this question
    test("Clicking show and hide CodeLens", async ({ page }) => {
        let textbookPage = new OverviewUnitTestsInCplusPlus(page);
        await page.locator(textbookPage.showCodeLens).nth(1).click();
        await expect(page.locator(textbookPage.hideCodeLens).nth(1)).toBeVisible();
        await page.locator(textbookPage.hideCodeLens).nth(1).click();
        await expect(page.locator(textbookPage.hideCodeLens).nth(1)).not.toBeVisible();
       

      });*/

      test('Clicking show and hide Source', async ({ page }) => {
          let textbookPage = new OverviewUnitTestsInCplusPlus(page);
          await page.locator(textbookPage.showSource).nth(0).click();
          await expect(page.locator(textbookPage.sourceBox)).toBeVisible();;
          await page.locator(textbookPage.hideSource).nth(0).click();
          await page.waitForTimeout(5000);
          await expect(page.locator(textbookPage.sourceBox)).not.toBeVisible();
        });


      /* This test incomplete
      test('Clicking Reformat button', async ({ page }) => {
          let textbookPage = new OverviewUnitTestsInCplusPlus(page);
          await page.locator(textbookPage.reformatButton).first().click();
      
                 });*/


});