import { Page, expect } from '@playwright/test';
import { TextbookPage } from '../textbookPage';

export class OverviewTextbookMultipleChoicePage extends TextbookPage{
  page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  /////////////////////////////////////////////////////////
  // Locator Strings
  //Page heading and common content
  headingText = 'section#multiple-choice > h1';
  chapterOverview = 'section#multiple-choice p';
  sectionNumber = '//span[@class="section-number"]';
  checkMeButton = 'button[name="do answer"]';

  //Question 1
  q1PythonOption = '#question1_1_opt_0';
  q1JavaOption = '#question1_1_opt_1';
  q1COption = '#question1_1_opt_2';
  q1MLOption = '#question1_1_opt_3';
  q1Feedback = '#question1_1_feedback';
  q1CheckMeButton = '#question1_1';
  q1CompareMeButton = '#question1_1_bcomp';
  q1ShowSourceButton = '#question1_1_src_show';
  q1HideSourceButton = '#question1_1_src_hide';

  //Question 2
  q2XIsNegative = '#qce_1_opt_0';
  q2XIsZero = '#qce_1_opt_1';
  q2XIsPositive = '#qce_1_opt_2';
  q2Feedback = '#qce_1_feedback';
  q2CheckMeButton = '#qce_1';
  q2CompareMeButton = '#qce_1_bcomp';
  q2ShowSourceButton = '#qce_1_src_show';
  q2HideSourceButton = '#qce_1_src_hide';

  //Question 3
  q3OptionA = '#over_turtle_which_draws_pict_mcq_opt_0';
  q3OptionB = '#over_turtle_which_draws_pict_mcq_opt_1';
  q3OptionC = '#over_turtle_which_draws_pict_mcq_opt_2';
  q3OptionD = '#over_turtle_which_draws_pict_mcq_opt_3';
  q3CheckMeButton = '#over_turtle_which_draws_pict_mcq';
  q3Feedback = '#over_turtle_which_draws_pict_mcq_feedback';
  q3CompareMeButton = '#over_turtle_which_draws_pict_mcq_bcomp';
  q3ShowSourceButton = '#over_turtle_which_draws_pict_mcq_src_show';
  q3HideSourceButton = '#over_turtle_which_draws_pict_mcq_src_hide';


  // Question 4
q4OptionA = '#over_class_mcq_correct_person_def_code_block_opt_0';
q4OptionB = '#over_class_mcq_correct_person_def_code_block_opt_1';
q4OptionC = '#over_class_mcq_correct_person_def_code_block_opt_2';
q4OptionD = '#over_class_mcq_correct_person_def_code_block_opt_3';
q4CheckMeButton = '#over_class_mcq_correct_person_def_code_block';
q4Feedback = '#over_class_mcq_correct_person_def_code_block_feedback';
q4CompareMeButton = '#over_class_mcq_correct_person_def_code_block_bcomp';
q4ShowSourceButton = '#over_class_mcq_correct_person_def_code_block_src_show';
q4HideSourceButton = '#over_class_mcq_correct_person_def_code_block_src_hide';


//Question 5
q5OptionA = '#question1_2_opt_0'; // Red
q5OptionB = '#question1_2_opt_1'; // Yellow
q5OptionC = '#question1_2_opt_2'; // Black
q5OptionD = '#question1_2_opt_3'; // Green
q5Feedback = '#question1_2_feedback';
q5CheckMeButton = '#question1_2'; //button[contains(text(), 'Check Me')]";
q5CompareMeButton = '#question1_2_bcomp';
q5ShowSourceButton = '#question1_2_src_show';
q5HideSourceButton = '#question1_2_src_hide';


//Question 6
q6OptionA = '#mchoice_random_opt_0';
q6OptionB = '#mchoice_random_opt_1';
q6OptionC = '#mchoice_random_opt_2';
q6OptionD = '#mchoice_random_opt_3';
q6CheckMeButton = '#mchoice_random';
q6Feedback = '#mchoice_random_feedback';
q6CompareMeButton = '#mchoice_random_bcomp';
q6ShowSourceButton = '#mchoice_random_src_show';
q6HideSourceButton = '#mchoice_random_src_hide';

  ///////////////////////////////////////////////////////
  //  Navigation methods

  async goToMultipleChoicePage(){
    // This method directly navigates to the Multiple Choice page and verifies that it displays
    // by checking the heading text, the section number, and the introduction text.
    // It does not check for the presence of individual questions.

    await this.page.goto('/ns/books/published/overview/Assessments/multiplechoice.html');
    await expect(this.page.locator(this.headingText)).toContainText('Multiple Choice');
    await expect(this.page.locator(this.sectionNumber)).toContainText('2.1');
    await expect(this.page.locator(this.chapterOverview).nth(0)).toContainText('It is also possible to embed simple questions into the text.  These');
    await expect(this.page.locator(this.chapterOverview).nth(0)).toContainText('questions provide a way for the students to check themselves as they go along.  The questions also provide feedback so that you can');
    await expect(this.page.locator(this.chapterOverview).nth(0)).toContainText('understand why an answer may or may not be correct.');
    await expect(this.page.locator(this.chapterOverview).nth(1)).toContainText('Check your understanding');


  }

  //////////////////////////////////////////////////////////////////////////////////
  // Question 1 methods

  async q1SelectPythonOption(){
    await this.page.click(this.q1PythonOption);
    await this.page.locator(this.checkMeButton).nth(0).click();
    await this.page.locator(this.q1Feedback).isVisible();
  }

  async q1SelectJavaOption(){
    await this.page.click(this.q1JavaOption);
    await this.page.locator(this.checkMeButton).nth(0).click();
    await this.page.locator(this.q1Feedback).isVisible();
  }

  async q1SelectCOption(){
    await this.page.click(this.q1COption);
    await this.page.locator(this.checkMeButton).nth(0).click();
    await this.page.locator(this.q1Feedback).isVisible();
  }

  async q1SelectMLOption(){
    await this.page.click(this.q1MLOption);
    await this.page.locator(this.checkMeButton).nth(0).click();
    await this.page.locator(this.q1Feedback).isVisible();
  }
  async q1ClickCompareMe() {
    await this.page.locator(this.q1CompareMeButton).click();
  }
  
  async q1ClickShowSource() {
    await this.page.locator(this.q1ShowSourceButton).click();
  }
  
  async q1ClickHideSource() {
    await this.page.locator(this.q1HideSourceButton).click();
  }

  //////////////////////////////////////////////////////////////////////////////////
  // Question 2 methods

  async q2SelectNegative(){
    await this.page.locator(this.q2XIsNegative).click();
    await this.page.locator(this.checkMeButton).nth(1).click();
    await this.page.locator(this.q2Feedback).isVisible();
  }

  async q2SelectZero(){
    await this.page.locator(this.q2XIsZero).click();
    await this.page.locator(this.checkMeButton).nth(1).click();
    await this.page.locator(this.q2Feedback).isVisible();
  }

  async q2SelectPositive(){
    await this.page.locator(this.q2XIsPositive).click();
    await this.page.locator(this.checkMeButton).nth(1).click();
    await this.page.locator(this.q2Feedback).isVisible();
  }
  async q2ClickCompareMe() {
    await this.page.locator(this.q2CompareMeButton).click();
  }
  
  async q2ClickShowSource() {
    await this.page.locator(this.q2ShowSourceButton).click();
  }
  
  async q2ClickHideSource() {
    await this.page.locator(this.q2HideSourceButton).click();
  }
  
    //////////////////////////////////////////////////////////////////////////////////
  // Question 3 methods
  async q3SelectOptionA() {
    await this.page.locator(this.q3OptionA).click();
    await this.page.locator(this.q3CheckMeButton).nth(2).click();
    await this.page.locator(this.q3Feedback).isVisible();
  }
  
  async q3SelectOptionB() {
    await this.page.locator(this.q3OptionB).click();
    await this.page.locator(this.q3CheckMeButton).nth(2).click();
    await this.page.locator(this.q3Feedback).isVisible();
  }
  
  async q3SelectOptionC() {
    await this.page.locator(this.q3OptionC).click();
    await this.page.locator(this.q3CheckMeButton).nth(2).click();
    await this.page.locator(this.q3Feedback).isVisible();
  }
  
  async q3SelectOptionD() {
    await this.page.locator(this.q3OptionD).click();
    await this.page.locator(this.q3CheckMeButton).nth(2).click();
    await this.page.locator(this.q3Feedback).isVisible();
  }
  async q3ClickCompareMe() {
    await this.page.locator(this.q3CompareMeButton).click();
  }
  
  async q3ClickShowSource() {
    await this.page.locator(this.q3ShowSourceButton).click();
  }
  
  async q3ClickHideSource() {
    await this.page.locator(this.q3HideSourceButton).click();
  }

   // Question 4 methods

  async q4SelectOptionA() {
    await this.page.click(this.q4OptionA);
    await this.page.locator(this.q4CheckMeButton).nth(3).click();
    await this.page.locator(this.q4Feedback).isVisible();
  }

  async q4SelectOptionB() {
    await this.page.click(this.q4OptionB);
    await this.page.locator(this.q4CheckMeButton).nth(3).click();
    await this.page.locator(this.q4Feedback).isVisible();
  }

  async q4SelectOptionC() {
    await this.page.click(this.q4OptionC);
    await this.page.locator(this.q4CheckMeButton).nth(3).click();
    await this.page.locator(this.q4Feedback).isVisible();
  }

  async q4SelectOptionD() {
    await this.page.click(this.q4OptionD);
    await this.page.locator(this.q4CheckMeButton).nth(3).click();
    await this.page.locator(this.q4Feedback).isVisible();
  }

  async q4ClickCompareMe() {
    await this.page.locator(this.q4CompareMeButton).click();
  }

  async q4ClickShowSource() {
    await this.page.locator(this.q4ShowSourceButton).click();
    
  }

  async q4ClickHideSource() {
    await this.page.locator(this.q4HideSourceButton).click();
  }

   // Question 5 methods

  async q5SelectOptionA() {
    await this.page.click(this.q5OptionA);
    await this.page.locator(this.q5CheckMeButton).nth(4).click();
    await this.page.locator(this.q5Feedback).isVisible();
  }

  async q5SelectOptionB() {
    await this.page.click(this.q5OptionB);
    await this.page.locator(this.q5CheckMeButton).nth(4).click();
    await this.page.locator(this.q5Feedback).isVisible();
  }

  async q5SelectOptionC() {
    await this.page.click(this.q5OptionC);
    await this.page.locator(this.q5CheckMeButton).nth(4).click();
    await this.page.locator(this.q5Feedback).isVisible();
  }

  async q5SelectOptionD() {
    await this.page.click(this.q5OptionD);
    await this.page.locator(this.q5CheckMeButton).nth(4).click();
    await this.page.locator(this.q5Feedback).isVisible();
  }

  async q5ClickCompareMe() {
    await this.page.locator(this.q5CompareMeButton).click();
  }

  async q5ClickShowSource() {
    await this.page.locator(this.q5ShowSourceButton).click();
  }

  async q5ClickHideSource() {
    await this.page.locator(this.q5HideSourceButton).click();
  }

  // Question 6 methods

  async q6SelectZero() {
    await this.page.click(this.q6OptionA);
    await this.page.locator(this.q6CheckMeButton).nth(5).click();
    await this.page.locator(this.q6Feedback).isVisible();
  }

  async q6SelectOne() {
    await this.page.click(this.q6OptionB);
    await this.page.locator(this.q6CheckMeButton).nth(5).click();
    await this.page.locator(this.q6Feedback).isVisible();
  }

  async q6SelectTwo() {
    await this.page.click(this.q6OptionC);
    await this.page.locator(this.q6CheckMeButton).nth(5).click();
    await this.page.locator(this.q6Feedback).isVisible();
  }

  async q6SelectThree() {
    await this.page.click(this.q6OptionD);
    await this.page.locator(this.q6CheckMeButton).nth(5).click();
    await this.page.locator(this.q6Feedback).isVisible();
  }

  async q6ClickCompareMe() {
    await this.page.locator(this.q6CompareMeButton).click();
  }

  async q6ClickShowSource() {
    await this.page.locator(this.q6ShowSourceButton).click();
  }

  async q6ClickHideSource() {
    await this.page.locator(this.q6HideSourceButton).click();
  }

}


