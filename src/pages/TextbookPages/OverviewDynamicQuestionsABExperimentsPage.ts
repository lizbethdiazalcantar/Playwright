import { Page, expect } from '@playwright/test';
import { TextbookPage } from '../textbookPage';

export class OverviewDynamicQuestionsABExperiments extends TextbookPage{
  page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

//Locator Strings

//radio buttons
optionTrue = '#test_question2_4_1_opt_0';
optionFalse = '#test_question2_4_1_opt_1';
multipleChoiceAnswerOptionA = '#test_question2_3_2_opt_0';
multipleChoiceAnswerOptionB = '#test_question2_3_2_opt_1';
multipleChoiceAnswerOptionC = '#test_question2_3_2_opt_2';
multipleChoiceAnswerOptionD = '#test_question2_3_2_opt_3';

//Buttons
checkMeButton = 'button[name="do answer"]';
multipleChoiceCheckMeButton = 'button[name="do answer"]';
compareMeButton = '#test_question2_4_1_bcomp';
multipleChoicecompareMeButton = '#test_question2_3_2_bcomp';
modalCloseButtonTF = '.close';
showSourceButton = '#ab_example_src_show';
hideSourceButton = '#ab_example_src_hide';

//Feedback Area
feedbackText = '#test_question2_4_1_feedback';
multipleChoiceFeedbackTextOptionA = '#test_question2_3_2_feedback';
MultipleChoiceFeedbackTextOptionB = '#test_question2_3_2_feedback';
MultipleChoiceFeedbackTextOptionC = '#test_question2_3_2_feedback';
MultipleChoiceFeedbackTextOptionD = '#test_question2_3_2_feedback';

//Form
abQuestionSection = '#ab-experiments-with-dynamic-questions';
sectionNumber = '//*[contains(text(), "AB Experiments")]';
trueOrFalseQuestion = '#test_question2_4_1_form';
multipleChoiceQuestion = '#test_question2_3_2_form';
showSourceCode = '#ab_example_src';

//Modal
compareModal = '//div[@class = "modal-dialog compare-moda"]';
multipleChoiceCompareModal = 'body > div.modal.fade.in > div';

//Methods
//Click on 4.3.2. section
async clickABExperimentsSection(){
 await this.page.locator(this.sectionNumber).click();
}

//To select each of the options and producing the respective feedback text for the options 
async optionsAndFeedbackTextTrueFalse(){  
          if(await this.page.locator(this.trueOrFalseQuestion).isVisible()){
          console.log("True or False question is detected");  
           const optionsTF = [
               { locatorTF: this.page.locator('#test_question2_4_1_opt_0'), clickCheckMeButtonTF: this.page.locator('button[name="do answer"]'),feedbackLocatorTF: this.page.locator('#test_question2_4_1_feedback'), expectedFeedbackTF: "✖️ -  The + character is not allowed in variable names." },
               { locatorTF: this.page.locator('#test_question2_4_1_opt_1'), clickCheckMeButtonTF: this.page.locator('button[name="do answer"]'),feedbackLocatorTF: this.page.locator('#test_question2_4_1_feedback'), expectedFeedbackTF: "✔️ -  The + character is not allowed in variable names (everything else in this name is fine)." }
           ]; 
           //To iterate throught all the options 
          for (const option of optionsTF) {
              await option.locatorTF.click();
              await option.clickCheckMeButtonTF.nth(1).click();
              await option.feedbackLocatorTF.waitFor({ state: 'visible' });
              const feedbackTextTF = await option.feedbackLocatorTF.textContent(); // To get text from correct locator
              expect(feedbackTextTF).toContain(option.expectedFeedbackTF); // Validate correct feedback as per the option           
        }
        return "True/False question is handled";
      }
      }
      async optionsAndFeedbackTextMultipleChoice() {
        if(await this.page.locator(this.multipleChoiceQuestion).isVisible()){
          console.log("Multiple choice question is detected");
          const optionsMC = [
               { locator: this.page.locator('#test_question2_3_2_opt_0'), clickCheckMeButton: this.page.locator('button[name="do answer"]'),feedbackLocator: this.page.locator('#test_question2_3_2_feedback'), expectedFeedback: "✖️ It is legal to change the type of data that a variable holds in Python.", },
               { locator: this.page.locator('#test_question2_3_2_opt_1'), clickCheckMeButton: this.page.locator('button[name="do answer"]'),feedbackLocator: this.page.locator('#test_question2_3_2_feedback'), expectedFeedback: "✖️ This is the first value assigned to the variable day, but the next statements reassign that variable to new values." },
               { locator: this.page.locator('#test_question2_3_2_opt_2'), clickCheckMeButton: this.page.locator('button[name="do answer"]'),feedbackLocator: this.page.locator('#test_question2_3_2_feedback'), expectedFeedback: "✖️ This is the second value assigned to the variable day, but the next statement reassigns that variable to a new value" },
               { locator: this.page.locator('#test_question2_3_2_opt_3'), clickCheckMeButton: this.page.locator('button[name="do answer"]'),feedbackLocator: this.page.locator('#test_question2_3_2_feedback'), expectedFeedback: "✔️ The variable day will contain the last value assigned to it when it is printed." }
          ];
          //To iterate through all the multiple choice options 
          for (const option of optionsMC) {
              await option.locator.click();
              await option.clickCheckMeButton.nth(1).click();
              await option.feedbackLocator.waitFor({ state: 'visible' });
              const feedbackTextMC = await option.feedbackLocator.textContent(); // To get text from correct locator
              expect(feedbackTextMC).toContain(option.expectedFeedback); // Validate correct feedback as per the option
        }
        return "Multiple choice question is handled";
      }
    }
       async validateQuestionVisibilityForFeedbackText(){
              const resultTF = await this.optionsAndFeedbackTextTrueFalse();
              const resultMC = await this.optionsAndFeedbackTextMultipleChoice();
              if(!resultTF && !resultMC){
               throw new Error('Neither True/False nor Multiple Choice question appeared.'); 
       } 
    }
      async modalForTrueFalse(){
          if(await this.page.locator(this.trueOrFalseQuestion).isVisible()){
              console.log("True or False question is detected");  
              const optionsTF = [
               { locatorTF: this.page.locator('#test_question2_4_1_opt_0'), checkMeButtonLocatorTF: this.page.locator('button[name="do answer"]'),feedbackLocatorTF: this.page.locator('#test_question2_4_1_feedback'), expectedFeedbackTF: "✖️ -  The + character is not allowed in variable names.", compareMeButtonLocatorTF: this.page.locator('#test_question2_4_1_bcomp'),compareModalLocatorTF: this.page.locator('//div[@class = "modal-dialog compare-modal"]'), closeCompareModalTF: this.page.locator('//button[@class = "close"]') },
               { locatorTF: this.page.locator('#test_question2_4_1_opt_1'), checkMeButtonLocatorTF: this.page.locator('button[name="do answer"]'),feedbackLocatorTF: this.page.locator('#test_question2_4_1_feedback'), expectedFeedbackTF: "✔️ -  The + character is not allowed in variable names (everything else in this name is fine).", compareMeButtonLocatorTF: this.page.locator('#test_question2_4_1_bcomp'),compareModalLocatorTF: this.page.locator('//div[@class = "modal-dialog compare-modal"]'), closeCompareModalTF: this.page.locator('//button[@class = "close"]') }
           ]; 
           //To iterate through all the options 
          for (const option of optionsTF) {
              await option.locatorTF.click();
              await option.checkMeButtonLocatorTF.nth(1).click();
              await option.feedbackLocatorTF.waitFor({ state: 'visible' });
              const feedbackTextTF = await option.feedbackLocatorTF.textContent(); // To get text from correct locator
              expect(feedbackTextTF).toContain(option.expectedFeedbackTF); // Validate correct feedback as per the option
              await expect(option.compareMeButtonLocatorTF).toBeVisible();
              await expect(option.compareMeButtonLocatorTF).toBeEnabled();
              await option.compareMeButtonLocatorTF.click();
              await option.compareModalLocatorTF.last().waitFor({state : 'visible'});  //Locates the latest/last modal as the modals keep changing for every click         
              await option.closeCompareModalTF.last().click(); //Locates the latest/last locator for the close button                        
        }
         return "True/False question is handled with modal";
      }   
    }   
      async modalForMultipleChoice(){
        if(await this.page.locator(this.multipleChoiceQuestion).isVisible()){
          console.log("Multiple choice question is detected");
          const optionsMC = [
               { locator: this.page.locator('#test_question2_3_2_opt_0'), clickCheckMeButton: this.page.locator('button[name="do answer"]'),feedbackLocator: this.page.locator('#test_question2_3_2_feedback'), expectedFeedback: "✖️ It is legal to change the type of data that a variable holds in Python.", compareMeButtonLocator: this.page.locator('#test_question2_3_2_bcomp'),compareModalLocator: this.page.locator('//div[@class = "modal-dialog compare-modal"]'), closeCompareModal: this.page.locator('//button[@class = "close"]') },
               { locator: this.page.locator('#test_question2_3_2_opt_1'), clickCheckMeButton: this.page.locator('button[name="do answer"]'),feedbackLocator: this.page.locator('#test_question2_3_2_feedback'), expectedFeedback: "✖️ This is the first value assigned to the variable day, but the next statements reassign that variable to new values." , compareMeButtonLocator: this.page.locator('#test_question2_3_2_bcomp'),compareModalLocator: this.page.locator('//div[@class = "modal-dialog compare-modal"]'), closeCompareModal: this.page.locator('//button[@class = "close"]') },
               { locator: this.page.locator('#test_question2_3_2_opt_2'), clickCheckMeButton: this.page.locator('button[name="do answer"]'),feedbackLocator: this.page.locator('#test_question2_3_2_feedback'), expectedFeedback: "✖️ This is the second value assigned to the variable day, but the next statement reassigns that variable to a new value" , compareMeButtonLocator: this.page.locator('#test_question2_3_2_bcomp'),compareModalLocator: this.page.locator('//div[@class = "modal-dialog compare-modal"]'), closeCompareModal: this.page.locator('//button[@class = "close"]')  },
               { locator: this.page.locator('#test_question2_3_2_opt_3'), clickCheckMeButton: this.page.locator('button[name="do answer"]'),feedbackLocator: this.page.locator('#test_question2_3_2_feedback'), expectedFeedback: "✔️ The variable day will contain the last value assigned to it when it is printed." , compareMeButtonLocator: this.page.locator('#test_question2_3_2_bcomp'),compareModalLocator: this.page.locator('//div[@class = "modal-dialog compare-modal"]'), closeCompareModal: this.page.locator('//button[@class = "close"]') }
          ];
          //To iterate throught all the multiple choice options 
          for (const option of optionsMC) {
              await option.locator.click();
              await option.clickCheckMeButton.nth(1).click();
              await option.feedbackLocator.waitFor({ state: 'visible' });
              const feedbackTextMc = await option.feedbackLocator.textContent(); // To get text from correct locator
              expect(feedbackTextMc).toContain(option.expectedFeedback); // Validate correct feedback as per the option
              await expect(option.compareMeButtonLocator).toBeVisible();
              await expect(option.compareMeButtonLocator).toBeEnabled();
              await option.compareMeButtonLocator.click();
              await option.compareModalLocator.last().waitFor({state : 'visible'});  //Locates the latest/last modal as the modals keep changing for every click          
              await option.closeCompareModal.last().click();   //Locates the latest/last locator for the close button                 
      }
      return "Multiple choice qustion is handled with modal";
    }
  }
      async validateQuestionVisibilityForModalTest(){
              const resultTF = await this.modalForTrueFalse();
              const resultMC = await this.modalForMultipleChoice();
              if(!resultTF && !resultMC){
               throw new Error('Neither True/False nor Multiple Choice question appeared.'); 
   }
  }
      async showSourceButtonMethod(){
             const showSourceButton = this.page.locator(this.showSourceButton).first();
             const hideSourceButton = this.page.locator(this.hideSourceButton).first();
             await showSourceButton.click();
             const showSourceCode = this.page.locator(this.showSourceCode).first();
             await showSourceCode.waitFor({state : 'visible'});         
  }
      async hideSourceButtonMethod(){
             const showSourceButton = this.page.locator(this.showSourceButton).first();
             const hideSourceButton = this.page.locator(this.hideSourceButton).first();
             await showSourceButton.click();
             const showSourceCode = this.page.locator(this.showSourceCode).first();
             await showSourceCode.waitFor({state : 'visible'});
             await expect(hideSourceButton).toBeEnabled(); //To enable the button before the interaction
             await hideSourceButton.click();
             await showSourceButton.waitFor({state : 'visible'});
  }
     async selectOneOptionDeselectOtherOptionsTrueFalse(){
             const trueOrFalseQuestion = this.page.locator(this.trueOrFalseQuestion).nth(0);
             const optionTrue = this.page.locator(this.optionTrue).nth(0);
             const optionFalse = this.page.locator(this.optionFalse).nth(0);
             if(await trueOrFalseQuestion.isVisible()){
             console.log("True or False question is detected");  
             await optionTrue.click(); 
             expect(await optionTrue.isChecked()).toBeTruthy();  
             expect(await optionFalse.isChecked()).toBeFalsy();        
        }
        return "OptionA. True selected and OptionB.False automatically deselected";
      }
    async selectOneOptionDeselectOtherOptionsMultipleChoice(){
            if(await this.page.locator(this.multipleChoiceQuestion).isVisible()){
            console.log("Multiple choice question is detected");
            await this.page.locator(this.multipleChoiceAnswerOptionA).click();
            expect(await this.page.locator(this.multipleChoiceAnswerOptionA).isChecked()).toBeTruthy();
            expect(await this.page.locator(this.multipleChoiceAnswerOptionB).isChecked()).toBeFalsy();
            expect(await this.page.locator(this.multipleChoiceAnswerOptionC).isChecked()).toBeFalsy();
            expect(await this.page.locator(this.multipleChoiceAnswerOptionD).isChecked()).toBeFalsy();
         }
        return  "OptionA is selected and all the other 3 options are automatically deselected";
      }
    async validateQuestionVisibilityForNegativeTest(){
            const resultTF = await this.selectOneOptionDeselectOtherOptionsTrueFalse();
            const resultMC = await this.selectOneOptionDeselectOtherOptionsMultipleChoice();
            if(!resultTF && !resultMC){
              throw new Error('Neither True/False nor Multiple Choice question appeared.');        
        }
      }
} 