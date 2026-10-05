import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { TabbedQuestionsPage } from "../../pages/TextbookPages/tabbedquestions";

//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new TabbedQuestionsPage(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/Containers/tabbed.html');
  });

test('Opening the page displays the tabbed questions', async ({ page }) => {
  let textbookPage = new TabbedQuestionsPage(page);
  await expect(page.locator('#exercise1-0')).toBeVisible();
  await expect(page.locator('#exercise1-0')).toContainText('Write a program that prints “Hello, world”.');
  await expect(page.locator('#helloworld')).toBeVisible();
});

test('Clicking the Save & Run button displays the answer', async ({ page }) => {
  let textbookPage = new TabbedQuestionsPage(page);
  let saveAndRunButton = textbookPage.saveAndRunButton;
  await expect(page.locator('#exercise1-0')).toBeVisible();
  await expect(page.locator('#exercise1-0')).toContainText('Write a program that prints “Hello, world”.');
  // Click the Save & Run button
  await page.locator('//button[normalize-space(text())="Save & Run"]').nth(0).click();
});

test('Inputting the wrong answer displays the error message', async ({ page }) => {
  let textbookPage = new TabbedQuestionsPage(page);
  let saveAndRunButton = textbookPage.saveAndRunButton;
  await expect(page.locator('#exercise1-0')).toBeVisible();
  await expect(page.locator('#exercise1-0')).toContainText('Write a program that prints');
  await expect(page.locator('#exercise1-0')).toContainText('Hello, world');
  await textbookPage.changeCodeMirrorLine(`print("Hello, world")`, `print("Heya, world!)`);
  await page.locator('//button[normalize-space(text())="Save & Run"]').nth(0).click()
// Click the Save & Run button
await expect(page.locator('.codecoach').nth(0)).toBeVisible();
await expect(page.locator('.codecoach').nth(0)).toContainText('Code Coach');
await expect(page.locator('.codecoach').nth(0)).toContainText('Line1: unterminated string literal (detected at line 1');
await expect(page.locator('.codecoach').nth(0)).toContainText('print("Heya, world!)');
});

test('Clicking the discussion button displays the discussion', async ({ page }) => {
  let textbookPage = new TabbedQuestionsPage(page);
  await expect(page.locator('#exercise1-0')).toBeVisible();
  await expect(page.locator('#exercise1-0')).toContainText('Write a program that prints “Hello, world”.');
  await expect(page.locator('//ul[@id="exercise1_tab"]//a[span[text()="Discussion"]]')).toBeVisible();
  // Click the Discussion tab
  await page.locator('//ul[@id="exercise1_tab"]//a[span[text()="Discussion"]]').click();
  await expect(page.locator('#exercise1-1')).toContainText('Show Comments');
  await expect(page.locator('#disqus_thread')).toBeVisible();
});

test('Clicking the code lens button displays the code lens', async ({ page }) => {
  let textbookPage = new TabbedQuestionsPage(page);
  await expect(page.locator('#exercise1-0')).toBeVisible();
  await expect(page.locator('#exercise1-0')).toContainText('Write a program that prints “Hello, world”.');
  await expect(page.locator('//button[text()="Show CodeLens"]').nth(0)).toBeVisible();
  // Click the Code Lens tab
  await page.locator('//button[text()="Show CodeLens"]').nth(0).click();
  await textbookPage.waitForCodeLens();
  await page.locator('text=Building your visualization').waitFor({ state: 'detached' }); //To detach the text "Loading a dynamic question..."
  await expect(page.locator('//button[text()="Hide Codelens"]').nth(0)).toBeVisible();
  await page.locator('//button[text()="Hide Codelens"]').nth(0).click();
  await expect(page.locator('//button[text()="Hide Codelens"]')).not.toBeVisible();
  await expect(page.locator('//button[text()="Show in CodeLens"]').nth(0)).toBeVisible();
  
});

test('Clicking the Show Code button displays the code', async ({ page }) => {
  let textbookPage = new TabbedQuestionsPage(page);
  await expect(page.locator('#exercise1-0')).toBeVisible();
  await expect(page.locator('#exercise1-0')).toContainText('Write a program that prints');
  await expect(page.locator('#exercise1-0')).toContainText('Hello, world');
  await expect(page.locator('//button[text()="Show Source"]').nth(0)).toBeVisible();
  // Click the Show Code button
  await page.locator('//button[text()="Show Source"]').nth(0).click();
  // Wait for the code to be visible
    await expect(page.locator('#exercise1_src')).toBeVisible();
    await expect(page.locator('#exercise1_src')).toContainText('.. tabbed:: exercise1');
    await expect(page.locator('#exercise1_src')).toContainText(' .. tab:: Question 1');
    await expect(page.locator('#exercise1_src')).toContainText('Write a program that prints "Hello, world".');
    await expect(page.locator('#exercise1_src')).toContainText('.. activecode:: helloworld');
  await expect(page.locator('#exercise1_src')).toContainText('print("Hello, world")');
  await expect(page.locator('#exercise1_src')).toContainText('.. tab:: Discussion');
  await expect(page.locator('#exercise1_src')).toContainText('.. disqus::');
  await expect(page.locator('#exercise1_src')).toContainText(':shortname: interactivepython');
  await expect(page.locator('#exercise1_src')).toContainText(':identifier: helloworlddiscussion');
 
  // Click the Hide Code button
  await page.locator('//button[text()="Hide Source"]').nth(0).click();
  // Wait for the code to be hidden
  await expect(page.locator('#helloworld_code')).toBeHidden({ timeout: 7000 });
  await expect(page.locator('//button[text()="Show Source"]').nth(0)).toBeVisible();    
});