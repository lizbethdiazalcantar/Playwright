import { Page, expect } from '@playwright/test';
import { TextbookPage } from '../textbookPage';

export class OverviewTextbookParsonsProblemsPage extends TextbookPage{
  page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

//----------------------------------------------Selectors----------------------------------------------//

// Section Selectors //
Section2_3 = "//section[@id='parsons-problems-mixed-up-blocks']"
Section2_3_1 = "//section[@id='graph-based-grading']"
// Common Boxes, Buttons and Messages //
parsons = "//div[@class='parsons']"
dragFromHere = "//div[@class='source']"
dropBlocksHere = "//div[@class='answer']"
checkButton = "//button[@class='btn btn-success']"
resetButton = "//button[@class='btn btn-default']"
showSourceButton = "//button[@class='btn reveal_button btn-default']"
hideSourceButton = "//button[@class='btn btn-default reveal_button']"
morningShowPretextButton = "//button[@id='ptx_morning_src_show']"
morningPretextSourceBox = "//div[@class='highlight-xml notranslate']"
morningHidePretextButton = "//button[@id='ptx_morning_src_hide']"
addMoreBlocksMessage = "//*[text()='Your answer is too short. Add more blocks.']"
errorMessage = "//div[@class='alert alert-danger']"
sourceBox = "//div[@class='highlight']"
successMessage = "//*[text()='Perfect!']"
// Morning Parsons Selectors //
q1SuccessMessage = "//div[@id='parsons-1-message']"
parsons1Block0 = "//div[@id='parsons-1-block-0']"
parsons1Block1 = "//div[@id='parsons-1-block-1']"
parsons1Block2 = "//div[@id='parsons-1-block-2']"
sourceModalBox = "//div[@id='morning_src']"
parsons1AnswerRegion = "#parsons-1-answerRegion";

// Per_Person_Cost Parsons Selectors //
q2SuccessMessage = "//div[@id='parsons-2-message']"
parsons2Block0 = "//div[@id='parsons-2-block-0']"
parsons2Block1 = "//div[@id='parsons-2-block-1']"
parsons2Block2 = "//div[@id='parsons-2-block-2']"
parsons2Block3 = "//div[@id='parsons-2-block-3']"
parsons2Block4 = "//div[@id='parsons-2-block-4']"
parsons2AnswerRegion = "#parsons-2-answer";

// Java_Countdown Parsons Selectors //
q3SuccessMessage = "//div[@id='parsons-3-message']"
parsons3Block0 = "//div[@id='parsons-3-block-0']"
parsons3Block1 = "//div[@id='parsons-3-block-1']"
parsons3Block2 = "//div[@id='parsons-3-block-2']"
parsons3Block3_Distractor = "//div[@id='parsons-3-block-3']"
parsons3Block4 = "//div[@id='parsons-3-block-4']"
parsons3Block5 = "//div[@id='parsons-3-block-5']"
parsons3Block6 = "//div[@id='parsons-3-block-6']"
parsons3HelpMeButton = "//button[@id='parsons-3-help']"
parsons3AnswerRegion = "#parsons-3-answer";

// Java_Countdown_Paired Parsons Selectors //
q4SuccessMessage = "//div[@id='parsons-4-message']"
parsons4Block0 = "//div[@id='parsons-4-block-0']"
parsons4Block1 = "//div[@id='parsons-4-block-1']"
parsons4Block2 = "//div[@id='parsons-4-block-2']"
parsons4Block3_Distractor = "//div[@id='parsons-4-block-3']"
parsons4Block4 = "//div[@id='parsons-4-block-4']"
parsons4Block5 = "//div[@id='parsons-4-block-5']"
parsons4Block6 = "//div[@id='parsons-4-block-6']"
parsons4AnswerRegion = "#parsons-4-answer";

// Java_Countdown_Paired2 Parsons Selectors //
q5SuccessMessage = "//div[@id='parsons-5-message']"
parsons5DropBlocksHere = "//div[@class='answer3']"
parsons5Block0 = "//div[@id='parsons-5-block-0']"
parsons5Block1 = "//div[@id='parsons-5-block-1']"
parsons5Block2 = "//div[@id='parsons-5-block-2']"
parsons5Block3 = "//div[@id='parsons-5-block-3']"
parsons5Block4 = "//div[@id='parsons-5-block-4']"
parsons5Block5 = "//div[@id='parsons-5-block-5']"
parsons5Block6 = "//div[@id='parsons-5-block-6']"
parsons5AnswerRegion = "#parsons-5-answer";

// Simple_Dag Parsons Selectors //
q6SuccessMessage = "//div[@id='parsons-6-message']"
parsons6Block0 = "//div[@id='parsons-6-block-0']"
parsons6Block1 = "//div[@id='parsons-6-block-1']"
parsons6Block2 = "//div[@id='parsons-6-block-2']"
parsons6Block3 = "//div[@id='parsons-6-block-3']"
parsons6AnswerRegion = "#parsons-6-answer";

//----------------------------------------------Methods----------------------------------------------// 

// Go to Parsons Problems Page //

async goToParsonsProblemsPage(){
  await this.page.goto('ns/books/published/overview/Assessments/parsons.html');
  await expect(this.page.locator(this.Section2_3)).toBeVisible();
  await expect(this.page.locator(this.Section2_3_1)).toBeVisible();
}

// Check For Each Problem w IDs //

async checkForParsonsProblems(){
  await this.page.goto('ns/books/published/overview/Assessments/parsons.html');
  await expect(this.page.locator(this.parsons).nth(0)).toHaveId('morning');
  await expect(this.page.locator(this.parsons).nth(1)).toHaveId('per_person_cost');
  await expect(this.page.locator(this.parsons).nth(2)).toHaveId('java_countdown');
  await expect(this.page.locator(this.parsons).nth(3)).toHaveId('java_countdown_paired');
  await expect(this.page.locator(this.parsons).nth(4)).toHaveId('java_countdown_paired2');
  await expect(this.page.locator(this.parsons).nth(5)).toHaveId('simple_dag');
}

// Question 1 Drag and Drop Methods //

async q1CorrectAnswer(){
  /*await expect(this.page.locator(this.dropBlocksHere).nth(0)).toBeEmpty;
  await this.page.locator(this.parsons1Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(0));
  await this.page.locator(this.parsons1Block1).dragTo(this.page.locator(this.dropBlocksHere), { targetPosition: { x: 0, y: 120 }});//.nth(0));
  await this.page.locator(this.parsons1Block2).dragTo(this.page.locator(this.dropBlocksHere), { targetPosition: { x: 0, y: 120 }});//.nth(0));*/
  await expect(this.page.locator(this.parsons1AnswerRegion)).toBeEmpty;
  await this.page.locator(this.parsons1Block0).dragTo(this.page.locator(this.parsons1AnswerRegion));
  await this.page.locator(this.parsons1Block1).dragTo(this.page.locator(this.parsons1AnswerRegion), { targetPosition: { x: 0, y: 120 }});//.nth(0));
  await this.page.locator(this.parsons1Block2).dragTo(this.page.locator(this.parsons1AnswerRegion), { targetPosition: { x: 0, y: 120 }});//.nth(0));

}

async q1IncorrectAnswer(){
  await expect(this.page.locator(this.dropBlocksHere).nth(0)).toBeEmpty;
  await this.page.locator(this.parsons1Block2).dragTo(this.page.locator(this.dropBlocksHere).nth(0));
  await this.page.locator(this.parsons1Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(0));
  await this.page.locator(this.parsons1Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(0));
}

async q1IncompleteAnswer(){
  await expect(this.page.locator(this.dropBlocksHere).nth(0)).toBeEmpty;
  await this.page.locator(this.parsons1Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(0));
  await this.page.locator(this.parsons1Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(0));
}

async q1DragBlocksFromRightToLeft(){
  await expect(this.page.locator(this.dropBlocksHere).nth(0)).toBeEmpty;
  await this.page.locator(this.parsons1Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(0));
  await this.page.locator(this.parsons1Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(0));
  await this.page.locator(this.parsons1Block2).dragTo(this.page.locator(this.dropBlocksHere).nth(0));
  await expect(this.page.locator(this.dragFromHere).nth(0)).toBeEmpty
  await this.page.locator(this.parsons1Block0).dragTo(this.page.locator(this.dragFromHere).nth(0));
  await this.page.locator(this.parsons1Block1).dragTo(this.page.locator(this.dragFromHere).nth(0));
  await this.page.locator(this.parsons1Block2).dragTo(this.page.locator(this.dragFromHere).nth(0));
}

async q1ClickShowSourceButton(){
  await expect(this.page.locator(this.showSourceButton).nth(0)).toBeVisible();
  await this.page.locator(this.showSourceButton).nth(0).click();
}

async q1ClickHideSourceButton(){
  await expect(this.page.locator(this.hideSourceButton).nth(0)).toBeVisible();
  await this.page.locator(this.hideSourceButton).nth(0).click();
}

async clickShowPretextButton(){
  await expect(this.page.locator(this.morningShowPretextButton)).toBeVisible();
  await this.page.locator(this.morningShowPretextButton).click();
}

async clickHidePretextButton(){
  await expect(this.page.locator(this.morningHidePretextButton)).toBeVisible();
  await this.page.locator(this.morningHidePretextButton).click();
}

// Question 2 Drag and Drop Methods //

async q2CorrectAnswer(){
  /*await expect(this.page.locator(this.dropBlocksHere).nth(1)).toBeEmpty;
  await this.page.locator(this.parsons2Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(1));
  await this.page.locator(this.parsons2Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(1));
  await this.page.locator(this.parsons2Block2).dragTo(this.page.locator(this.dropBlocksHere).nth(1));
  await this.page.locator(this.parsons2Block3).dragTo(this.page.locator(this.dropBlocksHere).nth(1));
  await this.page.locator(this.parsons2Block4).dragTo(this.page.locator(this.dropBlocksHere).nth(1));*/
  await this.page.locator(this.parsons2Block0).dragTo(this.page.locator(this.parsons2AnswerRegion), { targetPosition: { x: 0, y: 235 }});
  await this.page.locator(this.parsons2Block1).dragTo(this.page.locator(this.parsons2AnswerRegion), { targetPosition: { x: 0, y: 235 }});
  await this.page.locator(this.parsons2Block2).dragTo(this.page.locator(this.parsons2AnswerRegion), { targetPosition: { x: 0, y: 235 }});
  await this.page.locator(this.parsons2Block3).dragTo(this.page.locator(this.parsons2AnswerRegion), { targetPosition: { x: 0, y: 235 }});
  await this.page.locator(this.parsons2Block4).dragTo(this.page.locator(this.parsons2AnswerRegion), { targetPosition: { x: 0, y: 235 }});
}

async q2IncorrectAnswer(){
  await expect(this.page.locator(this.dropBlocksHere).nth(1)).toBeEmpty;
  await this.page.locator(this.parsons2Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(1));
  await this.page.locator(this.parsons2Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(1));
  await this.page.locator(this.parsons2Block4).dragTo(this.page.locator(this.dropBlocksHere).nth(1));
  await this.page.locator(this.parsons2Block2).dragTo(this.page.locator(this.dropBlocksHere).nth(1));
  await this.page.locator(this.parsons2Block3).dragTo(this.page.locator(this.dropBlocksHere).nth(1));
}

async q2IncompleteAnswer(){
  await expect(this.page.locator(this.dropBlocksHere).nth(1)).toBeEmpty;
  await this.page.locator(this.parsons2Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(1));
  await this.page.locator(this.parsons2Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(1));
  await this.page.locator(this.parsons2Block2).dragTo(this.page.locator(this.dropBlocksHere).nth(1));
  await this.page.locator(this.parsons2Block3).dragTo(this.page.locator(this.dropBlocksHere).nth(1));
}

async q2DragBlocksFromRightToLeft(){
  await expect(this.page.locator(this.dropBlocksHere).nth(1)).toBeEmpty;
  await this.page.locator(this.parsons2Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(1));
  await this.page.locator(this.parsons2Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(1));
  await this.page.locator(this.parsons2Block2).dragTo(this.page.locator(this.dropBlocksHere).nth(1));
  await this.page.locator(this.parsons2Block3).dragTo(this.page.locator(this.dropBlocksHere).nth(1));
  await this.page.locator(this.parsons2Block4).dragTo(this.page.locator(this.dropBlocksHere).nth(1));
  await expect(this.page.locator(this.dragFromHere).nth(1)).toBeEmpty
  await this.page.locator(this.parsons2Block0).dragTo(this.page.locator(this.dragFromHere).nth(1));
  await this.page.locator(this.parsons2Block1).dragTo(this.page.locator(this.dragFromHere).nth(1));
  await this.page.locator(this.parsons2Block2).dragTo(this.page.locator(this.dragFromHere).nth(1));
  await this.page.locator(this.parsons2Block3).dragTo(this.page.locator(this.dragFromHere).nth(1));
  await this.page.locator(this.parsons2Block4).dragTo(this.page.locator(this.dragFromHere).nth(1));
}

async q2ClickShowSourceButton(){
  await expect(this.page.locator(this.showSourceButton).nth(1)).toBeVisible();
  await this.page.locator(this.showSourceButton).nth(1).click();
}

async q2ClickHideSourceButton(){
  await expect(this.page.locator(this.hideSourceButton).nth(1)).toBeVisible();
  await this.page.locator(this.hideSourceButton).nth(1).click();
}

// Question 3 Drag and Drop Methods //

async q3CorrectAnswer(){
  /*
  await expect(this.page.locator(this.dropBlocksHere).nth(2)).toBeEmpty;
  await this.page.locator(this.parsons3Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block2).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block4).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block5).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block6).dragTo(this.page.locator(this.dropBlocksHere).nth(2));*/
  await this.page.locator(this.parsons3Block0).dragTo(this.page.locator(this.parsons3AnswerRegion),  {targetPosition: { x: 0, y: 340 }});
  await this.page.locator(this.parsons3Block1).dragTo(this.page.locator(this.parsons3AnswerRegion),  { targetPosition: { x: 178, y: 340 }});
  await this.page.locator(this.parsons3Block2).dragTo(this.page.locator(this.parsons3AnswerRegion),  { targetPosition: { x: 208, y: 340 }});
  await this.page.locator(this.parsons3Block4).dragTo(this.page.locator(this.parsons3AnswerRegion),  { targetPosition: { x: 238, y: 340 }});
  await this.page.locator(this.parsons3Block5).dragTo(this.page.locator(this.parsons3AnswerRegion),  { targetPosition: { x: 178, y: 340 }});
  await this.page.locator(this.parsons3Block6).dragTo(this.page.locator(this.parsons3AnswerRegion),  { targetPosition: { x: 0, y: 340 }});
}

async q3IncorrectAnswer(){
  await expect(this.page.locator(this.dropBlocksHere).nth(2)).toBeEmpty;
  await this.page.locator(this.parsons3Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block2).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block3_Distractor).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block4).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block5).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block6).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
}

async q3IncompleteAnswer(){
  await expect(this.page.locator(this.dropBlocksHere).nth(2)).toBeEmpty;
  await this.page.locator(this.parsons3Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block2).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block4).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
}

async q3DragBlocksFromRightToLeft(){
  await expect(this.page.locator(this.dropBlocksHere).nth(2)).toBeEmpty;
  await this.page.locator(this.parsons3Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block2).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block3_Distractor).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block4).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block5).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await this.page.locator(this.parsons3Block6).dragTo(this.page.locator(this.dropBlocksHere).nth(2));
  await expect(this.page.locator(this.dragFromHere).nth(2)).toBeEmpty
  await this.page.locator(this.parsons3Block0).dragTo(this.page.locator(this.dragFromHere).nth(2));
  await this.page.locator(this.parsons3Block1).dragTo(this.page.locator(this.dragFromHere).nth(2));
  await this.page.locator(this.parsons3Block2).dragTo(this.page.locator(this.dragFromHere).nth(2));
  await this.page.locator(this.parsons3Block3_Distractor).dragTo(this.page.locator(this.dragFromHere).nth(2));
  await this.page.locator(this.parsons3Block4).dragTo(this.page.locator(this.dragFromHere).nth(2));
  await this.page.locator(this.parsons3Block5).dragTo(this.page.locator(this.dragFromHere).nth(2));
  await this.page.locator(this.parsons3Block6).dragTo(this.page.locator(this.dragFromHere).nth(2));
}

async q3ClickShowSourceButton(){
  await expect(this.page.locator(this.showSourceButton).nth(2)).toBeVisible();
  await this.page.locator(this.showSourceButton).nth(2).click();
}

async q3ClickHideSourceButton(){
  await expect(this.page.locator(this.hideSourceButton).nth(2)).toBeVisible();
  await this.page.locator(this.hideSourceButton).nth(2).click();
}

async q3ClickHelpButton(){
  await expect(this.page.locator(this.parsons3HelpMeButton)).toBeVisible();
  await this.page.locator(this.parsons3HelpMeButton).click();
}
// Question 4 Drag and Drop Methods //

async q4CorrectAnswer(){
  /*
  await expect(this.page.locator(this.dropBlocksHere).nth(3)).toBeEmpty;
  await this.page.locator(this.parsons4Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block2).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block4).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block5).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block6).dragTo(this.page.locator(this.dropBlocksHere).nth(3));*/
  await this.page.locator(this.parsons4Block0).dragTo(this.page.locator(this.parsons4AnswerRegion), { targetPosition: { x: 0, y: 340 }});
  await this.page.locator(this.parsons4Block1).dragTo(this.page.locator(this.parsons4AnswerRegion), { targetPosition: { x: 0, y: 340 }});
  await this.page.locator(this.parsons4Block2).dragTo(this.page.locator(this.parsons4AnswerRegion), { targetPosition: { x: 0, y: 340 }});
  await this.page.locator(this.parsons4Block4).dragTo(this.page.locator(this.parsons4AnswerRegion), { targetPosition: { x: 0, y: 340 }});
  await this.page.locator(this.parsons4Block5).dragTo(this.page.locator(this.parsons4AnswerRegion), { targetPosition: { x: 0, y: 340 }});
  await this.page.locator(this.parsons4Block6).dragTo(this.page.locator(this.parsons4AnswerRegion), { targetPosition: { x: 0, y: 340 }});
}

async q4IncorrectAnswer(){
  await expect(this.page.locator(this.dropBlocksHere).nth(3)).toBeEmpty;
  await this.page.locator(this.parsons4Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block2).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block3_Distractor).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block4).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block5).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block6).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
}

async q4IncompleteAnswer(){
  await expect(this.page.locator(this.dropBlocksHere).nth(3)).toBeEmpty;
  await this.page.locator(this.parsons4Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block2).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block4).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block5).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
}

async q4DragBlocksFromRightToLeft(){
  await expect(this.page.locator(this.dropBlocksHere).nth(3)).toBeEmpty;
  await this.page.locator(this.parsons4Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block2).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block3_Distractor).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block4).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block5).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await this.page.locator(this.parsons4Block6).dragTo(this.page.locator(this.dropBlocksHere).nth(3));
  await expect(this.page.locator(this.dragFromHere).nth(3)).toBeEmpty
  await this.page.locator(this.parsons4Block0).dragTo(this.page.locator(this.dragFromHere).nth(3));
  await this.page.locator(this.parsons4Block1).dragTo(this.page.locator(this.dragFromHere).nth(3));
  await this.page.locator(this.parsons4Block2).dragTo(this.page.locator(this.dragFromHere).nth(3));
  await this.page.locator(this.parsons4Block3_Distractor).dragTo(this.page.locator(this.dragFromHere).nth(3));
  await this.page.locator(this.parsons4Block4).dragTo(this.page.locator(this.dragFromHere).nth(3));
  await this.page.locator(this.parsons4Block5).dragTo(this.page.locator(this.dragFromHere).nth(3));
  await this.page.locator(this.parsons4Block6).dragTo(this.page.locator(this.dragFromHere).nth(3));
}

async q4ClickShowSourceButton(){
  await expect(this.page.locator(this.showSourceButton).nth(3)).toBeVisible();
  await this.page.locator(this.showSourceButton).nth(3).click();
}

async q4ClickHideSourceButton(){
  await expect(this.page.locator(this.hideSourceButton).nth(3)).toBeVisible();
  await this.page.locator(this.hideSourceButton).nth(3).click();
}

// Question 5 Drag and Drop Methods //

async q5CorrectAnswer(){
  /*
   await this.page.locator(this.parsons5Block1).dragTo(this.page.locator(this.parsons5DropBlocksHere),  {targetPosition: { x: 0, y: 350 }});
   await this.page.locator(this.parsons5Block2).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 178, y: 350 }});
   await this.page.locator(this.parsons5Block3).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 208, y: 350 }});
   await this.page.locator(this.parsons5Block4).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 238, y: 350 }});
   await this.page.locator(this.parsons5Block5).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 178, y: 350 }});
   await this.page.locator(this.parsons5Block6).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 0, y: 350 }});*/
   await this.page.locator(this.parsons5Block0).dragTo(this.page.locator(this.parsons5AnswerRegion),  {targetPosition: { x: 0, y: 350 }});
   await this.page.locator(this.parsons5Block1).dragTo(this.page.locator(this.parsons5AnswerRegion),  {targetPosition: { x: 178, y: 350 }});
   await this.page.locator(this.parsons5Block2).dragTo(this.page.locator(this.parsons5AnswerRegion),  { targetPosition: { x: 208, y: 350 }});
   await this.page.locator(this.parsons5Block4).dragTo(this.page.locator(this.parsons5AnswerRegion),  { targetPosition: { x: 238, y: 350 }});
   await this.page.locator(this.parsons5Block5).dragTo(this.page.locator(this.parsons5AnswerRegion),  { targetPosition: { x: 178, y: 350 }});
   await this.page.locator(this.parsons5Block6).dragTo(this.page.locator(this.parsons5AnswerRegion),  { targetPosition: { x: 0, y: 350 }});
}

async q5IncorrectAnswer(){
  await this.page.locator(this.parsons5Block0).dragTo(this.page.locator(this.parsons5DropBlocksHere),  {targetPosition: { x: 0, y: 350 }});
  await this.page.locator(this.parsons5Block2).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 178, y: 350 }});
  await this.page.locator(this.parsons5Block1).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 208, y: 350 }});
  await this.page.locator(this.parsons5Block4).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 238, y: 350 }});
  await this.page.locator(this.parsons5Block5).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 178, y: 350 }});
  await this.page.locator(this.parsons5Block6).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 0, y: 350 }});
}

async q5IncompleteAnswer(){
  await this.page.locator(this.parsons5Block1).dragTo(this.page.locator(this.parsons5DropBlocksHere),  {targetPosition: { x: 0, y: 350 }});
  await this.page.locator(this.parsons5Block2).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 178, y: 350 }});
  await this.page.locator(this.parsons5Block3).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 208, y: 350 }});
  await this.page.locator(this.parsons5Block4).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 238, y: 350 }});
  await this.page.locator(this.parsons5Block5).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 178, y: 350 }});
}

async q5DragBlocksFromRightToLeft(){
  await expect(this.page.locator(this.dropBlocksHere).nth(4)).toBeEmpty;
  await this.page.locator(this.parsons5Block1).dragTo(this.page.locator(this.parsons5DropBlocksHere),  {targetPosition: { x: 0, y: 350 }});
  await this.page.locator(this.parsons5Block2).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 178, y: 350 }});
  await this.page.locator(this.parsons5Block3).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 208, y: 350 }});
  await this.page.locator(this.parsons5Block4).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 238, y: 350 }});
  await this.page.locator(this.parsons5Block5).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 178, y: 350 }});
  await this.page.locator(this.parsons5Block6).dragTo(this.page.locator(this.parsons5DropBlocksHere),  { targetPosition: { x: 0, y: 350 }});
  await expect(this.page.locator(this.dragFromHere).nth(4)).toBeEmpty;
  await this.page.locator(this.parsons5Block1).dragTo(this.page.locator(this.dragFromHere).nth(4));
  await this.page.locator(this.parsons5Block2).dragTo(this.page.locator(this.dragFromHere).nth(4));
  await this.page.locator(this.parsons5Block3).dragTo(this.page.locator(this.dragFromHere).nth(4));
  await this.page.locator(this.parsons5Block4).dragTo(this.page.locator(this.dragFromHere).nth(4));
  await this.page.locator(this.parsons5Block5).dragTo(this.page.locator(this.dragFromHere).nth(4));
  await this.page.locator(this.parsons5Block6).dragTo(this.page.locator(this.dragFromHere).nth(4));
}

async q5ClickShowSourceButton(){
  await expect(this.page.locator(this.showSourceButton).nth(4)).toBeVisible();
  await this.page.locator(this.showSourceButton).nth(4).click();
}

async q5ClickHideSourceButton(){
  await expect(this.page.locator(this.hideSourceButton).nth(4)).toBeVisible();
  await this.page.locator(this.hideSourceButton).nth(4).click();
}


//Question 6 Drag and Drop Methods //

async q6CorrectAnswer(){

  /*await expect(this.page.locator(this.dropBlocksHere).nth(5)).toBeEmpty;
  await this.page.locator(this.parsons6Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(5));
  await this.page.locator(this.parsons6Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(5));
  await this.page.locator(this.parsons6Block2).dragTo(this.page.locator(this.dropBlocksHere).nth(5));
  await this.page.locator(this.parsons6Block3).dragTo(this.page.locator(this.dropBlocksHere).nth(5));*/

  await this.page.locator(this.parsons6Block0).dragTo(this.page.locator(this.parsons6AnswerRegion),  {targetPosition: { x: 0, y: 160 }});
  await this.page.locator(this.parsons6Block1).dragTo(this.page.locator(this.parsons6AnswerRegion),  {targetPosition: { x: 0, y: 160 }});
  await this.page.locator(this.parsons6Block2).dragTo(this.page.locator(this.parsons6AnswerRegion),  {targetPosition: { x: 0, y: 160 }});
  await this.page.locator(this.parsons6Block3).dragTo(this.page.locator(this.parsons6AnswerRegion),  {targetPosition: { x: 0, y: 160 }});
}

async q6IncorrectAnswer(){
  /*await expect(this.page.locator(this.dropBlocksHere).nth(5)).toBeEmpty;
  await this.page.locator(this.parsons6Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(5));
  await this.page.locator(this.parsons6Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(5));
  await this.page.locator(this.parsons6Block3).dragTo(this.page.locator(this.dropBlocksHere).nth(5));
  await this.page.locator(this.parsons6Block2).dragTo(this.page.locator(this.dropBlocksHere).nth(5));*/
  await this.page.locator(this.parsons6Block3).dragTo(this.page.locator(this.parsons6AnswerRegion),  {targetPosition: { x: 0, y: 160 }});
  await this.page.locator(this.parsons6Block1).dragTo(this.page.locator(this.parsons6AnswerRegion),  {targetPosition: { x: 0, y: 160 }});
  await this.page.locator(this.parsons6Block2).dragTo(this.page.locator(this.parsons6AnswerRegion),  {targetPosition: { x: 0, y: 160 }});
  await this.page.locator(this.parsons6Block0).dragTo(this.page.locator(this.parsons6AnswerRegion),  {targetPosition: { x: 0, y: 160 }});
}

async q6IncompleteAnswer(){
  await expect(this.page.locator(this.dropBlocksHere).nth(5)).toBeEmpty;
  await this.page.locator(this.parsons6Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(5));
  await this.page.locator(this.parsons6Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(5));
  await this.page.locator(this.parsons6Block3).dragTo(this.page.locator(this.dropBlocksHere).nth(5));
}

async q6DragBlocksFromRightToLeft(){
  await expect(this.page.locator(this.dropBlocksHere).nth(5)).toBeEmpty;
  await this.page.locator(this.parsons6Block0).dragTo(this.page.locator(this.dropBlocksHere).nth(5));
  await this.page.locator(this.parsons6Block1).dragTo(this.page.locator(this.dropBlocksHere).nth(5));
  await this.page.locator(this.parsons6Block2).dragTo(this.page.locator(this.dropBlocksHere).nth(5));
  await this.page.locator(this.parsons6Block3).dragTo(this.page.locator(this.dropBlocksHere).nth(5));
  await expect(this.page.locator(this.dragFromHere).nth(5)).toBeEmpty
  await this.page.locator(this.parsons6Block0).dragTo(this.page.locator(this.dragFromHere).nth(5));
  await this.page.locator(this.parsons6Block1).dragTo(this.page.locator(this.dragFromHere).nth(5));
  await this.page.locator(this.parsons6Block2).dragTo(this.page.locator(this.dragFromHere).nth(5));
  await this.page.locator(this.parsons6Block3).dragTo(this.page.locator(this.dragFromHere).nth(5));
}

async q6ClickShowSourceButton(){
  await expect(this.page.locator(this.showSourceButton).nth(5)).toBeVisible();
  await this.page.locator(this.showSourceButton).nth(5).click();
}

async q6ClickHideSourceButton(){
  await expect(this.page.locator(this.hideSourceButton).nth(5)).toBeVisible();
  await this.page.locator(this.hideSourceButton).nth(5).click();
}
}