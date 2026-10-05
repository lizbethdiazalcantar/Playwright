import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { OverviewFillInTheBlank } from "../../pages/TextbookPages/OverviewFillInTheBlank";
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

test("Goto Fill in the Blank page and verify all funcitonal elements are visibile", async ({
  page,
}) => {
  const textbookPage = new OverviewFillInTheBlank(page);
  // Go to the Fill in the Blank page
  await textbookPage.goToFillInTheBlankPage();
  // Verify PreText button visibility
  await expect(textbookPage.showPreTextButton).toBeVisible();
  // Verify Progress title visibility
  await expect(textbookPage.progressStatus).toBeVisible();
  // Verify Mark Complete button visibility
  await expect(textbookPage.markAsCompleteButton).toBeVisible();
});

test("Fill in Activity 2.2.1 with '10' and verify Correct message", async ({
  page,
}) => {
  let textbookPage = new OverviewFillInTheBlank(page);
  await textbookPage.activityText.waitFor({ timeout: 7000 });
  await expect(textbookPage.activityText).toBeVisible();
  // Fill in the blank with "10"
  await textbookPage.activity1FillInput.highlight();
  await textbookPage.fillInput(1, "10");

  // Click "Check Me" button
  await textbookPage.clickCheckMe(1);

  // Verify the "Correct" message appears
  await textbookPage.activity1Correct.waitFor({ timeout: 7000 });
  await expect(textbookPage.activity1Correct).toBeVisible();

  // Click "CompareMe" button
  await textbookPage.clickCompareMe(1);
  // Click the "X" button to close the Top Answer
  await textbookPage.closeTopAnswerModal();
  // Verify the Top Answer is not visible
  await expect(textbookPage.topAnswer).not.toBeVisible();

  // Click "Show Source" button
  await textbookPage.clickShowSource(1);
  await textbookPage.showSourceContent(1);
  await expect(textbookPage.sourceContent).not.toBeVisible();

  // Click "PreText" button
  await textbookPage.clickPreTextButton();
  await expect(textbookPage.preTextContent).not.toBeVisible();
});

test("Fill in Activity 2.2.1 with '10' and verify InCorrect message", async ({
  page,
}) => {
  let textbookPage = new OverviewFillInTheBlank(page);
  await textbookPage.activityText.waitFor({ timeout: 7000 });
  await expect(textbookPage.activityText).toBeVisible();
  // Fill in the blank with "10"
  await textbookPage.activity1FillInput.highlight();
  await textbookPage.fillInput(1, "5");

  // Click "Check Me" button
  await textbookPage.clickCheckMe(1);

  // Verify the "Correct" message appears
  await textbookPage.activity1Wrong.waitFor({ timeout: 7000 });
  await expect(textbookPage.activity1Wrong).toBeVisible();
});

test("Activity 2.2.2 - Verify correct input and interactions", async ({
  page,
}) => {
  const textbookPage = new OverviewFillInTheBlank(page);

  // Navigate to Fill in the Blank Page
  await textbookPage.goToFillInTheBlankPage();

  // Ensure Activity 2 is visible
  await expect(textbookPage.activity2Container).toBeVisible();

  // Fill both input fields
  await textbookPage.activity2FillInput1.highlight();
  await textbookPage.activity2FillInput2.highlight();
  await textbookPage.fillInput(2, "int", "5");

  // Click "Check Me" button
  await textbookPage.clickCheckMe(2);

  // Verify correct message appears
  await textbookPage.activity2Correct.waitFor({ timeout: 7000 });
  await expect(
    textbookPage.activity2Correct.getByText(
      "✔️ Correct. You typically use whole numbers for ages after age 1. ✔️ Correct."
    )
  ).toBeVisible();

  // Click "CompareMe" button
  await textbookPage.clickCompareMe(2);
  // Click the "X" button to close the Top Answer
  await textbookPage.closeTopAnswerModal();
  // Verify the Top Answer is not visible
  await expect(textbookPage.topAnswer).not.toBeVisible();

  // Click "Show Source" button
  await textbookPage.clickShowSource(2);
  await textbookPage.showSourceContent(2);
  await expect(textbookPage.sourceContent2).not.toBeVisible();
});

test("Fill in Activity 2.2.3 and verify Correct message", async ({ page }) => {
  let textbookPage = new OverviewFillInTheBlank(page);

  // Wait for Activity 3 to be visible
  await textbookPage.activity3Text.waitFor({ timeout: 7000 });
  await expect(textbookPage.activity3Text).toBeVisible();

  // Fill in the blank with the correct answer (modify value as needed)

  await textbookPage.activity3FillInput.highlight();
  await textbookPage.fillInput(3, "no");

  // Click "Check Me" button
  await textbookPage.clickCheckMe(3);

  // Verify the "Correct" message appears
  await textbookPage.activity3Correct.waitFor({ timeout: 7000 });
  await expect(textbookPage.activity3Correct).toBeVisible();

  // Click "Compare Me" button
  await textbookPage.clickCompareMe(3);
  // Click the "X" button to close the Top Answer
  await textbookPage.closeTopAnswerModal();
  // Verify the Top Answer is not visible
  await expect(textbookPage.topAnswer).not.toBeVisible();

  // Click "Show Source" button
  await textbookPage.clickShowSource(3);
  await textbookPage.showSourceContent(3);
  await expect(textbookPage.sourceContent3).not.toBeVisible();
});

test("Fill in Activity 2.2.4 and verify Correct message", async ({ page }) => {
  let textbookPage = new OverviewFillInTheBlank(page);

  // Wait for Activity 4 to be visible
  await textbookPage.activity4Text.waitFor({ timeout: 7000 });
  await expect(textbookPage.activity4Text).toBeVisible();

  // Fill in the blank with the correct answer (modify value as needed)
  await textbookPage.activity4FillInput.highlight();
  await textbookPage.fillInput(4, "0.33333");

  // Click "Check Me" button
  await textbookPage.clickCheckMe(4);

  // Verify the "Correct" message appears
  await textbookPage.activity4Correct.waitFor({ timeout: 7000 });
  await expect(textbookPage.activity4Correct).toBeVisible();

  // Click "Compare Me" button
  await textbookPage.clickCompareMe(4);
  // Click the "X" button to close the Top Answer
  await textbookPage.closeTopAnswerModal();
  // Verify the Top Answer is not visible
  await expect(textbookPage.topAnswer).not.toBeVisible();

  // Click "Show Source" button
  await textbookPage.clickShowSource(4);
  await textbookPage.showSourceContent(4);
  await expect(textbookPage.sourceContent4).not.toBeVisible();
});
