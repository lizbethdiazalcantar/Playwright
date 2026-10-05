import { Page, expect } from '@playwright/test';
import { TextbookPage } from '../textbookPage';

export class CodeLensPredictionsPage extends TextbookPage{
  page: Page;
  nextButton="#jmpStepFwd";
  prevButton ="#jmpStepBack";
  globalFrameTot = "#v3__global__tot_tr .stackFrameValue .numberObj";
  showSourceTotCalcButton = "#codelens_question_src_show";
  sourceCodeTotCalcBlock = "#codelens_question_src pre";
  hideSourceTotCalcButton = "#codelens_question_src_hide";
  showSourceEvenOddButton = "#codelens_question_line_src_show"; 
  sourceCodeEvenOddBlock = "#codelens_question_line_src pre";
  hideSourceToEvenOddButton = "#codelens_question_line_src_hide";
  printTextArea ="#pyStdout";
  globalFrameX = "#v4__global__x_tr .stackFrameValue .numberObj";
   globalFrameY = "#v4__global__y_tr .stackFrameValue .numberObj";


  constructor(page: Page) {
    super(page);
    this.page = page;
  }


} 