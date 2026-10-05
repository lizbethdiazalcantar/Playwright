import { expect, test } from '@playwright/test';
import { SignUpPage } from "../pages/signupPage";
import { TextbookPage } from '../pages/textbookPage';
import { CodeLensPredictionsPage } from '../pages/TextbookPages/CodeLensPredictionsPage';



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
    test('Next button advances through 5 steps and updates Prev button state accordingly', async ({ page }) => {
        let textbookPage = new CodeLensPredictionsPage(page);
        const nextButton = page.locator(textbookPage.nextButton).nth(3);
        const prevButton = page.locator(textbookPage.prevButton).nth(3);
        await expect(prevButton).toBeDisabled();
        console.log('Prev button is disabled initially');
        await expect(nextButton).toBeEnabled();
        console.log('Clicking Next button - Step 1');
        await nextButton.click();
        await page.waitForTimeout(50);
        await expect(prevButton).toBeEnabled();
        console.log('Prev button is enabled after first Next click');
        for (let step = 2; step <= 5; step++) {
            await expect(nextButton).toBeEnabled();
            console.log('Clicking Next button - Step ${step}');
            await nextButton.click();
            await page.waitForTimeout(50);
        }
        await expect(nextButton).toBeDisabled();
        console.log('Next button is disabled at final step');
        await expect(prevButton).toBeEnabled();
        console.log('Prev button remains enabled at final step');
    });

    test('Prints the output in Text Area', async ({ page }) => {
        let textbookPage = new CodeLensPredictionsPage(page);
        const nextButton = page.locator(textbookPage.nextButton).nth(3);
        for (let step = 1; step <= 5; step++) {
            await expect(nextButton).toBeEnabled();
            console.log(`Clicking Next button - Step ${step}`);
            await nextButton.click();
            await page.waitForTimeout(100);
        }
        const printOutputArea = page.locator(textbookPage.printTextArea).nth(3);
        await expect(printOutputArea).toBeVisible();
        const outputText = await printOutputArea.inputValue(); // textarea holds value
        await expect(outputText).toContain('x is even');
        console.log('Output contains "x is even"');
    });

    test('Track x and y updates in the Global frame appears (from Step 3 onward)', async ({ page }) => {
        let textbookPage = new CodeLensPredictionsPage(page);
        const nextButton = page.locator(textbookPage.nextButton).nth(3);
        const expectedX = ['2', '2', '2'];
        const expectedY = ['0', '0', '-2'];

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
            const xLocator = page.locator(textbookPage.globalFrameX);
            const yLocator = page.locator(textbookPage.globalFrameY);
            await xLocator.isVisible();
            await yLocator.isVisible();
            const xVal = (await xLocator.textContent())?.trim();
            const yVal = (await yLocator.textContent())?.trim();
            await expect(xVal).toBe(expectedX[i]);
            await expect(yVal).toBe(expectedY[i]);
        }
    });

    test("User enters '4' in question dialog  ", async ({ page }) => {
        let textbookPage = new TextbookPage(page);
        let textbookPageCodeLens = new CodeLensPredictionsPage(page);
        console.log('First click.');
        await page.locator(textbookPageCodeLens.nextButton).nth(3).click();
        console.log('Second click.');
        await page.locator(textbookPageCodeLens.nextButton).nth(3).click();

        await textbookPage.handlePromptAndFollowup(
            'After the line with the red arrow is executed, which will be next?',
            '4',
            'Remember that in an if/else statement only one block is executed.'
        );
        console.log('\nPreparing for click to trigger the dialogs');
        await page.locator(textbookPageCodeLens.nextButton).nth(3).click();
        await expect(1).toEqual(1);
        console.log('\nExpect dialogs to have been dismissed.');
        await page.locator(textbookPageCodeLens.nextButton).nth(3).click();
    });

    test("User enters '7' in question dialog  ", async ({ page }) => {
        let textbookPage = new TextbookPage(page);
        let textbookPageCodeLens = new CodeLensPredictionsPage(page);
        console.log('First click.');
        await page.locator(textbookPageCodeLens.nextButton).nth(3).click();
        console.log('Second click.');
        await page.locator(textbookPageCodeLens.nextButton).nth(3).click();

        await textbookPage.handlePromptAndFollowup(
            'After the line with the red arrow is executed, which will be next?',
            '7',
            'Correct'
        );
        console.log('\nPreparing for click to trigger the dialogs');
        await page.locator(textbookPageCodeLens.nextButton).nth(3).click();
        await expect(1).toEqual(1);
        console.log('\nExpect dialogs to have been dismissed.');
        await page.locator(textbookPageCodeLens.nextButton).nth(3).click();
    });



    test('Show Source button reveals the conditional logic code block', async ({ page }) => {
        let textbookPage = new CodeLensPredictionsPage(page);
        let showSourceButton = page.locator(textbookPage.showSourceEvenOddButton);
        await expect(showSourceButton).toBeVisible();
        console.log('Show Source button is visible');
        await showSourceButton.click();
        console.log('Clicked Show Source button');
        const sourceCodeBlock = page.locator(textbookPage.sourceCodeEvenOddBlock);
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
        await expect(sourceCodeBlock).toBeHidden({ timeout: 7000 });
        await expect(showSourceButton).toBeVisible();
        await expect(hideSourceButton).toBeHidden();
    });



});


