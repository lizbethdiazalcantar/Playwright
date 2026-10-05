import { Locator, Page, expect } from "@playwright/test";
import { TextbookPage } from "../textbookPage";
import {
  clickButton,
  getValidatedLocator,
  toggleSourceContent,
} from "../../utils/buttonUtils"; // Import the helper functions

// If have time can refactor the locators properties to be more readable
export class OverviewFillInTheBlank extends TextbookPage {
  // Header & Section Number
  readonly headerText: Locator;
  readonly sectionNumber: Locator;

  // Message Box
  readonly supportMessageBox: Locator;
  readonly supportRunestoneButton: Locator;

  // Progress
  progressStatus: Locator;
  readonly markAsCompleteButton: Locator;

  // Activity Containers
  readonly activity1Container: Locator;
  readonly activity2Container: Locator;
  readonly activity3Container: Locator;
  readonly activity4Container: Locator;

  // Activity 2.2.1 Fill in the Blank
  readonly activity1FillInput: Locator;
  readonly checkMeButton: Locator;
  readonly compareButton: Locator;
  readonly showSourceButton: Locator;
  readonly sourceContent: Locator;
  readonly hideSourceButton: Locator;
  readonly showPreTextButton: Locator;
  readonly preTextContent: Locator;
  readonly hidePreTextButton: Locator;
  readonly activity1Correct: Locator;

  readonly topAnswer: Locator;
  readonly closeTopAnswer: Locator;
  readonly activity1Wrong: Locator;
  readonly activityText: Locator;

  // Activity 2.2.2 Fill in the Blank
  readonly activity2FillInput1: Locator;
  readonly activity2FillInput2: Locator;
  readonly checkMeButton2: Locator;
  readonly topAnswer2: Locator;
  readonly compareButton2: Locator;
  readonly showSourceButton2: Locator;
  readonly sourceContent2: Locator;
  readonly hideSourceButton2: Locator;
  readonly activity2Correct: Locator;
  readonly activity2Text: Locator;

  // Activity 2.2.3 Fill in the Blank
  readonly activity3FillInput: Locator;
  readonly checkMeButton3: Locator;
  readonly compareButton3: Locator;
  readonly showSourceButton3: Locator;
  readonly sourceContent3: Locator;
  readonly hideSourceButton3: Locator;
  readonly activity3Correct: Locator;
  readonly activity3Text: Locator;

  // Activity 2.2.4 Fill in the Blank
  readonly activity4FillInput: Locator;
  readonly checkMeButton4: Locator;
  readonly compareButton4: Locator;
  readonly showSourceButton4: Locator;
  readonly sourceContent4: Locator;
  readonly hideSourceButton4: Locator;
  readonly activity4Correct: Locator;
  readonly activity4Text: Locator;

  constructor(page: Page) {
    super(page);
    // Page Header & Section Number
    this.headerText = page.getByRole("heading", { name: "Fill in the Blank" });
    this.sectionNumber = page.getByText("2.2.", { exact: true });

    //  Activity Containers
    this.activity1Container = page.locator("#fill1512");
    this.activity2Container = page.locator("#fillDecVar1");
    this.activity3Container = page.locator("#fitb_casei");
    this.activity4Container = page.locator("#fitb_tolerance");

    // Activity 2.2.1 Locators
    this.activity1FillInput = this.activity1Container.getByRole("textbox", {
      name: "input area",
    });
    this.activity1Correct = this.activity1Container.getByText("✔️ Correct.");
    this.activity1Wrong = this.activity1Container.getByText(
      "✖️ Incorrect. Note that the"
    );
    this.activityText = page.getByText("Activity: 2.2.1 Fill in the Blank");
    this.checkMeButton = this.activity1Container.getByRole("button", {
      name: "Check me",
    });
    this.compareButton = this.activity1Container.getByRole("button", {
      name: "Compare me",
    });
    this.topAnswer = page.getByText("× Top Answers");
    this.closeTopAnswer = page.getByText("×");
    this.showSourceButton = this.showSourceButton =
      page.locator("#fill1512_src_show");
    this.sourceContent = page.getByText(".. fillintheblank:: fill1512");
    this.hideSourceButton = page.getByRole("button", { name: "Hide Source" });
    this.showPreTextButton = page.getByRole("button", { name: "Show PreTeXt" });
    this.preTextContent = page.getByText('<exercise label="fillin-');
    this.hidePreTextButton = page.getByRole("button", { name: "Hide PreTeXt" });

    // Activity 2.2.2 Locators
    this.activity2FillInput1 = this.activity2Container.locator("input").nth(0);
    this.activity2FillInput2 = this.activity2Container.locator("input").nth(1);
    this.checkMeButton2 = this.activity2Container.getByRole("button", {
      name: "Check me",
    });
    this.activity2Correct = this.activity2Container.getByText(
      "✔️ Correct. You typically use whole numbers for ages after age 1. ✔️ Correct."
    );
    this.topAnswer2 = this.activity2Container.getByText("× Top Answers", {
      exact: true,
    });
    this.compareButton2 = this.activity2Container.getByRole("button", {
      name: "Compare me",
    });
    this.showSourceButton2 = this.showSourceButton2 = page.locator(
      "#fillDecVar1_src_show"
    );
    this.sourceContent2 = page.getByText(
      "fillintheblank:: fillDecVar1 Fill in the following: |blank| ``age =`` |blank"
    );
    this.hideSourceButton2 = page.getByRole("button", { name: "Hide Source" });
    this.activity2Text = page.getByText("Activity: 2.2.2 Fill in the Blank");

    // Activity 2.2.3 Locators
    this.activity3FillInput = this.activity3Container.getByRole("textbox", {
      name: "input area",
    });
    this.checkMeButton3 = this.activity3Container.getByRole("button", {
      name: "Check me",
    });
    this.compareButton3 = this.activity3Container.getByRole("button", {
      name: "Compare me",
    });
    this.showSourceButton3 = this.showSourceButton3 = page.locator(
      "#fitb_casei_src_show"
    );
    this.sourceContent3 = page.getByText(
      "fillintheblank:: fitb_casei :casei: What is the opposite of yes? - :no: Correct"
    );
    this.hideSourceButton3 = page.locator("#fitb_casei_src_hide");
    this.activity3Correct = this.activity3Container.getByText("✔️ Correct.", {
      exact: true,
    });
    this.activity3Text = page.getByText("Activity: 2.2.3 Fill in the Blank");

    // Activity 2.2.4 Locators
    this.activity4FillInput = this.activity4Container.getByRole("textbox", {
      name: "input area",
    });
    this.checkMeButton4 = this.activity4Container.getByRole("button", {
      name: "Check me",
    });
    this.compareButton4 = this.activity4Container.getByRole("button", {
      name: "Compare me",
    });
    this.showSourceButton4 = this.showSourceButton4 = page.locator(
      "#fitb_tolerance_src_show"
    );
    this.sourceContent4 = page.getByText(
      "fillintheblank:: fitb_tolerance What is 1/3 as a decimal value? Provide at"
    );
    this.hideSourceButton4 = page.locator("#fitb_tolerance_src_hide");
    this.activity4Correct = this.activity4Container.getByText(
      "✔️ Correct. Any value in the"
    );
    this.activity4Text = page.getByText("Activity: 2.2.4 Fill in the Blank");

    // Support Message Box
    this.supportMessageBox = page.getByText(
      "Before you keep reading... Runestone Academy can only continue if we get"
    );
    this.supportRunestoneButton = page.getByRole("button", {
      name: "Support Runestone Academy",
    });

    // Progress Tracking
    this.progressStatus = page.getByText("You have attempted 1 of 5");
    this.markAsCompleteButton = page.getByRole("button", {
      name: "Mark as Complete",
    });
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Chapter 2.2 Fill in the Blank - Navigate & Validate Elements
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async goToFillInTheBlankPage() {
    await this.page.goto("/ns/books/published/overview/Assessments/fitb.html");
    // Wait until header appears
    await this.headerText.waitFor({ timeout: 7000 });
    // Verify Page Header & Section Number
    await expect(this.headerText).toBeVisible();
    await expect(this.headerText).toContainText("Fill in the Blank");
    await expect(this.sectionNumber).toBeVisible();

    // Verify Activity Containers
    await expect(this.activity1Container).toBeVisible();
    await expect(this.activity2Container).toBeVisible();
    await expect(this.activity3Container).toBeVisible();
    await expect(this.activity4Container).toBeVisible();

    // Verify checkMeButton visibility for each activity
    const buttonCheck = [
      this.checkMeButton,
      this.checkMeButton2,
      this.checkMeButton3,
      this.checkMeButton4,
    ];
    //Loop to check each button
    for (let i = 0; i < buttonCheck.length; i++) {
      await expect(buttonCheck[i]).toBeVisible();
    }

    // Verify compareButton visibility for each activity
    const compareButtonCheck = [
      this.compareButton,
      this.compareButton2,
      this.compareButton3,
      this.compareButton4,
    ];
    //Loop to check each button
    for (let i = 0; i < compareButtonCheck.length; i++) {
      await expect(compareButtonCheck[i]).toBeVisible();
    }
    //Verify showSourceButton visibility for each activity
    const sourceButtons = [
      this.showSourceButton,
      this.showSourceButton2,
      this.showSourceButton3,
      this.showSourceButton4,
    ];
    //Loop to check each button
    for (const button of sourceButtons) {
      await button.waitFor({ state: "attached", timeout: 5000 }); // Ensure button is in the DOM
      await expect(button).toBeVisible({ timeout: 5000 });
    }
  }
  /////////////////////////////////////////////////////////////////////////
  //User Actions Functions//
  ////////////////////////////////////////////////////////////////////////////

  // Click "Check Me" button for a given activity
  async clickCheckMe(activityNumber: number) {
    await clickButton(
      activityNumber,
      [
        this.checkMeButton,
        this.checkMeButton2,
        this.checkMeButton3,
        this.checkMeButton4,
      ],
      "Check Me"
    );
    //for debugging
    console.log(`Clicking "Check Me" button for Activity ${activityNumber}`);
  }
  // Click "Compare Me" button for a given activity
  async clickCompareMe(activityNumber: number) {
    await clickButton(
      activityNumber,
      [
        this.compareButton,
        this.compareButton2,
        this.compareButton3,
        this.compareButton4,
      ],
      "Compare Me"
    );
    console.log(`Clicking "Compare Me" button for Activity ${activityNumber}`);
  }
  // Click "Show Source" button for a given activity
  async clickShowSource(activityNumber: number) {
    await clickButton(
      activityNumber,
      [
        this.showSourceButton,
        this.showSourceButton2,
        this.showSourceButton3,
        this.showSourceButton4,
      ],
      "Show Source",
      true
    );
    console.log(`Clicking "Show Source" button for Activity ${activityNumber}`);
  }
  // Show Source Content and Hide Source Content for a given
  async showSourceContent(activityNumber: number) {
    const sourceContents = [
      this.sourceContent,
      this.sourceContent2,
      this.sourceContent3,
      this.sourceContent4,
    ];

    const hideSourceButtons = [
      this.hideSourceButton,
      this.hideSourceButton2,
      this.hideSourceButton3,
      this.hideSourceButton4,
    ];

    await toggleSourceContent(
      sourceContents[activityNumber - 1],
      hideSourceButtons[activityNumber - 1],
      activityNumber
    );
  }

  // Click "Support Runestone Academy" button
  async clickSupportRunestone() {
    await expect(this.supportRunestoneButton).toBeVisible({ timeout: 5000 }); // Wait up to 5 second
    await this.supportRunestoneButton.click();
  }
  // Click "Mark as Complete" button
  async clickMarkAsComplete() {
    await expect(this.markAsCompleteButton).toBeVisible({ timeout: 5000 }); // Wait up to 5 second
    await this.markAsCompleteButton.click();
  }
  // Fill input fields for any activity
  async fillInput(activityNumber: number, input: string, secondInput?: string) {
    const allInputs = await this.activity2Container
      .locator("input")
      .allTextContents();
    console.log("Found input fields:", allInputs);

    if (activityNumber === 2 && secondInput) {
      // Ensure correct input fields are targeted
      await this.activity2FillInput1.waitFor({
        state: "visible",
        timeout: 3000,
      });
      await this.activity2FillInput1.fill(input);
      await this.activity2FillInput2.waitFor({
        state: "visible",
        timeout: 3000,
      });
      await this.activity2FillInput2.fill(secondInput);
    } else {
      const fillInputs = [
        this.activity1FillInput,
        this.activity2FillInput1, // Ensure multiple input handling
        this.activity3FillInput,
        this.activity4FillInput,
      ];
      const targetInput = getValidatedLocator(
        activityNumber,
        fillInputs,
        "Fill Input"
      );

      await targetInput.waitFor({ state: "visible", timeout: 5000 });
      console.log(
        `Locator found for Activity ${activityNumber}, attempting to fill.`
      );
      await targetInput.fill(input);
      console.log(`Successfully filled input for Activity ${activityNumber}`);
    }
  }

  // Verify activity text for a given activity
  async verifyActivityText(activityNumber: number, expectedText: string) {
    await expect(
      getValidatedLocator(
        activityNumber,
        [
          this.activityText,
          this.activity2Text,
          this.activity3Text,
          this.activity4Text,
        ],
        "Activity Text"
      )
    ).toContainText(expectedText);
  }
  // Get the number of attempts made
  async getAttemptCount(): Promise<number> {
    const progressText = (await this.progressStatus.textContent()) ?? "";
    const match = progressText.match(/^You have attempted (\d+)/);
    return match ? parseInt(match[1], 10) : 0; // Returns 0 if no match
  }
  // Top Answer Modal
  async closeTopAnswerModal() {
    await expect(this.topAnswer).toBeVisible();
    await this.closeTopAnswer.click();
  }
  //  // Show SourceContent Modal
  //     async showSourceContent() {
  //         await expect(this.sourceContent).toBeVisible();
  //         await this.hideSourceButton.click();
  //     };
  //     async showSourceContent2() {
  //         await expect(this.sourceContent2).toBeVisible();
  //         await this.hideSourceButton2.click();
  //         console.log('Clicking "Hide Source" button for Activity 2');
  //     };

  // Show PreText Modal
  async clickPreTextButton() {
    await expect(this.showPreTextButton).toBeVisible();
    await this.showPreTextButton.click();
    await expect(this.preTextContent).toBeVisible();
    await this.hidePreTextButton.click();
    console.log('Clicking "PreText" button for Activity 1');
  }
}
