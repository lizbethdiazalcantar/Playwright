import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { OverviewDynamicQuestionsABExperiments } from "../../pages/TextbookPages/OverviewDynamicQuestionsABExperimentsPage";
import { text } from "node:stream/consumers";
//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new OverviewDynamicQuestionsABExperiments(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/Containers/dynamic.html')
});
test.describe('Questions appear dynamically to the user based on the group A or B', () => {
      test('Should select each option and display feedback text based on the options chosen for True or False question or the multiple choice question', async ({ page }) => {
        let textbookPage = new OverviewDynamicQuestionsABExperiments(page);
        //To navigate to the 4.3.2. section when the hyperlink for the section is clicked on the Overview page
        await textbookPage.clickABExperimentsSection();        
        const abQuestionSection = page.locator(textbookPage.abQuestionSection);
        await abQuestionSection.locator('text=Loading a dynamic question').waitFor({ state: 'detached' }); //To detach the text "Loading a dynamic question..."
        console.log("Validate question visibility to show feedback text");
        await  textbookPage.validateQuestionVisibilityForFeedbackText();
    });    
     test('The modal "Distribution of answers" appears when clicked "Compare me" button', async ({ page }) => {
        let textbookPage = new OverviewDynamicQuestionsABExperiments(page);
        //To navigate to the 4.3.2. section when the hyperlink for the section is clicked on the Overview page
        await textbookPage.clickABExperimentsSection();
        const abQuestionSection = page.locator(textbookPage.abQuestionSection);
        await abQuestionSection.locator('text=Loading a dynamic question').waitFor({ state: 'detached' }); //To detach the text "Loading a dynamic question..."
        console.log("Validate question visibility for Modal test");
        await textbookPage.validateQuestionVisibilityForModalTest();
    });
      test('Should display the source code when the "Show Source" button is clicked and "Hide Source" button appears', async ({ page }) => {
        let textbookPage = new OverviewDynamicQuestionsABExperiments(page);
        //To navigate to the 4.3.2. section when the hyperlink for the section is clicked on the Overview page
        await textbookPage.clickABExperimentsSection();
        const abQuestionSection = page.locator(textbookPage.abQuestionSection);
        await abQuestionSection.locator('text=Loading a dynamic question').waitFor({ state: 'detached' }); //To detach the text "Loading a dynamic question..." before the question is displayed
        console.log("The Source code is displayed");
        await textbookPage.showSourceButtonMethod();       
        const hideSourceButton = page.locator(textbookPage.hideSourceButton).first();
        await expect(hideSourceButton).toBeEnabled();
        await expect(hideSourceButton).toBeVisible();
    });
    test('Should hide the source code when the "Hide Source" button is clicked and "Show Source" button appears', async ({ page }) => {
        let textbookPage = new OverviewDynamicQuestionsABExperiments(page);
        //To navigate to the 4.3.2. section when the hyperlink for the section is clicked on the Overview page
        await textbookPage.clickABExperimentsSection();
        const abQuestionSection = page.locator(textbookPage.abQuestionSection);
        await abQuestionSection.locator('text=Loading a dynamic question').waitFor({ state: 'detached' }); //To detach the text "Loading a dynamic question..." before the question is displayed
        const showSourceButton = page.locator(textbookPage.showSourceButton).first();
        console.log("The Source code is hidden");
        await textbookPage.hideSourceButtonMethod();
        await expect(showSourceButton).toBeEnabled();
        await expect(showSourceButton).toBeVisible();
    });    
     //Negative test
    test('Should select only one radio button at a time, automatically deselecting other option(s)', async ({ page }) => {  
      let textbookPage = new OverviewDynamicQuestionsABExperiments(page);
       //To navigate to the 4.3.2. section when the hyperlink for the section is clicked on the Overview page  
        await textbookPage.clickABExperimentsSection();
        const abQuestionSection = page.locator(textbookPage.abQuestionSection);
        await abQuestionSection.locator('text=Loading a dynamic question').waitFor({ state: 'detached' }); //To detach the text "Loading a dynamic question..."
        console.log("Validate question visibility for Negative test");
        await textbookPage.validateQuestionVisibilityForNegativeTest(); 

    });
});