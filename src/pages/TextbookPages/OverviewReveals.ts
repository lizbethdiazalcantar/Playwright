import { Page, expect } from '@playwright/test';
import { TextbookPage } from '../textbookPage';

export class OverviewReveals extends TextbookPage{
  page: Page;

  revealContentButton = '#revealid1_show';
  revealContent='#revealid1';
  hideContentButton = '#revealid1_hide';
  showSourceButton = '#revealid1_src_show';
  sourceCodeField = '#revealid1_src pre';
  hideSourceButton = '#revealid1_src_hide';
  saveRunButton ='//button[normalize-space(text())="Save & Run"]';
  saveRunOutput = '#ac11_stdout';



  constructor(page: Page) {
    super(page);
    this.page = page;
  }


}