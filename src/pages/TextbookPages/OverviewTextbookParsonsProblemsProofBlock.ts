import { Page, expect } from '@playwright/test';
import { TextbookPage } from '../textbookPage';

export class OverviewTextbookParsonsProblemsProofBlock extends TextbookPage{
   
  page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }
  // Section Selectors //

headingText = "//section[@id='proof-blocks']";
Section2_3 = "//section[@id='parsons-problems-mixed-up-blocks']";
Section2_3_2 = "//section[@id='proof-blocks']";
sectionNumber = '//span[@class="section-number"]';
  // Common Boxes, Buttons and Messages //
parsons = "//div[@class='parsons']";
dragFromHere = "//div[@class='source']";
dropBlocksHere = "//div[@class='answer']";
checkButton = "//button[@class='btn btn-success']";
resetButton = "//button[@class='btn btn-default']";
showSourceButton = "//button[@class='btn reveal_button btn-default']";
hideSourceButton = "//button[@class='btn btn-default reveal_button']";
morningPretextShowButton = "//button[@id='ptx_morning_src_show']";
morningPretextSourceBox = "//div[@id='ptx_morning_src']";
morningPretextHideButton = "//button[@id='ptx_morning_src_hide']";
successMessage = "//div[@class='alert alert-info']";
addMoreBlocksMessage = "//*[text()='Your answer is too short. Add more blocks.']";
errorMessage = "//*[text()='alert alert-danger']";
sourceBox = "//div[@class='highlight']";
// Morning Parsons Selectors //
parson1Block0 = "//div[@id='parsons-1-block-0']";
parsons1Block1 = "//div[@id='parsons-1-block-1']";
parsons1Block2 = "//div[@id='parsons-1-block-2']";
sourceModalBox = "//div[@id='morning_src']";
// Per_Person_Cost Parsons Selectors //
parsons2Block0 = "//div[@id='parsons-2-block-0']";
parsons2Block1 = "//div[@id='parsons-2-block-1']";
parsons2Block2 = "//div[@id='parsons-2-block-2']";
parsons2Block3 = "//div[@id='parsons-2-block-3']";
parsons2Block4 = "//div[@id='parsons-2-block-4']";
// Java_Countdown Parsons Selectors //
parsons3Block0 = "//div[@id='parsons-3-block-0']";
parsons3Block1 = "//div[@id='parsons-3-block-1']";
parsons3Block2 = "//div[@id='parsons-3-block-2']"
parsons3Block3_distractor = "//div[@id='parsons-3-block-3']";
parsons3Block4 = "//div[@id='parsons-3-block-4']";
parsons3Block5 = "//div[@id='parsons-3-block-5']";
parsons3Block6 = "//div[@id='parsons-3-block-6']";
parsons3HelpMeButton = "//button[@id='parsons-3-help']";
// Java_Countdown_Paired Parsons Selectors //
parsons4Block0 = "//div[@id='parsons-4-block-0']";
parsons4Block1 = "//div[@id='parsons-4-block-1']";
parsons4Block2 = "//div[@id='parsons-4-block-2']";
parsons4Block3_distractor = "//div[@id='parsons-4-block-3']";
parsons4Block4 = "//div[@id='parsons-4-block-4']";
parsons4Block5 = "//div[@id='parsons-4-block-5']";
parsons4Block6 = "//div[@id='parsons-4-block-6']";
// Java_Countdown_Paired2 Parsons Selectors //
parsons5Block0 = "//div[@id='parsons-5-block-0']";
parsons5Block1 = "//div[@id='parsons-5-block-1']";
parsons5Block2 = "//div[@id='parsons-5-block-2']";
parsons5Block3_distractor = "//div[@id='parsons-5-block-3']";
parsons5Block4 = "//div[@id='parsons-5-block-4']";
parsons5Block5 = "//div[@id='parsons-5-block-5']";
parsons5Block6 = "//div[@id='parsons-5-block-6']";
// Simple_Dag Parsons Selectors //
parsons6Block0 = "//div[@id='parsons-6-block-0']";
parsons6Block1 = "//div[@id='parsons-6-block-1']";
parsons6Block2 = "//div[@id='parsons-6-block-2']";
parsons6Block3 = "//div[@id='parsons-6-block-3']";
// Functions // 
async goToParsonsPage() {


    await this.page.goto('/ns/books/published/overview/Assessments/parsons.html');
    await expect(this.page.locator(this.headingText)).toContainText('Proof Blocks');
    //await expect(this.page.locator(this.sectionNumber)).toContainText('2.3.2.');
    //await expect(this.page.locator(this.chapterOverview)).toContainText('It is also possible to embed simple questions into the text.  These');
   // await expect(this.page.locator(this.chapterOverview).nth(0)).toContainText('It is also possible to embed simple questions into the text.  These');
  //  await expect(this.page.locator(this.chapterOverview).nth(0)).toContainText('questions provide a way for the students to check themselves as they go along.  The questions also provide feedback so that you can');
  //  await expect(this.page.locator(this.chapterOverview).nth(0)).toContainText('understand why an answer may or may not be correct.');
   // await expect(this.page.locator(this.chapterOverview).nth(1)).toContainText('Check your understanding');


}
}