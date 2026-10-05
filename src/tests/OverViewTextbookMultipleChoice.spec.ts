import { expect, test } from '@playwright/test';
import { SignUpPage } from '../pages/signupPage';
import { OverviewTextbookMultipleChoicePage } from '../pages/TextbookPages/OverviewTextbookMultipleChoicePage';

test.beforeEach(async ({ page }) => {
    console.log(`Running ${test.info().title}`);
    await page.goto('/');
    let signUpPage = new SignUpPage(page);
    let textbookPage = new OverviewTextbookMultipleChoicePage(page);
    await signUpPage.signUpRandomUserForOverview();
    await textbookPage.goToMultipleChoicePage();
//    await page.goto('/ns/books/published/overview/Assessments/multiplechoice.html');
});

    test.describe('Test Question 1 (What programming language does this site help you to learn?)', () => {
        
        test("User selects the correct answer (Python) and sees confirmation", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects Java option-
            await page.click(textbookPage.q1PythonOption);  // Ensure click action
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(0).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q1Feedback);
            await expect(feedbackText).toContainText('✔️');
            await expect(feedbackText).toContainText("Yes, Python is a great language to learn, whether you are a beginner or an experienced programmer. The correct answer is designated by using a plus sign before the answer.");

        })

        test("User selects the incorrect answer (Java) and sees confirmation", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects Java option
            await page.click(textbookPage.q1JavaOption);  // Ensure click action
            // And user clicks the "Check Me" button to submit the answer
            page.locator(textbookPage.checkMeButton).nth(0).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q1Feedback);
            await expect(feedbackText).toContainText('✖️');
            await expect(feedbackText).toContainText("Java is a good object oriented language but it has some details that make it hard for the beginner");

        })
        
        test("User selects the incorrect answer (C) and sees confirmation", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects Java option
            await page.click(textbookPage.q1COption);  // Ensure click action
            // And user clicks the "Check Me" button to submit the answer
            page.locator(textbookPage.checkMeButton).nth(0).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q1Feedback);
            await expect(feedbackText).toContainText('✖️');
            await expect(feedbackText).toContainText("C is an imperative programming language that has been around for a long time, but it is not the one that we use.");

        })

        test("User selects the incorrect answer (ML) and sees confirmation", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects Java option
            await page.click(textbookPage.q1MLOption);  // Ensure click action
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(0).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q1Feedback);
            await expect(feedbackText).toContainText('✖️');
            await expect(feedbackText).toContainText("No, ML is a functional programming language. You can use Python to write functional programs as well.");

        })

        test('User clicks Compare Me for question1_1', async ({ page }) => {
            let textbookPage = new OverviewTextbookMultipleChoicePage(page);
            await page.click(textbookPage.q1PythonOption);
            await page.locator(textbookPage.checkMeButton).nth(0).click()
            await page.locator(textbookPage.q1CompareMeButton).click();
            let popupTitle = page.locator('text=Distribution of Answers');
            await expect(popupTitle).toBeVisible();

        })

        test('User clicks Show Source for question1_1', async ({ page }) => {
            let textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // Define the locator for the preformatted text
            const preText = page.locator('pre',{hasText: 'What programming language does this site help you to learn?'});
            // Verify that the <pre> element is hidden before clicking
            await expect(preText).toBeHidden();
            // Wait for "Show Source" button to be visible and enabled
            const showSourceButton = page.locator(textbookPage.q1ShowSourceButton);
            await showSourceButton.waitFor({ state: 'visible', timeout: 2000 });
            await expect(showSourceButton).toBeEnabled();
            // Click the "Show Source" button
            await showSourceButton.click();
            await expect(preText).toBeVisible({ timeout: 2000 });

        });

        test('User clicks Hide Source for question1_1', async ({ page }) => {
            let textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // Wait for "Show Source" button to be visible and enabled
            const showSourceButton = page.locator(textbookPage.q1ShowSourceButton);
            await showSourceButton.waitFor({ state: 'visible', timeout: 2000 });
            await expect(showSourceButton).toBeEnabled();
            // Click the "Show Source" button
            await showSourceButton.click();
            const hideSourceButton = page.locator(textbookPage.q1HideSourceButton);
            await hideSourceButton.waitFor({ state: 'visible', timeout: 2000 });  // Ensure button is visible
            await expect(hideSourceButton).toBeEnabled();  // Ensure button is enabled
            // Click the "Hide Source" button
            await hideSourceButton.click();
            await expect(hideSourceButton).toBeHidden();

        });

    });
    
    test.describe('Test Question 2 (What does the following code print when x has been set to 187?)', () => {
        
        test("User selects the correct answer (Positive) and sees confirmation", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects Java option
            await page.click(textbookPage.q2XIsPositive);  // Ensure click action
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(1).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q2Feedback);
            await expect(feedbackText).toContainText('✔️');
            await expect(feedbackText).toContainText("The first condition is false and x is not equal to zero so the else will execute.");

        })

        test("User selects the incorrect answer (Negative) and sees confirmation", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects Java option
            await page.click(textbookPage.q2XIsNegative);  // Ensure click action
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(1).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q2Feedback);
            await expect(feedbackText).toContainText('✖️');
            await expect(feedbackText).toContainText("This will only print if x has been set to a number less than zero. Has it?");

        })

        test("User selects the incorrect answer (Zero) and sees confirmation", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects Java option
            await page.click(textbookPage.q2XIsZero);  // Ensure click action
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(1).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q2Feedback);
            await expect(feedbackText).toContainText('✖️');
            await expect(feedbackText).toContainText("This will only print if x has been set to 0. Has it?");
            
        })

        test('User clicks Compare Me for qce_1', async ({ page }) => {
            let textbookPage = new OverviewTextbookMultipleChoicePage(page);
            await page.click(textbookPage.q2XIsPositive);
            await page.locator(textbookPage.checkMeButton).nth(1).click()
            await page.locator(textbookPage.q2CompareMeButton).click();
            let popupTitle = page.locator('text=Distribution of Answers');
            await expect(popupTitle).toBeVisible();

        })

        test('User clicks Show Source for qce_1', async ({ page }) => {
            let textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // Define the locator for the preformatted text
            const preText = page.locator('pre',{hasText: 'T What does the following code print when'});
            // Verify that the <pre> element is hidden before clicking
            await expect(preText).toBeHidden();
            // Wait for "Show Source" button to be visible and enabled
            const showSourceButton = page.locator(textbookPage.q2ShowSourceButton);
            await showSourceButton.waitFor({ state: 'visible', timeout: 2000 });
            await expect(showSourceButton).toBeEnabled();
            // Click the "Show Source" button
            await showSourceButton.click();
            // Verify that the <pre> element is now visible
            await expect(preText).toBeVisible({ timeout: 2000 });

        });

        test('User clicks Hide Source for qce_1', async ({ page }) => {
            let textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // Wait for "Show Source" button to be visible and enabled
            const showSourceButton = page.locator(textbookPage.q2ShowSourceButton);
            await showSourceButton.waitFor({ state: 'visible', timeout: 2000 });
            await expect(showSourceButton).toBeEnabled();
            // Click the "Show Source" button
            await showSourceButton.click();
            const hideSourceButton = page.locator(textbookPage.q2HideSourceButton);
            await hideSourceButton.waitFor({ state: 'visible', timeout: 2000 });  // Ensure button is visible
            await expect(hideSourceButton).toBeEnabled();  // Ensure button is enabled
            // Click the "Hide Source" button
            await hideSourceButton.click();
            await expect(hideSourceButton).toBeHidden();

        });

    });
    
    test.describe('Test Question 3 (Which of the following code draws this picture?)', () => {


        test("User selects the correct answer (C. North west quadrant) and sees confirmation", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects option C
            await page.click(textbookPage.q3OptionC);  // Ensure click action
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(2).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q3Feedback);
            await expect(feedbackText).toContainText('✔️');
            await expect(feedbackText).toContainText("This code will draw a rectangle in the north west quadrant.");

        });

        test("User selects the incorrect answer (A. South west quadrant) and sees confirmation", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects option A
            await page.click(textbookPage.q3OptionA);  // Ensure click action
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(2).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q3Feedback);
            await expect(feedbackText).toContainText('✖️');
            await expect(feedbackText).toContainText("This code will draw a rectangle in the south west quadrant.");

        })
    
        test("User selects the incorrect answer (B. North east quadrant) and sees confirmation", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects option B
            await page.click(textbookPage.q3OptionB);  // Ensure click action
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(2).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q3Feedback);
            await expect(feedbackText).toContainText('✖️');
            await expect(feedbackText).toContainText("This code will draw a rectangle in the north east quadrant.");

        })
    
        test("User selects the incorrect answer (D. South east quadrant) and sees confirmation", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects option D
            await page.click(textbookPage.q3OptionD);  // Ensure click action
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(2).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q3Feedback);
            await expect(feedbackText).toContainText('✖️');
            await expect(feedbackText).toContainText("This code will draw a rectangle in the south east quadrant.");
        
        })

        test('User clicks Compare Me for over_turtle_which_draws_pict_mcq', async ({ page }) => {
            let textbookPage = new OverviewTextbookMultipleChoicePage(page);
            await page.click(textbookPage.q3OptionA);
            await page.locator(textbookPage.checkMeButton).nth(2).click()
            await page.locator(textbookPage.q3CompareMeButton).click();
            let popupTitle = page.locator('text=Distribution of Answers');
            await expect(popupTitle).toBeVisible();

        })
    
        test('User clicks Show Source for over_turtle_which_draws_pict_mcq', async ({ page }) => {
            let textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // Define the locator for the preformatted text
            const preText = page.locator('pre',{hasText: 'over_turtle_which_draws_pict_mcq\n\nWhich of the following code draws this picture?'});
            // Verify that the <pre> element is hidden before clicking
            await expect(preText).toBeHidden();
            // Wait for "Show Source" button to be visible and enabled
            const showSourceButton = page.locator(textbookPage.q3ShowSourceButton);
            await showSourceButton.waitFor({ state: 'visible', timeout: 2000 });
            await expect(showSourceButton).toBeEnabled();
            // Click the "Show Source" button
            await showSourceButton.click();
            // Verify that the <pre> element is now visible
            await expect(preText).toBeVisible({ timeout: 2000 });

        });
        
        test('User clicks Hide Source for over_turtle_which_draws_pict_mcq', async ({ page }) => {
            let textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // Wait for "Show Source" button to be visible and enabled
            const showSourceButton = page.locator(textbookPage.q3ShowSourceButton);
            await showSourceButton.waitFor({ state: 'visible', timeout: 2000 });
            await expect(showSourceButton).toBeEnabled();
            // Click the "Show Source" button
            await showSourceButton.click();
            const hideSourceButton = page.locator(textbookPage.q3HideSourceButton);
            await hideSourceButton.waitFor({ state: 'visible', timeout: 2000 });  // Ensure button is visible
            await expect(hideSourceButton).toBeEnabled();  // Ensure button is enabled
            // Click the "Hide Source" button
            await hideSourceButton.click();
            await expect(hideSourceButton).toBeHidden();

        });

    });

        test.describe('Test Question 4 (Which of the following code is correct?)', () => {

            test("User selects the incorrect answer (A. This code should use self.first and self.last in the __str__ method) and sees confirmation", async ({ page }) => {
                // Initialize the page object
                const textbookPage = new OverviewTextbookMultipleChoicePage(page);
                // When user selects Java option
                await page.click(textbookPage.q4OptionA);  // Ensure click action
                // And user clicks the "Check Me" button to submit the answer
                await page.locator(textbookPage.checkMeButton).nth(3).click();// Ensure click action the answer
                // Then user should see confirmation feedback
                let feedbackText = page.locator(textbookPage.q4Feedback);
                await expect(feedbackText).toContainText('✖️');
                await expect(feedbackText).toContainText("This code should use self.first and self.last in the __str__ method");
                
        })
        
        test("User selects the correct answer (B. The code is correct) and sees confirmation", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects option
            await page.click(textbookPage.q4OptionB);  // Ensure click action
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(3).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q4Feedback);
            await expect(feedbackText).toContainText('✔️');
            await expect(feedbackText).toContainText("This code is correct.");

    })

        test("User selects the incorrect answer (C. Missing self on __str__ and initials methods) and sees confirmation", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects option
            await page.click(textbookPage.q4OptionC);  // Ensure click action
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(3).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q4Feedback);
            await expect(feedbackText).toContainText('✖️');
            await expect(feedbackText).toContainText("This code is missing the self on the __str__ and initials methods");

        })

        test("User selects the incorrect answer (D. None of them) and sees confirmation", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects option
            await page.click(textbookPage.q4OptionD);  // Ensure click action
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(3).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q4Feedback);
            await expect(feedbackText).toContainText('✖️');
            await expect(feedbackText).toContainText("One of them is correct");
            
        })

        test('User clicks Compare Me for over_turtle_which_draws_pict_mcq', async ({ page }) => {
            let textbookPage = new OverviewTextbookMultipleChoicePage(page);
            await page.click(textbookPage.q4OptionA);
            await page.locator(textbookPage.checkMeButton).nth(3).click()
            await page.locator(textbookPage.q4CompareMeButton).click();
            let popupTitle = page.locator('text=Distribution of Answers');
            await expect(popupTitle).toBeVisible();
        })

        test('User clicks Show Source for over_class_mcq_correct_person_def_code_block', async ({ page }) => {
            let textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // Define the locator for the preformatted text
            const preText = page.locator('pre',{hasText: 'over_class_mcq_correct_person_def_code_block Which of the following code is correct?'});
            // Verify that the <pre> element is hidden before clicking
            await expect(preText).toBeHidden();
            // Wait for "Show Source" button to be visible and enabled
            const showSourceButton = page.locator(textbookPage.q4ShowSourceButton);
            await showSourceButton.waitFor({ state: 'visible', timeout: 2000 });
            await expect(showSourceButton).toBeEnabled();
            // Click the "Show Source" button
            await showSourceButton.click();
            // Verify that the <pre> element is now visible
            await expect(preText).toBeVisible({ timeout: 2000 });

        });

        test('User clicks Hide Source for over_class_mcq_correct_person_def_code_block', async ({ page }) => {
            let textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // Wait for "Show Source" button to be visible and enabled
            const showSourceButton = page.locator(textbookPage.q4ShowSourceButton);
            await showSourceButton.waitFor({ state: 'visible', timeout: 2000 });
            await expect(showSourceButton).toBeEnabled();
            // Click the "Show Source" button
            await showSourceButton.click();
            const hideSourceButton = page.locator(textbookPage.q4HideSourceButton);
            await hideSourceButton.waitFor({ state: 'visible', timeout: 2000 });  // Ensure button is visible
            await expect(hideSourceButton).toBeEnabled();  // Ensure button is enabled
            // Click the "Hide Source" button
            await hideSourceButton.click();
            await expect(hideSourceButton).toBeHidden();

        });

    });

    test.describe('Test Question 5 (Which colors might be found in a rainbow?)', () => {

        test("User selects the correct answer (Red and Yellow and Green) and sees confirmation", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects option
            await page.click(textbookPage.q5OptionA);  // Ensure click action
            await page.click(textbookPage.q5OptionB);
            await page.click(textbookPage.q5OptionD);
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(4).click(); // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q5Feedback);
            await expect(feedbackText).toContainText("✔️");
            await expect(feedbackText).toContainText("Red is a definitely on of the colors.");
	        await expect(feedbackText).toContainText("Yes, yellow is correct.");
	        await expect(feedbackText).toContainText("Yes, green is one of the colors.");

        })

        test("User selects the incorrect answer (C. Black) and sees confirmation", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects option
            await page.click(textbookPage.q5OptionC);  // Ensure click action
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(4).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q5Feedback);
            await expect(feedbackText).toContainText("✖️ You gave 1 answer and got 0 correct of 3 needed.");
	        await expect(feedbackText).toContainText("Remember the acronym…ROY G BIV. B stands for blue.");

        })
    
        test("User selects the incorrect answer (D. Green) and sees confirmation", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects option
            await page.click(textbookPage.q5OptionD);  // Ensure click action
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(4).click(); // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q5Feedback);
            await expect(feedbackText).toContainText("✖️ You gave 1 answer and got 1 correct of 3 needed.");
	        await expect(feedbackText).toContainText("Yes, green is one of the colors.");

        })
    
        test("User selects the incorrect answer (Black) and the correct answer (Yellow) and sees partial feedback", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects option
            await page.click(textbookPage.q5OptionC);
	        await page.click(textbookPage.q5OptionB);
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(4).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q5Feedback);
            await expect(feedbackText).toContainText("✖️ You gave 2 answers and got 1 correct of 3 needed.");
	        await expect(feedbackText).toContainText("Yes, yellow is correct.");
            await expect(feedbackText).toContainText("Remember the acronym…ROY G BIV. B stands for blue.");

        })

        test('User clicks Compare Me for question1_2', async ({ page }) => {
            let textbookPage = new OverviewTextbookMultipleChoicePage(page);
            await page.click(textbookPage.q5OptionA);
            await page.locator(textbookPage.checkMeButton).nth(4).click()
            await page.locator(textbookPage.q5CompareMeButton).click();
            let popupTitle = page.locator('text=Distribution of Answers');
            await expect(popupTitle).toBeVisible();

        })
    
        test('User clicks Show Source for question1_2', async ({ page }) => {
            let textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // Define the locator for the preformatted text
            const preText = page.locator('pre',{hasText: 'question1_2 Which colors might be found in a rainbow? (Choose all that are correct)'});
            // Verify that the <pre> element is hidden before clicking
            await expect(preText).toBeHidden();
            // Wait for "Show Source" button to be visible and enabled
            const showSourceButton = page.locator(textbookPage.q5ShowSourceButton);
            await showSourceButton.waitFor({ state: 'visible', timeout: 2000 });
            await expect(showSourceButton).toBeEnabled();
            // Click the "Show Source" button
            await showSourceButton.click();
            // Verify that the <pre> element is now visible
            await expect(preText).toBeVisible({ timeout: 2000 });

        });

        test('User clicks Hide Source for question1_2', async ({ page }) => {
            let textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // Wait for "Show Source" button to be visible and enabled
            const showSourceButton = page.locator(textbookPage.q5ShowSourceButton);
            await showSourceButton.waitFor({ state: 'visible', timeout: 2000 });
            await expect(showSourceButton).toBeEnabled();
            // Click the "Show Source" button
            await showSourceButton.click();
            const hideSourceButton = page.locator(textbookPage.q5HideSourceButton);
            await hideSourceButton.waitFor({ state: 'visible', timeout: 2000 });  // Ensure button is visible
            await expect(hideSourceButton).toBeEnabled();  // Ensure button is enabled
            // Click the "Hide Source" button
            await hideSourceButton.click();
            await expect(hideSourceButton).toBeHidden();

        });
    })

    test.describe('Test Question 6 (What numbers are less than 3?)', () => {

        test("User selects the correct answers (0, 1, 2) and sees confirmation", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects option
            await page.click(textbookPage.q6OptionA);
            await page.click(textbookPage.q6OptionB);
            await page.click(textbookPage.q6OptionC);
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(5).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q6Feedback);
            await expect(feedbackText).toContainText("✔️");
	        await expect(feedbackText).toContainText("Correct.");

    })
    
        test("User selects the incorrect answer (3) and sees feedback", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects option
            await page.click(textbookPage.q6OptionD);
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(5).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q6Feedback);
            await expect(feedbackText).toContainText("✖️");
	        await expect(feedbackText).toContainText("Incorrect.");
    })

        test("User selects a mix of correct (0, 1) and incorrect (3) answers and sees partial feedback", async ({ page }) => {
            // Initialize the page object
            const textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // When user selects option
            await page.click(textbookPage.q6OptionA);
            await page.click(textbookPage.q6OptionB);
            await page.click(textbookPage.q6OptionD);
            // And user clicks the "Check Me" button to submit the answer
            await page.locator(textbookPage.checkMeButton).nth(5).click();  // Ensure click action the answer
            // Then user should see confirmation feedback
            let feedbackText = page.locator(textbookPage.q6Feedback);
            await expect(feedbackText).toContainText("✖️");
	        await expect(feedbackText).toContainText("Correct.");
            await expect(feedbackText).toContainText("Incorrect.");

        })

        test('User clicks Compare Me for mchoice_random', async ({ page }) => {
            let textbookPage = new OverviewTextbookMultipleChoicePage(page);
            await page.click(textbookPage.q6OptionA);
            await page.locator(textbookPage.checkMeButton).nth(5).click()
            await page.locator(textbookPage.q6CompareMeButton).click();
            let popupTitle = page.locator('text=Distribution of Answers');
            await expect(popupTitle).toBeVisible();

        })

        test('User clicks Show Source for mchoice_random', async ({ page }) => {
            let textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // Define the locator for the preformatted text
            const preText = page.locator('pre',{hasText: 'mchoice_random'});
            // Verify that the <pre> element is hidden before clicking
            await expect(preText).toBeHidden();
            // Wait for "Show Source" button to be visible and enabled
            const showSourceButton = page.locator(textbookPage.q6ShowSourceButton);
            await showSourceButton.waitFor({ state: 'visible', timeout: 2000 });
            await expect(showSourceButton).toBeEnabled();
            // Click the "Show Source" button
            await showSourceButton.click();
            // Verify that the <pre> element is now visible
            await expect(preText).toBeVisible({ timeout: 2000 });

        });

        test('User clicks Hide Source for mchoice_random', async ({ page }) => {
            let textbookPage = new OverviewTextbookMultipleChoicePage(page);
            // Wait for "Show Source" button to be visible and enabled
            const showSourceButton = page.locator(textbookPage.q6ShowSourceButton);
            await showSourceButton.waitFor({ state: 'visible', timeout: 2000 });
            await expect(showSourceButton).toBeEnabled();
            // Click the "Show Source" button
            await showSourceButton.click();
            const hideSourceButton = page.locator(textbookPage.q6HideSourceButton);
            await hideSourceButton.waitFor({ state: 'visible', timeout: 2000 });  // Ensure button is visible
            await expect(hideSourceButton).toBeEnabled();  // Ensure button is enabled
            // Click the "Hide Source" button
            await hideSourceButton.click();
            await expect(hideSourceButton).toBeHidden();
            
        });

    });