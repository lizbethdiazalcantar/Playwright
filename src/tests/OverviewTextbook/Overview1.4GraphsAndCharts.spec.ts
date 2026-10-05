import { expect, test } from '@playwright/test';
import { SignUpPage } from '../../pages/signupPage';
import { OverviewGraphsAndChartsPage } from '../../pages/TextbookPages/OverviewGraphsAndChartsPage';
// 

test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await page.goto("/");
    let signUpPage = new SignUpPage(page);
    let textbookPage = new OverviewGraphsAndChartsPage(page);
    await signUpPage.signUpRandomUserForOverview();
    await textbookPage.goToGraphsAndChartsPage();
    await page.goto('/ns/books/published/overview/ActiveCode/python.html#graphs-and-charts');
});

test.describe('Question 4 / alt_kiva_bar1' , () => {
    
    test('Clicking the Save & Run without changing anything displays output', async ({ page }) => {
        let textbookPage = new OverviewGraphsAndChartsPage(page);
        await page.locator(textbookPage.saveAndRunButton).nth(4).click();
        console.log('Checking for standard output');
        await expect(page.locator(textbookPage.question4Output)).toContainText(`customer`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`cakes`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`flavor`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`Alice`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`Bob`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`Claire`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`chocolate`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`vanilla`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`strawberry`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`5`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`9`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`7`);
        await expect(page.locator(textbookPage.question4Graph)).toBeVisible();
    });

    test('Clicking the Save & Run with changing text in the print line', async ({ page }) => {
        let textbookPage = new OverviewGraphsAndChartsPage(page);
            await textbookPage.changeCodeMirrorLine(
      `data = altair.Data(customer=['Alice', 'Bob', 'Claire'], cakes=[5,9,7], flavor=['chocolate', 'vanilla', 'strawberry'])`,
      `data = altair.Data(customer=['Alice', 'Bob', 'Claire','Mani'], cakes=[5,9,7,6], flavor=['chocolate', 'vanilla', 'strawberry','chantilly'])`
        );
        await textbookPage.changeCodeMirrorLine(
      `data = altair.Data(customer=['Alice', 'Bob', 'Claire','Mani'], cakes=[5,9,7,6], flavor=['chocolate', 'vanilla', 'strawberry','chantilly'])`,
      `data = altair.Data(customer=['Alice', 'Bob', 'Claire','Mani'], cakes=[5,9,7,6], flavor=['red velvet', 'vanilla', 'strawberry','chantilly'])`
        );
        await page.locator(textbookPage.saveAndRunButton).nth(4).click();
        await expect(page.locator(textbookPage.question4Output)).toBeVisible();
        await expect(page.locator(textbookPage.question4Output)).toContainText(`customer`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`cakes`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`flavor`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`Alice`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`Bob`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`Claire`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`Mani`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`red velvet`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`vanilla`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`strawberry`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`chantilly`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`5`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`9`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`7`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`6`);
        await expect(page.locator(textbookPage.question4Graph)).toBeVisible();
    });

    test('clicking the Show Source Code button', async ({ page }) => {
        let textbookPage = new OverviewGraphsAndChartsPage(page);
        await page.locator(textbookPage.saveAndRunButton).nth(4).click();
        await expect(page.locator(textbookPage.question4ShowSourceCode)).toBeVisible(); 
        await page.locator(textbookPage.question4ShowSourceCode).click();
        await expect(page.locator(textbookPage.question4HideSourceCode)).toBeVisible();
        await expect(page.locator(textbookPage.question4SourceCodeOutput)).toContainText(`.. activecode:: alt_kiva_bar1`);
        await expect(page.locator(textbookPage.question4SourceCodeOutput)).toContainText(`
    import altair

    data = altair.Data(customer=['Alice', 'Bob', 'Claire'], cakes=[5,9,7], flavor=['chocolate', 'vanilla', 'strawberry'])
    print(data)
    chart = altair.Chart(data)
    mark = chart.mark_bar()
    enc = mark.encode(x='customer:N',y='cakes',color='flavor:N')
    enc.display()`);
    });

    test('Clicking the Hide Source Code button', async ({ page }) => {
        let textbookPage = new OverviewGraphsAndChartsPage(page);
        await page.locator(textbookPage.saveAndRunButton).nth(4).click();
        await expect(page.locator(textbookPage.question4ShowSourceCode)).toBeVisible();
        await page.locator(textbookPage.question4ShowSourceCode).click();
        await expect(page.locator(textbookPage.question4SourceCodeOutput)).toBeVisible();
        await expect(page.locator(textbookPage.question4HideSourceCode)).toBeVisible()
        await page.locator(textbookPage.question4HideSourceCode).click();
        await expect(page.locator(textbookPage.question4SourceCodeOutput)).toBeHidden();
        await expect(page.locator(textbookPage.question4HideSourceCode)).toBeHidden();
        await expect(page.locator(textbookPage.question4ShowSourceCode)).toBeVisible();
    });

    test('Slider changes code back to initial state and goes back to current state', async ({ page }) => {
             let textbookPage = new OverviewGraphsAndChartsPage(page);

        await textbookPage.changeCodeMirrorLine(
      `data = altair.Data(customer=['Alice', 'Bob', 'Claire'], cakes=[5,9,7], flavor=['chocolate', 'vanilla', 'strawberry'])`,
      `data = altair.Data(customer=['Alice', 'Bob', 'Claire','Mani'], cakes=[5,9,7,6], flavor=['chocolate', 'vanilla', 'strawberry','chantilly'])`
        );

        await page.locator(textbookPage.saveAndRunButton).nth(4).click();

        await expect(page.locator(textbookPage.question4Output)).toContainText(`customer`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`cakes`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`flavor`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`Alice`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`Bob`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`Claire`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`Mani`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`chocolate`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`vanilla`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`strawberry`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`chantilly`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`5`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`9`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`7`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`6`);
        await expect(page.locator(textbookPage.question4Graph)).toBeVisible();

        await textbookPage.changeCodeMirrorLine(
      `data = altair.Data(customer=['Alice', 'Bob', 'Claire','Mani'], cakes=[5,9,7,6], flavor=['chocolate', 'vanilla', 'strawberry','chantilly'])`,
      `data = altair.Data(customer=['Alice', 'Bob', 'Claire','Mani'], cakes=[5,9,7,6], flavor=['red velvet', 'vanilla', 'strawberry','chantilly'])`
        );

        await page.locator(textbookPage.saveAndRunButton).nth(4).click();
        await expect(page.locator(textbookPage.question4Output)).toContainText(`customer`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`cakes`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`flavor`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`Alice`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`Bob`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`Claire`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`Mani`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`red velvet`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`vanilla`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`strawberry`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`chantilly`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`5`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`9`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`7`);
        await expect(page.locator(textbookPage.question4Output)).toContainText(`6`);
        await expect(page.locator(textbookPage.question4Graph)).toBeVisible();

        await textbookPage.dragSlider(page, textbookPage.GraphsAndChartsSliderHandle, textbookPage.GraphsAndChartsSliderTrack, 100, 50);
        await expect(page.locator(textbookPage.question4CodeLine)).toContainText(`data = altair.Data(customer=['Alice', 'Bob', 'Claire','Mani'], cakes=[5,9,7,6], flavor=['chocolate', 'vanilla', 'strawberry','chantilly'])`);

        await textbookPage.dragSlider(page, textbookPage.GraphsAndChartsSliderHandle, textbookPage.GraphsAndChartsSliderTrack, 50, 0);
        await expect(page.locator(textbookPage.question4CodeLine)).toContainText(`data = altair.Data(customer=['Alice', 'Bob', 'Claire'], cakes=[5,9,7], flavor=['chocolate', 'vanilla', 'strawberry'])`);
        
        await textbookPage.dragSlider(page, textbookPage.GraphsAndChartsSliderHandle, textbookPage.GraphsAndChartsSliderTrack, 0, 50);
        await expect(page.locator(textbookPage.question4CodeLine)).toContainText(`data = altair.Data(customer=['Alice', 'Bob', 'Claire','Mani'], cakes=[5,9,7,6], flavor=['chocolate', 'vanilla', 'strawberry','chantilly'])`);

        await textbookPage.dragSlider(page, textbookPage.GraphsAndChartsSliderHandle, textbookPage.GraphsAndChartsSliderTrack, 50, 100);
        await expect(page.locator(textbookPage.question4CodeLine)).toContainText(`data = altair.Data(customer=['Alice', 'Bob', 'Claire','Mani'], cakes=[5,9,7,6], flavor=['red velvet', 'vanilla', 'strawberry','chantilly'])`);
    }); 

    test('When Codemirror div contains incorrect syntax, clicking Save & Run displays error output, Code Coach output and standard output', async ({ page }) => {
                let textbookPage = new OverviewGraphsAndChartsPage(page);
                await textbookPage.changeCodeMirrorLine(
                    `enc.display()`,
                    `enc.display(` // missing closing parenthesis
                );
                await page.locator(textbookPage.saveAndRunButton).nth(4).click();
                console.log('Checking for error output');
                await expect(page.locator(textbookPage.question4CodeCoach)).toBeVisible();
                await expect(page.locator(textbookPage.question4EmptyOutput)).toBeVisible();
                await expect(page.locator(textbookPage.question4ErrorAlert)).toBeVisible();
                await expect(page.locator(textbookPage.question4ErrorAlert)).toContainText(`An error occurred after the end of your code.`);
                await expect(page.locator(textbookPage.question4ErrorAlert)).toContainText(`One possible reason is that you have an unclosed parenthesis or string.`);
                await expect(page.locator(textbookPage.question4ErrorAlert)).toContainText(`Another possibility is that there is an error in the hidden test code.`);
                await expect(page.locator(textbookPage.question4ErrorAlert)).toContainText(`Yet another is that there is an internal error. The internal error message is: undefined`);
                await expect(page.locator(textbookPage.question4Graph)).toBeHidden();
            });
});