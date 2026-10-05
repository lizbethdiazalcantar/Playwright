import { test, expect } from "@playwright/test";
import { SignUpPage } from "../pages/signupPage";
import { OverviewCAndCPlusPlus } from "../pages/TextbookPages/OverviewCAndCPlusPlus";

//Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/");
  let signUpPage = new SignUpPage(page);
  let textbookPage = new OverviewCAndCPlusPlus(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/ActiveCode/clangs.html')
});

test.describe('Question 1: hw_in_c', () => {

    test('Clicking the Save & Run button with no change', async ({ page }) => {
        let textbookPage = await new OverviewCAndCPlusPlus(page);
        await page.locator(textbookPage.saveAndRunButton).nth(0).click();
        await expect(page.locator(textbookPage.question1Output)).toContainText('Hello World!');
        
    });

    test('Clicking the Save & Run button after changing the code', async ({ page }) => {
      let textbookPage = await new OverviewCAndCPlusPlus(page);
      await page.waitForSelector(textbookPage.editorContainer1, { state: 'visible' });
      await page.locator(textbookPage.editorContainer1).click();
      if (process.platform === 'darwin') {
        await page.keyboard.press('Meta+A'); // Cmd+A on Mac
      } else {
        await page.keyboard.press('Control+A'); // Ctrl+A on Windows/Linux
      }
      // Then press Delete to clear the selected text
      await page.keyboard.press('Delete');
      const newCode = `
          #include <stdio.h>

          int main() {
              printf("Hello World! Hello Universe!\\n");
              return 0;
          }
        `;
      await page.keyboard.type(newCode, { delay: 50 });
      await page.locator(textbookPage.saveAndRunButton).nth(0).click();
      await expect(page.locator(textbookPage.question1Output)).toContainText('Hello World! Hello Universe!');
      
  });

  test('Clicking the Save & Run button after changing the code to include errors', async ({ page }) => {
    let textbookPage = await new OverviewCAndCPlusPlus(page);
    await page.waitForSelector(textbookPage.editorContainer1, { state: 'visible' });
    await page.locator(textbookPage.editorContainer1).click();
    if (process.platform === 'darwin') {
      await page.keyboard.press('Meta+A'); // Cmd+A on Mac
    } else {
      await page.keyboard.press('Control+A'); // Ctrl+A on Windows/Linux
    }
    // Then press Delete to clear the selected text
    await page.keyboard.press('Delete');
    const newCode = `
        #include <stdio.h>

        int main() {
            print("Hello World! Hello Universe!\\n");
            return 0;
        }
      `;
    await page.keyboard.type(newCode, { delay: 50 });
    await page.locator(textbookPage.saveAndRunButton).nth(0).click();
    await expect(page.locator(textbookPage.question1Output)).toContainText('There were errors compiling your code. See below.');
    
  });

  test('Clicking the Show CodeLens button opens the visualization window', async ({ page }) => {
    let textbookPage = await new OverviewCAndCPlusPlus(page);
    
    
    //await page.locator(textbookPage.showCodeLensButton).nth(0).click();
    // Create Locator object for the container
    let visualizerContainer = page.locator(textbookPage.showCodeLensButton).nth(0);
    await visualizerContainer.click();
    await textbookPage.waitForCodeLens();
    
    await expect(page.locator(textbookPage.codeLensVisualizer)).toBeVisible();
    await expect(page.locator('#vizLayoutTdFirst')).toBeVisible();
    await expect(page.locator('#vizLayoutTdFirst')).toContainText('C (gcc 4.8, C11)');
    
  });
});

 
         
