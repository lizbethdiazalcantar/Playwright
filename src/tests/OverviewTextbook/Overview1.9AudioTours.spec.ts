import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { OverviewAudioTours } from "../../pages/OverviewAudioTours";


//Go to main page, sign up, go to the chapter 1 active code page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new OverviewAudioTours(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto("/ns/books/published/overview/ActiveCode/audiotours.html");
});

test.describe("Question 1.9 / ch03_4", () => {
  test("Clicking the Save & Run button with no change", async ({ page }) => {
    let textbookPage = new OverviewAudioTours(page);
    await page.locator(textbookPage.saveAndRunButton).nth(0).click();
    expect(page.locator(textbookPage.outputArea)).toBeVisible;
    await textbookPage.verifyInvitationMessages();
   
  });

  test("Clicking show and hide CodeLens", async ({ page }) => {
    let textbookPage = new OverviewAudioTours(page);
    await page.locator(textbookPage.showCodeLens).first().click({ timeout: 5000 });
    await expect(page.locator(textbookPage.codelensFrame)).toBeVisible({ timeout: 10000 });
    await page.locator(textbookPage.hideCodeLens).first().click();
    await expect(page.locator(textbookPage.codelensFrame)).not.toBeVisible({ timeout: 10000 });
  });

  test("Changing text in the print line", async ({ page }) => {
    let textbookPage = new OverviewAudioTours(page);
    await textbookPage.changeCodeMirrorLine(
      `for name in ["Joe", "Amy", "Brad", "Angelina", "Zuki", "Thandi", "Paris"]:`,
      `for name in ["Sam", "Alex", "Taylor"]:`
    );

    await textbookPage.changeCodeMirrorLine(
      `print("Hi", name, "Please come to my party on Saturday!")`,
      `print("Hello", name, "You're invited to my event!")`
    );

    await page.locator(textbookPage.saveAndRunButton).nth(0).click();
    let output = page.locator(textbookPage.outPutArea);
    await expect(output).toBeVisible();
    await expect(output).toContainText("Hello Sam You're invited to my event!");
    await expect(output).toContainText(
      "Hello Alex You're invited to my event!"
    );
    await expect(output).toContainText(
      "Hello Taylor You're invited to my event!"
    );
  });

  test("Clicking show and hide Source", async ({ page }) => {
    let textbookPage = new OverviewAudioTours(page);
    await page.locator(textbookPage.showSource).nth(0).click();
    await expect(page.locator(textbookPage.sourceBox)).toBeVisible();
    await page.locator(textbookPage.hideSource).nth(0).click();
    await expect(page.locator(textbookPage.sourceBox)).not.toBeVisible();
  });
});

test.describe("Save & Run - Negative Scenario", () => {
  test("should display error message when incorrect code is submitted", async ({page,}) => {
    let textbookPage = new OverviewAudioTours(page);
    await page.locator(textbookPage.codeMirrorFirstLine).first().click();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.type('print(Hello');
    await page.locator(textbookPage.saveAndRunButton).first().click();
    await expect(page.locator(textbookPage.errorAlert)).toBeVisible({ timeout: 10000 });
    await expect(page.locator(textbookPage.errorAlert)).toContainText("Error");

    

    
  });
});