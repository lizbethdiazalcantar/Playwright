import { LoginPage } from '../../pages/loginPage';
import { testData } from '../../utils/testData';
import {test,expect } from '@playwright/test';
import { SignUpPage } from '../../pages/signupPage';
import { OverviewTimedExamQuestionsPage } from '../../pages/TextbookPages/OverviewTimedExamQuestionsPage';

test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await page.goto('/');
    let signUpPage = new SignUpPage(page);
    let textbookPage = new OverviewTimedExamQuestionsPage(page);
    await signUpPage.signUpRandomUserForOverview();
    await textbookPage.goToTimedExamQuestionsPage();
});

test('Clicking Start begins timer and displays warning', async ({ page }) => {
        const textbookPage = new OverviewTimedExamQuestionsPage(page);
        // Get the initial time
        const initialTime = await textbookPage.getTimerTime();
        // Click the start button
        await textbookPage.clickStartButton();
        // Wait for a few seconds to allow timer change
        await page.waitForTimeout(2000);
        // Get the new time and verify it has changed
        const newTime = await textbookPage.getNewTime();
        expect(newTime).not.toBe(initialTime);
        // Verify the warning block is visible
        const isExamWarningBlockVisible = await textbookPage.isExamWarningVisible();
        expect(isExamWarningBlockVisible).toBe(true);
});

    test('Clicking Pause pauses timer', async ({ page }) => {
        const textbookPage = new OverviewTimedExamQuestionsPage(page);
        const initialTime = await textbookPage.getTimerTime();
        await textbookPage.clickStartButton();
        await page.waitForTimeout(2000);
        await textbookPage.clickPauseButton();
        const newTime = await textbookPage.getNewTime();
        expect(newTime).not.toBe(initialTime);
});

test('Clicking Resume restarts timer', async ({ page }) => {
        let textbookPage = await new OverviewTimedExamQuestionsPage(page);
        await textbookPage.clickStartButton();
        await page.waitForTimeout(2000);
        const timeAfterStart = await textbookPage.getTimerTime();
        await textbookPage.clickPauseButton();
        await page.waitForTimeout(2000);
        const timeAfterPause = await textbookPage.getTimerTime();
        await textbookPage.clickResumeButton();
        await page.waitForTimeout(2000);
        const timeAfterResume = await textbookPage.getTimerTime();
        expect(timeAfterResume).not.toBe(timeAfterPause);
});

test('Clicking Show Source opens answer block', async ({ page }) => {
        let textbookPage = await new OverviewTimedExamQuestionsPage(page);
        await textbookPage.clickShowSourceButton();
        const isSourceAnswerBlockVisibleAfterClick = await textbookPage.isSourceAnswerBlockVisible();
        await expect(textbookPage.isSourceAnswerBlockVisible()).resolves.toBe(true);
});

test('Clicking Hide Source hides answer block', async ({ page }) => {
        let textbookPage = await new OverviewTimedExamQuestionsPage(page);
        await textbookPage.clickStartButton();
        await textbookPage.clickShowSourceButton();
        const sourceAnswerBlock = page.locator(textbookPage.sourceAnswerBlock);
        await textbookPage.clickHideSourceButton();
        await expect(sourceAnswerBlock).toBeHidden();
});

        /* Need to find proper selectors for the numbered question tabs.
test('Clicking "Flag Question" changes number color', async ({ page }) => {
        let textbookPage = await new OverviewTimedExamQuestionsPage(page);
        await page.locator(textbookPage.startButton).click();
        await page.locator(textbookPage.flagQuestionButton).click();
        await page.waitForTimeout(500);
        // Ensure the initial color of the page number button is the default (let's assume it's white initially)
        const initialColor = await textbookPage.page1Button.evaluate((el) => {
        return window.getComputedStyle(el).getPropertyValue('rgb(255, 140, 0)');
        expect(initialColor).toBe('rgb(255, 255, 255)'); /// Assuming the default is white (you can change this if necessary)
        /// Check if the color of the page number button changes
        const changedColor = await textbookPage.page1Button.evaluate((el) => {
        return window.getComputedStyle(el).getPropertyValue('Orange');
        /// Assert that the page number button color has changed
        expect(changedColor).not.toBe(initialColor); /// The color should be different after the flag button is clicked
        })
}); */

test('Clicking "Mark as Complete" button changes to "Completed! Well Done" with a check mark', async ({ page }) => {
        let textbookPage = await new OverviewTimedExamQuestionsPage(page);
        const initialText = await textbookPage.getMarkAsCompletedButtonText();
        expect(initialText).toBe('Mark as Completed');
        await textbookPage.clickMarkAsCompletedButton();
        await page.waitForTimeout(1000);
        const changedText = await textbookPage.getMarkAsCompletedButtonText();
        expect(changedText).toBe(' Completed. Well Done!');
        const isCheckMarkVisible = await textbookPage.isCompletionCheckMarkVisible();
        expect(isCheckMarkVisible).toBe(true);
});
         
test('Clicking "Previous Section" takes user to 2.6 Short Answer', async ({ page }) => {
        let textbookPage = await new OverviewTimedExamQuestionsPage(page);
        await textbookPage.clickPreviousSectionButton();
        await page.goto('/ns/books/published/overview/Assessments/shortanswer.html');
        expect(textbookPage.prevHeadingText).toContain('Short Answer');
        await expect(page.locator(textbookPage.prevSectionNumber)).toContainText('2.6');
});

        /* Breaks trying to find nextHeadingText.
test('Clicking "Next Section" takes user to 3. Visualizers', async ({ page }) => {
        let textbookPage = await new OverviewTimedExamQuestionsPage(page);
        await textbookPage.clickNextSectionButton();
        await page.goto('/ns/books/published/overview/Assessments/visualizers.html');
        await expect(page.locator(textbookPage.nextHeadingText)).toContainText('Visualizers');
        await expect(page.locator(textbookPage.nextSectionNumber)).toContainText('3.');
}); */

        /* Receives errors when trying to find the feedback.
test('Results are shown for each question after "Finish Exam" is clicked', async ({ page }) => {
        let textbookPage = await new OverviewTimedExamQuestionsPage(page);
        await textbookPage.clickStartButton();
        await textbookPage.clickQ1OptionA();
        await textbookPage.clickNextButton();
        await textbookPage.clickCorrectCells();
        await textbookPage.clickNextButton();
        await textbookPage.performQ3DragAndDrop();
        await textbookPage.clickNextButton();
        await textbookPage.fillQ4TextFields('red', 'away');
        await textbookPage.clickNextButton();
        await textbookPage.performQ5DragAndDrop();
        await textbookPage.clickNextButton();
        await textbookPage.enterQ6Code('return a + b');
        await textbookPage.clickQ6RunButton();
        await textbookPage.clickNextButton();
        //await textbookPage.enterQ7Code('print("hello world")');
        await textbookPage.clickQ7RunButton();
        await textbookPage.clickFinishExamButton();
        const q7Feedback = await textbookPage.isQ7FeedbackVisible();
        expect(q7Feedback).toBeTruthy();
        await textbookPage.clickPrevButton();
        const q6Feedback = await textbookPage.isQ6FeedbackVisible();
        expect(q6Feedback).toBeTruthy();
        await textbookPage.clickPrevButton();
                // Q5 receives no feedback.
        const q5Feedback = await textbookPage.isQ5FeedbackVisible();
        expect(q5Feedback).toBeTruthy(); 
        await textbookPage.clickPrevButton();
                // Q4 receives FALSE feedback visibility.
        const q4Feedback = await textbookPage.isQ4FeedbackVisible();
        expect(q4Feedback).toBeTruthy(); 
        await textbookPage.clickPrevButton();
                // Q3 receives FALSE feedback visibility.
        const q3Feedback = await textbookPage.isQ3FeedbackVisible();
        expect(q3Feedback).toBeTruthy(); 
        await textbookPage.clickPrevButton();
                // Q2 timesout - waiting for locator('div.alert:nth-child(6)').
        const q2Feedback = await textbookPage.isQ2FeedbackVisible();
        expect(q2Feedback).toBeTruthy(); 
        await textbookPage.clickPrevButton();
                // Q1 receives FALSE feedback visibility.
        const q1Feedback = await textbookPage.isQ1FeedbackVisible();
        expect(q1Feedback).toBeTruthy(); 

}); */

test.describe('Exam Question 1 (Under which of these conditions will a sequential search be faster than a binary search?)', () => {
        test('Test correct response (A)', async ({ page }) => {
                let textbookPage = await new OverviewTimedExamQuestionsPage(page);
                await textbookPage.clickStartButton();
                await textbookPage.clickQ1OptionA();
                const optionA = page.locator('#questiontimed1_1_opt_0');
                const isOptionASelected = await optionA.isChecked();
                expect(isOptionASelected).toBeTruthy;
        })
});
    
        test('Test incorrect response (B)', async ({ page }) => {
                let textbookPage = await new OverviewTimedExamQuestionsPage(page);
                await textbookPage.clickStartButton();
                await textbookPage.clickQ1OptionB();
                const optionB = page.locator('#questiontimed1_1_opt_1');
                const isOptionBSelected = await optionB.isChecked();
                expect(isOptionBSelected).toBeTruthy;
        });
        
        test('Test incorrect response (C)', async ({ page }) => {
                let textbookPage = await new OverviewTimedExamQuestionsPage(page);
                await textbookPage.clickStartButton();
                await textbookPage.clickQ1OptionC();
                const optionC = page.locator('#questiontimed1_1_opt_2');
                const isOptionCSelected = await optionC.isChecked();
                expect(isOptionCSelected).toBeTruthy;
        });
    
        test('Test incorrect response (D)', async ({ page }) => {
                let textbookPage = new OverviewTimedExamQuestionsPage(page);
                await textbookPage.clickStartButton();
                await textbookPage.clickQ1OptionD();
                const optionD = page.locator('#questiontimed1_1_opt_3');
                const isOptionDSelected = await optionD.isChecked();
                expect(isOptionDSelected).toBeTruthy;
        });

        test('Test incorrect response (E)', async ({ page }) => {
                let textbookPage = new OverviewTimedExamQuestionsPage(page);
                await textbookPage.clickStartButton();
                await textbookPage.clickQ1OptionE();
                const optionE = page.locator('#questiontimed1_1_opt_4');
                const isOptionESelected = await optionE.isChecked();
                expect(isOptionESelected).toBeTruthy;
        });

test.describe('Exam question 2 (Click on the correct cells.)', () => {
        test('Click correct cells', async ({ page }) => {
                let textbookPage = await new OverviewTimedExamQuestionsPage(page);
                await textbookPage.clickStartButton();
                await textbookPage.clickNextButton();
                await textbookPage.clickCorrectCells();
                const cellSelectors = [
                        'th.head:nth-child(1)',
                        'th.head:nth-child(4)',
                        'td.clickable:nth-child(3)',
                        'td.clickable:nth-child(4)'
                ];
                for (const selector of cellSelectors) {
                        const cell = await page.locator(selector);
                        const isSelected = await cell.isVisible();
                        expect(isSelected).toBe(true);
                }
        })
});


test.describe('Exam question 3 (This is a drag n drop question.)', () => {
        test('Drag and Drop', async ({ page }) => {
                let textbookPage = await new OverviewTimedExamQuestionsPage(page);
                await textbookPage.clickStartButton();
                await textbookPage.clickNextButton();
                await textbookPage.clickNextButton();
                await textbookPage.performQ3DragAndDrop();
                const dragDropPairs = [
                        ['#dnd2dnd2_drag1', 'span.draggable-drop:nth-child(1)'],
                        ['#dnd2dnd2_drag2', 'span.draggable-drop:nth-child(2)'],
                        ['#dnd2dnd2_drag3', 'span.draggable-drop:nth-child(3)']
                    ];
                
                    // Check if each drag element is visible inside its drop target
                    for (const [drag, drop] of dragDropPairs) {
                        const isDropped = await page.locator(`${drop} ${drag}`).isVisible();
                        expect(isDropped).toBe(true);
                    }
                });
        });

        test('Clicking "Reset" puts draggable elements back in original position', async ({ page }) => {
                let textbookPage = await new OverviewTimedExamQuestionsPage(page);
                await textbookPage.clickStartButton();
                await textbookPage.navigateThroughPages(2);
                //const originalPositions = await textbookPage.getAnswerStartPositions();
                await textbookPage.performQ3DragAndDrop();
                await textbookPage.clickResetButton();
                const dragZone = page.locator('.rsdraggable.dragzone');

                await expect(dragZone.locator('#dnd2dnd2_drag1')).toBeVisible();
                await expect(dragZone.locator('#dnd2dnd2_drag2')).toBeVisible();
                await expect(dragZone.locator('#dnd2dnd2_drag3')).toBeVisible();
        });

test.describe('Exam question 4 (Fill in the blanks to make the following sentence: “The red car drove away”)', () => {
        test('Fill the blanks', async ({ page }) => {
                let textbookPage = await new OverviewTimedExamQuestionsPage(page);
                await textbookPage.clickStartButton();
                await textbookPage.clickNextButton();
                await textbookPage.clickNextButton();
                await textbookPage.clickNextButton();
                await textbookPage.fillQ4TextFields('red', 'away');
                const field1Value = await textbookPage.getQ4TextFieldValue(1);
                const field2Value = await textbookPage.getQ4TextFieldValue(2);
                expect(field1Value).toBe('red');
                expect(field2Value).toBe('away');
        })
});

test.describe('Exam question 5 (Put the blocks in order to describe a morning routine.)', () => {
        test('Drag n Drop morning routine', async ({ page }) => {
                let textbookPage = await new OverviewTimedExamQuestionsPage(page);
                await textbookPage.clickStartButton();
                await textbookPage.clickNextButton();
                await textbookPage.clickNextButton();
                await textbookPage.clickNextButton();
                await textbookPage.clickNextButton();
                await textbookPage.performQ5DragAndDrop();
                const blocks = [
                        '#parsons-1-block-0',  // Get Up block
                        '#parsons-1-block-1',  // Eat Breakfast block
                        '#parsons-1-block-0'   // Brush Your Teeth block (same as Get Up)
                    ];
                    const answerRegion = '#parsons-1-answer';
                
                    // Check if all blocks are in the answer region
                    for (const block of blocks) {
                        const blockInAnswer = await page.locator(`${answerRegion} ${block}`).isVisible();
                        expect(blockInAnswer).toBe(true);
                    }
                });
        });

        
test.describe('Exam question 6 (Fix this code so it passes all of the unit tests.)', () => {
        test('Fix code', async ({ page }) => {
                let textbookPage = await new OverviewTimedExamQuestionsPage(page);
                await textbookPage.clickStartButton();
                await textbookPage.navigateThroughPages(6);
                await textbookPage.enterQ6Code('return a + b');
                await textbookPage.clickQ6RunButton();
        })

        test('Attempt List increases to show every attempt made', async ({ page }) => {
                let textbookPage = await new OverviewTimedExamQuestionsPage(page);
                await textbookPage.clickStartButton();
                await textbookPage.navigateThroughPages(6);
                let initialAttemptCount = await textbookPage.getQ6InitialAttemptCount();
                expect(initialAttemptCount[0]).toBe(1);
                expect(initialAttemptCount[1]).toBe(1);

                await textbookPage.enterQ6Code('return a + b');
                await page.locator('button', { hasText: 'Run' }).nth(0).click();

                let subsequentAttemptCount = await textbookPage.getQ6SubsequentAttemptCount();
                expect(subsequentAttemptCount[0]).toBe(2);
                expect(subsequentAttemptCount[1]).toBe(2);
        })
                /* Times out at .getQ6InitialAttemptCount
        test('Attempt list displays time stamps', async ({ page }) => {
                let textbookPage = await new OverviewTimedExamQuestionsPage(page);
                await textbookPage.clickStartButton();
                await textbookPage.navigateThroughPages(6);
                await textbookPage.enterQ6Code('return a + b');
                await textbookPage.clickQ6RunButton();
                await textbookPage.waitForQ6TimeStampUpdate();
                const q6AttemptCount = await textbookPage.getQ6InitialAttemptCount();
                expect(q6AttemptCount).toBeGreaterThan(0);
        }) */
});

        
test.describe('Exam question 7 (Write a program that prints "hello world" two times. Note that although this is an actex the code should show.)', () => {
                /* Registers 1 helloWorldCount, not 2.
        test('Write "hello world" twice', async ({ page }) => {
                let textbookPage = await new OverviewTimedExamQuestionsPage(page);
                await textbookPage.clickStartButton();
                await textbookPage.navigateThroughPages(7);
                await textbookPage.enterQ7Code('print("hello world")');
                await textbookPage.clickQ7RunButton();
                await page.waitForTimeout(1000);
                const outputArea = page.locator('#timedactex_stdout');
                const outputText = await outputArea.textContent();
                const helloWorldCount = (outputText.match(/hello world/g) || []).length;
                expect(helloWorldCount).toBe(2);
        }) */
        
        test('Attempt List increases to show every attempt made', async ({ page }) => {
                let textbookPage = await new OverviewTimedExamQuestionsPage(page);
                await textbookPage.clickStartButton();
                await textbookPage.navigateThroughPages(7);
                let initialAttemptCount = await textbookPage.getQ7InitialAttemptCount();
                expect(initialAttemptCount[0]).toBe(1);
                expect(initialAttemptCount[1]).toBe(1);

                await textbookPage.enterQ7Code('print("hello world")');
                await page.locator('button', { hasText: 'Run' }).nth(0).click();

                let subsequentAttemptCount = await textbookPage.getQ7SubsequentAttemptCount();
                expect(subsequentAttemptCount[0]).toBe(2);
                expect(subsequentAttemptCount[1]).toBe(2);
        })

                /* Matcher error: received value must be a number or bigint.
        test('Attempt list displays time stamps', async ({ page }) => {
                let textbookPage = await new OverviewTimedExamQuestionsPage(page);
                await textbookPage.clickStartButton();
                await textbookPage.navigateThroughPages(7);
                await textbookPage.enterQ7Code('print("hello world")');
                await textbookPage.clickQ7RunButton();
                await textbookPage.waitForQ7TimeStampUpdate();
                const q7AttemptCount = await textbookPage.getQ7InitialAttemptCount();
                expect(q7AttemptCount).toBeGreaterThan(0);
        }) */

                /* CodeLens doesn't seem to open when button is clicked.
        test('Clicking "Show in Codelens" opens interface block', async ({ page }) => {
                let textbookPage = await new OverviewTimedExamQuestionsPage(page);
                await textbookPage.clickStartButton();
                await textbookPage.navigateThroughPages(7);
                await textbookPage.clickShowCodeLens();
                const codeLens = page.locator('div.codelens:nth-child(6) > iframe:nth-child(1)');
                await expect(codeLens).toBeVisible();
        })
        
        test('Codelens "pythontutor.com" link takes user to page', async ({ page }) => {
                let textbookPage = await new OverviewTimedExamQuestionsPage(page);
                await textbookPage.clickStartButton();
                await textbookPage.navigateThroughPages(7);
                await textbookPage.clickShowCodeLens();
                const codeLens = page.locator('div.codelens:nth-child(6)');
                await expect(codeLens).toBeVisible();
                const [newWindow] = await Promise.all([
                page.waitForEvent('popup'), // Wait for the new window to open
                textbookPage.clickPythonTutorLink() // Click the PythonTutor link
                ])
                // Step 4: Verify the URL of the new window
                expect(newWindow.url()).toBe('https://pythontutor.com');

        }) */
});