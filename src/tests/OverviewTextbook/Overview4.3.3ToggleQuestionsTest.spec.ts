import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { ToggleQuestionTest } from "../../pages/TextbookPages/ToggleQuestionsTest";

//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new ToggleQuestionTest(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/Containers/dynamic.html#toggle-questions')
});

//checking error message when clicking check button
test('Clicking the Check button without selecting anything displays error', async ({ page }) => {
        let textbookPage = await new ToggleQuestionTest(page);
        await page.locator('#parsons-1-check').click();
        await expect(page.locator('xpath=//*[@id="parsons-1-message"]')).toContainText('Your answer is too short. Add more blocks.');
    });

test('Clicking the Show Source and Hide Source buttons work properly', async ({ page }) => {
        let textbookPage = await new ToggleQuestionTest(page);  
        await page.locator('#dynamic_toggle_1_src_show').click();
        await expect(page.locator('#dynamic_toggle_1_src_show')).toContainText('Show Source'); 
        await expect(page.locator('#dynamic_toggle_1_src pre')).toBeVisible();
        await expect(page.locator('#dynamic_toggle_1_src pre')).toContainText('dynamic_toggle_1');
        await page.locator('#dynamic_toggle_1_src_hide').click();
        await expect(page.locator('#dynamic_toggle_1_src pre')).not.toBeVisible();
    });

test('Test wrong response 4.3.3 dragNdrop', async ({ page }) => {
        let textbookPage = await new ToggleQuestionTest(page);
       await page.locator('#parsons-1-block-0').dragTo(page.locator('#parsons-1-answer'));
       await page.locator('#parsons-1-block-1').dragTo(page.locator('#parsons-1-answer'));
       await page.locator('#parsons-1-block-2').dragTo(page.locator('#parsons-1-answer'));
       await page.locator('#parsons-1-block-3').dragTo(page.locator('#parsons-1-answer'));
       await page.locator('#parsons-1-block-4').dragTo(page.locator('#parsons-1-answer'));
       await page.locator('#parsons-1-block-5').dragTo(page.locator('#parsons-1-answer'));
       await page.locator('#parsons-1-block-6').dragTo(page.locator('#parsons-1-answer'));
       await page.locator('#parsons-1-block-7').dragTo(page.locator('#parsons-1-answer'));
       await page.locator('#parsons-1-check').click();
       await expect(page.locator("#parsons-1-message")).toContainText('Highlighted blocks in your answer are wrong or are in the wrong order. This can be fixed by moving, removing, or replacing highlighted blocks.');  
    })

test('Test reset of answers 4.3.3 dragNdrop', async ({ page }) => {
        let textbookPage = await new ToggleQuestionTest(page);
       await page.locator('#parsons-1-block-0').dragTo(page.locator('#parsons-1-answer'));
       await page.locator('#parsons-1-block-1').dragTo(page.locator('#parsons-1-answer'));
       await page.locator('#parsons-1-block-2').dragTo(page.locator('#parsons-1-answer'));
       await page.locator('#parsons-1-block-3').dragTo(page.locator('#parsons-1-answer'));
       await page.locator('#parsons-1-block-4').dragTo(page.locator('#parsons-1-answer'));
       await page.locator('#parsons-1-block-5').dragTo(page.locator('#parsons-1-answer'));
       await page.locator('#parsons-1-block-6').dragTo(page.locator('#parsons-1-answer'));
       await page.locator('#parsons-1-block-7').dragTo(page.locator('#parsons-1-answer'));
       await page.locator('#parsons-1-reset').click(); 
    })

test('Test correct response 4.3.3 dragNdrop', async ({ page }) => {
        let textbookPage = await new ToggleQuestionTest(page);
       await page.locator('#parsons-1-block-0').dragTo(page.locator('#parsons-1-answer'),  {targetPosition: { x: 150, y: 355}});
       await page.locator('#parsons-1-block-1').dragTo(page.locator('#parsons-1-answer'),  {targetPosition: { x: 200, y: 355}});
       await page.locator('#parsons-1-block-3').dragTo(page.locator('#parsons-1-answer'),  {targetPosition: { x: 225, y: 355}});
       await page.locator('#parsons-1-block-5').dragTo(page.locator('#parsons-1-answer'),  {targetPosition: { x: 250, y: 355}});
       await page.locator('#parsons-1-block-7').dragTo(page.locator('#parsons-1-answer'),  {targetPosition: { x: 200, y: 355}});
       await page.locator('#parsons-1-check').click();
       await expect(page.locator("#parsons-1-message")).toContainText('Perfect!  It took you only one try to solve this.  Great job!');
    })

test('Dropdown works and you can close the popup', async ({ page }) => {
        let textbookPage = await new ToggleQuestionTest(page);
        let toggleQuestion = page.locator('#toggle-questions')
        await toggleQuestion.locator('text=Loading a dynamic question').nth(2).waitFor({ state: 'detached' });
        await page.locator('#dynamic_toggle_1-toggleQuestion').selectOption({ label: 'Active Write Code - exp1_q1_write' })
        await page.locator('#component-preview').waitFor({ state: 'visible' });
        let popup = page.locator('#component-preview');
        await expect(popup).toBeVisible();
        let ClosePreviewButton = popup.locator('#toggle-buttons > button.btn.btn-default');
        await ClosePreviewButton.click();
        await expect(popup).toBeHidden();
})

test('Dropdown and select written question', async ({ page }) => {
        let textbookPage = await new ToggleQuestionTest(page);
        let toggleQuestion = page.locator('#toggle-questions')
        await toggleQuestion.locator('text=Loading a dynamic question').nth(2).waitFor({ state: 'detached' });
        await page.locator('#dynamic_toggle_1-toggleQuestion').selectOption({ label: 'Active Write Code - exp1_q1_write' })
        await page.locator('#component-preview').waitFor({ state: 'visible' });
        let popup = page.locator('#component-preview');
        await expect(popup).toBeVisible();
        let confirmButton = popup.locator('#toggle-buttons > button.btn.btn-primary');
        await confirmButton.click();
        await expect(popup).toBeHidden();
})

test('Dropdown and select Q1 Written and click run button while its empty', async ({ page }) => {
        let textbookPage = await new ToggleQuestionTest(page);
        let toggleQuestion = page.locator('#toggle-questions')
        await toggleQuestion.locator('text=Loading a dynamic question').nth(2).waitFor({ state: 'detached' });
        await page.locator('#dynamic_toggle_1-toggleQuestion').selectOption({ label: 'Active Write Code - exp1_q1_write' })
        await page.locator('#component-preview').waitFor({ state: 'visible' });
        let popup = page.locator('#component-preview');
        await page.waitForTimeout(1500)
        await expect(popup).toBeVisible();
        let confirmButton = popup.locator('#toggle-buttons > button.btn.btn-primary');
        await confirmButton.click();
        await expect(popup).toBeHidden();
        await page.locator('#exp1_q1_write > div > div.ac_actions > button.btn.btn-success.run-button').nth(0).click();
        await expect(page.locator("#exp1_q1_write_errinfo")).toContainText('Error');
})

test('Dropdown and select Q1 Written and click run button when you enter the correct answer', async ({ page }) => {
        let textbookPage = await new ToggleQuestionTest(page);
        let toggleQuestion = page.locator('#toggle-questions')
        await toggleQuestion.locator('text=Loading a dynamic question').nth(2).waitFor({ state: 'detached' });
        await page.locator('#dynamic_toggle_1-toggleQuestion').selectOption({ label: 'Active Write Code - exp1_q1_write' })
        await page.locator('#component-preview').waitFor({ state: 'visible' });
        let popup = page.locator('#component-preview');
        await page.waitForTimeout(5000)
        await expect(popup).toBeVisible();
        let confirmButton = popup.locator('#toggle-buttons > button.btn.btn-primary');
        await confirmButton.click();
        await expect(popup).toBeHidden();
        let textarea = page.locator('#exp1_q1_write > div > div.ac_code_div > div > div.CodeMirror-scroll > div.CodeMirror-sizer > div > div').nth(0);
        await textarea.click();
        await textarea.press('Control+A');
        await textarea.press('Backspace');
        await textarea.type('def has22(nums):');
        await textarea.press('Enter');
        await textarea.type('for i in range(len(nums)-1):');
        await textarea.press('Enter');
        await textarea.type('if nums[i] == 2 and nums[i+1] == 2:');
        await textarea.press('Enter');
        await textarea.type('return True');
        await textarea.press('Enter');
        await textarea.type('return False');
        await page.locator('#exp1_q1_write > div > div.ac_actions > button.btn.btn-success.run-button').nth(0).click();
        await expect(page.locator("#exp1_q1_write_unit_results")).toContainText('You passed: 66.66666666666666% of the tests');
})