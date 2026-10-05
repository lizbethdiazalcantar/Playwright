import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { OverviewActiveCodeExampleInPython } from "../../pages/TextbookPages/OverviewActiveCodeExamplesInPython";

//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new OverviewActiveCodeExampleInPython(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/ActiveCode/python.html')
});

/* Not sure how to get the image URL from the canvas element.
test('Verify that the user can view the golden_gate.png picture after clicking Save and Run', async ({ page }) => {
    // Click the "Save and Run" button before checking for the image
    const saveAndRunButton = page.locator('//button[normalize-space(text())="Save & Run"]').first();
    await expect(saveAndRunButton).toBeVisible({ timeout: 10000 });
    await expect(saveAndRunButton).toBeEnabled();
    await saveAndRunButton.click();

    // Wait for the image to be visible before clicking
    const image = page.locator('#golden_gate_ex img[src*="golden_gate.png"]');
    await expect(image).toBeVisible({ timeout: 10_000 });
    await image.click();

    // Make sure the image really loaded
    const width = await image.evaluate((img: HTMLImageElement) => img.naturalWidth);
    expect(width).toBeGreaterThan(0);
});
*/
test('Try to rename the image and click the Save & Run button', async ({ page }) => {
  // navigate, wait for editor, then perform the rename
  await page.goto('/ns/books/published/overview/ActiveCode/python.html');
  await expect(page.locator('.CodeMirror-code').first()).toBeVisible({ timeout: 10000 });

  const textbookPage = new OverviewActiveCodeExampleInPython(page);
  await textbookPage.changeCodeMirrorLine(
    'img = image.Image("golden_gate.png")',
    'img = image.Image("golden_gate_wrong.png")'
  );

  const saveAndRunButton = page.locator('//button[normalize-space(text())="Save & Run"]').first();
  await expect(saveAndRunButton).toBeVisible({ timeout: 10000 });
  await expect(saveAndRunButton).toBeEnabled();
  await saveAndRunButton.click();

  //await expect(page.locator('.CodeMirror-line')).toBeVisible();
  await expect(page.getByText('img = image.Image("golden_gate_wrong.png")')).toBeVisible();
});

test('activecode Show and Hide Source buttons behave as expected', async ({ page }) => {
  // First reveal the source so we can hide it
  await page.locator('#act_ip_1_rev_show').click();
  await expect(page.locator('#act_ip_1_rev .highlight pre')).toBeVisible();
  await expect(page.locator('#act_ip_1_rev .highlight pre')).toContainText('.. activecode::  act_ip_1')

  // Now hide it
  await page.locator('#act_ip_1_rev_hide').click();
  await expect(page.locator('#act_ip_1_rev .highlight pre')).toBeHidden();
});


test('Golden Gate Show and Hide Source buttons behave as expected', async ({ page }) => {
  // First reveal the source so we can hide it
  await page.locator('#golden_gate_ex_show').click();
  await expect(page.locator('#golden_gate_ex .highlight pre')).toBeVisible();
  await expect(page.locator('#golden_gate_ex .highlight pre')).toContainText('.. datafile:: golden_gate.png')

  // Now hide it
  await page.locator('#golden_gate_ex_hide').click();
  await expect(page.locator('#golden_gate_ex .highlight pre')).toBeHidden();
});
