import { test, expect } from "@playwright/test";
import { SignUpPage } from "../pages/signupPage";
import { OverviewActiveCodeExampleInPython } from "../pages/TextbookPages/OverviewActiveCodeExamplesInPython";

//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new OverviewActiveCodeExampleInPython(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/ActiveCode/python.html')
});

test.describe('Question 1 / over_ac_example1', () => {
    test('Clicking the Save & Run button without changing anything displays output', async ({ page }) => {
        let textbookPage = new OverviewActiveCodeExampleInPython(page);
        await page.locator('//button[normalize-space(text())="Save & Run"]').first().click();
        await expect(page.locator('#over_ac_example1_stdout')).toBeVisible();
        await expect(page.locator('#over_ac_example1_stdout')).toContainText('My first program adds a list of numbers');
        await expect(page.locator('#over_ac_example1_stdout')).toContainText('30');
        
    });
    test('Clicking show and hide CodeLens', async ({ page }) => {
        let textbookPage = new OverviewActiveCodeExampleInPython(page);
        await page.locator('//button[normalize-space(text())="Show CodeLens"]').first().click();
        await expect(page.locator('//iframe[@id="over_ac_example1_codelens"]')).toBeVisible();

        await page.locator('//button[normalize-space(text())="Hide Codelens"]').first().click();
        await expect(page.locator('//iframe[@id="over_ac_example1_codelens"]')).not.toBeVisible();
        
    });

    test('Changing text in the print line', async ({page}) => {
        let textbookPage = new OverviewActiveCodeExampleInPython(page);

        await textbookPage.changeCodeMirrorLine(
            `print("My first program adds a list of numbers")`,
            `print("My first program multiplies a list of numbers")`
        );
        await textbookPage.changeCodeMirrorLine(
            `myList = [2, 4, 6, 8, 10]`,
            `myList = [2, 4, 6, 8, 10, 12]`
        );

        await textbookPage.changeCodeMirrorLine(
            `total = 0`,
            `total = 1`
        );

        await textbookPage.changeCodeMirrorLine(
            `total = total + num`,
            `total = total * num`
        );

        await page.locator('//button[normalize-space(text())="Save & Run"]').first().click();
        
        await expect(page.locator('#over_ac_example1_stdout')).toBeVisible();
        await expect(page.locator('#over_ac_example1_stdout')).toContainText('My first program multiplies a list of numbers');
        await expect(page.locator('#over_ac_example1_stdout')).toContainText('46080');

    });

      test('A syntax error displays error information', async ({page}) => {
        let textbookPage = new OverviewActiveCodeExampleInPython(page);

        await textbookPage.changeCodeMirrorLine(
            `for num in myList`,
            `for num inn myList`
        );

        await page.locator('//button[normalize-space(text())="Save & Run"]').first().click();
        
        await expect(page.locator('#over_ac_example1_errinfo')).toBeVisible();
        await expect(page.locator('#over_ac_example1_errinfo')).toContainText('SyntaxError: bad input on line 4');
        await expect(page.locator('#over_ac_example1_errinfo')).toContainText('This message indicates that Python can')
        await expect(page.locator('#over_ac_example1_errinfo')).toContainText('t figure out the syntax of a particular statement. Some examples are assigning to a literal, or a function call');

    });

});