import { expect, test } from '@playwright/test';
import { SignUpPage } from "../../pages/signupPage";
import { TextbookPage } from '../../pages/textbookPage';
import { CodeLensPredictionsPage } from "../../pages/TextbookPages/CodeLensPredictionsPage";



//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/Visualizers/codelens.html')
});

test.describe('CodeLens Predictions 3.2.1', () => {

  test('Next button navigates 33 steps and verifies button states', async ({ page }) => {
    let textbookPage = new CodeLensPredictionsPage(page);
    let nextButton = page.locator(textbookPage.nextButton).nth(2);
    let prevButton = page.locator(textbookPage.prevButton).nth(2);
    let stepIndicator = page.locator(textbookPage.stepIndicator).nth(2);

    await expect(prevButton).toBeDisabled();
    console.log('Prev button is disabled initially (Step 1 of 33)');
    await expect(stepIndicator).toHaveText('Step 1 of 33');
    console.log('Starting at Step 1 of 33');
    for (let step = 1; step <= 33; step++) {
      await expect(nextButton).toBeEnabled();
      console.log(`Clicking Next to move from Step ${step} to Step ${step + 1}`);
      await nextButton.click();
    }
    await expect(stepIndicator).toHaveText('Done running (33 steps)');
    console.log('Reached final step: Step 33 of 33');
    await expect(nextButton).toBeDisabled();
    console.log('Next button is disabled at final step');
    await expect(prevButton).toBeEnabled();
    console.log('Prev button is enabled at final step');
  });



  test('Track tot variable updates in the Global frame while stepping through the loop', async ({ page }) => {
    let textbookPage = new CodeLensPredictionsPage(page);
    let nextButton = page.locator(textbookPage.nextButton).nth(2);
    let expectedTotValues = ['0', '1', '3', '6', '10', '15', '21', '28', '36', '45'];
    console.log('Step numbers at which the tot variable is updated');
    let checkSteps = [4, 8, 11, 15, 18, 21, 24, 27, 30, 33];
    console.log('Counter for the number of steps clicked');
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

    console.log('Now step backward and validate tot again');
    while (i > 0) {
      i--;
      await prevButton.click();
      steps--;
      await page.waitForTimeout(100);

      if (steps === checkSteps[i]) {
        let totLocator = page.locator(textbookPage.globalFrameTot);

        let isVisible = await totLocator.isVisible();
        if (!isVisible) {
          console.log(`Step ${steps + 1}: 'tot' is not visible`);
          continue;
        }

        let totText = await totLocator.textContent();
        if (totText === null) {
          console.log(`Step ${steps + 1}: 'tot' textContent is null`);
          continue;
        }

        let actual = totText.trim();
        let expected = expectedTotValues[i];
        expect(actual).toBe(expected);
      }
    }
  });

  test("User enters incorrect prediction '2' in the question dialog", async ({ page }) => {
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
    console.log('Check that the value remains unchanged e.g:  0');
    await expect(page.locator(textbookPageCodeLens.globalFrameTot)).toContainText('0');
    console.log('\nExpect dialogs to have been dismissed.');
    await page.locator(textbookPageCodeLens.nextButton).nth(2).click();
  });

  test("User skips prediction (enters empty input), tot becomes 1 at step 8", async ({ page }) => {
    let textbookPage = new TextbookPage(page);
    let textbookPageCodeLens = new CodeLensPredictionsPage(page);
    let nextButton = page.locator(textbookPageCodeLens.nextButton).nth(2);
    let tot = page.locator(textbookPageCodeLens.globalFrameTot);

    // Step to just before the prediction (step 7)
    for (let step = 1; step < 8; step++) {
      console.log(`Clicking step ${step}`);
      await nextButton.click();
      await page.waitForTimeout(100);
    }
    await textbookPage.handlePromptAndFollowup(
      'What is the value of tot after the line with the red arrow executes?',
      '', // Empty input
      'Use the global variables box to look at the current values of tot and i'
    );
    console.log('Triggering step 8 execution after empty prediction');
    await nextButton.click();
    console.log('Checking tot should be updated to 1 even though prediction was skipped');
    await expect(tot).toContainText('1');
  });

  test("When user enters correct prediction '0' in the question dialog", async ({ page }) => {
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
    await expect(page.locator(textbookPageCodeLens.globalFrameTot)).toContainText('0');
    console.log('\nExpect dialogs to have been dismissed.');
    await page.locator(textbookPageCodeLens.nextButton).nth(2).click();
  });

  test("User cancels the question dialog at step 8", async ({ page }) => {
    let textbookPage = new TextbookPage(page);
    let textbookPageCodeLens = new CodeLensPredictionsPage(page);
    let nextButton = page.locator(textbookPageCodeLens.nextButton).nth(2);
    let tot = page.locator(textbookPageCodeLens.globalFrameTot);

    // Step to step 7 (before the prompt appears)
    for (let step = 1; step < 8; step++) {
      console.log(`Clicking step ${step}`);
      await nextButton.click();
      await page.waitForTimeout(100);
    }

    console.log('Step 8: Setting up handler to cancel the prompt');
    await textbookPage.dialogClickCancel();
    await nextButton.click();
    console.log("Verifying that tot is still 1 after canceling the prompt at step 8.");
    await expect(tot).toContainText('1');
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
    console.log('Verifying that the source code block is now hidden');
    await expect(sourceCodeBlock).toBeHidden({ timeout: 7000 });
    await expect(showSourceButton).toBeVisible();
    await expect(hideSourceButton).toBeHidden();
  });


  test('Track prod variable updates while stepping backward through the loop', async ({ page }) => {
    let textbookPage = new CodeLensPredictionsPage(page);
    let nextButton = page.locator(textbookPage.nextButton).nth(2);
    let prevButton = page.locator(textbookPage.prevButton).nth(2);

    let checkSteps = [2, 5, 7, 10, 13, 16, 19, 22, 25, 28, 31];
    let expectedProdValues = ['1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];

    let steps = 0;
    let i = 0;

    // Step forward to step 33
    while (steps < 33) {
      console.log(`Clicking step ${steps + 1}`);
      await nextButton.click();
      steps++;
      await page.waitForTimeout(100);

      if (steps === checkSteps[i]) {
        i++;
      }
    }

    console.log('Stepping backward to validate prod values');

    while (i > 0) {
      i--;
      await prevButton.click();
      steps--;
      await page.waitForTimeout(100);

      if (steps === checkSteps[i]) {
        let prod = page.locator(textbookPage.globalFrameProd);

        let isVisible = await prod.isVisible();
        if (!isVisible) {
          console.log(`Step ${steps + 1}: 'prod' is not visible`);
          continue;
        }

        let prodText = await prod.textContent();
        if (prodText === null) {
          console.log(`Step ${steps + 1}: 'prod' textContent is null`);
          continue;
        }

        let prodVal = prodText.trim();
        let expected = expectedProdValues[i];
        expect(prodVal).toBe(expected);
      }
    }
  });


});
