import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { OverviewDragNdrop } from "../../pages/TextbookPages/OverviewDragNdrop";

//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new OverviewDragNdrop(page);
  await signUpPage.signUpRandomUserForOverview();
  await textbookPage.goToDragNdropPage();
});

test("Goto Drag N Drop page and verify all functional elements are visibile", async ({
  page,
}) => {
  const textbookPage = new OverviewDragNdrop(page);
  // Go to the Drag N Drop page
  await textbookPage.goToDragNdropPage();
  // Verify Drag N Drop Box visibility
  await expect(textbookPage.dragNdropBox1).toBeVisible();
  await expect(textbookPage.dragNdropBox2).toBeVisible();
  // Verify draggable elements visibility
  await expect(textbookPage.monroeDoctrine).toBeVisible();
  await expect(textbookPage.haymarket).toBeVisible();
  await expect(textbookPage.louisianaPurchase).toBeVisible();
  await expect(textbookPage.gettysburg).toBeVisible();
});
test("Drag and Drop elements to the correct answer box", async ({ page }) => {
  const textbookPage = new OverviewDragNdrop(page);
  // Go to the Drag N Drop page
  await textbookPage.goToDragNdropPage();
  // Drag and drop elements to the correct answer box
  await textbookPage.dragToCorrectAnswer();
  // Verify the results
  await expect(textbookPage.resultsCorrect).toBeVisible();
});

test("Drag and Drop to the Incorrect answer box with 4 incorrect answers", async ({
  page,
}) => {
  const textbookPage = new OverviewDragNdrop(page);
  await textbookPage.goToDragNdropPage();
  await textbookPage.dragTo4InCorrectAnswer();

  // Validate the results
  const results = await textbookPage.validateResults(0, 4);
  expect(results.incorrect).toBe(4);
});
test("Drag and Drop to the Incorrect answer box with 3 incorrect answers", async ({
  page,
}) => {
  const textbookPage = new OverviewDragNdrop(page);
  await textbookPage.goToDragNdropPage();
  await textbookPage.dragTo3InCorrectAnswer();

  // Validate the results
  const results = await textbookPage.validateResults(1, 3);
  await expect(results.incorrect).toBe(3);
});
test("Drag and Drop to the Incorrect answer box with 2 incorrect answers", async ({
  page,
}) => {
  const textbookPage = new OverviewDragNdrop(page);
  await textbookPage.goToDragNdropPage();
  await textbookPage.dragTo2InCorrectAnswer();

  // Validate the results
  const results = await textbookPage.validateResults(3, 2);
  await expect(results.incorrect).toBe(2);
});
test("should show 3 correct and 0 incorrect when one answer is left unanswered", async ({
  page,
}) => {
  const textbookPage = new OverviewDragNdrop(page);
  await textbookPage.goToDragNdropPage();
  await textbookPage.dragTo1InCorrectAnswer();

  // Validate the results
  const results = await textbookPage.validateResults(3, 0);
  await expect(results.correct).toBe(3);
  await expect(results.incorrect).toBe(0);
});
