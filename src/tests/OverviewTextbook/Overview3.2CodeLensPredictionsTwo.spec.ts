import { expect, test } from '@playwright/test';
import { SignUpPage } from "../../pages/signupPage";
import { TextbookPage } from '../../pages/textbookPage';
import { CodeLensPredictionsPage } from '../../pages/TextbookPages/CodeLensPredictionsPage';



//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await page.goto("/");
    let signUpPage = new SignUpPage(page);
    let textbookPage = new CodeLensPredictionsPage(page);
    await signUpPage.signUpRandomUserForOverview();
    await page.goto('/ns/books/published/overview/Visualizers/codelens.html')
});

test.describe('CodeLens Predictions 3.2.2', () => {
    test('Next button advances through 5 steps and verifies button states', async ({ page }) => {
        let textbookPage = new CodeLensPredictionsPage(page);
        let nextButton = page.locator(textbookPage.nextButton).nth(3);
        let prevButton = page.locator(textbookPage.prevButton).nth(3);
        let stepIndicator = page.locator(textbookPage.stepIndicator).nth(3);
        await expect(prevButton).toBeDisabled();
        console.log('Prev button is disabled initially');
        await expect(nextButton).toBeEnabled();
        await nextButton.click();
        await page.waitForTimeout(50);
        await expect(prevButton).toBeEnabled();
        console.log('Prev button is enabled after first Next click');
        for (let step = 2; step <= 5; step++) {
            await expect(nextButton).toBeEnabled();
            console.log(`Clicking Next button - Step ${step}`);
            await nextButton.click();
            await page.waitForTimeout(50);
        }
        await expect(stepIndicator).toHaveText('Done running (5 steps)');
        await expect(nextButton).toBeDisabled();
        console.log('Next button is disabled at final step');
        await expect(prevButton).toBeEnabled();
        console.log('Prev button remains enabled at final step');
    });

    test('Prints the output in Text Area', async ({ page }) => {
        let textbookPage = new CodeLensPredictionsPage(page);
        let nextButton = page.locator(textbookPage.nextButton).nth(3);
        for (let step = 1; step <= 5; step++) {
            await expect(nextButton).toBeEnabled();
            console.log(`Clicking Next button - Step ${step}`);
            await nextButton.click();
            await page.waitForTimeout(100);
        }
        let printOutputArea = page.locator(textbookPage.printTextArea).nth(3);
        console.log('Checking if the output text area is visible');
        await expect(printOutputArea).toBeVisible();
        let outputText = await printOutputArea.inputValue(); // textarea holds value
        await expect(outputText).toContain('x is even');
        console.log('Output contains "x is even"');
    });

    test('Track x and y updates in the Global frame appears (from Step 3 onward)', async ({ page }) => {
        let textbookPage = new CodeLensPredictionsPage(page);
        let nextButton = page.locator(textbookPage.nextButton).nth(3);
        let expectedX = ['2', '2', '2'];
        let expectedY = ['0', '0', '-2'];

        // Step 1 and 2: just click Next to reach the point where global frame becomes visible
        for (let step = 1; step <= 2; step++) {
            await expect(nextButton).toBeEnabled();
            console.log(`Clicking Next button - Step ${step}`);
            await nextButton.click();
            await page.waitForTimeout(100);
        }

        // Steps 3 to 6: validate x and y values in global frame
        for (let i = 0; i < expectedX.length; i++) {
            await expect(nextButton).toBeEnabled();
            await nextButton.click();
            await page.waitForTimeout(100);
            let xLocator = page.locator(textbookPage.globalFrameX);
            let yLocator = page.locator(textbookPage.globalFrameY);

            console.log('Checking visibility of global frame variables x and y');
            await xLocator.isVisible();
            await yLocator.isVisible();
            let xVal = (await xLocator.textContent())?.trim();
            let yVal = (await yLocator.textContent())?.trim();
            expect(xVal).toBe(expectedX[i]);
            expect(yVal).toBe(expectedY[i]);
        }
    });

    test("User enters incorrect prediction '4', receives JS feedback, and sees 'x is even' printed", async ({ page }) => {
        let textbookPage = new TextbookPage(page);
        let textbookPageCodeLens = new CodeLensPredictionsPage(page);
        let nextButton = page.locator(textbookPageCodeLens.nextButton).nth(3);
        let printOutputArea = page.locator(textbookPageCodeLens.printTextArea).nth(3);
        console.log("Step 1: Executing 'x = 2'");
        await nextButton.click();
        await nextButton.click();
        console.log("Step 3: Entering incorrect prediction '4' in prompt");
        await textbookPage.handlePromptAndFollowup(
            'After the line with the red arrow is executed, which will be next?',
            '4',
            'Remember that in an if/else statement only one block is executed.'
        );

        console.log("Step 4: Highlighting else block (incorrect prediction)");
        await nextButton.click();

        console.log("Step 5: Executing print('x is even')");
        await nextButton.click();
        let output = await printOutputArea.inputValue();
        console.log('Printed output:', output);
        expect(output).toContain('x is even');
    });


    test("User enters correct prediction '7' ", async ({ page }) => {
        let textbookPage = new TextbookPage(page);
        let textbookPageCodeLens = new CodeLensPredictionsPage(page);
        let nextButton = page.locator(textbookPageCodeLens.nextButton).nth(3);
        let yValue = page.locator(textbookPageCodeLens.globalFrameY);
        console.log('Clicking through initial steps...');
        await nextButton.click();
        await nextButton.click();
        console.log("Step 3: Entering prediction '7' in prompt");
        await textbookPage.handlePromptAndFollowup(
            'After the line with the red arrow is executed, which will be next?',
            '7',
            'Correct'
        );
        console.log("Step 4: Entering else block");
        await nextButton.click();
        console.log("Step 5: Executing print('x is even')");
        await nextButton.click();
        let printOutputArea = page.locator(textbookPageCodeLens.printTextArea).nth(3);
        await printOutputArea.waitFor({ state: 'visible' });
        let outputText = await printOutputArea.inputValue();
        console.log('Printed output:', outputText);
        expect(outputText).toContain('x is even');
        await nextButton.click();
        console.log('Checking that y is updated to -2');
        await expect(yValue).toContainText('-2');
    });

    test("User enters empty prediction, receives feedback, and sees 'x is even' printed", async ({ page }) => {
        let textbookPage = new TextbookPage(page);
        let textbookPageCodeLens = new CodeLensPredictionsPage(page);
        let nextButton = page.locator(textbookPageCodeLens.nextButton).nth(3);
        let printOutputArea = page.locator(textbookPageCodeLens.printTextArea).nth(3);

        console.log('Clicking through lines 1 and 2..');
        await nextButton.click(); // x = 2
        await nextButton.click(); // y = 0
        console.log("Step 3: Entering prediction '' in prompt");
        await textbookPage.handlePromptAndFollowup(
            'After the line with the red arrow is executed, which will be next?',
            '',
            'Remember that in an if/else statement only one block is executed.'
        );

        console.log('Stepping through print and final execution...');
        await nextButton.click();
        await nextButton.click();
        let output = await printOutputArea.inputValue();
        console.log('Printed output:', output);
        expect(output).toContain('x is even');
    });


    test("When the user cancels the prediction prompt, the program still prints 'x is even' and sets y to -2 at the final step", async ({ page }) => {
        let textbookPage = new TextbookPage(page);
        let textbookPageCodeLens = new CodeLensPredictionsPage(page);
        let nextButton = page.locator(textbookPageCodeLens.nextButton).nth(3);
        let printOutputArea = page.locator(textbookPageCodeLens.printTextArea).nth(3);
        let yValue = page.locator(textbookPageCodeLens.globalFrameY);
        console.log('Step 1 : Executing x = 2, Step 2: y = 0');
        await nextButton.click();
        await nextButton.click();
        console.log("Step 3: Setting up cancel handler and triggering prediction prompt");
        await textbookPage.dialogClickCancel();
        await nextButton.click();
        console.log("Step 4: Highlighting else block");
        await nextButton.click();
        console.log("Step 5: Executing print('x is even')");
        await nextButton.click();
        let output = await printOutputArea.inputValue();
        console.log('Printed output:', output);
        expect(output).toContain('x is even');
        console.log('Checking that y is updated to -2');
        await expect(yValue).toContainText('-2');
    });


    test('Show Source button reveals the conditional logic code block', async ({ page }) => {
        let textbookPage = new CodeLensPredictionsPage(page);
        let showSourceButton = page.locator(textbookPage.showSourceEvenOddButton);
        await expect(showSourceButton).toBeVisible();
        console.log('Show Source button is visible');
        await showSourceButton.click();
        console.log('Clicked Show Source button');
        let sourceCodeBlock = page.locator(textbookPage.sourceCodeEvenOddBlock);
        await expect(sourceCodeBlock).toBeVisible();
        console.log('Code block is visible after clicking Show Source');
        await expect(sourceCodeBlock).toContainText('codelens:: codelens_question_line');
        await expect(sourceCodeBlock).toContainText(':question: After the line with the red arrow is executed, which will be next?');
        await expect(sourceCodeBlock).toContainText(':breakline: 3');
        await expect(sourceCodeBlock).toContainText(':feedback: Remember that in an if/else statement only one block is executed.');
        await expect(sourceCodeBlock).toContainText(':correct: line');
        await expect(sourceCodeBlock).toContainText('x = 2');
        await expect(sourceCodeBlock).toContainText('y = 0');
        await expect(sourceCodeBlock).toContainText('if x % 2 == 1:');
        await expect(sourceCodeBlock).toContainText("print('x is odd')");
        await expect(sourceCodeBlock).toContainText('y = y + x');
        await expect(sourceCodeBlock).toContainText('else:');
        await expect(sourceCodeBlock).toContainText("print('x is even')");
        await expect(sourceCodeBlock).toContainText('y = y - x');

    });

    test('Clicking Hide Source button hides the source code block', async ({ page }) => {
        let textbookPage = new CodeLensPredictionsPage(page);
        let showSourceButton = page.locator(textbookPage.showSourceEvenOddButton);
        await showSourceButton.click();
        let sourceCodeBlock = page.locator(textbookPage.sourceCodeEvenOddBlock);
        await expect(sourceCodeBlock).toBeVisible();
        await expect(showSourceButton).toBeHidden();
        let hideSourceButton = page.locator(textbookPage.hideSourceToEvenOddButton);
        await expect(hideSourceButton).toBeVisible();
        await hideSourceButton.click();
        await page.waitForTimeout(200);
        console.log('Verifying that the source code block is now hidden');
        await expect(sourceCodeBlock).toBeHidden({ timeout: 7000 });
        await expect(showSourceButton).toBeVisible();
        await expect(hideSourceButton).toBeHidden();
    });


});


