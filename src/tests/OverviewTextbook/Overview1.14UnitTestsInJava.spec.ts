import { test, expect } from "@playwright/test";
import { SignUpPage } from "../../pages/signupPage";
import { UnitTestsInJava } from "../../pages/TextbookPages/UnitTestsInJavaPage";
import exp from "node:constants";
import { text } from "node:stream/consumers";
    //Go to main page, sign up,go to Unit Tests In Java Section
    test.beforeEach(async ({ page }) => {
        console.log(`Running ${test.info().title}`);
        await page.goto("/");
        let signUpPage = new SignUpPage(page);
        let textbookPage = new UnitTestsInJava(page);
        await signUpPage.signUpRandomUserForOverview();
        await page.goto('/ns/books/published/overview/ActiveCode/java.html#unit-tests-in-java')

});
test.describe('Modifying "for loop" - Activity: 1.14.1', () => {
    test('Should save the current/edited code, and execute it successfully when clicked "Save & Run" button', async ({ page }) => {
        let textbookPage = new UnitTestsInJava(page);        
        await textbookPage.clickSaveAndRunButton();
        const forLoopOutputDisplay = page.locator(textbookPage.forLoopOutputDisplay).first();
        await expect(forLoopOutputDisplay).toBeVisible();
        console.log("The output is displayed with the edited code, showing the changes");
    });
    test('The slider must automatically be updated as the user makes changes in the code mirror', async ({ page }) => {
        let textbookPage = new UnitTestsInJava(page); 
         //Calling the changeCodeMirrorLine method
        await textbookPage.changeCodeMirrorLine(
            `for(int count = 2; count <= 10; count++)`,  //For loop with the current value
            `for(int count = 1; count <= 5; count++)`    //For loop with the new value
         );
        await page.locator('//button[contains(text(), "Save & Run")]').nth(1).click();
        await expect(page.locator(textbookPage.forLoopOutputDisplay)).toBeVisible();
        await expect(page.locator(textbookPage.forLoopOutputDisplay)).toContainText(`testing s.adder(2,2)12345`);
        //Calling the changeCodeMirrorLine method
        await textbookPage.changeCodeMirrorLine(
            `for(int count = 1; count <= 5; count++)`,  //For loop with the current value
            `for(int count = 0; count <= 5; count++)`    //For loop with the new value
        ); 
        await page.locator('//button[contains(text(), "Save & Run")]').nth(1).click();
        await expect(page.locator(textbookPage.forLoopOutputDisplay)).toBeVisible();
        await expect(page.locator(textbookPage.forLoopOutputDisplay)).toContainText(`testing s.adder(2,2)012345`);
        await textbookPage.dragSlider(page, textbookPage.forLoopSliderHandle, textbookPage.forLoopSliderTrack, 100, 50);
        await expect(page.locator(textbookPage.forLoopLineOfCode)).toContainText('        for(int count = 1; count <= 5; count++)');
        await textbookPage.dragSlider(page, textbookPage.forLoopSliderHandle, textbookPage.forLoopSliderTrack, 50, 100);
        await expect(page.locator(textbookPage.forLoopLineOfCode)).toContainText('        for(int count = 0; count <= 5; count++)');
        await textbookPage.dragSlider(page, textbookPage.forLoopSliderHandle, textbookPage.forLoopSliderTrack, 0, 0);
        await expect(page.locator(textbookPage.forLoopLineOfCode)).toContainText('        for(int count = 2; count <= 10; count++)');
        await textbookPage.dragSlider(page, textbookPage.forLoopSliderHandle, textbookPage.forLoopSliderTrack, 100, 100);
        await expect(page.locator(textbookPage.forLoopLineOfCode)).toContainText('        for(int count = 2; count <= 10; count++)');
        await textbookPage.dragSlider(page, textbookPage.forLoopSliderHandle, textbookPage.forLoopSliderTrack, 50, 0);
        await expect(page.locator(textbookPage.forLoopLineOfCode)).toContainText('        for(int count = 2; count <= 10; count++)');
        await textbookPage.dragSlider(page, textbookPage.forLoopSliderHandle, textbookPage.forLoopSliderTrack, 0, 50);
        await expect(page.locator(textbookPage.forLoopLineOfCode)).toContainText('        for(int count = 1; count <= 5; count++)');
        await textbookPage.dragSlider(page, textbookPage.forLoopSliderHandle, textbookPage.forLoopSliderTrack, 0, 100);
        await expect(page.locator(textbookPage.forLoopLineOfCode)).toContainText('        for(int count = 0; count <= 5; count++)');
        await textbookPage.dragSlider(page, textbookPage.forLoopSliderHandle, textbookPage.forLoopSliderTrack, 100, 0);
        await expect(page.locator(textbookPage.forLoopLineOfCode)).toContainText('        for(int count = 2; count <= 10; count++)');
        await textbookPage.dragSlider(page, textbookPage.forLoopSliderHandle, textbookPage.forLoopSliderTrack, 30, 70);
        await expect(page.locator(textbookPage.forLoopLineOfCode)).toContainText('        for(int count = 1; count <= 5; count++)');
        await textbookPage.dragSlider(page, textbookPage.forLoopSliderHandle, textbookPage.forLoopSliderTrack, 70, 30);
        await expect(page.locator(textbookPage.forLoopLineOfCode)).toContainText('        for(int count = 1; count <= 5; count++)');
    });
    test('Should be able format the contents as per the formatting rules when clicked the "Reformat" button', async ({ page }) => {
        let textbookPage = new UnitTestsInJava(page); 
        await textbookPage.clickReformatButton();
        console.log("All the contents have been reformatted");
        await expect(page.locator('//button[contains(text(),"Reformat")]').nth(0)).toBeVisible();
     });
    test('Should display the code in the codeLens when the "Show in CodeLens" button is clicked', async({page})=>{
        let textbookPage = new UnitTestsInJava(page);
        await textbookPage.clickShowInCodeLensButton();
        const hideCodeLensButton = page.locator(textbookPage.hideCodeLensButton).first();
        await expect(hideCodeLensButton).toBeEnabled();  //To enable the button before the interaction
        await expect(hideCodeLensButton).toBeVisible();
        const reformatButton = page.locator(textbookPage.reformatButton).nth(0);
        await reformatButton.click();
        await expect(reformatButton).toBeVisible();  
    });
       test('Should hide the codeLens when the "Hide Codelens" button is clicked', async({page})=>{
        let textbookPage = new UnitTestsInJava(page);
        await textbookPage.clickHideLensButton();
        const showCodeLensButton = page.locator(textbookPage.showCodeLensButton).first()
        await expect(showCodeLensButton).toBeEnabled();   //To enable the button before the interaction
        await expect(showCodeLensButton).toBeVisible();
        const reformatButton = page.locator(textbookPage.reformatButton).nth(0);
          await page.waitForTimeout(3000);
        await reformatButton.click();
        //await expect(reformatButton).toBeVisible();
         await page.waitForTimeout(3000);
    });
     test('Should display the source code when the "Show Source" button is clicked and "Hide Source" button appears', async ({ page }) => {
        let textbookPage = new UnitTestsInJava(page);        
        await textbookPage.clickShowSourceButton();
        await page.waitForTimeout(3000);
        const hideSourceButton = page.locator(textbookPage.hideSourceButton).first();
        await expect(hideSourceButton).toBeEnabled();  //To enable the button before the interaction
        await expect(hideSourceButton).toBeVisible();
        await page.waitForTimeout(3000);
    });
    test('Should hide the source code when the "Hide Source" button is clicked and "Show Source" button appears', async ({ page }) => {
        let textbookPage = new UnitTestsInJava(page);      
        await textbookPage.clickHideSourceButton(); 
        console.log("Source code is hidden");  
        await expect(page.locator(textbookPage.showSourceButton)).toBeEnabled();  //To enable the button before the interaction
        await expect(page.locator(textbookPage.showSourceButton)).toBeVisible();  
    });
});
test.describe('Create a class that can tell the riddle - Activity: 1.14.2', () => {
    test('Should save the current/edited code, and execute it successfully when clicked "Save & Run" button', async ({ page }) => {
        let textbookPage = new UnitTestsInJava(page);        
        await textbookPage.clickSaveAndRunButtonRiddles();
        const OutputTextTable = await page.locator('#jUnitTesting3_unit_results').innerText();
        expect(OutputTextTable).toContain("You got 6 out of 7 correct. 85.71%");
        expect(OutputTextTable).toContain("Pass\tAnswer\tAnswer\tChecking method printAnswer()");
        expect(OutputTextTable).toContain("Fail\t6 line(s) of text\t0 line(s) of text\tChecking main method");   
        console.log("The table is displayed with Expected and Actual results for the code in the code mirror");
    });
     test('The slider must automatically be updated as the user makes changes in the code mirror', async ({ page }) => {
        let textbookPage = new UnitTestsInJava(page); 
        await textbookPage.changeCodeMirrorLine(
            ` System.out.println(quest);`,     //Println statement with current Value
            ` System.out.println(question);`   //Println statement with new Value  
         );
        await page.locator('//button[contains(text(), "Save & Run")]').nth(2).click();
        await page.locator('text=Compiling and Running your Code Now... ').waitFor({state : 'detached'});
        await expect(page.locator(textbookPage.riddlesOutputDisplay)).toBeVisible();
        await expect(page.locator(textbookPage.riddlesOutputDisplay)).toContainText(`There were errors compiling your code. See below.`);
        await textbookPage.changeCodeMirrorLine(
            ` System.out.println(ans);`,    //Println statement with current Value
            ` System.out.println(answer);`  //Println statement with new Value      
        );
        await page.locator('//button[contains(text(), "Save & Run")]').nth(2).click();
        await page.locator('text=Compiling and Running your Code Now... ').waitFor({state : 'detached'});
        await expect(page.locator(textbookPage.riddlesOutputDisplay)).toBeVisible();
        await expect(page.locator(textbookPage.riddlesOutputDisplay)).toContainText(`There were errors compiling your code. See below.`);
        await textbookPage.dragSlider(page, textbookPage.riddlesSliderHandle, textbookPage.riddlesSliderTrack, 50, 100);
        await expect(page.locator(textbookPage.lineOfSystemPrintQn)).toContainText('        System.out.println(question);');
        await textbookPage.dragSlider(page, textbookPage.riddlesSliderHandle, textbookPage.riddlesSliderTrack, 70, 100);
        await expect(page.locator(textbookPage.lineOfSystemPrintAns)).toContainText('        System.out.println(answer);');
    });
     test('Should be able format the contents as per the formatting rules when clicked the "Reformat" button', async ({ page }) => {
        let textbookPage = new UnitTestsInJava(page); 
        await textbookPage.clickReformatButtonRiddles();
        console.log("All the contents have been reformatted");
        await expect(page.locator('//*[@id="jUnitTesting3"]/div/div[2]/button[3]')).toBeVisible();
     });
    test('Should display the code in the codeLens when the "Show in CodeLens" button is clicked', async({page})=>{
        let textbookPage = new UnitTestsInJava(page);
        await textbookPage.clickShowInCodeLensButtonRiddles();
        const riddlesHideCodeLensButton = page.locator(textbookPage.riddlesHideCodeLensButton).first();
        await expect(riddlesHideCodeLensButton).toBeEnabled();  //To enable the button before the interaction
        await expect(riddlesHideCodeLensButton).toBeVisible();
        const riddlesReformatButton = page.locator(textbookPage.riddlesReformatButton).first();
        await riddlesReformatButton.click();
        await expect(riddlesReformatButton).toBeVisible();
    });
       test('Should hide the codeLens when the "Hide Codelens" button is clicked', async({page})=>{
        let textbookPage = new UnitTestsInJava(page);
        await textbookPage.clickHideCodeLensButtonRiddles();
        const riddlesShowCodeLensButton = page.locator(textbookPage.riddlesShowCodeLensButton).first()
        await expect(riddlesShowCodeLensButton).toBeEnabled();   //To enable the button before the interaction
        await expect(riddlesShowCodeLensButton).toBeVisible();
        const riddlesReformatButton = page.locator(textbookPage.riddlesReformatButton).first();
        await riddlesReformatButton.click();
        await expect(riddlesReformatButton).toBeVisible();
    });
     test('Should display the source code when the "Show Source" button is clicked and "Hide Source" button appears', async ({ page }) => {
        let textbookPage = new UnitTestsInJava(page);        
        await textbookPage.clickShowSourceButtonRiddles();
        await expect(page.locator(textbookPage.riddlesHideSourceButton)).toBeEnabled();   //To enable the button before the interaction
        await expect(page.locator(textbookPage.riddlesHideSourceButton)).toBeVisible();
    });
    test('Should hide the source code when the "Hide Source" button is clicked and "Show Source" button appears', async ({ page }) => {
        let textbookPage = new UnitTestsInJava(page);   
        await textbookPage.clickHideSourceButtonRiddles();     
        await expect(page.locator(textbookPage.riddlesShowSourceButton)).toBeEnabled();   //To enable the button before the interaction
        await expect(page.locator(textbookPage.riddlesShowSourceButton)).toBeVisible();      
    });
});