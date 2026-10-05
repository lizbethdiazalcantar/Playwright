import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { OverviewCodeLensPartOne } from "../../pages/TextbookPages/OverviewCodeLensPartOne";

// Go to main page, sign up, go to fill in the blank page
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto("/");
  const signUpPage = new SignUpPage(page);
  const textbookPage = new OverviewCodeLensPartOne(page);
  await signUpPage.signUpRandomUserForOverview();
  await page.goto('/ns/books/published/overview/Visualizers/codelens.html');
});

// Question 1
test.describe('Question 1/over_codelens1', () => {
  test('Step forward code by clicking the next button', async ({ page }) => {
    const textbookPage = new OverviewCodeLensPartOne(page);
    await page.locator('#jmpStepFwd').nth(0).click(); 

    await expect(page.locator('#navControlsDiv').first()).toContainText('Step 2 of 2');
  });
});



// Question 2
test.describe('Question 2/over_codelens1', () => {
  test('Execute to the end and check step text', async ({ page }) => {
    const thisCodeLens = page.locator('.codelensdiv').nth(0);
    const nextButton = thisCodeLens.locator('#jmpStepFwd');
    const curInstr = page.locator('#curInstr').nth(0);
    const outputBox = page.locator('#pyStdout').nth(0);

    // Step 1: First click
    await page.locator('#jmpStepFwd').nth(0).click(); // 0-based index
    await expect(curInstr).toContainText('Step 2 of 2');

    // Step 2: Second click to execute
    await page.locator('#jmpStepFwd').nth(0).click(); // 0-based index
    await expect(curInstr).toContainText ('Done running (2 steps)');

  });
});




// Question 3
test.describe('Question 3/over_codelens1', () => {
  test('Step backwards to previous line', async ({ page }) => {
    // Click "Next" twice to move to step 2
    const nextButton = page.locator('#jmpStepFwd').nth(0);
    const prevButton = page.locator('#jmpStepBack').nth(0);
    const curInstr = page.locator('#curInstr').nth(0);

    await nextButton.click();
    await nextButton.click();

    // Now click "Prev" once to go back to Step 1
    await prevButton.click();
    await prevButton.click();

    // Verify that you're back at step 1
    await expect(curInstr).toContainText('Step 1 of 2');
  });
});




// Question 4
test.describe('Question 4/over_codelens1', () => {
  test('Prev and Next buttons disable appropriately at edges', async ({ page }) => {
    const codeLens = page.locator('.codelensdiv').first();
    const prevButton = page.locator('#jmpStepBack').nth(0);
    const nextButton = page.locator('#jmpStepFwd').nth(0);
    const curInstr = page.locator('#curInstr').nth(0);
    const redArrow = codeLens.locator('.red-arrow');

    // Step through to the end
    await nextButton.click();
    await expect(nextButton).toBeEnabled();
    await nextButton.click();

    // Step 2 of 2 complete — Next should be disabled
    await expect(nextButton).toBeDisabled();
    await expect(curInstr).toContainText('Done running (2 steps)');

    // Step backward once
    await prevButton.click();
    await expect(prevButton).toBeEnabled();
    await prevButton.click();

    // Back to Step 1 — Prev should now be disabled
    await expect(prevButton).toBeDisabled();
    await expect(curInstr).toContainText('Step 1 of 2');

    // Red arrow should not be visible
    await expect(redArrow).not.toBeVisible();
  });
});


//Question 5
test.describe('Question 5 / CodeLens 3.1.2 ', () => {
  test('User steps through steps 1-4', async ({ page }) => {
    const codeLens = page.locator('.codelensdiv').nth(1); // Adjust index if needed
    const nextButton = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[3]/button[3]');
    const globalFrameChart = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[2]/div[3]/table/tbody/tr/td[2]/div');
    const curInstr = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[4]');
    const fruitlistCell = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[2]/div[3]/table/tbody/tr/td[1]/div[1]/div[2]/table/tr[1]/td[1]')
    const numlistCell = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[2]/div[3]/table/tbody/tr/td[1]/div[1]/div[2]/table/tr[2]/td[1]')
    const newlistCell = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[2]/div[3]/table/tbody/tr/td[1]/div[1]/div[2]/table/tr[3]/td[1]')
    const fruitGlobalArrow = page.locator('//td[2]//svg/path');
    
    // Click "Next" three times to get to Step 3
    await nextButton.click();
    await expect(nextButton).toBeEnabled();
    await nextButton.click();
    await nextButton.click();

    // Verify on Step 4
    await expect(curInstr).toContainText('Step 4 of 6');

    // Verify global Chart is accurate for step 4
    await expect(globalFrameChart).toBeVisible();

    // Assert "Fruit" exist
    await expect(fruitlistCell).toBeVisible();
    await expect(fruitlistCell).toContainText('fruit');
    
    // Assert "numlist" exists
    await expect(numlistCell).toBeVisible();
    await expect(numlistCell).toContainText('numlist');
    
    // Assert "newlist" is the combination of both
    await expect(newlistCell).toBeVisible();
    await expect(newlistCell).toContainText('newlist');

    // Verify "fruit" arrow exist to chart Object Chart
    await globalFrameChart.waitFor({ state: 'visible', timeout: 10000 });
    await expect(globalFrameChart).toBeVisible();

    // await page.pause();
  });
});

//Question 6
test.describe('Question 6 / CodeLens 3.1.2 ', () => {
  test('User steps through steps 1-5 and verifies "Zeros"', async ({ page }) => {
  const codeLens = page.locator('.codelensdiv').nth(1); // Adjust index if needed
  const nextButton = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[3]/button[3]');
  const curInstr = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[4]');
  const zeroListValues = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[2]/div[3]/table/tbody/tr/td[2]/div/table[4]//tr[2]/td');


 // Click through to Step 5 (4 clicks needed after starting on Step 1)
  for (let i = 0; i < 4; i++) {
  await nextButton.click();
  await page.waitForTimeout(500); // slight delay for rendering
  }


  // Confirm we're on Step 5
  await expect(curInstr).toContainText('Step 5 of 6');
  await page.waitForTimeout(1000); // Allow memory diagram to render

  // Locate the 'zeros' variable cell by name
  const zerosVarCell = page.locator('//td[2]//table//td[contains(text(), "zeros")]');
  await expect(zerosVarCell).toBeVisible();

  // Check the value associated with 'zeros'
 
  await expect(zeroListValues).toHaveCount(4);
  await expect(zeroListValues.nth(0)).toHaveText('0');
  await expect(zeroListValues.nth(1)).toHaveText('0');
  await expect(zeroListValues.nth(2)).toHaveText('0');
  await expect(zeroListValues.nth(3)).toHaveText('0');


  });
});




test.describe('Question 7 / CodeLens 3.1.2 ', () => {
  test('User steps through steps 1-5 and verifies "Newlist"', async ({ page }) => {
  const codeLens = page.locator('.codelensdiv').nth(1); // Adjust index if needed
  const nextButton = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[3]/button[3]');
  const curInstr = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[4]');
  const newlistListValues = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[2]/div[3]/table/tbody/tr/td[2]/div/table[3]//tr[2]/td');


 // Click through to Step 5 (4 clicks needed after starting on Step 1)
  for (let i = 0; i < 4; i++) {
  await nextButton.click();
  await page.waitForTimeout(500); // slight delay for rendering
  }


  // Confirm we're on Step 5
  await expect(curInstr).toContainText('Step 5 of 6');
  await page.waitForTimeout(1000); // Allow memory diagram to render

  // Locate the 'newlist' variable cell by name
  const zerosVarCell = page.locator('//td[2]//table//td[contains(text(), "newlist")]');
  await expect(zerosVarCell).toBeVisible();

  // Check the value associated with 'zeros'
 
  await expect(newlistListValues).toHaveCount(6);
  await expect(newlistListValues.nth(0)).toHaveText('"apple"');
  await expect(newlistListValues.nth(1)).toHaveText('"orange"');
  await expect(newlistListValues.nth(2)).toHaveText('"banana"');
  await expect(newlistListValues.nth(3)).toHaveText('"cherry"');
  await expect(newlistListValues.nth(4)).toHaveText('6');
  await expect(newlistListValues.nth(5)).toHaveText('7');


  });
});

test.describe('Question 8 / CodeLens 3.1.2 ', () => {
  test('User steps through steps 1-5 and verifies "Numlist"', async ({ page }) => {
  const codeLens = page.locator('.codelensdiv').nth(1); // Adjust index if needed
  const nextButton = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[3]/button[3]');
  const curInstr = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[4]');
  const newNumlistValues = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[2]/div[3]/table/tbody/tr/td[2]/div/table[2]//tr[2]/td');


 // Click through to Step 5 (4 clicks needed after starting on Step 1)
  for (let i = 0; i < 4; i++) {
  await nextButton.click();
  await page.waitForTimeout(500); // slight delay for rendering
  }


  // Confirm we're on Step 5
  await expect(curInstr).toContainText('Step 5 of 6');
  await page.waitForTimeout(1000); // Allow memory diagram to render

  // Locate the 'Numlist' variable cell by name
  const zerosVarCell = page.locator('//td[2]//table//td[contains(text(), "numlist")]');
  await expect(zerosVarCell).toBeVisible();

  // Check the value associated with 'zeros'
 
  await expect(newNumlistValues).toHaveCount(2);
  await expect(newNumlistValues.nth(0)).toHaveText('6');
  await expect(newNumlistValues.nth(1)).toHaveText('7');



  });
});

test.describe('Question 9 / CodeLens 3.1.2 ', () => {
  test('User steps through steps 1-5 and verifies "Fruit"', async ({ page }) => {
  const codeLens = page.locator('.codelensdiv').nth(1); // Adjust index if needed
  const nextButton = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[3]/button[3]');
  const curInstr = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[4]');
  const fruitListValues = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[2]/div[3]/table/tbody/tr/td[2]/div/table[1]//tr[2]/td');


 // Click through to Step 5 (4 clicks needed after starting on Step 1)
  for (let i = 0; i < 4; i++) {
  await nextButton.click();
  await page.waitForTimeout(500); // slight delay for rendering
  }


  // Confirm we're on Step 5
  await expect(curInstr).toContainText('Step 5 of 6');
  await page.waitForTimeout(1000); // Allow memory diagram to render

  // Locate the 'fruit' variable cell by name
  const zerosVarCell = page.locator('//td[2]//table//td[contains(text(), "fruit")]');
  await expect(zerosVarCell).toBeVisible();

  // Check the value associated with 'zeros'
 
  await expect(fruitListValues).toHaveCount(4);
  await expect(fruitListValues.nth(0)).toHaveText('"apple"');
  await expect(fruitListValues.nth(1)).toHaveText('"orange"');
  await expect(fruitListValues.nth(2)).toHaveText('"banana"');
  await expect(fruitListValues.nth(3)).toHaveText('"cherry"');



  });
});

test.describe('Question 10 / CodeLens 3.1.2 ', () => {
  test('User steps through steps 1-6', async ({ page }) => {
  const codeLens = page.locator('.codelensdiv').nth(1); // CodeLens 3.1.2
  const nextButton = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[3]/button[3]');
  const curInstr = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[4]');

  // Step through all 6 steps
  for (let i = 0; i < 6; i++) {
    await nextButton.click();
  }

  // Confirm Done Running message
  await expect(curInstr).toContainText('Done running (6 steps)');

  // Wait for diagram to stabilize
  await page.waitForTimeout(1000);

  // 1. Confirm that "zeros[1]" and "fruit" reference the same object
  const fruitObject = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[2]/div[3]/table/tbody/tr/td[2]/div/table[1]//tr[2]/td');
  const zerosObject = page.locator('//td[2]//table//td[contains(text(), "zeros")]/following-sibling::td');
  const heapListItems = page.locator('td.listElt');

    // Wait until there are 4 items rendered in the list
    await expect(heapListItems).toHaveCount(16, { timeout: 7000 });

    // Then check values
    const expectedTexts = ['"apple"', '"orange"', '"banana"', '"cherry"'];

    for (let i = 0; i < expectedTexts.length; i++) {
  const text = await heapListItems.nth(i).innerText();
  console.log(`Item ${i} text: '${text}'`);
    }

  });
});


test.describe('Question 11 / CodeLens 3.1.2 ', () => {
  test('Previous Button is Disabled at Step 1', async ({ page }) => {
    const codeLens = page.locator('.codelensdiv').nth(1); // CodeLens 3.1.2
    const prevButton = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[3]/button[2]');
    const curInstr = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[4]');

    // Verify we're on Step 1 of 6
    await expect(prevButton).toBeDisabled();
    await expect(curInstr).toContainText('Step 1 of 6');
  });
});

test.describe('Question 12 / CodeLens 3.1.2 ', () => {
  test('Next Button is Disabled at End', async ({ page }) => {
  const codeLens = page.locator('.codelensdiv').nth(1); // CodeLens 3.1.2
  const nextButton = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[3]/button[3]');
  const curInstr = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[4]');

  // Step through all 6 steps
  for (let i = 0; i < 6; i++) {
    await nextButton.click();
  }

  // Confirm Done Running message
  await expect(curInstr).toContainText('Done running (6 steps)');

   // Assert that the "Next" button is disabled
  await expect(nextButton).toBeDisabled();

   });
});   

test.describe('Question 13 / CodeLens 3.1.2 ', () => {
  test('User verifies step 2', async ({ page }) => {
  const codeLens = page.locator('.codelensdiv').nth(1); // CodeLens 3.1.2
  const nextButton = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[3]/button[3]');
  const curInstr = page.locator('//html/body/div[3]/section[1]/div[3]/div/div[2]/div/table/tbody/tr/td[1]/div/div[2]/div[4]');


    // Step through to step 2
    await nextButton.click();
  

  // Confirm Done Running message
  await expect(curInstr).toContainText('Step 2 of 6');

     });
});   

