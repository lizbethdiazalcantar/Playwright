import { Page, expect } from '@playwright/test';
import { TextbookPage } from '../textbookPage';

export class OverviewShowEval extends TextbookPage{
  page: Page;

showEvalBox2 = '//*[@id="showEval_2"]';
showEvalBox1 = '//*[@id="showEval_1"]';
showEvalNextStep2 = '//*[@id="showEval_2_nextStep"]';
showEvalNextStep1 = '//*[@id="showEval_1_nextStep"]';
showEvalReset2 = '//*[@id="showEval_2_reset"]';
showEvalReset1 = '//*[@id="showEval_1_reset"]';
showEvalShowSrc2 = '//*[@id="showEval_2_src_show"]';
showEvalShowSrc1 = '//*[@id="showEval_1_src_show"]';
showEvalSrc2 = '#showEval_2_src > div:nth-child(1)';
showEvalSrc1 = '#showEval_1_src > div:nth-child(1)';
showEvalHideSrc2 = '//*[@id="showEval_2_src_hide"]';
showEvalHideSrc1 = '//*[@id="showEval_1_src_hide"]';

  constructor(page: Page) {
    super(page);
    this.page = page;
  }


}