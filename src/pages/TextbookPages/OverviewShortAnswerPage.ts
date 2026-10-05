import { Page, expect } from '@playwright/test';
import { TextbookPage } from '../textbookPage';

export class OverviewShortAnswerPage extends TextbookPage{
  page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

//---Page Element Selectors

//Page heading and common content
headingText = "section#short-answer > h1";
sectionNumber = "span.section-number";
saveButton = '.btn-success';
showSourceButton = '#shorta1_src_show';
hideSourceButton = '#shorta1_src_hide';
sourceSection = 'div#shorta1_src div.highlight';
showPreTeXtButton = '#ptx_shorta_src_show';
hidePreTeXtButton = '#ptx_shorta_src_hide';
preTeXtSection = 'div#ptx_shorta_src div.highlight';
chooseFileButton = '#shortattach1_fileme';
markAsCompletedB = '.buttonAskCompletion';
completedButton = '.buttonConfirmCompletion';
checkMark_CompletedB = '.glyphicon-ok'


//Activity 2.6.1 selectors
textArea2_6_1 = '#shorta1_solution';
feedback2_6_1 = 'div#shorta1_feedback';

//Activity 2.6.2 selectors
textArea2_6_2 = '#shortattach1_solution';
feedback2_6_2 = 'div#shortattach1_feedback';



//---Page Methods

//Navigation methods
   async goToShortAnswerPage(){
    await this.page.goto('/ns/books/published/overview/Assessments/shortanswer.html');
    await expect(this.page.locator(this.headingText)).toContainText('Short Answer');
    await expect(this.page.locator(this.sectionNumber)).toContainText('2.6')
  }
  
//2.6.1 Action methods
async saveAnswer2_6_1(){
  await this.page.locator(this.textArea2_6_1).fill("Test input");
  await this.page.locator(this.saveButton).nth(0).click();
}

async fillTextArea2_6_1(){
  await this.page.locator(this.textArea2_6_1).fill("Test input");
}

async clickSaveButton2_6_1(){
  await this.page.locator(this.saveButton).nth(0).click();
}

async blurTextArea2_6_1(){
  await this.page.locator(this.textArea2_6_1).blur();
}

//2.6.2 Action methods
async saveAnswer2_6_2(){
  await this.page.locator(this.textArea2_6_2).fill("Test input");
  await this.page.locator(this.saveButton).nth(1).click();
}

async fillTextArea2_6_2(){
  await this.page.locator(this.textArea2_6_2).fill("Test input");
}

async clickSaveButton2_6_2(){
  await this.page.locator(this.saveButton).nth(1).click();
}

async blurTextArea2_6_2(){
  await this.page.locator(this.textArea2_6_2).blur();
}

    //---methods that could added in the future:
    // getFeedbackMessage (for saved, not saved, and has been saved)

}