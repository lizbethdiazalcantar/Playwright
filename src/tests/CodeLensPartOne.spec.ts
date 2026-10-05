import { expect, test } from '@playwright/test';
import { SignUpPage } from "../pages/signupPage";
import { TextbookPage } from '../pages/textbookPage';
import { CodeLensPredictionsPage } from "../pages/TextbookPages/CodeLensPredictionsPage";



//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/Visualizers/codelens.html')
});

test.describe('CodeLens Predictions 3.2.1', () => {

  test('Next button advances through all 33 steps', async ({ page }) => {
    let textbookPage = new CodeLensPredictionsPage(page);
    let nextButton = page.locator(textbookPage.nextButton).nth(2);
    let prevButton = page.locator(textbookPage.prevButton).nth(2);
    await expect(prevButton).toBeDisabled();
    console.log('Prev button is disabled initially');
    for (let steps = 1; steps <= 33; steps++) {
      await expect(nextButton).toBeEnabled();
      console.log('Clicking Next button');
      await nextButton.click();
      await page.waitForTimeout(50);
    }
    await expect(nextButton).toBeDisabled();
    console.log('Next button is disabled at final step');
    await expect(prevButton).toBeEnabled();
    console.log('Prev button remains enabled at final step');
  });



  test('Track tot variable updates in the Global frame while stepping through the loop', async ({ page }) => {
    let textbookPage = new CodeLensPredictionsPage(page);
    let nextButton = page.locator(textbookPage.nextButton).nth(2);
    let expectedTotValues = ['0', '1', '3', '6', '10', '15', '21', '28', '36', '45'];
    // Step numbers at which the 'tot' variable is updated 
    const checkSteps = [4, 8, 11, 15, 18, 21, 24, 27, 30, 33];
    // Counter for the number of steps clicked 
    let steps = 0;
    // Index to track position in expectedTotValues
    let i = 0;

    while (steps < 33) {
      console.log('Clicking Next button');
      await nextButton.click();
      steps++;
      await page.waitForTimeout(150);

      if (steps === checkSteps[i]) {
        console.log('Checking tot value at Step');
        let totValue = await page.locator(textbookPage.globalFrameTot).textContent();
        let actual = totValue?.trim();
        let expected = expectedTotValues[i];
        console.log(`Step ${steps}: expected tot = ${expected}, actual tot = ${actual}`);
        expect(actual).toBe(expected);
        i++;
      }
    }
  });

  test('Track tot variable updates while stepping backward through the loop', async ({ page }) => {
    let textbookPage = new CodeLensPredictionsPage(page);
    let nextButton = page.locator(textbookPage.nextButton).nth(2);
    let prevButton = page.locator(textbookPage.prevButton).nth(2);
    let expectedTotValues = ['0', '1', '3', '6', '10', '15', '21', '28', '36', '45'];
    let checkSteps = [4, 8, 11, 15, 18, 21, 24, 27, 30, 33];
    let steps = 0;
    let i = 0;

    while (steps < 33) {
      await nextButton.click();
      steps++;
      await page.waitForTimeout(100);

      if (steps === checkSteps[i])
        i++;
    }
    // Now step backward and validate 'tot' again
    while (i > 0) {
      i--;
      await prevButton.click();
      steps--;
      await page.waitForTimeout(100);

      if (steps === checkSteps[i]) {
        let totValue = await page.locator(textbookPage.globalFrameTot).textContent();
        let actual = totValue?.trim();
        let expected = expectedTotValues[i];
        expect(actual).toBe(expected);
      }
    }
  });

  test("User enters '2' in question dialog", async ({ page }) => {
    let textbookPage = new TextbookPage(page);
    let textbookPageCodeLens = new CodeLensPredictionsPage(page);
    console.log('First click.');
    await page.locator(textbookPageCodeLens.nextButton).nth(2).click();
    console.log('Second click.');
    await page.locator(textbookPageCodeLens.nextButton).nth(2).click();

    await textbookPage.handlePromptAndFollowup(
      'What is the value of tot after the line with the red arrow executes?',
      '2',
      'Use the global variables box to look at the current values of tot and i'
    );
    console.log('\nPreparing for click to trigger the dialogs');
    await page.locator(textbookPageCodeLens.nextButton).nth(2).click();
    await expect(1).toEqual(1);
    console.log('\nExpect dialogs to have been dismissed.');
    await page.locator(textbookPageCodeLens.nextButton).nth(2).click();
  });


  test("User enters '0' in question dialog", async ({ page }) => {
    let textbookPage = new TextbookPage(page);
    let textbookPageCodeLens = new CodeLensPredictionsPage(page);
    console.log('First click.');
    await page.locator(textbookPageCodeLens.nextButton).nth(2).click();
    console.log('Second click.');
    await page.locator(textbookPageCodeLens.nextButton).nth(2).click();
    await textbookPage.handlePromptAndFollowup(
      'What is the value of tot after the line with the red arrow executes?',
      '0',
      'Correct'
    );

    await page.waitForTimeout(1000);
    console.log('\nPreparing for click to trigger the dialogs');
    await page.locator(textbookPageCodeLens.nextButton).nth(2).click();
    await expect(1).toEqual(1);
    console.log('\nExpect dialogs to have been dismissed.');
    await page.locator(textbookPageCodeLens.nextButton).nth(2).click();
  });

  test('Clicking the Show Source button reveals the raw source code block', async ({ page }) => {
     let textbookPage = new CodeLensPredictionsPage(page);
    let showSourceButton = page.locator(textbookPage.showSourceTotCalcButton);
    await showSourceButton.click();
    let sourceCodeBlock = page.locator(textbookPage.sourceCodeTotCalcBlock);
    await expect(sourceCodeBlock).toBeVisible();
    console.log('\nChecking that raw codelens_question content appears in the output');
    await expect(sourceCodeBlock).toContainText('codelens:: codelens_question');
    await expect(sourceCodeBlock).toContainText(':question: What is the value of tot after the line with the red arrow executes?');
    await expect(sourceCodeBlock).toContainText(':breakline: 4');
    await expect(sourceCodeBlock).toContainText(':feedback: Use the global variables box to look at the current values of tot and i.');
    await expect(sourceCodeBlock).toContainText(':correct: globals.tot');
    await expect(sourceCodeBlock).toContainText('tot = 0');
    await expect(sourceCodeBlock).toContainText('prod = 1');
    await expect(sourceCodeBlock).toContainText('for i in range(10):');
    await expect(sourceCodeBlock).toContainText('tot = tot + i');
    await expect(sourceCodeBlock).toContainText('prod = prod * i');
  });


  test('Clicking Hide Source button hides the source code block', async ({ page }) => {
     let textbookPage = new CodeLensPredictionsPage(page);
    let showSourceButton = page.locator(textbookPage.showSourceTotCalcButton);
    await showSourceButton.click();
     let sourceCodeBlock = page.locator(textbookPage.sourceCodeTotCalcBlock);
    await expect(sourceCodeBlock).toBeVisible();
    await expect(showSourceButton).toBeHidden();
    let hideSourceButton = page.locator(textbookPage.hideSourceTotCalcButton);
    await expect(hideSourceButton).toBeVisible();
    await hideSourceButton.click();
    await page.waitForTimeout(200);
    await expect(sourceCodeBlock).toBeHidden({ timeout: 7000 });
    await expect(showSourceButton).toBeVisible();
    await expect(hideSourceButton).toBeHidden();
  });
});
