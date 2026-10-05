import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { OverviewDynamicQuestions } from "../../pages/OverviewDynamicQuestions";
import { text } from "stream/consumers";

//Given part of Gherkin scenario
//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/"); //Goes to homepage of site
  let signUpPage = new SignUpPage(page); //Sign up for random user
  let textbookPage = new OverviewDynamicQuestions(page); //Goes via navigation to page being tested
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/Containers/dynamic.html');
  await page.locator('text=Loading a dynamic question ...Selecting from: question1_2').nth(0).waitFor({ state: 'detached' });
});

test.describe('Question 1 / question1_2', () => {
    test('Clicking the Check Me button without selecting any answers', async ({ page }) => {
        let textbookPage = new OverviewDynamicQuestions(page);
        await page.locator(textbookPage.checkMeButton).nth(0).click();
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('✖️ You gave 0 answers and got 0 correct of 3 needed.');
    });

   test('User selects options: red, yellow, green',async ({ page }) =>{
        let textbookPage = new OverviewDynamicQuestions(page);
        //Wait for question to be visible
        await expect(page.locator(textbookPage.question1_2_Form)).toBeVisible();
        //Click red choice
        await page.locator(textbookPage.redChoice).click();
        //Click yellow choice
        await page.locator(textbookPage.yellowChoice).click();
        //Click green choice
        await page.locator(textbookPage.greenChoice).click();
        //Click Check Me button
        await page.locator(textbookPage.checkMeButton).nth(0).click();
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('✔️');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Red is a definitely on of the colors.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Yes, yellow is correct.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Yes, green is one of the colors.');
    });

    test('User selects options: red, yellow, black, green', async ({page}) => {
        let textbookPage = new OverviewDynamicQuestions(page);
        //Wait for question to be visible
        await expect(page.locator(textbookPage.question1_2_Form)).toBeVisible();
        //Click red choice
        await page.locator(textbookPage.redChoice).click();
        //Click yellow choice
        await page.locator(textbookPage.yellowChoice).click();
        //Click black choice
        await page.locator(textbookPage.blackChoice).click();
        //Click green choice
        await page.locator(textbookPage.greenChoice).click();
    
        //Click Check Me button
        await page.locator(textbookPage.checkMeButton).nth(0).click();
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('✖️ You gave 4 answers and got 3 correct of 3 needed.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Red is a definitely on of the colors.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Yes, yellow is correct.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Remember the acronym…ROY G BIV. B stands for blue.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Yes, green is one of the colors.');
    });

    test('User selects options: red', async ({page}) => {
        let textbookPage = new OverviewDynamicQuestions(page);
        //Wait for question to be visible
        await expect(page.locator(textbookPage.question1_2_Form)).toBeVisible();
        //Click red choice
        await page.locator(textbookPage.redChoice).click();
        //Click Check Me button
        await page.locator(textbookPage.checkMeButton).nth(0).click();
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('✖️ You gave 1 answer and got 1 correct of 3 needed.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Red is a definitely on of the colors.');
    });

    test('User selects options: yellow', async ({page}) => {
        let textbookPage = new OverviewDynamicQuestions(page);
        //Wait for question to be visible
        await expect(page.locator(textbookPage.question1_2_Form)).toBeVisible();
        //Click yellow choice
        await page.locator(textbookPage.yellowChoice).click();
        //Click Check Me button
        await page.locator(textbookPage.checkMeButton).nth(0).click();
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('✖️ You gave 1 answer and got 1 correct of 3 needed.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Yes, yellow is correct.');
    });

    test('User selects options: black', async ({page}) => {
        let textbookPage = new OverviewDynamicQuestions(page);
        //Wait for question to be visible
        await expect(page.locator(textbookPage.question1_2_Form)).toBeVisible();
        //Click black choice
        await page.locator(textbookPage.blackChoice).click();
        //Click Check Me button
        await page.locator(textbookPage.checkMeButton).nth(0).click();
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('✖️ You gave 1 answer and got 0 correct of 3 needed.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Remember the acronym…ROY G BIV. B stands for blue.');
    });

    test('User selects options: green', async ({page}) => {
        let textbookPage = new OverviewDynamicQuestions(page);
        //Wait for question to be visible
        await expect(page.locator(textbookPage.question1_2_Form)).toBeVisible();
        //Click green choice
        await page.locator(textbookPage.greenChoice).click();
        //Click Check Me button
        await page.locator(textbookPage.checkMeButton).nth(0).click();
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('✖️ You gave 1 answer and got 1 correct of 3 needed.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Yes, green is one of the colors.');
    });

    test('User selects options: red, yellow', async ({page}) => {
        let textbookPage = new OverviewDynamicQuestions(page);
        //Wait for question to be visible
        await expect(page.locator(textbookPage.question1_2_Form)).toBeVisible();
        //Click red choice
        await page.locator(textbookPage.redChoice).click();
        //Click yellow choice
        await page.locator(textbookPage.yellowChoice).click();
        //Click Check Me button
        await page.locator(textbookPage.checkMeButton).nth(0).click();
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('✖️ You gave 2 answers and got 2 correct of 3 needed.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Red is a definitely on of the colors.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Yes, yellow is correct.');
    });

    test('User selects options: red, black', async ({page}) => {
        let textbookPage = new OverviewDynamicQuestions(page);
        //Wait for question to be visible
        await expect(page.locator(textbookPage.question1_2_Form)).toBeVisible();
        //Click red choice
        await page.locator(textbookPage.redChoice).click();
        //Click black choice
        await page.locator(textbookPage.blackChoice).click();
        //Click Check Me button
        await page.locator(textbookPage.checkMeButton).nth(0).click();
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('✖️ You gave 2 answers and got 1 correct of 3 needed.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Red is a definitely on of the colors.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Remember the acronym…ROY G BIV. B stands for blue.');
    });

    test('User selects options: red, green', async ({page}) => {
        let textbookPage = new OverviewDynamicQuestions(page);
        //Wait for question to be visible
        await expect(page.locator(textbookPage.question1_2_Form)).toBeVisible();
        //Click red choice
        await page.locator(textbookPage.redChoice).click();
        //Click green choice
        await page.locator(textbookPage.greenChoice).click();
        //Click Check Me button
        await page.locator(textbookPage.checkMeButton).nth(0).click();
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('✖️ You gave 2 answers and got 2 correct of 3 needed.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Red is a definitely on of the colors.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Yes, green is one of the colors.');
    });

    test('User selects options: yellow, black', async ({page}) => {
        let textbookPage = new OverviewDynamicQuestions(page);
        //Wait for question to be visible
        await expect(page.locator(textbookPage.question1_2_Form)).toBeVisible();
        //Click yellow choice
        await page.locator(textbookPage.yellowChoice).click();
        //Click black choice
        await page.locator(textbookPage.blackChoice).click();
        //Click Check Me button
        await page.locator(textbookPage.checkMeButton).nth(0).click();
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('✖️ You gave 2 answers and got 1 correct of 3 needed.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Yes, yellow is correct.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Remember the acronym…ROY G BIV. B stands for blue.');
    });

    test('User selects options: yellow, green', async ({page}) => {
        let textbookPage = new OverviewDynamicQuestions(page);
        //Wait for question to be visible
        await expect(page.locator(textbookPage.question1_2_Form)).toBeVisible();
        //Click yellow choice
        await page.locator(textbookPage.yellowChoice).click();
        //Click green choice
        await page.locator(textbookPage.greenChoice).click();
        //Click Check Me button
        await page.locator(textbookPage.checkMeButton).nth(0).click();
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('✖️ You gave 2 answers and got 2 correct of 3 needed.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Yes, yellow is correct.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Yes, green is one of the colors.');
    });

    test('User selects options: black, green', async ({page}) => {
        let textbookPage = new OverviewDynamicQuestions(page);
        //Wait for question to be visible
        await expect(page.locator(textbookPage.question1_2_Form)).toBeVisible();
        //Click black choice
        await page.locator(textbookPage.blackChoice).click();
        //Click green choice
        await page.locator(textbookPage.greenChoice).click();
        //Click Check Me button
        await page.locator(textbookPage.checkMeButton).nth(0).click();
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('✖️ You gave 2 answers and got 1 correct of 3 needed.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Remember the acronym…ROY G BIV. B stands for blue.');
        await expect(page.locator(textbookPage.question1_2Output)).toContainText('Yes, green is one of the colors.');
    });


    test('User clicks Show Source button', async ({page}) => {
        let textbookPage = new OverviewDynamicQuestions(page);
        let sourceCodeButton = page.locator(textbookPage.showSourceButton);

        //Wait for Show Source button to be visible
        await expect(sourceCodeButton).toBeVisible();
        //Click Show Source button
        await sourceCodeButton.click();
        let sourceCodeFieldBox= page.locator(textbookPage.sourceCodeField);

        //Source code box should be visible
        await expect(sourceCodeFieldBox).toBeVisible();
        //After clicking Show Source, the Hide Source button should be visible
        console.log('\nChecking content of source code box');
        await expect(sourceCodeFieldBox).toContainText('.. selectquestion:: dynamic_q_1');
        await expect(sourceCodeFieldBox).toContainText(':fromid: question1_2');

    });

    test('User clicks Hide Source button', async ({page}) => {
        let textbookPage = new OverviewDynamicQuestions(page);
        //Wait for Show Source button to be visible
        await expect(page.locator(textbookPage.showSourceButton)).toBeVisible();
        //Click Show Source button
        await page.locator(textbookPage.showSourceButton).nth(0).click();
        //After clicking Show Source, the Hide Source button should be visible
        await expect(page.locator(textbookPage.hideSourceButton)).toBeVisible();
        //Click Hide Source button
        await page.locator(textbookPage.hideSourceButton).nth(0).click();
        //After clicking Hide Source, the Show Source button should be visible again
        await expect(page.locator(textbookPage.showSourceButton)).toBeVisible();
        //Source code box should be hidden

    });

    test('User clicks on the Compare Me button selecting at least one answer', async ({page}) => {
        let textbookPage = new OverviewDynamicQuestions(page);
        await page.click(textbookPage.redChoice);
        await page.locator(textbookPage.checkMeButton).nth(0).click();
        // Wait for Compare Me button to be visible
        await expect(page.locator(textbookPage.compareMeButton)).toBeVisible();
        // Click on Compare Me button
        await page.locator(textbookPage.compareMeButton).nth(0).click();
        // Pop up should appear once Compare Me button is clicked
        let compareMePopup = page.locator('text=Distribution of Answers');
        await expect(compareMePopup).toBeVisible();
        
    });

    test('User clicks on the Compare Me button without selecting any answers', async ({page}) => {
        let textbookPage = new OverviewDynamicQuestions(page);
        // Wait for Compare Me button to be visible
        await expect(page.locator(textbookPage.compareMeButton)).toBeVisible();
        //Compare Me button should be disabled if no answers are selected
        await expect(page.locator(textbookPage.compareMeButton)).toBeDisabled();

    });

    


});