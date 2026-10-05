import { LoginPage } from '../../pages/loginPage';
import { testData } from '../../utils/testData';
import {test,expect } from '@playwright/test';
import { SignUpPage } from '../../pages/signupPage';
import { OverviewTextbookParsonsProblemsPage } from '../../pages/TextbookPages/OverviewTextbookParsonsProblemsPage';

test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await page.goto('/');
    let signUpPage = new SignUpPage(page);
    let textbookPage = new OverviewTextbookParsonsProblemsPage(page);
    await signUpPage.signUpRandomUserForOverview();
    await textbookPage.goToParsonsProblemsPage();
});

//--------------------------------------------------------------------------------------------------------------------------------------------------------//

test.describe('Test Question 1 (Morning)', () => {

    test('Correct answer should yield a success message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let checkButton = page.locator(textbookPage.checkButton).nth(0);
        let successMessage = page.locator(textbookPage.q1SuccessMessage);
        await textbookPage.q1CorrectAnswer();
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toContainText('Perfect!');
    });

    test('Incorrect answer should yield an error message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        await textbookPage.q1IncorrectAnswer();
        let checkButton = page.locator(textbookPage.checkButton).nth(0);
        let errorMessage = page.locator(textbookPage.errorMessage);
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('wrong order');
    });

    test('Incomplete answer should yield the correct message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let checkButton = page.locator(textbookPage.checkButton).nth(0);
        let addMoreBlocksMessage = page.locator(textbookPage.addMoreBlocksMessage);
        await textbookPage.q1IncompleteAnswer();
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(addMoreBlocksMessage).toBeVisible();
        await expect(addMoreBlocksMessage).toContainText('Add more blocks.');
    });

    test('Empty answer should return an error message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let dropBlocksHere = page.locator(textbookPage.dropBlocksHere).nth(0);
        let checkButton = page.locator(textbookPage.checkButton).nth(0);
        let addMoreBlocksMessage = page.locator(textbookPage.addMoreBlocksMessage);
        await expect(dropBlocksHere).toBeEmpty();
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(addMoreBlocksMessage).toContainText('Add more blocks.');
    });

    test('Clicking resest button empties drop blocks here section', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let dropBlocksHere = page.locator(textbookPage.dropBlocksHere).nth(0);
        let resetButton = page.locator(textbookPage.resetButton).nth(0);
        await textbookPage.q1CorrectAnswer();
        await resetButton.click();
        await expect(dropBlocksHere).toBeEmpty();
    });

    test('Should drag blocks from Right section back to Left section', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let dropBlocksHere = page.locator(textbookPage.dropBlocksHere).nth(0);
        await textbookPage.q1DragBlocksFromRightToLeft();
        await expect(dropBlocksHere).toBeEmpty();
    });

    test('Clicking the show source button reveals source box', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let sourceBox = page.locator(textbookPage.sourceBox).nth(0);
        await textbookPage.q1ClickShowSourceButton();
        await expect(sourceBox).toBeVisible();
    });

    test('Clicking the hide source button hides source box', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let sourceBox = page.locator(textbookPage.sourceBox).nth(0);
        await textbookPage.q1ClickShowSourceButton();
        await expect(sourceBox).toBeVisible();
        await textbookPage.q1ClickHideSourceButton();
        await expect(sourceBox).toBeHidden();
    });

    test('Clicking the show pretext button reveals pretext box', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let pretextBox = page.locator(textbookPage.morningPretextSourceBox);
        await textbookPage.clickShowPretextButton();
        await expect(pretextBox).toBeVisible();
    });

    test('Clicking the hide pretext button hides pretext box', async ({ page }) => { 
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let pretextBox = page.locator(textbookPage.morningPretextSourceBox);
        await textbookPage.clickShowPretextButton();
        await expect(pretextBox).toBeVisible();
        await textbookPage.clickHidePretextButton();
        await expect(pretextBox).toBeHidden();
    });
});

//--------------------------------------------------------------------------------------------------------------------------------------------------------//

test.describe('Test Question 2 (Per_Person_Cost)', () => {

    test('Correct answer should return a success message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        await textbookPage.q2CorrectAnswer();
        let checkButton = page.locator(textbookPage.checkButton).nth(1);
        let successMessage = page.locator(textbookPage.q2SuccessMessage);
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toContainText('Perfect!');
    });

    test('Incorrect answer should return an error message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        await textbookPage.q2IncorrectAnswer();
        let checkButton = page.locator(textbookPage.checkButton).nth(1);
        let errorMessage = page.locator(textbookPage.errorMessage);
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('wrong order');
    });

    test('Incomplete answer should return the correct message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        await textbookPage.q2IncompleteAnswer();
        let checkButton = page.locator(textbookPage.checkButton).nth(1);
        let addMoreBlocksMessage = page.locator(textbookPage.addMoreBlocksMessage);
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(addMoreBlocksMessage).toBeVisible();
        await expect(addMoreBlocksMessage).toContainText('Add more blocks.');
    });

    test('Empty answer should return an error message', async ({ page }) => { 
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let dropBlocksHere = page.locator(textbookPage.dropBlocksHere).nth(1);
        let checkButton = page.locator(textbookPage.checkButton).nth(1);
        let addMoreBlocksMessage = page.locator(textbookPage.addMoreBlocksMessage);
        await expect(dropBlocksHere).toBeEmpty();
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(addMoreBlocksMessage).toBeVisible();
        await expect(addMoreBlocksMessage).toContainText('Add more blocks.');
    });

    test('Clicking resest button empties drop blocks here section', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let dropBlocksHere = page.locator(textbookPage.dropBlocksHere).nth(1);
        let resetButton = page.locator(textbookPage.resetButton).nth(1);
        await textbookPage.q2CorrectAnswer();
        await resetButton.click();
        await expect(dropBlocksHere).toBeEmpty();
    });

    test('Should drag blocks from Right section back to Left section', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let dropBlocksHere = page.locator(textbookPage.dropBlocksHere).nth(1);
        await textbookPage.q2DragBlocksFromRightToLeft();
        await expect(dropBlocksHere).toBeEmpty();
    });
 
    test('Clicking the show source button reveals source box', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let sourceBox = page.locator(textbookPage.sourceBox).nth(1);
        await textbookPage.q2ClickShowSourceButton();
        await expect(sourceBox).toBeVisible();
    });

    test('Clicking the hide source button hides source box', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let sourceBox = page.locator(textbookPage.sourceBox).nth(1);
        await textbookPage.q2ClickShowSourceButton();
        await expect(sourceBox).toBeVisible();
        await textbookPage.q2ClickHideSourceButton();
        await expect(sourceBox).toBeHidden();
    });
});

//--------------------------------------------------------------------------------------------------------------------------------------------------------//

test.describe('Test Question 3 (Java_Countdown)', () => {

    test('Correct answer should return a success message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        await textbookPage.q3CorrectAnswer();
        let checkButton = page.locator(textbookPage.checkButton).nth(2);
        let successMessage = page.locator(textbookPage.q3SuccessMessage);
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toContainText('Perfect!');
    });

    test('Incorrect answer should return an error message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        await textbookPage.q3IncorrectAnswer();
        let checkButton = page.locator(textbookPage.checkButton).nth(2);
        let errorMessage = page.locator(textbookPage.errorMessage);
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('wrong order');
    });

    test('Incomplete answer should return the correct message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        await textbookPage.q3IncompleteAnswer();
        let checkButton = page.locator(textbookPage.checkButton).nth(2);
        let addMoreBlocksMessage = page.locator(textbookPage.addMoreBlocksMessage);
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(addMoreBlocksMessage).toBeVisible();
        await expect(addMoreBlocksMessage).toContainText('Add more blocks.');
    });

    test('Empty answer should return an error message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let dropBlocksHere = page.locator(textbookPage.dropBlocksHere).nth(2);
        let checkButton = page.locator(textbookPage.checkButton).nth(2);
        let addMoreBlocksMessage = page.locator(textbookPage.addMoreBlocksMessage) ;
        await expect(dropBlocksHere).toBeEmpty();
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(addMoreBlocksMessage).toBeVisible();
        await expect(addMoreBlocksMessage).toContainText('Add more blocks.');
    });

    test('Clicking resest button empties drop blocks here section', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let dropBlocksHere = page.locator(textbookPage.dropBlocksHere).nth(2);
        let resetButton = page.locator(textbookPage.resetButton).nth(2);
        await textbookPage.q3CorrectAnswer();
        await resetButton.click();
        await expect(dropBlocksHere).toBeEmpty();
    });

    test('Should drag blocks from Right section back to Left section', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let dropBlocksHere = page.locator(textbookPage.dropBlocksHere).nth(2);
        await textbookPage.q3DragBlocksFromRightToLeft();
        await expect(dropBlocksHere).toBeEmpty();
    });

    test('Clicking the show source button reveals source box', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let sourceBox = page.locator(textbookPage.sourceBox).nth(2);
        await textbookPage.q3ClickShowSourceButton();
        await expect(sourceBox).toBeVisible();
    });

    test('Clicking the hide source button hides source box', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let sourceBox = page.locator(textbookPage.sourceBox).nth(2);
        await textbookPage.q3ClickShowSourceButton();
        await expect(sourceBox).toBeVisible();
        await textbookPage.q3ClickHideSourceButton();
        await expect(sourceBox).toBeHidden();
    });
});
//--------------------------------------------------------------------------------------------------------------------------------------------------------//

test.describe('Test Question 4 (Java_Countdown_Paired)', () => {
    
    test('Correct answer should return a success message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        await textbookPage.q4CorrectAnswer();
        let checkButton = page.locator(textbookPage.checkButton).nth(3);
        let successMessage = page.locator(textbookPage.q4SuccessMessage);
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toContainText('Perfect!');
    });

    test('Incorrect answer should return an error message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        await textbookPage.q4IncorrectAnswer();
        let checkButton = page.locator(textbookPage.checkButton).nth(3);
        let errorMessage = page.locator(textbookPage.errorMessage);
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('wrong order');
    });

    test('Incomplete answer should return the correct message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        await textbookPage.q4IncompleteAnswer();
        let checkButton = page.locator(textbookPage.checkButton).nth(3);
        let addMoreBlocksMessage = page.locator(textbookPage.addMoreBlocksMessage);
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(addMoreBlocksMessage).toBeVisible();
        await expect(addMoreBlocksMessage).toContainText('Add more blocks.');
    });

    test('Empty answer should return an error message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let dropBlocksHere = page.locator(textbookPage.dropBlocksHere).nth(3);
        let checkButton = page.locator(textbookPage.checkButton).nth(3);
        let addMoreBlocksMessage = page.locator(textbookPage.addMoreBlocksMessage);
        await expect(dropBlocksHere).toBeEmpty();
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(addMoreBlocksMessage).toBeVisible();
        await expect(addMoreBlocksMessage).toContainText('Add more blocks.');
    });

    test('Clicking resest button empties drop blocks here section', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let dropBlocksHere = page.locator(textbookPage.dropBlocksHere).nth(3);
        let resetButton = page.locator(textbookPage.resetButton).nth(3);
        await textbookPage.q4CorrectAnswer();
        await resetButton.click();
        await expect(dropBlocksHere).toBeEmpty();
    });

    test('Should drag blocks from Right section back to Left section', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let dropBlocksHere = page.locator(textbookPage.dropBlocksHere).nth(3);
        await textbookPage.q4DragBlocksFromRightToLeft();
        await expect(dropBlocksHere).toBeEmpty();
    });

    test('Clicking the show source button reveals source box', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let sourceBox = page.locator(textbookPage.sourceBox).nth(3);
        await textbookPage.q4ClickShowSourceButton();
        await expect(sourceBox).toBeVisible();
    });

    test('Clicking the hide source button hides source box', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let sourceBox = page.locator(textbookPage.sourceBox).nth(3);
        await textbookPage.q4ClickShowSourceButton();
        await expect(sourceBox).toBeVisible();
        await textbookPage.q4ClickHideSourceButton();
        await expect(sourceBox).toBeHidden();
    });
});

//--------------------------------------------------------------------------------------------------------------------------------------------------------//

test.describe('Test Question 5 (Java Countdown Paired 2)', () => {

    test('Correct answer should yield a success message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let checkButton = page.locator(textbookPage.checkButton).nth(4);
        await textbookPage.q5CorrectAnswer();
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(page.locator('#parsons-5-message')).toBeVisible();
        await expect(page.locator('#parsons-5-message')).toContainText('Perfect!');
    }); 

    test('Incorrect answer should yield an error message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let checkButton = page.locator(textbookPage.checkButton).nth(4);
        let errorMessage = page.locator(textbookPage.errorMessage);
        await textbookPage.q5IncorrectAnswer();
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('wrong order');
    });

    test('Incomplete answer should yield the correct message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let checkButton = page.locator(textbookPage.checkButton).nth(4);
        let addMoreBlocksMessage = page.locator(textbookPage.addMoreBlocksMessage);
        await textbookPage.q5IncompleteAnswer();
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(addMoreBlocksMessage).toBeVisible();
        await expect(addMoreBlocksMessage).toContainText('Add more blocks.');
    });

    test('Empty answer should yield an error message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let dropBlocksHere = page.locator(textbookPage.dropBlocksHere).nth(4);
        let checkButton = page.locator(textbookPage.checkButton).nth(4);
        let addMoreBlocksMessage = page.locator(textbookPage.addMoreBlocksMessage);
        await expect(dropBlocksHere).toBeEmpty();
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(addMoreBlocksMessage).toBeVisible();
        await expect(addMoreBlocksMessage).toContainText('Add more blocks.');
    });

    test('Clicking resest button empties drop blocks here section', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let dropBlocksHere = page.locator(textbookPage.dropBlocksHere).nth(4);
        let resetButton = page.locator(textbookPage.resetButton).nth(4);
        await textbookPage.q5CorrectAnswer();
        await resetButton.click();
        await expect(dropBlocksHere).toBeEmpty();
    });

    test('Should drag blocks from Right section back to Left section', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let dropBlocksHere = page.locator(textbookPage.dropBlocksHere).nth(4);
        await textbookPage.q5DragBlocksFromRightToLeft();
        await expect(dropBlocksHere).toBeEmpty();
    });

    test('Clicking the show source button reveals source box', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let sourceBox = page.locator(textbookPage.sourceBox).nth(4);
        await textbookPage.q5ClickShowSourceButton();
        await expect(sourceBox).toBeVisible();
    });

    test('Clicking the hide source button hides source box', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let sourceBox = page.locator(textbookPage.sourceBox).nth(4);
        await textbookPage.q5ClickShowSourceButton();
        await expect(sourceBox).toBeVisible();
        await textbookPage.q5ClickHideSourceButton();
        await expect(sourceBox).toBeHidden();
    });
});

//--------------------------------------------------------------------------------------------------------------------------------------------------------//

test.describe('Test Question 6 (Simple_Dag)', () => {

    test('Correct answer should yield a success message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let checkButton = page.locator(textbookPage.checkButton).nth(5);
        let successMessage = page.locator(textbookPage.q6SuccessMessage);
        await textbookPage.q6CorrectAnswer();
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(successMessage).toBeVisible();
        await expect(successMessage).toContainText('Perfect!');
    });

    test('Incorrect answer should yield an error message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        await textbookPage.q6IncorrectAnswer();
        let checkButton = page.locator(textbookPage.checkButton).nth(5);
        let errorMessage = page.locator(textbookPage.errorMessage);
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('wrong order');
    });

    test('Incomplete answer should yield the correct message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let checkButton = page.locator(textbookPage.checkButton).nth(5);
        let addMoreBlocksMessage = page.locator(textbookPage.addMoreBlocksMessage);
        await textbookPage.q6IncompleteAnswer();
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(addMoreBlocksMessage).toBeVisible();
        await expect(addMoreBlocksMessage).toContainText('Add more blocks.')
    });

    test('Empty answer should return an error message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let dropBlocksHere = page.locator(textbookPage.dropBlocksHere).nth(5);
        let checkButton = page.locator(textbookPage.checkButton).nth(5);
        let addMoreBlocksMessage = page.locator(textbookPage.addMoreBlocksMessage);
        await expect(dropBlocksHere).toBeEmpty();
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(addMoreBlocksMessage).toBeVisible();
        await expect(addMoreBlocksMessage).toContainText('Add more blocks.')
    });

    test('Clicking resest button empties drop blocks here section', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let dropBlocksHere = page.locator(textbookPage.dropBlocksHere).nth(5);
        let resetButton = page.locator(textbookPage.resetButton).nth(5);
        await textbookPage.q6CorrectAnswer();
        await resetButton.click();
        await expect(dropBlocksHere).toBeEmpty();
    });

    test('Should drag blocks from Right section back to Left section', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let dropBlocksHere = page.locator(textbookPage.dropBlocksHere).nth(5);
        await textbookPage.q6DragBlocksFromRightToLeft();
        await expect(dropBlocksHere).toBeEmpty();
    });

    test('Clicking the show source button reveals source box', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let sourceBox = page.locator(textbookPage.sourceBox).nth(5);
        await textbookPage.q6ClickShowSourceButton();
        await expect(sourceBox).toBeVisible();
    });

    test('Clicking the hide source button hides source box', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let sourceBox = page.locator(textbookPage.sourceBox).nth(5);
        await textbookPage.q6ClickShowSourceButton();
        await expect(sourceBox).toBeVisible();
        await textbookPage.q6ClickHideSourceButton();
        await expect(sourceBox).toBeHidden();
    });

    test('Correct answer should yield success message', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsPage(page);
        let checkButton = page.locator(textbookPage.checkButton).nth(4);
        await page.locator('#parsons-5-block-0').dragTo(page.locator('#parsons-5-answer'),  {targetPosition: { x: 0, y: 350 }});
        await page.locator('#parsons-5-block-1').dragTo(page.locator('#parsons-5-answer'),  { targetPosition: { x: 178, y: 350 }});
        await page.locator('#parsons-5-block-2').dragTo(page.locator('#parsons-5-answer'),  { targetPosition: { x: 208, y: 350 }});
        await page.locator('#parsons-5-block-4').dragTo(page.locator('#parsons-5-answer'),  { targetPosition: { x: 238, y: 350 }});
        await page.locator('#parsons-5-block-5').dragTo(page.locator('#parsons-5-answer'),  { targetPosition: { x: 178, y: 350 }});
        await page.locator('#parsons-5-block-6').dragTo(page.locator('#parsons-5-answer'),  { targetPosition: { x: 0, y: 350 }});
        await expect(checkButton).toBeVisible();
        await checkButton.click();
        await expect(page.locator('#parsons-5-message')).toBeVisible();
        await expect(page.locator('#parsons-5-message')).toContainText('Perfect!');
        
    }); 
});

