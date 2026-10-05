import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { OverviewJava } from "../../pages/TextbookPages/OverviewJava";

//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new OverviewJava(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/ActiveCode/java.html')
});

test.describe('1.13 Java', () => {
    test('Clicking the Save & Run button without changing anything displays output', async ({ page }) => {
        let textbookPage = new OverviewJava(page);
        await page.locator(textbookPage.saveAndRunButton).first().click();
        await textbookPage.waitForActiveCode();
        await expect(page.locator(textbookPage.javaStandardOutput)).toBeVisible({timeout: 60000});
        await expect(page.locator(textbookPage.javaStandardOutput)).toContainText('Enter the temperature in F:');
        await expect(page.locator(textbookPage.javaStandardOutput)).toContainText('100.0 degrees F is: 37.77777777777778 C');
        
    });

    test('Clicking the Save & Run button after changing edit box value displays new result', async ({ page }) => {
        let textbookPage = new OverviewJava(page);
        await page.locator(textbookPage.inputForProgramEditBox).fill('1')
        await page.locator(textbookPage.saveAndRunButton).first().click();
        await textbookPage.waitForActiveCode();
        await expect(page.locator(textbookPage.javaStandardOutput)).toBeVisible({timeout: 60000});
        await expect(page.locator(textbookPage.javaStandardOutput)).toContainText('Enter the temperature in F:');
        await expect(page.locator(textbookPage.javaStandardOutput)).toContainText('1.0 degrees F is: -17.22222222222222 C');
        
    });

    test('Changing code before clicking the Save & Run button displays error output', async ({ page }) => {
        let textbookPage = new OverviewJava(page);
        await textbookPage.changeCodeMirrorLine('         System.exit(0);', 'System');
        await page.locator(textbookPage.saveAndRunButton).first().click();
        await textbookPage.waitForActiveCode();
        await expect(page.locator(textbookPage.javaStandardOutput).first()).toBeVisible();
        await expect(page.locator(textbookPage.javaStandardOutput).first()).toContainText('There were errors compiling your code. See below.');
        await expect(page.locator(textbookPage.javaErrorOutput)).toBeVisible({timeout: 60000});
        await expect(page.locator(textbookPage.javaErrorOutput)).toContainText('2 errors');
        
    });

   /* CodeLens button leads to error so we cannot test this yet.
   test('Clicking show and hide CodeLens', async ({ page }) => {
        let textbookPage = new OverviewJava(page);
        await page.locator('//button[normalize-space(text())="Show CodeLens"]').first().click();
        await expect(page.locator('//iframe[@id="over_ac_example1_codelens"]')).toBeVisible();

        await page.locator('//button[normalize-space(text())="Hide Codelens"]').first().click();
        await expect(page.locator('//iframe[@id="over_ac_example1_codelens"]')).not.toBeVisible();
        
    });*/


});