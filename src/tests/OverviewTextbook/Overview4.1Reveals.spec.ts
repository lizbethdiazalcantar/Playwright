import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { OverviewReveals } from "../../pages/TextbookPages/OverviewReveals";


//Given part of Gherkin scenario
//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/"); //Goes to homepage of site
  let signUpPage = new SignUpPage(page); //Sign up for random user
  let textbookPage = new OverviewReveals(page); //Goes via navigation to page being tested
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/Containers/reveal.html');
  //await page.locator('text=Loading a dynamic question ...Selecting from: question1_2').nth(0).waitFor({ state: 'detached' });
});

test.describe('4.1 Reveals / question 1', () => {
    test('User clicks Reveal Content', async ({ page }) => {
        let textbookPage = new OverviewReveals(page);
        // Reveal content button should be visible
        await expect(page.locator(textbookPage.revealContentButton)).toBeVisible();
        // Click on Reveal Content button
        await page.locator(textbookPage.revealContentButton).nth(0).click();
        //Hide content button should be visible after clicking Reveal Content
        await expect(page.locator(textbookPage.hideContentButton)).toBeVisible();
        await expect(page.locator(textbookPage.revealContentButton)).not.toBeVisible();
    });

    test('User clicks Hide Content button', async ({ page}) => {
        let textbookPage = new OverviewReveals(page);
        //Reveal content visible and clicked on
        await expect(page.locator(textbookPage.revealContentButton)).toBeVisible();
        await page.locator(textbookPage.revealContentButton).nth(0).click(); 

        //Hide content button should be visible and clicked on
        await expect(page.locator(textbookPage.hideContentButton)).toBeVisible();
        await page.locator(textbookPage.hideContentButton).nth(0).click();

        //Clicking Hide Content button shoukd make reveal content visible
        await expect(page.locator(textbookPage.revealContentButton)).toBeVisible();
    });

    test('User clicks Show Source button', async ({ page}) => {
        let textbookPage = new OverviewReveals(page);
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
        await expect(sourceCodeFieldBox).toContainText('.. reveal:: revealid1');
        await expect(sourceCodeFieldBox).toContainText(':showtitle: Reveal Content');
        await expect(sourceCodeFieldBox).toContainText(':hidetitle: Hide Content');
        await expect(sourceCodeFieldBox).toContainText('This content starts out hidden. It\'s visibility can be toggled by using the Show/Hide button.');
        await expect(sourceCodeFieldBox).toContainText('The reveal block can also contain other directives (ActiveCode, Disqus block, etc):');
        await expect(sourceCodeFieldBox).toContainText('.. activecode:: ac11');
        await expect(sourceCodeFieldBox).toContainText('print ("Hello, world")');
        
        await expect(page.locator(textbookPage.hideSourceButton)).toBeVisible();

    });

    test('User clicks on the Save and Run button', async ({ page }) => {
        let textbookPage = new OverviewReveals(page);
        //Click Reveal Content button to make sure the content is visible
        await expect(page.locator(textbookPage.revealContentButton)).toBeVisible();
        await page.locator(textbookPage.revealContentButton).nth(0).click();

        //Click Save & Run button
        const saveRunButton = await page.locator('//button[normalize-space(text())="Save & Run"]').first();
        
        await expect(saveRunButton).toBeVisible();
        await saveRunButton.click();

        //Check correct output displayed in output field
        await expect(page.locator(textbookPage.saveRunOutput)).toBeVisible();
        console.log('\nChecking content of output field');
        await expect(page.locator(textbookPage.saveRunOutput)).toContainText('Hello, world');
    });

    test('User clicks Show in CodeLens button', async ({ page }) => {
        let textbookPage = new OverviewReveals(page);
        const codeLensFrame = page.locator('#ac11_codelens');

        //Click Reveal Content button to make sure the content is visible
        await expect(page.locator(textbookPage.revealContentButton)).toBeVisible();
        await page.locator(textbookPage.revealContentButton).nth(0).click();

        // Click Show in CodeLens button
        const codeLensButton = await page.locator('//button[normalize-space(text())="Show CodeLens"]').first();
        await expect(codeLensButton).toBeVisible();
        await codeLensButton.click();
        

        // CodeLens block should be visible
        const codeLensBlock = await codeLensFrame.contentFrame(); 
        const visibleFrame = await codeLensFrame.first().isVisible();
        expect(visibleFrame).toBe(true);
        
    });

 



});