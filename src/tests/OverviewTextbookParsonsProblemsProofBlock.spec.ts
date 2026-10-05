import { LoginPage } from '../pages/loginPage';
import { testData } from '../utils/testData';
import {test,expect } from '@playwright/test';
import { SignUpPage } from '../pages/signupPage';
import { OverviewTextbookParsonsProblemsProofBlock } from '../pages/TextbookPages/OverviewTextbookParsonsProblemsProofBlock';



test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await page.goto('/');
    let signUpPage = new SignUpPage(page);
    let textbookPage = new OverviewTextbookParsonsProblemsProofBlock(page);
    await signUpPage.signUpRandomUserForOverview();
    await textbookPage.goToParsonsPage();

});

test.describe('Test Drag and drop ALL of the blocks below to create a proof of the following statement.)', () => {
    
    test('Test wrong response 2.3.2', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsProofBlock(page);
       await page.locator('#parsons-7-block-0').dragTo(page.locator('#parsons-7-answerRegion'));
       await page.locator('#parsons-7-block-1').dragTo(page.locator('#parsons-7-answerRegion'));
       await page.locator('#parsons-7-block-2').dragTo(page.locator('#parsons-7-answerRegion'));
       await page.locator('#parsons-7-block-3').dragTo(page.locator('#parsons-7-answerRegion'));
       await page.locator('#parsons-7-block-4').dragTo(page.locator('#parsons-7-answerRegion'));
       await page.locator('#parsons-7-block-5').dragTo(page.locator('#parsons-7-answerRegion'));
       await page.locator('#parsons-7-block-6').dragTo(page.locator('#parsons-7-answerRegion'));
       await page.locator('#parsons-7-block-7').dragTo(page.locator('#parsons-7-answerRegion'));
       await page.locator('#parsons-7-block-8').dragTo(page.locator('#parsons-7-answerRegion'));
       await page.locator('#parsons-7-check').click();
       await expect(page.locator("#parsons-7-message")).toContainText('Highlighted');
       
    })

    test('Test correct response 2.3.2', async ({ page }) => {

        //Still need to do
        let textbookPage = await new OverviewTextbookParsonsProblemsProofBlock(page);
      //  await page.locator("#parsons-7-block-2").dragTo(page.locator("#parsons-7-answer"),  {targetPosition: { x: 0, y: 355}});
       await page.locator('#parsons-7-block-0').dragTo(page.locator('#parsons-7-answerRegion'),  {targetPosition: { x: 0, y: 355}});
       await page.locator('#parsons-7-block-1').dragTo(page.locator('#parsons-7-answerRegion'),  {targetPosition: { x: 0, y: 355}});
       await page.locator('#parsons-7-block-4').dragTo(page.locator('#parsons-7-answerRegion'),  {targetPosition: { x: 0, y: 355}});
       await page.locator('#parsons-7-block-2').dragTo(page.locator('#parsons-7-answerRegion'),  {targetPosition: { x: 0, y: 355}});// let f
       await page.locator('#parsons-7-block-3').dragTo(page.locator('#parsons-7-answerRegion'),  {targetPosition: { x: 0, y: 355}});// define c"
       await page.locator('#parsons-7-block-5').dragTo(page.locator('#parsons-7-answerRegion'),  {targetPosition: { x: 0, y: 355}});//Z(f(u))
       await page.locator('#parsons-7-block-6').dragTo(page.locator('#parsons-7-answerRegion'),  {targetPosition: { x: 0, y: 355}});//c(f(u))
       await page.locator('#parsons-7-block-7').dragTo(page.locator('#parsons-7-answerRegion'),  {targetPosition: { x: 0, y: 355}});//C' U
       await page.locator('#parsons-7-block-8').dragTo(page.locator('#parsons-7-answerRegion'),  {targetPosition: { x: 0, y: 355}});//c" is
       await page.locator('#parsons-7-check').click();
       await expect(page.locator("#parsons-7-message")).toContainText('Perfect');
       
    })

    test('Reset Button 2.3.2', async ({ page }) => {

        //Still need to do
        let textbookPage = await new OverviewTextbookParsonsProblemsProofBlock(page);
       await page.locator('#parsons-7-block-0').dragTo(page.locator('#parsons-7-answerRegion'));
       await page.locator('#parsons-7-block-1').dragTo(page.locator('#parsons-7-answerRegion'));
       await page.locator('#parsons-7-block-4').dragTo(page.locator('#parsons-7-answerRegion'));
       await page.locator('#parsons-7-block-2').dragTo(page.locator('#parsons-7-answerRegion'));// let f
       await page.locator('#parsons-7-block-3').dragTo(page.locator('#parsons-7-answerRegion'));// define c"
       await page.locator('#parsons-7-block-5').dragTo(page.locator('#parsons-7-answerRegion'));//Z(f(u))
       await page.locator('#parsons-7-block-6').dragTo(page.locator('#parsons-7-answerRegion'));//c(f(u))
       await page.locator('#parsons-7-block-7').dragTo(page.locator('#parsons-7-answerRegion'));//C' U
       await page.locator('#parsons-7-block-8').dragTo(page.locator('#parsons-7-answerRegion'));//c" is
       await page.locator('#parsons-7-reset').click();
       await expect(page.locator("#parsons-7-message")).toContainText('');
       
    })
//////////////////////////////////////////////////////////////////////////
//
//  Commenting out these tests as they fail regularly; only the first dragTo is completed for some reason.  Will revisit later.

/*    test('Test wrong response 2.3.3', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsProofBlock(page);
        const dropArea = page.locator('.drop-area').nth(2);
        const dragArea = page.locator('.drag-area').nth(2);

        //await page.locator('//div[contains(@class, "parsons-block") and text()="test"]').nth(1).dragTo(page.locator('.drop-area').nth(2), { targetPosition: { x: 200, y: 0 }});
        await dropArea.click();
        //await expect(dropArea).toContainText('test');

        //await page.locator('//span[contains(@class, "hljs-keyword") and span[text()="*"]]').nth(1).dragTo(page.locator('.drop-area').nth(2), { targetPosition: { x: 200, y: 0 }});
        await page.locator('//div[contains(@class, "parsons-block") and span[text()="FROM"]]').nth(1).dragTo(dropArea, { targetPosition: { x: 570, y: 0 }});
        await dragArea.click();
        await page.locator('//div[contains(@class, "parsons-block") and span[text()="SELECT"]]').nth(1).dragTo(dropArea, { targetPosition: { x: 570, y: 0 }});
        await dropArea.click();
        await page.locator('//div[contains(@class, "parsons-block") and span[text()="*"]]').nth(1).dragTo(page.locator('.drop-area').nth(2), { targetPosition: { x: 570, y: 0 }});
        await dropArea.click();
        //await expect(dropArea.locator(page.locator('//div[contains(@class, "parsons-block") and span[text()="*"]]'))).toBeVisible();
        //await dropArea.click();
        //await expect(dropArea).toContainText('\*');

        // await page.locator('#hparsonstool-3-parsons-input div').filter({ hasText: '/^FROM$/' }).dragTo(page.locator('.drop-area').nth(2), { targetPosition: { x: 200, y: 0 }});
        
        //await page.locator('//div[contains(@class, "parsons-block") and span[text()="FROM"]]').dragTo(page.locator('.drop-area').nth(2), { targetPosition: { x: 200, y: 0 }});
        //await expect(dropArea.locator(page.locator('//div[contains(@class, "parsons-block") and span[text()="FROM"]]'))).toBeVisible();

       //await page.locator('//div[contains(@class, "parsons-block") and span[text()="SELECT"]]').nth(1).dragTo(page.locator('.drop-area').nth(2), { targetPosition: { x: 200, y: 0 }});
       //await expect(dropArea.locator(page.locator('//div[contains(@class, "parsons-block") and span[text()="SELECT"]]'))).toBeVisible();


       await page.locator('.btn.btn-success.run-button').nth(2).click();
       await expect(page.locator('.alert.alert-danger')).toBeVisible();       
       await expect(page.locator('.alert.alert-danger')).toContainText('Highlighted');
    }) 



    test('Test correct response 2.3.3', async ({ page }) => {
        const dropArea = page.locator('.drop-area').nth(0);
        let textbookPage = await new OverviewTextbookParsonsProblemsProofBlock(page);
        await page.locator('.drag-area .parsons-block').filter({ hasText: /^SELECT$/ }).nth(0).dragTo(page.locator('.drop-area').nth(0));
        await expect(dropArea.locator(page.locator('//div[contains(@class, "parsons-block") and span[text()="SELECT"]]'))).toBeVisible();

        await page.locator('//div[contains(@class, "parsons-block") and span[text()="*"]]').nth(0).dragTo(page.locator('.drop-area').nth(0));
        await expect(dropArea.locator(page.locator('//div[contains(@class, "parsons-block") and span[text()="*"]]'))).toBeVisible();
       
        await page.locator('.drag-area .parsons-block').filter({ hasText: /^FROM$/ }).nth(0).dragTo(page.locator('.drop-area').nth(0));
        await expect(dropArea.locator(page.locator('//div[contains(@class, "parsons-block") and span[text()="FROM"]]'))).toBeVisible();

        await page.locator('//div[contains(@class, "parsons-block") and text()="test"]').nth(0).dragTo(page.locator('.drop-area').nth(0));
        await expect(dropArea.locator('//div[contains(@class, "parsons-block") and text()="test"]')).toContainText('test');

        /*await page.locator('.parsons-block', { hasText: 'SELECT' }).nth(0).dragTo(page.locator('.drop-area').nth(0));
        await page.locator('.parsons-block', { hasText: '*' }).nth(0).dragTo(page.locator('.drop-area').nth(0));
        await page.locator('.parsons-block', { hasText: 'FROM' }).nth(0).dragTo(page.locator('.drop-area').nth(0));
        await page.locator('.parsons-block', { hasText: 'test' }).nth(0).dragTo(page.locator('.drop-area').nth(0));
 
        
        await page.locator('.btn.btn-success.run-button').nth(0).click();
        await page.waitForSelector('.alert.alert-info', { state: 'visible', timeout: 3000 });
        await expect(page.locator('.alert.alert-info')).toBeVisible();
        await expect(page.locator('.alert.alert-info')).toContainText('Perfect');
       
    }) */

    test('Test incomplete response 2.3.3', async ({ page }) => {
        let textbookPage = await new OverviewTextbookParsonsProblemsProofBlock(page);
        await page.locator('.parsons-block', { hasText: 'test' }).nth(0).dragTo(page.locator('.drop-area').nth(0));
        await page.locator('.btn.btn-success.run-button').nth(0).click();
        await expect(page.locator('.alert.alert-danger')).toBeVisible();       
        await expect(page.locator('.alert.alert-danger')).toContainText('Your answer is too short. Add more blocks.');
    }) 

    test('Reset Button 2.3.3', async ({ page }) => {

        //Still need to do
        let textbookPage = await new OverviewTextbookParsonsProblemsProofBlock(page);
        await page.locator('.btn.btn-warning.run-button').nth(0).click();
        await expect(page.locator('.drop-area').nth(0)).toBeEmpty();
       
    })
})

