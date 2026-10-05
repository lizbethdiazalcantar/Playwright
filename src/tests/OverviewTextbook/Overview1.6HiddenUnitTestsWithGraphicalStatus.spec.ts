import { expect, test } from '@playwright/test';
import { SignUpPage } from '../../pages/signupPage';
import { OverviewHiddenUnitTestsWithGraphicalStatusPage } from '../../pages/TextbookPages/OverviewHiddenUnitTestsWithGraphicalStatusPage';

test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await page.goto("/");
    let signUpPage = new SignUpPage(page);
    let textbookPage = new OverviewHiddenUnitTestsWithGraphicalStatusPage(page);
    await signUpPage.signUpRandomUserForOverview();
    await textbookPage.goToHiddenUnitTestsWithGraphicalStatusPage();
});

test.describe('Question 6 / units 2', () => {
    test('Clicking the Save & Run without changing anything displays output', async ({ page }) => {
        let textbookPage = new OverviewHiddenUnitTestsWithGraphicalStatusPage(page);
        await page.locator(textbookPage.saveAndRunButton).nth(6).click();
        console.log('Checking for standard output');
        await expect(page.locator(textbookPage.question6Output)).toBeVisible();
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toBeVisible();
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Result`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Actual Value`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Expected Value`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Notes`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Pass`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Fail`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`4`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`4`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`A feedback string when the test fails`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`4`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`5.0`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Try adding your parameters`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsFeedback)).toContainText(`You passed: 50.0% of the tests`);

    });

    test('Clicking the Save & Run with changing text in the print line', async ({ page }) => {
        let textbookPage = new OverviewHiddenUnitTestsWithGraphicalStatusPage(page);
        await textbookPage.changeCodeMirrorAllCode(
  6,
  `def add(a,b):
return a+b`
);
        console.log('Changing code in the CodeMirror line');
        console.log('Clicking the Save & Run button after changing code');


        await page.locator(textbookPage.saveAndRunButton).nth(6).click();
        await expect(page.locator(textbookPage.question6Output)).toBeVisible();
        console.log('Checking for standard output after changing code'); 
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toBeVisible();
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Result`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Actual Value`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Expected Value`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Notes`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Pass`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Pass`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`4`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`4`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`A feedback string when the test fails`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`5.0`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`5.0`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Try adding your parameters`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsFeedback)).toContainText(`You passed: 100.0% of the tests`);
    }
);

    test('Clicking the Show Source Code button displays the source code', async ({ page }) => {
        let textbookPage = new OverviewHiddenUnitTestsWithGraphicalStatusPage(page);
        await page.locator(textbookPage.question6ShowSourceCodeButton).click();
        console.log('Checking for source code visibility');
        await expect(page.locator(textbookPage.question6SourceCode)).toBeVisible();
        await expect(page.locator(textbookPage.question6HideSourceCodeButton)).toBeVisible();
    });

    test('Clicking the Hide Source Code button hides the source code', async ({ page }) => {
        let textbookPage = new OverviewHiddenUnitTestsWithGraphicalStatusPage(page);
        await page.locator(textbookPage.question6ShowSourceCodeButton).click();
        await expect(page.locator(textbookPage.question6SourceCode)).toBeVisible();
        await page.locator(textbookPage.question6HideSourceCodeButton).click();
        console.log('Checking for source code invisibility');
        await expect(page.locator(textbookPage.question6SourceCode)).not.toBeVisible();
    });

    test('Slider changes code to initial state and goes back to current state', async ({ page }) => {
        let textbookPage = new OverviewHiddenUnitTestsWithGraphicalStatusPage(page);
        await textbookPage.changeCodeMirrorAllCode(
            6,
            `def add(a,b):
    return a+b`
        );

        await page.locator(textbookPage.saveAndRunButton).nth(6).click();
        await expect(page.locator(textbookPage.question6Output)).toBeVisible();
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toBeVisible();
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Result`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Actual Value`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Expected Value`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Notes`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Pass`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Pass`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`4`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`4`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`A feedback string when the test fails`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`5.0`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`5.0`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Try adding your parameters`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsFeedback)).toContainText(`You passed: 100.0% of the tests`);

    await textbookPage.changeCodeMirrorAllCode(
         6,
        `def add(a,b):
    return 5`
    );

    await page.locator(textbookPage.saveAndRunButton).nth(6).click();
        await expect(page.locator(textbookPage.question6Output)).toBeVisible();
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toBeVisible();
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Result`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Actual Value`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Expected Value`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Notes`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Pass`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Fail`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`4`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`5`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`A feedback string when the test fails`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`5.0`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`5.0`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toContainText(`Try adding your parameters`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsFeedback)).toContainText(`You passed: 50.0% of the tests`);

        await textbookPage.dragSlider(page, textbookPage.question6SliderHandle, textbookPage.question6SliderTrack, 100, 50);
        await expect(page.locator(textbookPage.question6CodeMirrorLine)).toContainText('def add(a,b):');
        await expect(page.locator(textbookPage.question6CodeMirrorLine)).toContainText('return a+b');

        await textbookPage.dragSlider(page, textbookPage.question6SliderHandle, textbookPage.question6SliderTrack, 50, 0);
        await expect(page.locator(textbookPage.question6CodeMirrorLine)).toContainText('def add(a,b):');
        await expect(page.locator(textbookPage.question6CodeMirrorLine)).toContainText('return 4');

        await textbookPage.dragSlider(page, textbookPage.question6SliderHandle, textbookPage.question6SliderTrack, 0, 50);
        await expect(page.locator(textbookPage.question6CodeMirrorLine)).toContainText('def add(a,b):');
        await expect(page.locator(textbookPage.question6CodeMirrorLine)).toContainText('return a+b');

        await textbookPage.dragSlider(page, textbookPage.question6SliderHandle, textbookPage.question6SliderTrack, 50, 100);
        await expect(page.locator(textbookPage.question6CodeMirrorLine)).toContainText('def add(a,b):');
        await expect(page.locator(textbookPage.question6CodeMirrorLine)).toContainText('return 5');
    });

    test('CodeMirror div contains hidden code', async ({ page }) => {
        let textbookPage = new OverviewHiddenUnitTestsWithGraphicalStatusPage(page);
        await expect(page.locator(textbookPage.question6CodeMirrorLine)).not.toContainText('from unittest.gui import TestCaseGui');
        await expect(page.locator(textbookPage.question6CodeMirrorLine)).not.toContainText('class myTests(TestCaseGui):');
        await expect(page.locator(textbookPage.question6CodeMirrorLine)).not.toContainText('def testOne(self):');
        await expect(page.locator(textbookPage.question6CodeMirrorLine)).not.toContainText('self.assertEqual(add(2,2),4,"A feedback string when the test fails") self.assertAlmostEqual(add(2.0,3.0), 5.0, 5, "Try adding your parameters")');
        await expect(page.locator(textbookPage.question6CodeMirrorLine)).not.toContainText('myTests().main()');
    });

    test('When Codemirror div contains incorrect syntax, clicking Save & Run displays error output, Code Coach output and standard output', async ({ page }) => {
        let textbookPage = new OverviewHiddenUnitTestsWithGraphicalStatusPage(page);
        await textbookPage.changeCodeMirrorAllCode(
            6,
            `def add(a,b:
    return 4`
        );
        await page.locator(textbookPage.saveAndRunButton).nth(6).click();
        console.log('Checking for error output');
        await expect(page.locator(textbookPage.question6CodeCoach)).toBeVisible();
        await expect(page.locator(textbookPage.question6Output)).toBeEmpty();
        await expect(page.locator(textbookPage.question6ErrorAlert)).toBeVisible();
        await expect(page.locator(textbookPage.question6ErrorAlert)).toContainText(`SyntaxError: bad input on line 2`);
        await expect(page.locator(textbookPage.question6HiddenUnitTestsResultsTable)).toBeHidden();
    });
}
);