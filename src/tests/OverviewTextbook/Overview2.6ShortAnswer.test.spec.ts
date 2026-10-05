import { LoginPage } from '../../pages/loginPage';
import { testData } from '../../utils/testData';
import {test,expect } from '@playwright/test';
import { SignUpPage } from '../../pages/signupPage';
import { OverviewShortAnswerPage } from '../../pages/TextbookPages/OverviewShortAnswerPage';
import { User } from '../../data/user';
import { text } from 'node:stream/consumers';
import { TextbookPage } from '../../pages/textbookPage';


test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    //  Given: I log in and go to the Overview 2.6 Short Answer page
    await page.goto('/');
    let signUpPage = new SignUpPage(page);
    let cls = new OverviewShortAnswerPage(page);
    await signUpPage.signUpRandomUserForOverview();
    await cls.goToShortAnswerPage();
});

test.describe('Test Save Function', () => {
    test('User enters and saves an answer', async ({ page }) => {
        let cls = new OverviewShortAnswerPage(page);
        //  When: I enter an answer in the 2.6.1 text area
        await cls.fillTextArea2_6_1();
        //  And: I save the answer
        await cls.clickSaveButton2_6_1();
        //  Then: The answer should be saved
        await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");
        
        //  When: I enter an answer in the 2.6.2 text area
        await cls.fillTextArea2_6_2();
        //  And: I save the answer
        await cls.clickSaveButton2_6_2();
        //  Then: The answer should be saved
        await expect(page.locator(cls.feedback2_6_2)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_2)).toContainText("Your answer has been saved.");
    });

    test('User enters an answer but does not save it', async ({ page }) => {
        let cls = new OverviewShortAnswerPage(page);
        //  When: I enter an answer in the 2.6.1 text area
        await cls.fillTextArea2_6_1();
        //  But: I do not click the save button and remove the focus
        await cls.blurTextArea2_6_1();
        //  Then: I should see an alert message informing that the answer has not been saved
        await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has not been saved yet!");
        
        //  When: I enter an answer in the 2.6.2 text area
        await cls.fillTextArea2_6_2();
        //  But: I do not click the save button and remove the focus
        await cls.blurTextArea2_6_2();
        //  Then: I should see an alert message informing that the answer has not been saved
        await expect(page.locator(cls.feedback2_6_2)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_2)).toContainText("Your answer has not been saved yet!");
    });

    test('User leaves the page after saving an answer and returns', async ({ page }) => {
        let cls = new OverviewShortAnswerPage(page);
        let loginPage = new LoginPage(page);
        //  When: I enter an answer in the 2.6.1 text area and save
        await cls.saveAnswer2_6_1();
        //  Then : I see the save confirmation message
        await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");
        
        //  When: I enter an answer in the 2.6.2 text area and save
        await cls.saveAnswer2_6_2();
        //  Then: I see the save confirmation message
        await expect(page.locator(cls.feedback2_6_2)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_2)).toContainText("Your answer has been saved.");

        //  When: I leave the 2.6 Short Answer page
        await loginPage.navigateToLogin();
        //  And: I return to the 2.6 Short Answer page
        await cls.goToShortAnswerPage();

        //  Then: I should see a message informing the answer has been saved for 2.6.1 and 2.6.2
        await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_1)).toContainText("Your current saved answer is shown above.");
        await expect(page.locator(cls.feedback2_6_2)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_2)).toContainText("Your current saved answer is shown above.");
    });

    test('Test User saves an answer and update it', async ({ page }) => {
        let cls = new OverviewShortAnswerPage(page);
        //  When: I enter an answer and save in the 2.6.1 text area
        await cls.saveAnswer2_6_1();
        //  Then: I should see a message informing the answer has been saved
        await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");
        //  When: I update the answer and save again
        await page.locator(cls.textArea2_6_1).fill("Updated answer");
        await cls.clickSaveButton2_6_1();
        //  Then: I should see a message informing the answer has been saved
        await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");

        //  When: I enter an answer and save in the 2.6.2 text area
        await cls.saveAnswer2_6_2();
        //  Then: I should see a message informing the answer has been saved
        await expect(page.locator(cls.feedback2_6_2)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_2)).toContainText("Your answer has been saved.");
        //  When: I update the answer and save again
        await page.locator(cls.textArea2_6_2).fill("Updated answer");
        await cls.clickSaveButton2_6_2();
        //  Then: I should see a message informing the answer has been saved
        await expect(page.locator(cls.feedback2_6_2)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_2)).toContainText("Your answer has been saved.");
    });
      
    test('User updates the answer and does not save', async ({ page }) => {
        let cls = new OverviewShortAnswerPage(page);
        //  When: I enter an answer and save in the 2.6.1 text area
        await cls.saveAnswer2_6_1();
        //  Then: I should see a message informing the answer has been saved
        await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");
        //  When: I update the answer
        await page.locator(cls.textArea2_6_1).fill("Updated answer");
        //  But: I do not save and click anywhere on the screen (remove focus)
        await cls.blurTextArea2_6_1();
        //  Then: I should see a message informing the answer has not been saved
        await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has not been saved yet!");

        //  When: I enter an answer and save in the 2.6.2 text area
        await cls.saveAnswer2_6_2();
        //  Then: I should see a message informing the answer has been saved
        await expect(page.locator(cls.feedback2_6_2)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_2)).toContainText("Your answer has been saved.");
        //  When: I update the answer
        await page.locator(cls.textArea2_6_2).fill("Updated answer");
        //  But: I do not save and click anywhere on the screen (remove focus)
        await cls.blurTextArea2_6_2();
        //  Then: I should see a message informing the answer has been saved
        await expect(page.locator(cls.feedback2_6_2)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_2)).toContainText("Your answer has not been saved yet!");
    });
});

test.describe('Test Other Page Elements', () => {
    test('User clicks the Source button', async ({ page }) => {
        let cls = new OverviewShortAnswerPage(page);
        //  When: I click the "Show Source" button
        await expect(page.locator(cls.showSourceButton)).toContainText("Show Source");
        await page.locator(cls.showSourceButton).click();
        //  Then: I should see the source section
        await expect(page.locator(cls.sourceSection)).toBeVisible();
        await expect(page.locator(cls.sourceSection)).toContainText(" shorta1 You can ask your students to answer reflective questions or short essays in the box provided. ");
        //  And: I should see the "Hide Source" button
        await expect(page.locator(cls.hideSourceButton)).toBeVisible();
        await expect(page.locator(cls.hideSourceButton)).toContainText("Hide Source");

        //  When: I click the "Hide Source" button
        await page.locator(cls.hideSourceButton).click();
        //  Then: I should not see the source section
        await expect(page.locator(cls.sourceSection)).toBeHidden();
        //  And: I should see the "Show Source" button
        await expect(page.locator(cls.showSourceButton)).toBeVisible();
        await expect(page.locator(cls.showSourceButton)).toContainText("Show Source");  
    });

    test('User clicks the PreTeXt button', async ({ page }) => {
        let cls = new OverviewShortAnswerPage(page);
        //  When: I click the "Show PreTeXt" button
        await expect(page.locator(cls.showPreTeXtButton)).toContainText("Show PreTeXt");
        await page.locator(cls.showPreTeXtButton).click();
        //  Then: I should see the pretext section
        await expect(page.locator(cls.preTeXtSection)).toBeVisible(); //This assertion could be improved by checking the text content    
        //  And: I should see the "Hide PreTeXt" button
        await expect(page.locator(cls.hidePreTeXtButton)).toBeVisible();
        await expect(page.locator(cls.hidePreTeXtButton)).toContainText("Hide PreTeXt");

        //  When: I click the "Hide PreTeXt" button
        await page.locator(cls.hidePreTeXtButton).click();
        //  Then: I should not see the pretext section
        await expect(page.locator(cls.preTeXtSection)).toBeHidden();
        //  And: I should see the "Show PreTeXt" button
        await expect(page.locator(cls.showPreTeXtButton)).toBeVisible();
        await expect(page.locator(cls.showPreTeXtButton)).toContainText("Show PreTeXt");  
    });

    test('User sees the "Choose File" button', async ({ page }) => {
//  ONLY tested for its visibility because a local file picker does not appear in the DOM
        let cls = new OverviewShortAnswerPage(page);        
        //  Then: I should see the Choose File button
        await expect(page.locator(cls.chooseFileButton)).toBeVisible();
        await expect(page.locator(cls.chooseFileButton)).toBeEnabled();
    });

    test('User clicks the "Mark as Completed" button', async ({ page }) => {
//  Assertions for the button color are commented out because this test focuses on functionality
        let cls = new OverviewShortAnswerPage(page); 
        //  When: I click the orange "Mark as Completed" button
        await expect(page.locator(cls.markAsCompletedB)).toContainText("Mark as Completed");
        // await expect(page.locator(cls.markAsCompletedB)).toHaveCSS('background-color', 'rgb(255, 170, 43)');
        await page.locator(cls.markAsCompletedB).click();
        //  Then: I should see the green "Completed! Well done!" button
        await expect(page.locator(cls.completedButton)).toBeVisible();
        await expect(page.locator(cls.completedButton)).toContainText(" Completed. Well Done!");
        await expect(page.locator(cls.checkMark_CompletedB)).toBeVisible();
        // await expect(page.locator(cls.completedButton)).toHaveCSS('background-color', 'rgb(80, 211, 146)');
        
        //  When: I click the "Completed! Well done!" button
        await page.locator(cls.completedButton).click();
        //  Then: I should see the "Mark as Completed" button
        await expect(page.locator(cls.markAsCompletedB)).toBeVisible();
        await expect(page.locator(cls.markAsCompletedB)).toContainText("Mark as Completed");
        // await expect(page.locator(cls.markAsCompletedB)).toHaveCSS('background-color', 'rgb(255, 170, 43)');
    });
});


test.describe('Test Short Answer page text areas', () => {
    test('User leaves the free text box empty and save', async ({ page }) => {
        let cls = await new OverviewShortAnswerPage(page);
        //  When: I leave the text area 2.6.1 empty
        await page.locator(cls.textArea2_6_1).fill("");
        //  And: I click the save button
        await cls.clickSaveButton2_6_1();
        //  Then: I should see a message informing the answer has been saved
        await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");
    });

    test('User enters 1 character in the text area', async ({ page }) => {
        let cls = await new OverviewShortAnswerPage(page);
        //  When: I enter 1 character in the text area 2.6.1
        await page.locator(cls.textArea2_6_1).fill("A");
        //  And: I click the save button
        await cls.clickSaveButton2_6_1();
        //  Then: I should see a message informing the answer has been saved
        await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");
    });

    test('User enters 100,000 characters in the text area', async ({ page }) => {
        let cls = await new OverviewShortAnswerPage(page);
            //  When: I enter 100,000 characters in the text area 2.6.1
            let longText = 'A'.repeat(100000);
            await page.locator(cls.textArea2_6_1).fill(longText);
            //  And: I click the save button
            await cls.clickSaveButton2_6_1();
            //  Then: I should see a message informing the answer has been saved
            await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
            await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");
        });

    test('User enters 1,000,000 characters in the text area', async ({ page }) => {
    let cls = await new OverviewShortAnswerPage(page);
        //  When: I enter 1,000,000 characters in the text area 2.6.1
        let longText = 'A'.repeat(1000000);
        await page.locator(cls.textArea2_6_1).fill(longText);
        //  And: I click the save button
        await cls.clickSaveButton2_6_1();
        //  Then: I should see a message informing the answer has been saved
        await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
        await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");
    });

    test('User enters 10,000,000 characters in the text area', async ({ page }) => {
        let cls = await new OverviewShortAnswerPage(page);
            //  When: I enter 10,000,000 characters in the text area 2.6.1
            let longText = 'A'.repeat(10000000);
            await page.locator(cls.textArea2_6_1).fill(longText);
            //  And: I click the save button
            await cls.clickSaveButton2_6_1();
            //  Then: I should see a message informing the answer has been saved
            await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
            await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");
        });

        test('User enters different character types in the text area and saves', async ({ page }) => {
            let cls = await new OverviewShortAnswerPage(page);
            //  When: I enter special characters in the text area 2.6.1
            let specialText = '!@#$%^&*()_+={}[]"|:;<>,.?/';
            await page.locator(cls.textArea2_6_1).fill(specialText);
            //  And: I click the save button
            await cls.clickSaveButton2_6_1();
            //  Then: I should see a message informing the answer has been saved
            await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
            await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");
            console.log("Special characters are entered and accepted successfully.")

            //  When: I enter spaces And save
            let spaces = "a a  a   a    a     a      a       a";
            await page.locator(cls.textArea2_6_1).fill(spaces);
            await cls.clickSaveButton2_6_1();
            //  Then: I should see a message informing the answer has been saved
            await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
            await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");
            console.log("Spaces are entered and accepted successfully.")

            //  When: I enter numerical characters And save
            let numericalText = "0123456789";
            await page.locator(cls.textArea2_6_1).fill(numericalText);
            await cls.clickSaveButton2_6_1();
            //  Then: I should see a message informing the answer has been saved
            await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
            await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");
            console.log("Numerical characters are entered and accepted successfully.")

            //  When: I enter foreign characters And save
            let foreignText = "世界مرحباпривет";
            await page.locator(cls.textArea2_6_1).fill(foreignText);
            await cls.clickSaveButton2_6_1();
            //  Then: I should see a message informing the answer has been saved
            await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
            await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");
            console.log("Foreign characters are entered and accepted successfully.")

            //  When: I enter emoji characters And save
            let emojiText = "😀👍🏽❤️";
            await page.locator(cls.textArea2_6_1).fill(emojiText);
            await cls.clickSaveButton2_6_1();
            //  Then: I should see a message informing the answer has been saved
            await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
            await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");
            console.log("Emoji characters are entered and accepted successfully.")

        });

        test('User enters programming text in the text area', async ({ page }) => {
            let cls = await new OverviewShortAnswerPage(page);
            //  When: I enter a SQL query string And save
            let sqlText = "SELECT column1, column2 FROM table_name;";
            await page.locator(cls.textArea2_6_1).fill(sqlText);
            await cls.clickSaveButton2_6_1();
            //  Then: I should see a message informing the answer has been saved
            await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
            await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");
            console.log("SQL query text is entered and accepted successfully.")

            //  When: I enter a HTML string And save
            let htmlText =  "<script>alert('Hello')</script>";
            await page.locator(cls.textArea2_6_1).fill(htmlText);
            await cls.clickSaveButton2_6_1();
            //  Then: I should see a message informing the answer has been saved
            await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
            await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");
            console.log("HTML text is entered and accepted successfully.")
        });

        test('User enters new lines in the text area', async ({ page }) => {
            let cls = await new OverviewShortAnswerPage(page);
            //  When: I enter new lines in the text area 2.6.1
            await page.locator(cls.textArea2_6_1).fill("First line\n\n\n\n\n\nSecond line");
            //  And: I click the save button
            await cls.clickSaveButton2_6_1();
            //  Then: I should see a message informing the answer has been saved
            await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
            await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");
        });
        
        test('User copies text and pastes in the text area', async ({ page }) => {
            let cls = await new OverviewShortAnswerPage(page);
            //  When: I copy all text in the page
            await page.keyboard.press("Control+A");
            await page.keyboard.press("Control+C");         
            //  And: I paste the text in the text area 2.6.1
            await page.locator(cls.textArea2_6_1).focus();
            await page.keyboard.press("Control+V");
            //  And: I click the save button
            await cls.clickSaveButton2_6_1();
            //  Then: I should see a message informing the answer has been saved
            await expect(page.locator(cls.feedback2_6_1)).toBeVisible();
            await expect(page.locator(cls.feedback2_6_1)).toContainText("Your answer has been saved.");
        });
});