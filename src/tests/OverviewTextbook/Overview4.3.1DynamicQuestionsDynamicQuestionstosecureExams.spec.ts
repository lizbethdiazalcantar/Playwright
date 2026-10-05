import { test, expect, Locator } from "@playwright/test";
import { DynamicQuestionsDynamicQuestionstosecureExams } from "../../pages/TextbookPages/DynamicQuestionsDynamicQuestionstosecureExams";
import { SignUpPage } from "../../pages/signupPage";

//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running test`);
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new DynamicQuestionsDynamicQuestionstosecureExams(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/Containers/dynamic.html', { timeout: 60000 });
});

test('Clicking the Start button displays the question', async ({ page }) => {
    let textbookPage = new DynamicQuestionsDynamicQuestionstosecureExams(page);
    let startButton = await textbookPage.startButton;
    await startButton.click();
    await expect(page.locator('#timed_Test')).toBeVisible();
    await expect(page.locator('#pageNums')).toBeVisible({ timeout: 15000 });
});

test('Clicking the flag question button flags the question', async ({ page }) => {
    let textbookPage = new DynamicQuestionsDynamicQuestionstosecureExams(page);
    let startButton = await textbookPage.startButton;
    await startButton.click();
    await page.locator('//ul[@id="pageNums"]//a[normalize-space(text())="2"]').click();
    
    // Assuming there's a button to flag the question
    let flagButton = page.locator('button:has-text("Flag Question")');
    await flagButton.click();

    await expect(page.locator('button:has-text("Unflag Question")')).toBeVisible();
    await (page.locator('button:has-text("Unflag Question")')).click();
    await expect(page.locator('button:has-text("Flag Question")')).toBeVisible();
});


  test('Clicking the Finish Exam buttton ends the exam', async ({ page }) => {
  let textbookPage = new DynamicQuestionsDynamicQuestionstosecureExams(page);
  let startButton = await textbookPage.startButton;
  await startButton.click();
  let nextbutton = page.locator('button:has-text("Next")');
  await nextbutton.click(); 
  await nextbutton.click(); 
  await nextbutton.click(); 
  await nextbutton.click(); 
  await nextbutton.click(); 
  // Assuming there's a button to finish the exam
  let FinishExamButton = await page.locator('button:has-text("Finish Exam")');
  textbookPage.dialogTestMessageTextAndClickOK('You have skipped 4 question(s). Clicking OK means you are ready to submit your answers and are finished with this assessment.'); 
  }); 

  test('Clicking the Show source/Hide Source button toggles the source code', async ({ page }) => {
    let textbookPage = new DynamicQuestionsDynamicQuestionstosecureExams(page);
    let ShowSourceButton = page.locator('button:has-text("Show Source")').nth(1);
    page.locator('#dynamic_q_4_src_show').click();
  
  
    //button[normalize-space(text())="Show Source"].
    await expect(page.locator('#dynamic_q_4_src pre')).toBeVisible();
    await expect(page.locator('#dynamic_q_4_src pre')).toContainText('selectquestion:: dynamic_q_4');
    await expect(page.locator('#dynamic_q_4_src pre')).toContainText(':fromid: morning, per_person_cost');
    await expect(page.locator('#dynamic_q_4_src pre')).toContainText(':points: 2');
  
    // Click the Hide Source button
    await page.locator('#dynamic_q_4_src_hide').click();
    await expect(page.locator('#dynamic_q_4_src pre')).toBeHidden({ timeout: 7000 });
    await expect(ShowSourceButton).toBeVisible();
  });