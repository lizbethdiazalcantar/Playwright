import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { OverviewShowEval } from "../../pages/TextbookPages/OverviewShowEval";
import { TextbookPage } from "../../pages/textbookPage";

//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new OverviewShowEval(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/Visualizers/showeval.html')
});

test.describe('3.3 ShowEval Trace Mode', () => {
    test('Clicking the Next Step button displays the next step', async ({ page }) => {
        let textbookPage = new OverviewShowEval(page);
        //check initial state
        await expect(page.locator(textbookPage.showEvalBox2)).not.toContainText("eggs = ['dogs', 'cats', 'moose'] + ham");
        //click next step button
        await page.locator(textbookPage.showEvalNextStep2).click();
        //check for 2nd step
        await expect(page.locator(textbookPage.showEvalBox2)).toContainText("eggs = ['dogs', 'cats', 'moose'] + ham");
        //check initial state after first click of next step button
        await expect(page.locator(textbookPage.showEvalBox2)).not.toContainText("eggs = ['dogs', 'cats', 'moose'] + ['elk', 'salmon']");
        await page.locator(textbookPage.showEvalNextStep2).click();
        //expect final state 
        await expect(page.locator(textbookPage.showEvalBox2)).toContainText("eggs = ['dogs', 'cats', 'moose'] + ['elk', 'salmon']");
    
    });
    
    test('Clicking the Reset button returns to initial state', async ({ page }) => {
        let textbookPage = new OverviewShowEval(page);
        //check initial state
        await expect(page.locator(textbookPage.showEvalBox2)).not.toContainText("eggs = ['dogs', 'cats', 'moose'] + ham");
        await page.locator(textbookPage.showEvalNextStep2).click();
        //contains new text after next step button is clicked
        await expect(page.locator(textbookPage.showEvalBox2)).toContainText("eggs = ['dogs', 'cats', 'moose'] + ham");
        await page.locator(textbookPage.showEvalReset2).click();
        //check if activity returned to initial state
        await expect(page.locator(textbookPage.showEvalBox2)).not.toContainText("eggs = ['dogs', 'cats', 'moose'] + ham");

    });

    test('Clicking the Show Source button shows the source', async ({ page }) => {
        let textbookPage = new OverviewShowEval(page);
        await page.locator(textbookPage.showEvalShowSrc2).click();
        await expect(page.locator(textbookPage.showEvalSrc2)).toBeVisible();
        await expect(page.locator(textbookPage.showEvalSrc2)).toContainText(".. showeval:: showEval_2");
        await expect(page.locator(textbookPage.showEvalSrc2)).toContainText(":trace_mode: true");
        await expect(page.locator(textbookPage.showEvalSrc2)).toContainText("eggs = ['dogs', 'cats', 'moose']");
        await expect(page.locator(textbookPage.showEvalHideSrc2)).toBeVisible();
        
    });

    test('Clicking the Hide Source button hides the source', async ({ page }) => {
        let textbookPage = new OverviewShowEval(page);
        await page.locator(textbookPage.showEvalShowSrc2).click();
        await expect(page.locator(textbookPage.showEvalSrc2)).toBeVisible();
        await expect(page.locator(textbookPage.showEvalHideSrc2)).toBeVisible();
        await page.locator(textbookPage.showEvalHideSrc2).click();
        await expect(page.locator(textbookPage.showEvalSrc2)).not.toBeVisible();
        await expect(page.locator(textbookPage.showEvalShowSrc2)).toBeVisible();
    });

});

test.describe('3.4 ShowEval Replace Mode', () => {
    test('Clicking the Next Step button displays the next step', async ({ page }) => {
        let textbookPage = new OverviewShowEval(page);
        //check initial state
        await expect(page.locator(textbookPage.showEvalBox1)).toContainText(".join(eggs).upper().join(eggs)");
        await expect(page.locator(textbookPage.showEvalBox1)).not.toContainText(".join(['dogs', 'cats', 'moose']).upper().join(eggs)");
        await page.locator(textbookPage.showEvalNextStep1).click();
        //check for 2nd step
        await expect(page.locator(textbookPage.showEvalBox1)).toContainText("'.join(['dogs', 'cats', 'moose']).upper().join(eggs)");
        //check initial state after first click of next step button
        await expect(page.locator(textbookPage.showEvalBox1)).not.toContainText("'dogscatsmoose'.upper().join(eggs)");
        await page.locator(textbookPage.showEvalNextStep1).click();
        //expect 3rd step 
        await expect(page.locator(textbookPage.showEvalBox1)).toContainText("'dogscatsmoose'.upper().join(eggs)");
        await page.locator(textbookPage.showEvalNextStep1).click();
        //4th step
        await expect(page.locator(textbookPage.showEvalBox1)).toContainText("'DOGSCATSMOOSE'.join(eggs)");
        await page.locator(textbookPage.showEvalNextStep1).click();
        //5th step
        await expect(page.locator(textbookPage.showEvalBox1)).toContainText("'DOGSCATSMOOSE'.join(['dogs', 'cats', 'moose'])");
        await page.locator(textbookPage.showEvalNextStep1).click();
        //final step
        await expect(page.locator(textbookPage.showEvalBox1)).toContainText("'dogsDOGSCATSMOOSEcatsDOGSCATSMOOSEmoose'");

    });

    test('Clicking the Reset button reset to initial state', async ({ page }) => {
        let textbookPage = new OverviewShowEval(page);
        //check initial state
        await expect(page.locator(textbookPage.showEvalBox1)).toContainText(".join(eggs).upper().join(eggs)");
        await expect(page.locator(textbookPage.showEvalBox1)).not.toContainText(".join(['dogs', 'cats', 'moose']).upper().join(eggs)");
        await page.locator(textbookPage.showEvalNextStep1).click();
        //check for 2nd step
        await expect(page.locator(textbookPage.showEvalBox1)).toContainText("'.join(['dogs', 'cats', 'moose']).upper().join(eggs)");
        await page.locator(textbookPage.showEvalReset1).click();
        //check to see if reset to initial state
        await expect(page.locator(textbookPage.showEvalBox1)).toContainText(".join(eggs).upper().join(eggs)");
        await expect(page.locator(textbookPage.showEvalBox1)).not.toContainText(".join(['dogs', 'cats', 'moose']).upper().join(eggs)");

    });

    test('Clicking the Show Source button shows the source', async ({ page }) => {
        let textbookPage = new OverviewShowEval(page);
        await page.locator(textbookPage.showEvalShowSrc1).click();
        await expect(page.locator(textbookPage.showEvalSrc1)).toBeVisible();
        await expect(page.locator(textbookPage.showEvalSrc1)).toContainText(".. showeval:: showEval_1");
        await expect(page.locator(textbookPage.showEvalSrc1)).toContainText(":trace_mode: false");
        await expect(page.locator(textbookPage.showEvalSrc1)).toContainText("eggs = ['dogs', 'cats', 'moose']");
        await expect(page.locator(textbookPage.showEvalHideSrc1)).toBeVisible();
    });

    test('Clicking the Hide Source button hides the source', async ({ page }) => {
        let textbookPage = new OverviewShowEval(page);
        await page.locator(textbookPage.showEvalShowSrc1).click();
        await expect(page.locator(textbookPage.showEvalSrc1)).toBeVisible();
        await expect(page.locator(textbookPage.showEvalHideSrc1)).toBeVisible();
        await page.locator(textbookPage.showEvalHideSrc1).click();
        //check to see if source is hidden and Show Source button is displayed instead of Hide Source button
        await expect(page.locator(textbookPage.showEvalSrc1)).not.toBeVisible();
        await expect(page.locator(textbookPage.showEvalShowSrc1)).toBeVisible();
    });

});