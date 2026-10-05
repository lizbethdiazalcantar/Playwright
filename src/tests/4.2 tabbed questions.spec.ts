import { test, expect } from "@playwright/test";
import { SignUpPage } from "../pages/signupPage";
import { OverviewFillInTheBlank } from "../../src/pages/TextbookPages/OverviewFillInTheBlank";
import { text } from "stream/consumers";

//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new OverviewFillInTheBlank(page);
  await signUpPage.signUpRandomUserForOverview();
  await textbookPage.goToFillInTheBlankPage();
});