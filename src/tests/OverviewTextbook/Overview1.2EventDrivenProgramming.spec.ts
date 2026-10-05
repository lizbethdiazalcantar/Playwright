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
test('The user loads the page and graphic box is not visible', async ({ page }) => {
    await expect(page.locator('#overview_event_turtle')).toBeVisible();
    await expect(page.locator('#overview_event_turtle_graphics')).not.toBeVisible();
});

test('The activecode example is visible before the user clicks Save and Run', async ({ page }) => {
    const textbookPage = new OverviewActiveCodeExampleInPython(page);

    await expect(page.locator('#over_ac_example1_stdout')).not.toBeVisible();

    //const lineContent = await textbookPage.getCodeMirrorLine(0, 'over_ac_example1');
    expect(page.getByText(`print("My first program adds a list of numbers")`).first()).toBeVisible();
});

test('The user clicks Save and Run and the turtle graphics canvas is visible', async ({ page }) => {
    // Click the Save & Run button in the Turtle ActiveCode section
    await page.locator('#overview_event_turtle button:has-text("Save & Run")').click();

    // Wait for the graphics container to be visible
    const graphicsBox = page.locator('#overview_event_turtle_graphics');
    await expect(graphicsBox).toBeVisible({ timeout: 5000 });

    // Ensure a canvas element is present inside the graphics container
    const canvasCount = await graphicsBox.locator('canvas').count();
    expect(canvasCount).toBeGreaterThan(0);
});




