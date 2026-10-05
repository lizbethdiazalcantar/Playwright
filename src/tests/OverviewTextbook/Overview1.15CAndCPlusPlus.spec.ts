import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { OverviewCAndCPlusPlus } from "../../pages/TextbookPages/OverviewCAndCPlusPlus";

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
    await expect(page.locator(textbookPage.question1Error)).toContainText('test.c: In function');
    
  });

  test('Clicking the Show CodeLens button opens the visualization window', async ({ page }) => {
    let textbookPage = await new OverviewCAndCPlusPlus(page);

    let visualizerContainer = page.locator(textbookPage.showCodeLensButton).nth(0);
    await visualizerContainer.click();
    await textbookPage.waitForCodeLens();
    
    await expect(page.locator(textbookPage.codeLensVisualizer)).toBeVisible();
    await expect(page.locator('#vizLayoutTdFirst')).toBeVisible();
    await expect(page.locator('#vizLayoutTdFirst')).toContainText('C (gcc 4.8, C11)');
    
  });


});

test.describe('Question 2: lc2', () => {

    test('Question 2: Clicking the Save & Run button with no change', async ({ page }) => {
        let textbookPage = await new OverviewCAndCPlusPlus(page);
        await page.locator(textbookPage.saveAndRunButton).nth(1).click();
        await expect(page.locator(textbookPage.question2Output)).toContainText('Hello World!');
        await expect(page.locator(textbookPage.question2Output)).toContainText('Welcome to C++ Programming');
        
    });

    test('Question 2: Changing code changes text in output', async ({ page }) => {
        let textbookPage = await new OverviewCAndCPlusPlus(page);
        let newCode = `#include <iostream>
                using namespace std;
                int main() {
                   cout << "Hello, Universe!" << endl;   cout << "Welcome to C++ Programming" << endl;
                }`
        await textbookPage.changeCodeMirrorAllCode(1, newCode);
        await page.locator(textbookPage.saveAndRunButton).nth(1).click();
        await expect(page.locator(textbookPage.question2Output)).toContainText('Hello, Universe!');
        await expect(page.locator(textbookPage.question2Output)).toContainText('Welcome to C++ Programming');
        
    });

        test('Question 2: Error in code displays error output', async ({ page }) => {
        let textbookPage = await new OverviewCAndCPlusPlus(page);
        await textbookPage.changeCodeMirrorLine('#include <iostream>', '#include');
        await page.locator(textbookPage.saveAndRunButton).nth(1).click();
        await textbookPage.waitForActiveCode();

        await expect(page.locator(textbookPage.question2Output)).toContainText('There were errors compiling your code. See below.');
        await expect(page.locator(textbookPage.question2Error)).toContainText('#include expects "FILENAME" or <FILENAME>');
        await expect(page.locator(textbookPage.question2Error)).toContainText('    1 | #include');
        await expect(page.locator(textbookPage.question2Error)).toContainText('4 |     cout << "Hello World!" << endl;   cout << "Welcome to C++ Programming" << endl;');
        await expect(page.locator(textbookPage.question2Error)).toContainText('test.cpp:1:1: note: ');
        
    });

  test('Question 2: Clicking the Show CodeLens button opens the visualization window', async ({ page }) => {
    let textbookPage = await new OverviewCAndCPlusPlus(page);
    let section = page.locator(textbookPage.question2Section);

    await section.locator(textbookPage.showCodeLensButton).click();
    await textbookPage.waitForCodeLens();    
    await expect(section.locator(textbookPage.showCodeLensButton)).not.toBeVisible();
    await expect(section.locator(textbookPage.hideCodeLensButton)).toBeVisible();

    // Not testing contents of visualizer at this time as it returns an error
    await section.locator(textbookPage.hideCodeLensButton).click();
    await expect(section.locator(textbookPage.showInCodeLensButton)).toBeVisible();
    await expect(section.locator(textbookPage.hideCodeLensButton)).not.toBeVisible();


  });

  test('Question 2: Clicking the Show Source button displays source box', async ({ page }) => {
    let textbookPage = await new OverviewCAndCPlusPlus(page);
    let section = page.locator(textbookPage.question2Section);

    await page.locator(textbookPage.question2ShowSourceButton).click();
    await expect(page.locator(textbookPage.question2ShowSourceButton)).not.toBeVisible();
    await expect(page.locator(textbookPage.question2HideSourceButton)).toBeVisible();
    await expect(page.locator(textbookPage.question2SourceBox)).toBeVisible();
    await expect(page.locator(textbookPage.question2SourceBox)).toContainText('.. activecode:: lc2');
    await expect(page.locator(textbookPage.question2SourceBox)).toContainText(':language: cpp');

    // Not testing contents of visualizer at this time as it returns an error
    await page.locator(textbookPage.question2HideSourceButton).click();
    await expect(page.locator(textbookPage.question2ShowSourceButton)).toBeVisible();
    await expect(page.locator(textbookPage.question2SourceBox)).not.toBeVisible();
    await expect(page.locator(textbookPage.question2HideSourceButton)).not.toBeVisible();


  });
});

 

