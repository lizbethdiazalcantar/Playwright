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
 
test('User sees output after clicking "Save and Run"', async ({ page }) => {
    const textbookPage = new OverviewActiveCodeExampleInPython(page);
    await page.locator('//button[normalize-space(text())="Save & Run"]').first().click();
    await expect(page.locator('#over_ac_example1_stdout')).toBeVisible();
    await expect(page.locator('#over_ac_example1_stdout')).toContainText('My first program adds a list of numbers');
    await expect(page.locator('#over_ac_example1_stdout')).toContainText('30');
});
test('User views code in Codelens after clicking Show Codelens', async ({ page }) => {
    const textbookPage = new OverviewActiveCodeExampleInPython(page);
    await page.locator('//button[normalize-space(text())="Show CodeLens"]').first().click();
    await expect(page.locator('//iframe[@id="over_ac_example1_codelens"]')).toBeVisible();
});

test('The activecode example is visible before the user clicks Save and Run', async ({ page }) => {
    const textbookPage = new OverviewActiveCodeExampleInPython(page);
        await expect(page.locator('#over_ac_example1_stdout')).not.toBeVisible();
            await textbookPage.changeCodeMirrorLine(
                `print("My first program adds a list of numbers")`,
                `print("My first program adds a list of numbers")`
            );
        });
    
test('User can view the code source after clicking Show Source button', async ({ page }) => {
    const textbookPage = new OverviewActiveCodeExampleInPython(page);
    await page.locator('#codeexample1_src_show').click();
    await expect(page.locator('#codeexample1_src')).toBeVisible();
});
// This test kept failing no matter what code changes were made
test('User hides source with Hide Source button', async ({ page }) => {
    await page.locator('#codeexample1_src_show').click();
    await expect(page.locator('#codeexample1_src .highlight pre')).toBeVisible();
    await page.locator('#codeexample1_src_hide').click();
    await expect(page.locator('#codeexample1_src .highlight pre')).not.toBeVisible();
});
test('User can view the code pre-text after clicking the Show Pre-text button', async ({ page }) => {
    await page.locator('#ptx_active1_src_show').click();
    
    // Confirm that the pre-text element is now visible
    await expect(page.locator('#ptx_active1_src .highlight pre')).toBeVisible();
});
// This test kept failing no matter what code changes were made

 test('User hides pre-text after clicking the Hide Pre-text button', async ({ page }) => {
    await page.locator('#ptx_active1_src_show').click();
    await expect(page.locator('#ptx_active1_src .highlight pre')).toBeVisible();
    await page.locator('#ptx_active1_src_hide').click();
    await expect(page.locator('#ptx_active1_src .highlight pre')).not.toBeVisible();
});

