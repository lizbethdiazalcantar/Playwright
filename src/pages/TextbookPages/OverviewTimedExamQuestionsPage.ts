import { Page, expect } from '@playwright/test';
import { TextbookPage } from '../textbookPage';

export class OverviewTimedExamQuestionsPage extends TextbookPage{
  page: Page; 

  headingText: string;
  chapterOverview: string;
  sectionNumber: string;
  prevHeadingText: string;
  prevSectionNumber: string;
  nextHeadingText: string;
  nextSectionNumber: string;

  page1Button: string;
  page2Button: string;
  page3Button: string;
  page4Button: string;
  page5Button: string;
  page6Button: string;
  page7Button: string;

  nextButton: string;
  prevButton: string;
  timerDisplay: string;
  startButton: string;
  pauseButton: string;
  resumeButton: string;
  examWarningBlock: string;
  showSourceButton: string;
  sourceAnswerBlock: string;
  hideSourceButton: string;
  flagQuestionButton: string;
  unflagQuestionButton: string;
  finishExamButton: string;
  markAsCompletedButton: string;
  completionCheckMark: string;
  previousSectionButton: string;
  nextSectionButton: string;
  timeoutText: string;
  examResults: string;

  q1OptionA: string;
  q1OptionB: string;
  q1OptionC: string;
  q1OptionD: string;
  q1OptionE: string;
  q1Feedback: string;

    //Question 2
  correctCell1: string;
  correctCell2: string;
  correctCell3: string;
  correctCell4: string;
  q2Feedback: string;

    //Question 3
  q3AnswerStartPosition: string;
  q3AnswerRegion: string;
  q3DragToAnswerABlock: string;
  q3DragToAnswerBBlock: string;
  q3DragToAnswerCBlock: string;
  q3AnswerADrop: string;
  q3AnswerBDrop: string;
  q3AnswerCDrop: string;
  q3ResetButton: string;
  q3Feedback: string;

    //Question 4
  q4TextField1: string;
  q4TextField2: string;
  q4Feedback: string;
  
    //Question 5
  q5GetUpBlock: string;
  q5EatBreakfastBlock: string;
  q5BrushYourTeethBlock: string;
  q5AnswerRegion: string;
  q5Feedback: string;

    //Question 6
  q6CodeMirrorLines: string;
  q6CodeMirrorTextarea: string;
  q6AttemptList: string;
  q6RunButton: string;
  q6TimeStamp: string;
  q6CodeCoach: string;
  q6ErrorTextBlock: string;
  q6Feedback: string;

    //Question7
  q7CodeBlock: string;
  q7ShowCodeLens: string;
  q7CodeLensBlock: string;
  q7HideCodeLens: string;
  q7AttemptList: string;
  q7RunButton: string;
  q7TimeStamp: string;
  pythonTutorLink: string;
  editCodeLink: string;
  q7Feedback: string;
  

  constructor(page: Page) {
    super(page);
    this.page = page;

    //Locator Strings: Page heading and common content
  this.headingText = 'section#timed-exam-questions > h1';
  this.chapterOverview = 'section#timed-exam-questions p'
  this.sectionNumber = '//span[@class="section-number"]';
  this.prevHeadingText = 'Short Answer';
  this.prevSectionNumber = '.section-number';
  this.nextHeadingText = 'Visualizers';
  this.nextSectionNumber = '.section-number';

  this.page1Button = "#pageNums > ul:nth-child(1) > li:nth-child(1)";
  this.page2Button = "#pageNums > ul:nth-child(1) > li:nth-child(2)";
  this.page3Button = "#pageNums > ul:nth-child(1) > li:nth-child(3)";
  this.page4Button = "#pageNums > ul:nth-child(1) > li:nth-child(4)";
  this.page5Button = "#pageNums > ul:nth-child(1) > li:nth-child(5)";
  this.page6Button = "#pageNums > ul:nth-child(1) > li:nth-child(6)";
  this.page7Button = "#pageNums > ul:nth-child(1) > li:nth-child(7)";

  this.nextButton = "#next";
  this.prevButton = "#timed_Test > div:nth-child(1) > ul:nth-child(1) > li:nth-child(1) > button:nth-child(1)";
  this.timerDisplay = "#timed1-output";
  this.startButton = "#start";
  this.pauseButton = "#pause";
  this.resumeButton = "#pause";
  this.examWarningBlock = ".examwarning";
  this.showSourceButton = "#timed1_src_show";
  this.sourceAnswerBlock = ".highlight > pre:nth-child(1)";
  this.hideSourceButton = "#timed1_src_hide";
  this.flagQuestionButton = "#flag";
  this.unflagQuestionButton = "#flag";
  this.finishExamButton = "#finish";
  this.markAsCompletedButton = "#completionButton";
  this.completionCheckMark = ".glyphicon-ok";
  this.previousSectionButton = "#relations-prev > a:nth-child(1)";
  this.nextSectionButton = "#relations-next > a:nth-child(1)";
  this.timeoutText = '#controls > h1:nth-child(5)';
  this.examResults = '#timed1results';

    //Question 1
  this.q1OptionA = "#questiontimed1_1_opt_0";
  this.q1OptionB = "#questiontimed1_1_opt_1";
  this.q1OptionC = "#questiontimed1_1_opt_2";
  this.q1OptionD = "#questiontimed1_1_opt_3";
  this.q1OptionE = "#questiontimed1_1_opt_4";
  this.q1Feedback = "#questiontimed1_1_eachFeedback_0";

    //Question 2
  this.correctCell1 = "th.head:nth-child(1)";
  this.correctCell2 = "th.head:nth-child(4)";
  this.correctCell3 = "td.clickable:nth-child(3)";
  this.correctCell4 = "td.clickable:nth-child(4)";
  this.q2Feedback = "div.alert:nth-child(6)";

    //Question 3
  this.q3AnswerStartPosition = "div.rsdraggable:nth-child(1)";
  this.q3AnswerRegion = "div.rsdraggable:nth-child(2)";
  this.q3DragToAnswerABlock = "#dnd2dnd2_drag1";
  this.q3DragToAnswerBBlock = "#dnd2dnd2_drag2";
  this.q3DragToAnswerCBlock = "#dnd2dnd2_drag3";
  this.q3AnswerADrop = "span.draggable-drop:nth-child(1)";
  this.q3AnswerBDrop = "span.draggable-drop:nth-child(2)";
  this.q3AnswerCDrop = "span.draggable-drop:nth-child(3)";
  this.q3ResetButton = "button.drag-button:nth-child(2)";
  this.q3Feedback = "#dnd2_feedback";

    //Question 4
  this.q4TextField1 = "input.form:nth-child(1)";
  this.q4TextField2 = "input.form:nth-child(2)";
  this.q4Feedback = "#fill1412_feedback";

    //Question 5
  this.q5GetUpBlock = "#parsons-1-block-0";
  this.q5EatBreakfastBlock = "#parsons-1-block-1";
  this.q5BrushYourTeethBlock = "#parsons-1-block-0";
  this.q5AnswerRegion = "#parsons-1-answer";
  this.q5Feedback = "";
  
    //Question 6
  this.q6CodeMirrorLines = ".CodeMirror-lines";
  this.q6CodeMirrorTextarea = ".CodeMirror textarea"
  this.q6AttemptList = "#timedactive > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1)";
  this.q6RunButton = "#timedactive > div:nth-child(1) > div:nth-child(2) > button:nth-child(1)";
  this.q6TimeStamp = "#timedactive > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > span:nth-child(2)";
  this.q6CodeCoach = "div.alert:nth-child(4)";
  this.q6ErrorTextBlock = "#timedactive_errinfo";
  this.q6Feedback = "#timedactive_stdout";

    //Question7
  this.q7CodeBlock = "div.ac_code_div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > textarea:nth-child(1)";
  this.q7ShowCodeLens = "button.ac_opt:nth-child(4)";
  this.q7CodeLensBlock = 'div.codelens:nth-child(6) > iframe:nth-child(1)';
  this.q7HideCodeLens = "button.ac_opt:nth-child(4)";
  this.q7AttemptList = "#timedactex > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > a:nth-child(1)";
  this.q7RunButton = "#timedactex > div:nth-child(1) > div:nth-child(2) > button:nth-child(1)";
  this.q7TimeStamp = "#timedactex > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > span:nth-child(2)";
  this.pythonTutorLink = "#creditsPane > a:nth-child(1)";
  this.editCodeLink = "#editBtn";
  this.q7Feedback = "#timedactex_stdout";
}


async goToTimedExamQuestionsPage() {
  await this.page.goto('/ns/books/published/overview/Assessments/timed.html');
  await expect(this.page.locator(this.headingText)).toContainText('Timed Exam Questions');
  await expect(this.page.locator(this.sectionNumber)).toContainText('2.7')
}

async clickNextButton() {
  await this.page.click(this.nextButton);
}

async navigateThroughPages(pageCount: number) {
  for (let i = 0; i < pageCount; i++) {
  await this.clickNextButton();
  }
}

async clickPrevButton() {
  await this.page.click(this.prevButton);
}

async getTimerTime() {
  const timerElement = this.page.locator(this.timerDisplay);
  return await timerElement.textContent();
}

async clickStartButton() {
  await this.page.click(this.startButton);
}

async getNewTime() {
  const timerElement = this.page.locator(this.timerDisplay);
  return await timerElement.textContent();
}

async isExamWarningVisible() {
  return await this.page.locator(this.examWarningBlock).isVisible();
}

async clickPauseButton() {
  await this.page.locator(this.pauseButton).click();
}

async clickResumeButton() {
  await this.page.locator(this.resumeButton).click();
}

async clickShowSourceButton() {
  await this.page.locator(this.showSourceButton).click();
}

async clickHideSourceButton() {
  await this.page.locator(this.hideSourceButton).click();
}

async isSourceAnswerBlockVisible() {
  const block = this.page.locator(this.sourceAnswerBlock);
  return await block.isVisible();
}

async clickFlagQuestionButton() {
  await this.page.locator(this.flagQuestionButton);
}

async clickUnflagQuestionButton() {
  await this.page.locator(this.unflagQuestionButton);
}

async clickFinishExamButton() {
  await this.page.locator(this.finishExamButton).click();
}

async clickMarkAsCompletedButton() {
  await this.page.locator(this.markAsCompletedButton).click();
}

async getMarkAsCompletedButtonText() {
  return await this.page.locator(this.markAsCompletedButton).textContent();
}

async isCompletionCheckMarkVisible() {
  return await this.page.locator(this.completionCheckMark).isVisible();
}

async clickPreviousSectionButton() {
  await this.page.locator(this.previousSectionButton).click();
}

async clickNextSectionButton() {
  await this.page.locator(this.nextSectionButton).click();
}


  //Question 1
async clickQ1OptionA() {
  this.q1OptionA = "#questiontimed1_1_opt_0";
}

async isOptionASelected() {
  return await this.page.locator(this.q1OptionA).isChecked();
}

async clickQ1OptionB() {
  this.q1OptionB = "#questiontimed1_1_opt_1";
}

async isOptionBSelected() {
  return await this.page.locator(this.q1OptionB).isChecked();
}

async clickQ1OptionC() {
  this.q1OptionC = "#questiontimed1_1_opt_2";
}

async isOptionCSelected() {
  return await this.page.locator(this.q1OptionC).isChecked();
}

async clickQ1OptionD() {
  this.q1OptionD = "#questiontimed1_1_opt_3";
}

async isOptionDSelected() {
  return await this.page.locator(this.q1OptionD).isChecked();
}

async clickQ1OptionE() {
  this.q1OptionE = "#questiontimed1_1_opt_4";
}

async isOptionESelected() {
  return await this.page.locator(this.q1OptionE).isChecked();
}

async isQ1FeedbackVisible() {
  const feedbackLocator = this.page.locator('#questiontimed1_1_eachFeedback_0');
  const feedbackText = await feedbackLocator.innerText();
  return feedbackText.includes('A. Only when the search value...');
}

  //Question 2
async clickCorrectCells() {
  await this.page.locator(this.correctCell1).click();
  await this.page.locator(this.correctCell2).click();
  await this.page.locator(this.correctCell3).click();
  await this.page.locator(this.correctCell4).click();
}

async isQ2FeedbackVisible() {
  const feedbackLocator = this.page.locator('div.alert:nth-child(6)');
  const feedbackText = await feedbackLocator.innerText();
  return feedbackText.includes('You are Correct!');
}

  //Question 3
async performQ3DragAndDrop() {
  await this.page.locator(this.q3DragToAnswerABlock).dragTo(this.page.locator(this.q3AnswerADrop));
  await this.page.locator(this.q3DragToAnswerBBlock).dragTo(this.page.locator(this.q3AnswerBDrop));
  await this.page.locator(this.q3DragToAnswerCBlock).dragTo(this.page.locator(this.q3AnswerCDrop));
}

/*This method is no longer used in the test; the positions of the blocks change and are not fixed when the user
  clicks Reset/
async getAnswerStartPositions(): Promise<any[]> {
  const positions = [];
  // Assuming there are three draggable elements, adjust the selector if needed
  const elements = await this.page.$$('#dnd2dnd2_drag'); // This gets all elements matching the selector
  // Loop through each element and store its position
  for (const element of elements) {
      const rect = await element.boundingBox(); // Use boundingBox for accuracy
      if (rect) {
          positions.push({ top: rect.top, left: rect.left });
      }
  }
  return positions;
}*/

async clickResetButton() {
  await this.page.locator(this.q3ResetButton).click();
}

/*This method is no longer used in the test; the positions of the blocks change and are not fixed when the user
  clicks Reset/
async waitForPositionsReset(originalPositions: any[]): Promise<void> {
  await this.page.waitForSelector('#dnd2dnd2_drag1'); // Ensure at least one draggable element is on the page

  // Loop through each draggable element and wait for it to be reset to its original position
  for (let i = 0; i < originalPositions.length; i++) {
      const originalPosition = originalPositions[i];
      await this.page.waitForFunction(
          (i, originalPosition) => {
              const elements = document.querySelectorAll('#dnd2dnd2_drag');
              const rect = elements[i].getBoundingClientRect();
              return rect.top === originalPosition.top && rect.left === originalPosition.left;
          },
          {},
          i, // Passing index of the element
          originalPosition // Passing original position for comparison
      );
  }
}*/

async isQ3FeedbackVisible() {
  const feedbackLocator = this.page.locator('#dnd2_feedback');
  const feedbackText = await feedbackLocator.innerText();
  return feedbackText.includes('You are correct!');
}

  //Question 4
async fillQ4TextFields(text1: string, text2: string) {
  await this.page.locator(this.q4TextField1).click();
  await this.page.locator(this.q4TextField1).fill(text1);

  await this.page.locator(this.q4TextField2).click();
  await this.page.locator(this.q4TextField2).fill(text2);
}

async getQ4TextFieldValue(fieldNumber: number) {
  const field = fieldNumber === 1 ? this.q4TextField1 : this.q4TextField2;
  return await this.page.locator(field).inputValue();
}

async isQ4FeedbackVisible() {
  const feedbackLocator = this.page.locator('#fill1412_feedback');
  const feedbackText = await feedbackLocator.innerText();
  return feedbackText.includes('Correct');
}

  //Question 5
async performQ5DragAndDrop() {
  await this.page.locator(this.q5GetUpBlock).dragTo(this.page.locator(this.q5AnswerRegion));
  await this.page.locator(this.q5EatBreakfastBlock).dragTo(this.page.locator(this.q5AnswerRegion));
  await this.page.locator(this.q5BrushYourTeethBlock).dragTo(this.page.locator(this.q5AnswerRegion));
}

async isQ5FeedbackVisible() {
  return await this.page.locator(this.q5Feedback).isVisible();
}

  //Question 6
async enterQ6Code(code: string) {
  await expect(this.page.locator('.CodeMirror-lines').nth(0)).toBeVisible();
  await this.page.locator('.CodeMirror-lines').nth(0).click();
  await this.page.keyboard.press('Control+A');
  await this.page.keyboard.press('Backspace');
  await this.page.locator('.CodeMirror textarea').nth(0).fill(code);
}

async clickQ6RunButton() {
  await this.page.locator('button', { hasText: 'Run' }).nth(0).click();
  await this.page.waitForTimeout(1000);
}

async waitForQ6TimeStampUpdate(_timeout = 1000) {
  return await this.page.locator(this.q6TimeStamp).isVisible();
}

async getQ6InitialAttemptCount() {
  const attemptList = await this.page.locator('#timedactive > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > span:nth-child(2)').textContent();
  console.log(`Attempt list = ${attemptList}`);
  if(attemptList){
    const substring = attemptList.split(" - ");
    const numbers = substring[1].match(/\d+/g)?.map(Number) || [];
    return numbers;
  }
  return [0];
}

async getQ6SubsequentAttemptCount() {
  const attemptList = await this.page.locator('//*[@id="timedactive"]/div/div[2]/div/span').textContent();
  console.log(`Attempt list = ${attemptList}`);
  if(attemptList){
    const substring = attemptList.split(" - ");
    const numbers = substring[1].match(/\d+/g)?.map(Number) || [];
    return numbers;
  }
  return [0];
}

async isQ6FeedbackVisible() {
  return await this.page.locator(this.q6Feedback).isVisible();
}


  //Question 7
async enterQ7Code(code: string) {
  await this.page.locator('div.ac_code_div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > textarea:nth-child(1)').nth(0).fill('print("hello world")');
}

async clickQ7RunButton() {
  await this.page.locator(this.q7RunButton).click();
  await this.page.waitForTimeout(1000);
}

async waitForQ7TimeStampUpdate(timeout = 1000) {
  return await this.page.locator(this.q6TimeStamp).isVisible();
}

async getQ7InitialAttemptCount() {
  const attemptList = await this.page.locator('#timedactex > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > span:nth-child(2)').textContent();
  console.log(`Attempt list = ${attemptList}`);
  if(attemptList){
    const substring = attemptList.split(" - ");
    const numbers = substring[1].match(/\d+/g)?.map(Number) || [];
    return numbers;
  }
  return [0];
}

async getQ7SubsequentAttemptCount() {
  const attemptList = await this.page.locator('//*[@id="timedactex"]/div/div[2]/div/span').textContent();
  console.log(`Attempt list = ${attemptList}`);
  if(attemptList){
    const substring = attemptList.split(" - ");
    const numbers = substring[1].match(/\d+/g)?.map(Number) || [];
    return numbers;
  }
  return [0];
}

async clickShowCodeLens() {
  await this.page.locator(this.q7ShowCodeLens);
  return await this.page.locator(this.q7CodeLensBlock).isVisible();
}

async isQ7CodeLensBlockVisible(): Promise<boolean> {
  const codeLensBlock = await this.page.locator('div.codelens:nth-child(6)');
  await codeLensBlock.waitFor({ state: 'visible', timeout: 5000 });
  return codeLensBlock.isVisible();
}

async clickHideCodelens() {
  await this.page.locator(this.q7HideCodeLens);
  return await this.page.locator(this.q7CodeLensBlock).isHidden();
}

async clickPythonTutorLink() {
  const link = this.page.locator(this.pythonTutorLink);
  await link.click();
}

async clickEditCodeLink() {
  const link = this.page.locator(this.editCodeLink);
  await link.click();
}

async isQ7FeedbackVisible() {
  return await this.page.locator(this.q7Feedback).isVisible();
}


}
