import { expect, test } from '@playwright/test';
import { SignUpPage } from '../../pages/signupPage';
import { OverviewUnitTestsForPythonCodePage } from '../../pages/TextbookPages/OverviewUnitTestsForPythonCodePage';

test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await page.goto("/");
    let signUpPage = new SignUpPage(page);
    let textbookPage = new OverviewUnitTestsForPythonCodePage(page);
    await signUpPage.signUpRandomUserForOverview();
    await textbookPage.goToUnitTestsForPythonCodePage();
});

test.describe('Question 5 / units 1', () => {
    test('Clicking the Save & Run without changing anything displays output', async ({ page }) => {
        let textbookPage = new OverviewUnitTestsForPythonCodePage(page);
        await page.locator(textbookPage.saveAndRunButton).nth(5).click();
        console.log('Checking for standard output');
        await expect(page.locator(textbookPage.question5Output)).toBeVisible();
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toBeVisible();
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`Result`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`Actual Value`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`Expected Value`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`Notes`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`Pass`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`Fail`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`4`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`4`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`A feedback string when the test fails`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`4`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`5.0`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`Try adding your parmeters`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsFeedback)).toContainText(`You passed: 50.0% of the tests`);

    });

    test('Clicking the Save & Run with changing text in the print line', async ({ page }) => {
        let textbookPage = new OverviewUnitTestsForPythonCodePage(page);
        await textbookPage.changeCodeMirrorLine(
            `self.assertEqual(add(2,2),4,"A feedback string when the test fails")`,
            `self.assertEqual(add(2,2),4,"A [redacted] string when the test fails")`
        );
        await page.locator(textbookPage.saveAndRunButton).nth(5).click();
        await expect(page.locator(textbookPage.question5Output)).toBeVisible();
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toBeVisible();
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`Result`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`Actual Value`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`Expected Value`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`Notes`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`Pass`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`Fail`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`4`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`4`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`A [redacted] string when the test fails`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`Try adding your parmeters`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`5.0`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsFeedback)).toContainText(`You passed: 50.0% of the tests`);
    });

    test('clicking the Show Source Code button', async ({ page }) => {
        let textbookPage = new OverviewUnitTestsForPythonCodePage(page);
        await page.locator(textbookPage.saveAndRunButton).nth(5).click();
        await page.locator(textbookPage.question5ShowSourceCodeButton).click();
        await expect(page.locator(textbookPage.question5SourceCode)).toBeVisible();
        await expect(page.locator(textbookPage.question5SourceCode)).toContainText(`.. activecode:: units1`);
        await expect(page.locator(textbookPage.question5SourceCode)).toContainText(`:nocodelens:`);
        await expect(page.locator(textbookPage.question5SourceCode)).toContainText(`

  def add(a,b):
     return 4

  from unittest.gui import TestCaseGui

  class myTests(TestCaseGui):

      def testOne(self):
          self.assertEqual(add(2,2),4,"A feedback string when the test fails")
          self.assertAlmostEqual(add(2.0,3.0), 5.0, 1, "Try adding your parmeters")

  myTests().main()`);
        await expect(page.locator(textbookPage.question5HideSourceCodeButton)).toBeVisible();
    });

    test('clicking the Hide Source Code button', async ({ page }) => {
        let textbookPage = new OverviewUnitTestsForPythonCodePage(page);
        await page.locator(textbookPage.saveAndRunButton).nth(5).click();
        await expect(page.locator(textbookPage.question5ShowSourceCodeButton)).toBeVisible();
        await page.locator(textbookPage.question5ShowSourceCodeButton).click();
        await expect(page.locator(textbookPage.question5SourceCode)).toBeVisible();
        await expect(page.locator(textbookPage.question5HideSourceCodeButton)).toBeVisible();
        await page.locator(textbookPage.question5HideSourceCodeButton).click();
        await expect(page.locator(textbookPage.question5SourceCode)).toBeHidden();
        await expect(page.locator(textbookPage.question5ShowSourceCodeButton)).toBeVisible(); 
    });

    test('Slider changes code back to initial state and goes back to current state', async ({ page }) => {
            let textbookPage = new OverviewUnitTestsForPythonCodePage(page);
        
        await textbookPage.changeCodeMirrorLine(
            `self.assertEqual(add(2,2),4,"A feedback string when the test fails")`,
            `self.assertEqual(add(2,2),4,"A [redacted] string when the test fails")`
        );
        await page.locator(textbookPage.saveAndRunButton).nth(5).click();

        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toBeVisible();
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`4`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`4`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`A [redacted] string when the test fails`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`5.0`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsFeedback)).toContainText(`You passed: 50.0% of the tests`);
        
        await textbookPage.changeCodeMirrorLine(
            `self.assertAlmostEqual(add(2.0,3.0), 5.0, 1, "Try adding your parmeters")`,
            `self.assertAlmostEqual(add(2.0,3.0), 5.0, 1, "Try adding your parameters")`
        );
        await page.locator(textbookPage.saveAndRunButton).nth(5).click();
        
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toBeVisible();
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`4`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`4`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`A [redacted] string when the test fails`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`4`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`5.0`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toContainText(`Try adding your parameters`);
        await expect(page.locator(textbookPage.question5UnitTestsResultsFeedback)).toContainText(`You passed: 50.0% of the tests`);

        await textbookPage.dragSlider(page, textbookPage.question5SliderHandle, textbookPage.question5SliderTrack, 100, 50);
        await expect(page.locator(textbookPage.question5CodeMirrorLine)).toContainText('self.assertEqual(add(2,2),4,"A [redacted] string when the test fails');

        await textbookPage.dragSlider(page, textbookPage.question5SliderHandle, textbookPage.question5SliderTrack, 50, 0);
        await expect(page.locator(textbookPage.question5CodeMirrorLine)).toContainText('self.assertEqual(add(2,2),4,"A feedback string when the test fails');

        await textbookPage.dragSlider(page, textbookPage.question5SliderHandle, textbookPage.question5SliderTrack, 0, 50);
        await expect(page.locator(textbookPage.question5CodeMirrorLine)).toContainText('self.assertEqual(add(2,2),4,"A [redacted] string when the test fails');

        await textbookPage.dragSlider(page, textbookPage.question5SliderHandle, textbookPage.question5SliderTrack, 50, 100);
        await expect(page.locator(textbookPage.question5CodeMirrorLine)).toContainText('self.assertAlmostEqual(add(2.0,3.0), 5.0, 1, "Try adding your parameters")');

    });

    test('When Codemirror div contains incorrect syntax, clicking Save & Run displays error output, Code Coach output and standard output', async ({ page }) => {
            let textbookPage = new OverviewUnitTestsForPythonCodePage(page);
            await textbookPage.changeCodeMirrorLine(
                `myTests().main()`,
                `myTests().main(` // missing closing parenthesis
            );
            await page.locator(textbookPage.saveAndRunButton).nth(5).click();
            console.log('Checking for error output');
            await expect(page.locator(textbookPage.question5CodeCoach)).toBeVisible();
            await expect(page.locator(textbookPage.question5Output)).toBeEmpty();
            await expect(page.locator(textbookPage.question5ErrorAlert)).toBeVisible();
            await expect(page.locator(textbookPage.question5ErrorAlert)).toContainText(`An error occurred after the end of your code.`);
            await expect(page.locator(textbookPage.question5UnitTestsResultsTable)).toBeHidden();
        });
}
); 