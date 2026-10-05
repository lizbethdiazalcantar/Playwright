import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { OverviewClickableAreaPage } from "../../pages/TextbookPages/OverviewClickableAreaPage";

//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new OverviewClickableAreaPage(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/Assessments/clickable.html')
});

test.describe('Incorrect answers', () => {

    test('Clicking the Check Me button without selecting anything displays error', async ({ page }) => {
        let textbookPage = await new OverviewClickableAreaPage(page);
        await page.locator(textbookPage.checkButton).click();
        await expect(page.locator(textbookPage.errorMessage)).toContainText('Incorrect. You clicked on 0 of the 2 correct elements and 0 of the 2 incorrect elements.');
        await expect(page.locator(textbookPage.errorMessage)).toContainText('Remember, the operator \'=\' is used for assignment.');
    });

    test('Clicking the only x=4 shows error', async ({ page }) => {
        let textbookPage = await new OverviewClickableAreaPage(page);
        await textbookPage.clickTheLineWith('x = 4');
        await page.locator(textbookPage.checkButton).click();
        await expect(page.locator(textbookPage.errorMessage)).toContainText('Incorrect. You clicked on 1 of the 2 correct elements and 0 of the 2 incorrect elements.');
        await expect(page.locator(textbookPage.errorMessage)).toContainText('Remember, the operator \'=\' is used for assignment.');
    });

    test('Clicking the only y=i shows error', async ({ page }) => {
        let textbookPage = await new OverviewClickableAreaPage(page);
        await textbookPage.clickTheLineWith('y = i');
        await page.locator(textbookPage.checkButton).click();
        await expect(page.locator(textbookPage.errorMessage)).toContainText('Incorrect. You clicked on 1 of the 2 correct elements and 0 of the 2 incorrect elements.');
        await expect(page.locator(textbookPage.errorMessage)).toContainText('Remember, the operator \'=\' is used for assignment.');
    });

    test('Clicking correct answers plus another line shows error', async ({ page }) => {
        let textbookPage = await new OverviewClickableAreaPage(page);
        await textbookPage.clickTheLineWith('x = 4');
        await textbookPage.clickTheLineWith('y = i');
        await textbookPage.clickTheLineWith('if y > 2:');
        await page.locator(textbookPage.checkButton).click();
        await expect(page.locator(textbookPage.errorMessage)).toContainText('Incorrect. You clicked on 2 of the 2 correct elements and 1 of the 2 incorrect elements.');
        await expect(page.locator(textbookPage.errorMessage)).toContainText('Remember, the operator \'=\' is used for assignment.');
    });


});

test.describe('Correct answer', () => {

    test('Clicking the Check Me button without selecting anything displays error', async ({ page }) => {
        let textbookPage = await new OverviewClickableAreaPage(page);
        
        await textbookPage.clickTheLineWith('x = 4');
        await textbookPage.clickTheLineWith('y = i');
        await page.locator(textbookPage.checkButton).click();
        await expect(page.locator(textbookPage.correctMessage)).toContainText('You are Correct!');
       
    });

});

test.describe('Other page elements', () => {

    test('Clicking the Show Source and Hide Source buttons work properly', async ({ page }) => {
        let textbookPage = await new OverviewClickableAreaPage(page);
        
        await expect(page.locator(textbookPage.sourceTextArea)).toBeHidden();
        await page.locator(textbookPage.showSourceButton).click();
        await expect(page.locator(textbookPage.sourceTextArea)).toBeVisible();
        await expect(page.locator(textbookPage.sourceTextArea)).toContainText('Click on all assignment statements.');
        
        await page.locator(textbookPage.hideSourceButton).click();
        await expect(page.locator(textbookPage.sourceTextArea)).toBeHidden();
        

    });

    
    test('Clicking the Show Source and Hide PreTeXt buttons work properly', async ({ page }) => {
        let textbookPage = await new OverviewClickableAreaPage(page);
        
        await expect(page.locator(textbookPage.pretextTextArea)).toBeHidden();
        await page.locator(textbookPage.showPretextButton).click();
        await expect(page.locator(textbookPage.pretextTextArea)).toBeVisible();
        await expect(page.locator(textbookPage.pretextTextArea)).toContainText('"clickable-code"');
        
        await page.locator(textbookPage.hidePretextButton).click();
        await expect(page.locator(textbookPage.pretextTextArea)).toBeHidden();
        

    });

});

