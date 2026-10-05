import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { OverviewCodeHTML } from "../../pages/TextbookPages/OverviewCodeHTML";


//Go to main page, sign up, go to the chapter 1 active code page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`); 
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new OverviewCodeHTML(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/ActiveCode/html.html')
});


test.describe('Question 1.10 / html1', () => {
    test('Clicking the Save & Render button with no change', async ({ page }) => {
        let textbookPage = new OverviewCodeHTML(page);
        await page.locator(textbookPage.saveAndRun).nth(0).click();
        let iframe = page.frameLocator(textbookPage.outPutIframe);
        let body = iframe.locator(textbookPage.iframeBody);
        await expect(body).toBeVisible();
        let heading = iframe.locator(textbookPage.iframeHeading);
        await expect(heading).toBeVisible();
        await expect(heading).toHaveText('Hello World');
        let listItemOne = iframe.locator(textbookPage.listItem).nth(0);
        let listItemTwo = iframe.locator(textbookPage.listItem).nth(1);
        await expect(listItemOne).toHaveText('one');
        await expect(listItemTwo).toHaveText('two');

      });

    test("should display error and not render output when incorrect HTML is submitted", async ({ page }) => {
        let textbookPage = new OverviewCodeHTML(page);
        await page.locator(textbookPage.codeMirrorFirstLine).first().click();
        await page.keyboard.press('Control+A');
        await page.keyboard.press('Backspace');
        await page.keyboard.type('<h2>Hello World');
        await page.locator(textbookPage.saveAndRun).nth(0).click();
        await page.waitForTimeout(1000);
        let iframe = page.frameLocator(textbookPage.outPutIframe);
        let heading = iframe.locator(textbookPage.iframeHeading);
        let listItem = iframe.locator(textbookPage.listItem);
        await expect(heading).toBeVisible();
        const errorAlert = page.locator(textbookPage.errorAlert);
        if (await errorAlert.count()) {
        await expect(errorAlert).toBeVisible();
        await expect(errorAlert).toContainText('Error');
        }
       
       });
    test('Clicking show and hide Source', async ({ page }) => {
                let textbookPage = new OverviewCodeHTML(page);
                await page.locator(textbookPage.showSource).nth(0).click();
                await expect(page.locator(textbookPage.sourceBox)).toBeVisible();;
                await page.locator(textbookPage.hideSource).nth(0).click();
                await expect(page.locator(textbookPage.sourceBox)).not.toBeVisible(); 

        });


});